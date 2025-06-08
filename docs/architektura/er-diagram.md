# ER Diagram

Databáze aplikace AutoRent obsahuje tři hlavní entity: Auta, Zákazníci a Výpůjčky.

## Schéma databáze

![ER Diagram](/images/er-diagram.png)

## Popis entit

### cars (Auta)

Tabulka `cars` obsahuje informace o vozidlech dostupných k pronájmu.

| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | INTEGER | Primární klíč, automaticky inkrementovaný |
| make | TEXT | Značka vozidla (např. Škoda, Toyota) |
| model | TEXT | Model vozidla (např. Octavia, Corolla) |

### customers (Zákazníci)

Tabulka `customers` obsahuje informace o zákaznících autopůjčovny.

| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | INTEGER | Primární klíč, automaticky inkrementovaný |
| firstname | TEXT | Jméno zákazníka |
| lastname | TEXT | Příjmení zákazníka |
| driver_license | TEXT | Číslo řidičského průkazu (unikátní) |

### rentals (Výpůjčky)

Tabulka `rentals` propojuje auta a zákazníky a obsahuje informace o výpůjčkách.

| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | INTEGER | Primární klíč, automaticky inkrementovaný |
| car_id | INTEGER | Cizí klíč odkazující na tabulku cars |
| customer_id | INTEGER | Cizí klíč odkazující na tabulku customers |
| rental_date | TEXT | Datum zapůjčení vozidla |
| return_date | TEXT | Datum vrácení vozidla |

## Vztahy mezi entitami

- **Auta a Výpůjčky**: Vztah 1:N - Jedno auto může být v různých časech půjčeno vícekrát, ale jedna výpůjčka se vztahuje pouze k jednomu autu.
- **Zákazníci a Výpůjčky**: Vztah 1:N - Jeden zákazník může mít více výpůjček, ale jedna výpůjčka patří pouze jednomu zákazníkovi.

## SQL pro vytvoření schématu

```sql
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  make TEXT NOT NULL,
  model TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  driver_license TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS rentals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  car_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  rental_date TEXT NOT NULL,
  return_date TEXT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);
```