document.addEventListener('DOMContentLoaded', () => {
  // Přidání ikon k tlačítkům
  function addIconsToButtons() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.innerHTML = `<i class="fas fa-edit"></i> Upravit`;
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.innerHTML = `<i class="fas fa-trash-alt"></i> Smazat`;
    });
    
    document.querySelectorAll('button[type="submit"]').forEach(btn => {
      btn.innerHTML = `<i class="fas fa-save"></i> Uložit`;
    });
    
    document.querySelectorAll('#car-cancel, #customer-cancel, #rental-cancel').forEach(btn => {
      btn.innerHTML = `<i class="fas fa-times"></i> Zrušit`;
    });
  }

  // Upravená funkce loadCars
  function loadCars() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(cars => {
        carsTableBody.innerHTML = '';
        cars.forEach(car => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${car.id}"></button>
              <button class="action-btn delete-btn" data-id="${car.id}"></button>
            </td>
          `;
          carsTableBody.appendChild(row);
        });

        // Přidání event listenerů pro tlačítka
        document.querySelectorAll('#cars-table .edit-btn').forEach(btn => {
          btn.addEventListener('click', () => editCar(btn.getAttribute('data-id')));
        });
        document.querySelectorAll('#cars-table .delete-btn').forEach(btn => {
          btn.addEventListener('click', () => deleteCar(btn.getAttribute('data-id')));
        });
        
        addIconsToButtons();
      })
      .catch(error => {
        console.error('Chyba při načítání aut:', error);
        showErrorMessage('Nepodařilo se načíst auta');
      });
  }

  // Podobně upravit loadCustomers a loadRentals...

  // Přidat funkci pro zobrazení chybových hlášek
  function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.backgroundColor = '#f8d7da';
    errorDiv.style.color = '#721c24';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.marginBottom = '15px';
    
    // Vložit na začátek aktivní sekce
    const activeSection = document.querySelector('.section.active');
    activeSection.insertBefore(errorDiv, activeSection.firstChild);
    
    // Automaticky odstranit po 5 sekundách
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  // Navigace mezi sekcemi
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      
      // Aktivace správné sekce
      sections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(targetSection).classList.add('active');
      
      // Aktivace správného odkazu
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
    });
  });

  // Správa aut
  const carForm = document.getElementById('car-form');
  const carIdInput = document.getElementById('car-id');
  const carMakeInput = document.getElementById('car-make');
  const carModelInput = document.getElementById('car-model');
  const carCancelBtn = document.getElementById('car-cancel');
  const carsTableBody = document.querySelector('#cars-table tbody');

  // Načtení aut
  function loadCars() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(cars => {
        carsTableBody.innerHTML = '';
        cars.forEach(car => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${car.id}">Upravit</button>
              <button class="action-btn delete-btn" data-id="${car.id}">Smazat</button>
            </td>
          `;
          carsTableBody.appendChild(row);
        });

        // Přidání event listenerů pro tlačítka
        document.querySelectorAll('#cars-table .edit-btn').forEach(btn => {
          btn.addEventListener('click', () => editCar(btn.getAttribute('data-id')));
        });
        document.querySelectorAll('#cars-table .delete-btn').forEach(btn => {
          btn.addEventListener('click', () => deleteCar(btn.getAttribute('data-id')));
        });
      })
      .catch(error => console.error('Chyba při načítání aut:', error));
  }

  // Přidání/úprava auta
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

  // Úprava auta
  function editCar(id) {
    fetch(`/api/cars/${id}`)
      .then(response => response.json())
      .then(car => {
        carIdInput.value = car.id;
        carMakeInput.value = car.make;
        carModelInput.value = car.model;
      })
      .catch(error => console.error('Chyba při načítání auta:', error));
  }

  // Smazání auta
  function deleteCar(id) {
    if (confirm('Opravdu chcete smazat toto auto?')) {
      fetch(`/api/cars/${id}`, {
        method: 'DELETE'
      })
        .then(() => loadCars())
        .catch(error => console.error('Chyba při mazání auta:', error));
    }
  }

  // Reset formuláře pro auto
  function resetCarForm() {
    carIdInput.value = '';
    carMakeInput.value = '';
    carModelInput.value = '';
  }

  carCancelBtn.addEventListener('click', resetCarForm);

  // Správa zákazníků
  const customerForm = document.getElementById('customer-form');
  const customerIdInput = document.getElementById('customer-id');
  const customerFirstnameInput = document.getElementById('customer-firstname');
  const customerLastnameInput = document.getElementById('customer-lastname');
  const customerLicenseInput = document.getElementById('customer-license');
  const customerCancelBtn = document.getElementById('customer-cancel');
  const customersTableBody = document.querySelector('#customers-table tbody');

  // Načtení zákazníků
  function loadCustomers() {
    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => {
        customersTableBody.innerHTML = '';
        customers.forEach(customer => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstname}</td>
            <td>${customer.lastname}</td>
            <td>${customer.driver_license}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${customer.id}">Upravit</button>
              <button class="action-btn delete-btn" data-id="${customer.id}">Smazat</button>
            </td>
          `;
          customersTableBody.appendChild(row);
        });

        // Přidání event listenerů pro tlačítka
        document.querySelectorAll('#customers-table .edit-btn').forEach(btn => {
          btn.addEventListener('click', () => editCustomer(btn.getAttribute('data-id')));
        });
        document.querySelectorAll('#customers-table .delete-btn').forEach(btn => {
          btn.addEventListener('click', () => deleteCustomer(btn.getAttribute('data-id')));
        });
      })
      .catch(error => console.error('Chyba při načítání zákazníků:', error));
  }

  // Přidání/úprava zákazníka
  customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const customerData = {
      firstname: customerFirstnameInput.value,
      lastname: customerLastnameInput.value,
      driver_license: customerLicenseInput.value
    };

    const method = customerIdInput.value ? 'PUT' : 'POST';
    const url = customerIdInput.value ? `/api/customers/${customerIdInput.value}` : '/api/customers';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    })
      .then(response => response.json())
      .then(() => {
        resetCustomerForm();
        loadCustomers();
      })
      .catch(error => console.error('Chyba při ukládání zákazníka:', error));
  });

  // Úprava zákazníka
  function editCustomer(id) {
    fetch(`/api/customers/${id}`)
      .then(response => response.json())
      .then(customer => {
        customerIdInput.value = customer.id;
        customerFirstnameInput.value = customer.firstname;
        customerLastnameInput.value = customer.lastname;
        customerLicenseInput.value = customer.driver_license;
      })
      .catch(error => console.error('Chyba při načítání zákazníka:', error));
  }

  // Smazání zákazníka
  function deleteCustomer(id) {
    if (confirm('Opravdu chcete smazat tohoto zákazníka?')) {
      fetch(`/api/customers/${id}`, {
        method: 'DELETE'
      })
        .then(() => loadCustomers())
        .catch(error => console.error('Chyba při mazání zákazníka:', error));
    }
  }

  // Reset formuláře pro zákazníka
  function resetCustomerForm() {
    customerIdInput.value = '';
    customerFirstnameInput.value = '';
    customerLastnameInput.value = '';
    customerLicenseInput.value = '';
  }

  customerCancelBtn.addEventListener('click', resetCustomerForm);

  // Správa výpůjček
  const rentalForm = document.getElementById('rental-form');
  const rentalIdInput = document.getElementById('rental-id');
  const rentalCarSelect = document.getElementById('rental-car');
  const rentalCustomerSelect = document.getElementById('rental-customer');
  const rentalDateInput = document.getElementById('rental-date');
  const returnDateInput = document.getElementById('return-date');
  const rentalCancelBtn = document.getElementById('rental-cancel');
  const rentalsTableBody = document.querySelector('#rentals-table tbody');

  // Načtení výpůjček
  function loadRentals() {
    fetch('/api/rentals')
      .then(response => response.json())
      .then(rentals => {
        rentalsTableBody.innerHTML = '';
        rentals.forEach(rental => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${rental.id}</td>
            <td>${rental.make} ${rental.model}</td>
            <td>${rental.firstname} ${rental.lastname}</td>
            <td>${formatDate(rental.rental_date)}</td>
            <td>${formatDate(rental.return_date)}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${rental.id}">Upravit</button>
              <button class="action-btn delete-btn" data-id="${rental.id}">Smazat</button>
            </td>
          `;
          rentalsTableBody.appendChild(row);
        });

        // Přidání event listenerů pro tlačítka
        document.querySelectorAll('#rentals-table .edit-btn').forEach(btn => {
          btn.addEventListener('click', () => editRental(btn.getAttribute('data-id')));
        });
        document.querySelectorAll('#rentals-table .delete-btn').forEach(btn => {
          btn.addEventListener('click', () => deleteRental(btn.getAttribute('data-id')));
        });
      })
      .catch(error => console.error('Chyba při načítání výpůjček:', error));
  }

  // Načtení aut do select boxu
  function loadCarsForSelect() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(cars => {
        rentalCarSelect.innerHTML = '<option value="">Vyberte auto</option>';
        cars.forEach(car => {
          const option = document.createElement('option');
          option.value = car.id;
          option.textContent = `${car.make} ${car.model}`;
          rentalCarSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Chyba při načítání aut:', error));
  }

  // Načtení zákazníků do select boxu
  function loadCustomersForSelect() {
    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => {
        rentalCustomerSelect.innerHTML = '<option value="">Vyberte zákazníka</option>';
        customers.forEach(customer => {
          const option = document.createElement('option');
          option.value = customer.id;
          option.textContent = `${customer.firstname} ${customer.lastname}`;
          rentalCustomerSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Chyba při načítání zákazníků:', error));
  }

  // Přidání/úprava výpůjčky
  rentalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rentalData = {
      car_id: rentalCarSelect.value,
      customer_id: rentalCustomerSelect.value,
      rental_date: rentalDateInput.value,
      return_date: returnDateInput.value
    };

    const method = rentalIdInput.value ? 'PUT' : 'POST';
    const url = rentalIdInput.value ? `/api/rentals/${rentalIdInput.value}` : '/api/rentals';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rentalData)
    })
      .then(response => response.json())
      .then(() => {
        resetRentalForm();
        loadRentals();
      })
      .catch(error => console.error('Chyba při ukládání výpůjčky:', error));
  });

  // Úprava výpůjčky
  function editRental(id) {
    fetch(`/api/rentals/${id}`)
      .then(response => response.json())
      .then(rental => {
        rentalIdInput.value = rental.id;
        rentalCarSelect.value = rental.car_id;
        rentalCustomerSelect.value = rental.customer_id;
        rentalDateInput.value = formatDateForInput(rental.rental_date);
        returnDateInput.value = formatDateForInput(rental.return_date);
      })
      .catch(error => console.error('Chyba při načítání výpůjčky:', error));
  }

  // Smazání výpůjčky
  function deleteRental(id) {
    if (confirm('Opravdu chcete smazat tuto výpůjčku?')) {
      fetch(`/api/rentals/${id}`, {
        method: 'DELETE'
      })
        .then(() => loadRentals())
        .catch(error => console.error('Chyba při mazání výpůjčky:', error));
    }
  }

  // Reset formuláře pro výpůjčku
  function resetRentalForm() {
    rentalIdInput.value = '';
    rentalCarSelect.value = '';
    rentalCustomerSelect.value = '';
    rentalDateInput.value = '';
    returnDateInput.value = '';
  }

  rentalCancelBtn.addEventListener('click', resetRentalForm);

  // Pomocné funkce pro formátování data
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ');
  }

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // Načtení dat při startu aplikace
  loadCars();
  loadCustomers();
  loadRentals();
  loadCarsForSelect();
  loadCustomersForSelect();
  addIconsToButtons();
});
