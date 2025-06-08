const express = require('express');
const path = require('path');
// Správný import funkce initializeDatabase
const { initializeDatabase } = require('./database/db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API cesty
const apiRoutes = require('./api/api');
app.use('/api', apiRoutes);

// Inicializace databáze a spuštění serveru
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server běží na portu ${port}`);
    });
  })
  .catch(err => {
    console.error('Chyba při inicializaci databáze:', err);
    process.exit(1);
  });
