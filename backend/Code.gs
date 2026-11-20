// Jonas & Elke — gratis Google Apps Script-backend
// 1. Maak op script.google.com een nieuw project.
// 2. Plak dit in Code.gs en voeg het bestand Interface.html toe.
// 3. Deploy > New deployment > Web app > Execute as: Me; Who has access: Anyone.
// 4. Plaats de /exec-URL in config.js op GitHub.
// Het Google Sheet blijft privé. Bewerk toegang tot dit script uitsluitend via jullie eigen account.

const SPREADSHEET_ID = '1NyGceQehQl5j6AuaN7dZYvdGOZCPw8oN45vI5CS7eew';
const MAX_GUESTS = 15;

function doGet(e) {
  const p = e && e.parameter && e.parameter.page === 'cadeaulijst' ? 'cadeaulijst' : 'rsvp';
  const view = HtmlService.createTemplateFromFile('Interface');
  view.page = p;
  return view.evaluate()
    .setTitle(p === 'rsvp' ? 'RSVP — Jonas & Elke' : 'Cadeaulijst — Jonas & Elke')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function tidy(value, maxLength) {
  return String(value == null ? '' : value).trim().slice(0, maxLength);
}

function sheetByName(name) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sh) throw new Error('Het tabblad ' + name + ' ontbreekt.');
  return sh;
}

function submitRsvp(data) {
  data = data || {};
  // Een verborgen anti-spamveld wordt alleen door bots ingevuld.
  if (tidy(data.website, 100)) return {ok: true};
  const name = tidy(data.name, 120);
  const attendance = tidy(data.attendance, 5);
  const guests = Number(data.guests);
  const diet = tidy(data.diet, 350);
  const note = tidy(data.note, 500);
  if (name.length < 2) throw new Error('Vul een geldige naam in.');
  if (attendance !== 'Ja' && attendance !== 'Nee') throw new Error('Kies of je aanwezig bent.');
  if (!Number.isInteger(guests) || guests < 0 || guests > MAX_GUESTS || (attendance === 'Ja' && guests < 1) || (attendance === 'Nee' && guests !== 0)) {
    throw new Error('Het aantal personen klopt niet.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    sheetByName('RSVP antwoorden').appendRow([name, attendance, guests, diet, note, new Date()]);
    return {ok: true};
  } finally { lock.releaseLock(); }
}

function getGifts() {
  const sheet = sheetByName('Cadeaulijst');
  const rows = sheet.getDataRange().getDisplayValues();
  return rows.slice(1).map((r,i)=>({
    id: i + 2,
    name: tidy(r[0],120),
    description: tidy(r[1],400),
    link: /^https:\/\//i.test(String(r[2]||'')) ? String(r[2]) : '',
    price: tidy(r[3],30),
    available: tidy(r[4],40).toLowerCase() !== 'gereserveerd'
  })).filter(item=>item.name);
}

function reserveGift(data) {
  data = data || {};
  if (tidy(data.website,100)) throw new Error('Reservering niet mogelijk.');
  const name = tidy(data.name,120);
  const row = Number(data.id);
  if (name.length < 2) throw new Error('Vul je naam in.');
  if (!Number.isInteger(row) || row < 2) throw new Error('Kies een cadeau.');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = sheetByName('Cadeaulijst');
    if (row > sheet.getLastRow() || !sheet.getRange(row,1).getDisplayValue().trim()) {
      throw new Error('Dit cadeau bestaat niet meer. Vernieuw de lijst.');
    }
    if (String(sheet.getRange(row,5).getDisplayValue()).trim().toLowerCase() === 'gereserveerd') {
      throw new Error('Dit cadeau is helaas al gereserveerd. Kies gerust iets anders.');
    }
    sheet.getRange(row,5,1,2).setValues([['Gereserveerd',name]]);
    SpreadsheetApp.flush();
    return {ok:true};
  } finally { lock.releaseLock(); }
}
