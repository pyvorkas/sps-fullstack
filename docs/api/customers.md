# API pro správu zákazníků

## Získání všech zákazníků

Vrátí seznam všech zákazníků v databázi.

**URL**: `/api/customers`

**Metoda**: `GET`

**Příklad odpovědi**:

```json
[
  {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Novák",
    "email": "jan.novak@example.com",
    "phone": "123456789"
  },
  {
    "id": 2,
    "firstName": "Marie",
    "lastName": "Svobodová",
    "email": "marie.svobodova@example.com",
    "phone": "987654321"
  }
]
```

## Získání konkrétního zákazníka

Vrátí informace o konkrétním zákazníkovi podle ID.

**URL**: `/api/customers/:id`

**Metoda**: `GET`

**Parametry URL**:
- `id` - ID zákazníka

**Příklad odpovědi**:

```json
{
  "id": 1,
  "firstName": "Jan",
  "lastName": "Novák",
  "email": "jan.novak@example.com",
  "phone": "123456789"
}
```

## Vytvoření nového zákazníka

Přidá nového zákazníka do databáze.

**URL**: `/api/customers`

**Metoda**: `POST`

**Data požadavku**:

```json
{
  "firstName": "Petr",
  "lastName": "Černý",
  "email": "petr.cerny@example.com",
  "phone": "555666777"
}
```

**Příklad odpovědi**:

```json
{
  "id": 3,
  "firstName": "Petr",
  "lastName": "Černý",
  "email": "petr.cerny@example.com",
  "phone": "555666777"
}
```

## Aktualizace zákazníka

Aktualizuje informace o existujícím zákazníkovi.

**URL**: `/api/customers/:id`

**Metoda**: `PUT`

**Parametry URL**:
- `id` - ID zákazníka

**Data požadavku**:

```json
{
  "firstName": "Petr",
  "lastName": "Černý",
  "email": "petr.cerny.new@example.com",
  "phone": "555666777"
}
```

**Příklad odpovědi**:

```json
{
  "id": 3,
  "firstName": "Petr",
  "lastName": "Černý",
  "email": "petr.cerny.new@example.com",
  "phone": "555666777"
}
```

## Smazání zákazníka

Odstraní zákazníka z databáze.

**URL**: `/api/customers/:id`

**Metoda**: `DELETE`

**Parametry URL**:
- `id` - ID zákazníka

**Příklad odpovědi**:

```json
{
  "message": "Zákazník byl úspěšně smazán"
}
```