const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Chyba při připojování k databázi:', err.message);
  } else {
    console.log('Připojeno k SQLite databázi.');
  }
});

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      
      db.exec(data, (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Databáze byla úspěšně inicializována');
        resolve();
      });
    });
  });
}

module.exports = { db, initializeDatabase };


