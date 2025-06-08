# Instalace a spuštění

## Požadavky

Pro spuštění aplikace AutoRent potřebujete:

- Node.js (verze 14 nebo novější)
- npm (obvykle se instaluje s Node.js)

## Instalace

1. Naklonujte repozitář:

```bash
git clone https://github.com/username/sps-fullstack.git
cd sps-fullstack
```

2. Nainstalujte závislosti:

```bash
npm install
```

## Spuštění aplikace

### Vývojové prostředí

Pro spuštění aplikace v vývojovém režimu použijte:

```bash
npm start
```

Aplikace bude dostupná na adrese `http://localhost:3000`.

### Inicializace databáze

Při prvním spuštění se databáze automaticky inicializuje. Pro naplnění databáze ukázkovými daty můžete použít:

```bash
npm run seed
```

## Struktura projektu

```
sps-fullstack/
│   README.md
│   .gitignore
│   package.json
│   server.js
│
└───public/
│   │   index.html
│   │   404.html
│   │
│   └───assets/
│       │   styles.css
│       │   script.js
│       │   favicon.ico
│   
└───api/
│   │   api.js
│   
└───database/
│   │   db.js
│   │   schema.sql
│   │   seed.js
│   │   seed.sql
│   
└───docs/
    │   ...
```