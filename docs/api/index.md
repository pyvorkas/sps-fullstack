# API Dokumentace

AutoRent poskytuje REST API pro přístup k datům o autech, zákaznících a výpůjčkách. Všechny endpointy používají JSON pro požadavky i odpovědi.

## Základní URL

Všechny API endpointy začínají prefixem `/api`.

## Dostupné endpointy

| Kategorie | Popis |
|-----------|-------|
| [Auta](/api/cars) | Správa vozového parku |
| [Zákazníci](/api/customers) | Správa zákazníků |
| [Výpůjčky](/api/rentals) | Správa výpůjček |

## Formát odpovědi

Všechny odpovědi jsou ve formátu JSON. V případě úspěchu obsahují data nebo potvrzující zprávu. V případě chyby obsahují chybovou zprávu.

### Úspěšná odpověď

```json
{
  "id": 1,
  "make": "Škoda",
  "model": "Octavia",
  "year": 2020,
  "registration": "1A2 3456"
}
```

### Chybová odpověď

```json
{
  "error": "Auto s ID 999 nebylo nalezeno"
}
```

## Stavové kódy

| Kód | Popis |
|-----|-------|
| 200 | OK - Požadavek byl úspěšně zpracován |
| 201 | Created - Zdroj byl úspěšně vytvořen |
| 400 | Bad Request - Neplatný požadavek |
| 404 | Not Found - Zdroj nebyl nalezen |
| 500 | Internal Server Error - Chyba na straně serveru |