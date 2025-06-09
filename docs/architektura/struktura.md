# Struktura projektu

Aplikace AutoRent je organizována do několika hlavních složek, které oddělují frontend, backend a databázovou vrstvu.

## Adresářová struktura

```
sps-fullstack/
│   README.md         # Základní informace o projektu
│   .gitignore        # Soubory ignorované Gitem
│   package.json      # Závislosti a skripty
│   server.js         # Hlavní soubor serveru
│
└───public/           # Statické soubory pro frontend
│   │   index.html    # Hlavní HTML stránka
│   │   404.html      # Stránka pro chybu 404
│   │
│   └───assets/       # Statické assety
│       │   styles.css    # CSS styly
│       │   script.cjs     # Frontend JavaScript
│       │   favicon.ico   # Favicon
│   
└───api/              # Backend API
│   │   api.js        # Definice API endpointů
│   
└───database/         # Databázová vrstva
│   │   db.js         # Připojení k databázi
│   │   schema.sql    # Definice schématu
│   │   seed.cjs       # Skript pro naplnění databáze
│   │   seed.sql      # Data pro naplnění databáze
│   
└───docs/             # Dokumentace
    │   ...
```

## Popis klíčových souborů

### Frontend

- **public/index.html**: Hlavní HTML stránka aplikace, obsahuje strukturu UI
- **public/404.html**: Stránka zobrazená při nenalezení požadovaného zdroje
- **public/assets/styles.css**: CSS styly pro celou aplikaci
- **public/assets/script.js**: Frontend JavaScript kód pro interakci s API

### Backend

- **server.js**: Hlavní soubor serveru, nastavuje Express a připojuje API
- **api/api.js**: Definuje všechny API endpointy pro CRUD operace

### Databáze

- **database/db.js**: Zajišťuje připojení k SQLite databázi
- **database/schema.sql**: SQL příkazy pro vytvoření tabulek
- **database/seed.js**: JavaScript skript pro naplnění databáze testovacími daty
- **database/seed.sql**: SQL příkazy s testovacími daty

## Architektura aplikace

Aplikace používá třívrstvou architekturu:

1. **Prezentační vrstva** (Frontend)
   - HTML, CSS a JavaScript v prohlížeči
   - Komunikuje s backend API pomocí fetch API

2. **Aplikační vrstva** (Backend)
   - Node.js s Express frameworkem
   - Zpracovává HTTP požadavky a odpovědi
   - Implementuje business logiku

3. **Datová vrstva** (Databáze)
   - SQLite databáze
   - Ukládá data o autech, zákaznících a výpůjčkách