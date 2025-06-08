# API pro správu aut

## Získání všech aut

Vrátí seznam všech aut v databázi.

**URL**: `/api/cars`

**Metoda**: `GET`

**Příklad odpovědi**:

```json
[
  {
    "id": 1,
    "make": "Škoda",
    "model": "Octavia",
    "year": 2020,
    "registration": "1A2 3456"
  },
  {
    "id": 2,
    "make": "Volkswagen",
    "model": "Golf",
    "year": 2019,
    "registration": "4B5 6789"
  }
]
```

## Získání konkrétního auta

Vrátí informace o konkrétním autě podle ID.

**URL**: `/api/cars/:id`

**Metoda**: `GET`

**Parametry URL**:
- `id` - ID auta

**Příklad odpovědi**:

```json
{
  "id": 1,
  "make": "Škoda",
  "model": "Octavia",
  "year": 2020,
  "registration": "1A2 3456"
}
```

## Vytvoření nového auta

Přidá nové auto do databáze.

**URL**: `/api/cars`

**Metoda**: `POST`

**Data požadavku**:

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2021,
  "registration": "7C8 9012"
}
```

**Příklad odpovědi**:

```json
{
  "id": 3,
  "make": "Toyota",
  "model": "Corolla",
  "year": 2021,
  "registration": "7C8 9012"
}
```

## Aktualizace auta

Aktualizuje informace o existujícím autě.

**URL**: `/api/cars/:id`

**Metoda**: `PUT`

**Parametry URL**:
- `id` - ID auta

**Data požadavku**:

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "registration": "7C8 9012"
}
```

**Příklad odpovědi**:

```json
{
  "id": 3,
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "registration": "7C8 9012"
}
```

## Smazání auta

Odstraní auto z databáze.

**URL**: `/api/cars/:id`

**Metoda**: `DELETE`

**Parametry URL**:
- `id` - ID auta

**Příklad odpovědi**:

```json
{
  "message": "Auto bylo úspěšně smazáno"
}
```