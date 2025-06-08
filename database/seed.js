// Správný import db objektu
const { db } = require('./db');
const fs = require('fs');
const path = require('path');

function seedDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'seed.sql'), 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      
      db.exec(data, (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Database seeded successfully');
        resolve();
      });
    });
  });
}

// Spustit seedování, pokud je skript spuštěn přímo
if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = { seedDatabase };
