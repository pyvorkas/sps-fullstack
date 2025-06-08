const express = require('express');
// Správný import db objektu
const { db } = require('../database/db');

const router = express.Router();

// CARS API
// List all cars
router.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a single car
router.get('/cars/:id', (req, res) => {
  db.get('SELECT * FROM cars WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Car not found' });
    res.json(row);
  });
});

// Create a new car
router.post('/cars', (req, res) => {
  const { make, model } = req.body;
  if (!make || !model) {
    return res.status(400).json({ error: 'Make and model are required' });
  }
  
  db.run('INSERT INTO cars (make, model) VALUES (?, ?)', [make, model], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, make, model });
  });
});

// Update a car
router.put('/cars/:id', (req, res) => {
  const { make, model } = req.body;
  if (!make || !model) {
    return res.status(400).json({ error: 'Make and model are required' });
  }
  
  db.run('UPDATE cars SET make = ?, model = ? WHERE id = ?', [make, model, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Car not found' });
    res.json({ id: req.params.id, make, model });
  });
});

// Delete a car
router.delete('/cars/:id', (req, res) => {
  db.run('DELETE FROM cars WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted' });
  });
});

// CUSTOMERS API
// List all customers
router.get('/customers', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a single customer
router.get('/customers/:id', (req, res) => {
  db.get('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Customer not found' });
    res.json(row);
  });
});

// Create a new customer
router.post('/customers', (req, res) => {
  const { firstname, lastname, driver_license } = req.body;
  if (!firstname || !lastname || !driver_license) {
    return res.status(400).json({ error: 'Firstname, lastname and driver_license are required' });
  }
  
  db.run('INSERT INTO customers (firstname, lastname, driver_license) VALUES (?, ?, ?)', 
    [firstname, lastname, driver_license], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, firstname, lastname, driver_license });
  });
});

// Update a customer
router.put('/customers/:id', (req, res) => {
  const { firstname, lastname, driver_license } = req.body;
  if (!firstname || !lastname || !driver_license) {
    return res.status(400).json({ error: 'Firstname, lastname and driver_license are required' });
  }
  
  db.run('UPDATE customers SET firstname = ?, lastname = ?, driver_license = ? WHERE id = ?', 
    [firstname, lastname, driver_license, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ id: req.params.id, firstname, lastname, driver_license });
  });
});

// Delete a customer
router.delete('/customers/:id', (req, res) => {
  db.run('DELETE FROM customers WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  });
});

// RENTALS API
// List all rentals
router.get('/rentals', (req, res) => {
  db.all(`
    SELECT r.id, r.rental_date, r.return_date, 
           c.id as car_id, c.make, c.model,
           cu.id as customer_id, cu.firstname, cu.lastname, cu.driver_license
    FROM rentals r
    JOIN cars c ON r.car_id = c.id
    JOIN customers cu ON r.customer_id = cu.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a single rental
router.get('/rentals/:id', (req, res) => {
  db.get(`
    SELECT r.id, r.rental_date, r.return_date, 
           c.id as car_id, c.make, c.model,
           cu.id as customer_id, cu.firstname, cu.lastname, cu.driver_license
    FROM rentals r
    JOIN cars c ON r.car_id = c.id
    JOIN customers cu ON r.customer_id = cu.id
    WHERE r.id = ?
  `, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Rental not found' });
    res.json(row);
  });
});

// Create a new rental
router.post('/rentals', (req, res) => {
  const { car_id, customer_id, rental_date, return_date } = req.body;
  if (!car_id || !customer_id || !rental_date || !return_date) {
    return res.status(400).json({ error: 'Car ID, customer ID, rental date and return date are required' });
  }
  
  db.run('INSERT INTO rentals (car_id, customer_id, rental_date, return_date) VALUES (?, ?, ?, ?)', 
    [car_id, customer_id, rental_date, return_date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ 
      id: this.lastID, 
      car_id, 
      customer_id, 
      rental_date, 
      return_date 
    });
  });
});

// Update a rental
router.put('/rentals/:id', (req, res) => {
  const { car_id, customer_id, rental_date, return_date } = req.body;
  if (!car_id || !customer_id || !rental_date || !return_date) {
    return res.status(400).json({ error: 'Car ID, customer ID, rental date and return date are required' });
  }
  
  db.run('UPDATE rentals SET car_id = ?, customer_id = ?, rental_date = ?, return_date = ? WHERE id = ?', 
    [car_id, customer_id, rental_date, return_date, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Rental not found' });
    res.json({ 
      id: req.params.id, 
      car_id, 
      customer_id, 
      rental_date, 
      return_date 
    });
  });
});

// Delete a rental
router.delete('/rentals/:id', (req, res) => {
  db.run('DELETE FROM rentals WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Rental not found' });
    res.json({ message: 'Rental deleted' });
  });
});

module.exports = router;
