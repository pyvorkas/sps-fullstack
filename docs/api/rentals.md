# API pro správu výpůjček

## Získání všech výpůjček

Vrátí seznam všech výpůjček v databázi.

**URL**: `/api/rentals`

**Metoda**: `GET`

**Příklad odpovědi**:

```json
[
  {
    "id": 1,
    "carId": 1,
    "customerId": 1,
    "startDate": "2023-01-01",
    "endDate": "2023-01-07",
    "status": "active",
    "car": {
      "make": "Škoda",
      "model": "Octavia"
    },
    "customer": {
      "firstName": "Jan",
      "lastName": "Novák"
    }
  },
  {
    "id": 2,
    "carId": 2,
    "customerId": 2,
    "startDate": "2023-02-01",
    "endDate": "2023-02-14",
    "status": "completed",
    "car": {
      "make": "Volkswagen",
      "model": "Golf"
    },
    "customer": {
      "firstName": "Marie",
      "lastName": "Svobodová"
    }
  }
]
```

## Získání konkrétní výpůjčky

Vrátí informace o konkrétní výpůjčce podle ID.

**URL**: `/api/rentals/:id`

**Metoda**: `GET`

**Parametry URL**:
- `id` - ID výpůjčky

**Příklad odpovědi**:

```json
{
  "id": 1,
  "carId": 1,
  "customerId": 1,
  "startDate": "2023-01-01",
  "endDate": "2023-01-07",
  "status": "active",
  "car": {