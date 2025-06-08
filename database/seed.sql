-- Vložení ukázkových aut
INSERT INTO cars (make, model) VALUES 
  ('Toyota', 'Corolla'),
  ('Honda', 'Civic'),
  ('Ford', 'Focus'),
  ('Volkswagen', 'Golf'),
  ('Škoda', 'Octavia');

-- Vložení ukázkových zákazníků
INSERT INTO customers (firstname, lastname, driver_license) VALUES 
  ('Jan', 'Novák', 'AB123456'),
  ('Marie', 'Svobodová', 'CD789012'),
  ('Petr', 'Dvořák', 'EF345678'),
  ('Lucie', 'Černá', 'GH901234');

-- Vložení ukázkových výpůjček
INSERT INTO rentals (car_id, customer_id, rental_date, return_date) VALUES 
  (1, 1, '2023-05-01', '2023-05-05'),
  (2, 2, '2023-05-10', '2023-05-15'),
  (3, 3, '2023-05-20', '2023-05-25');
