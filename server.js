import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './database/db.js';

const app = express();
const port = process.env.PORT || 3000;

// Pro ES moduly potřebujeme získat __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API cesty
import apiRoutes from './api/api.js';
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
