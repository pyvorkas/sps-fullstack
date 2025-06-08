# Frontend architektura

Frontend aplikace AutoRent je postaven na čistém HTML, CSS a JavaScriptu bez použití frameworků. Toto řešení bylo zvoleno pro jednoduchost a přímočarost implementace.

## Struktura HTML

Aplikace používá jednu hlavní HTML stránku (`index.html`), která obsahuje tři hlavní sekce:

1. **Správa aut** - formulář pro přidání/úpravu aut a tabulka se seznamem aut
2. **Správa zákazníků** - formulář pro přidání/úpravu zákazníků a tabulka se seznamem zákazníků
3. **Správa výpůjček** - formulář pro přidání/úpravu výpůjček a tabulka se seznamem výpůjček

Navigace mezi těmito sekcemi je řešena pomocí záložek v horní části stránky.

## CSS styly

Styly jsou definovány v souboru `styles.css` a zahrnují:

- Responzivní design pomocí flexboxu a media queries
- Barevné schéma s použitím CSS proměnných
- Styly pro formuláře, tabulky a tlačítka
- Animace a přechody pro lepší uživatelský zážitek

## JavaScript funkcionalita

Hlavní JavaScript soubor `script.js` obsahuje kód pro:

1. **Správu UI**
   - Přepínání mezi záložkami
   - Zobrazování a skrývání formulářů
   - Resetování formulářů

2. **Komunikaci s API**
   - Načítání dat z API endpointů
   - Odesílání nových dat na server
   - Aktualizace a mazání existujících záznamů

3. **Manipulaci s DOM**
   - Dynamické vytváření řádků tabulek
   - Aktualizace formulářů při editaci
   - Zobrazování chybových hlášek

## Klíčové funkce

### Načítání dat

```javascript
function loadCars() {
  fetch('/api/cars')
    .then(response => response.json())
    .then(cars => {
      // Zpracování dat a aktualizace UI
    })
    .catch(error => console.error('Chyba při načítání aut:', error));
}
```

### Přidání/úprava záznamu

```javascript
carForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const carData = {
    make: carMakeInput.value,
    model: carModelInput.value
  };

  const method = carIdInput.value ? 'PUT' : 'POST';
  const url = carIdInput.value ? `/api/cars/${carIdInput.value}` : '/api/cars';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })
    .then(response => response.json())
    .then(() => {
      resetCarForm();
      loadCars();
    })
    .catch(error => console.error('Chyba při ukládání auta:', error));
});
```

### Mazání záznamu

```javascript
function deleteCar(id) {
  if (confirm('Opravdu chcete smazat toto auto?')) {
    fetch(`/api/cars/${id}`, {
      method: 'DELETE'
    })
      .then(() => loadCars())
      .catch(error => console.error('Chyba při mazání auta:', error));
  }
}
```

## Responzivní design

Aplikace je optimalizována pro různé velikosti obrazovek pomocí media queries:

```css
@media (max-width: 768px) {
  body {
    padding: 10px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  table {
    display: block;
    overflow-x: auto;
  }
  
  nav ul {
    flex-direction: column;
  }
}
```