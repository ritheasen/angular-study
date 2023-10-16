const mysql = require('mysql');
const express = require('express');

const app = express();
const port = 8080;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());

// Perform database operations here

// create a new database name employee
// connection.query('CREATE DATABASE employee', (err, results) => {
//   if (err) {
//     console.error('Error creating database:', err);
//     return;
//   }
//   console.log('Database created successfully');
// });

// create table name employee_list with id name age city and role
// connection.query('CREATE TABLE employee_list(id int AUTO_INCREMENT,name VARCHAR(255),age int,city VARCHAR(255),role VARCHAR(255),PRIMARY KEY(id))', (err, results) => {
//   if (err) {
//     console.error('Error creating table:', err);
//     return;
//   }
//   console.log('Table created successfully');
// });

// insert data into table
// connection.query('INSERT INTO employee_list(name,age,city,role) VALUES("Rahul",25,"Delhi","Developer")', (err, results) => {
//   if (err) {
//     console.error('Error inserting data:', err);
//     return;
//   }
//   console.log('Data inserted successfully');
// })

app.post('/create-employee', (req, res) => {
  const { name, age, city, role } = req.body;

  if (!name || !age || !city || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const insertQuery = `INSERT INTO employee_list(name, age, city, role) VALUES (?, ?, ?, ?)`;
  const values = [name, age, city, role];

  // Execute the SQL query to insert data
  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to insert data' });
    }

    res.status(200).json({ 
      message: 'Data inserted successfully',
      id: results.insertId,
      data: values
   });
  });
});

app.delete('/delete-employee/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID parameter' });
  }

  const deleteQuery = `DELETE FROM employee_list WHERE id = ?`;

  // Execute the SQL query to delete data by ID
  connection.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Failed to delete data' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    console.log('Data deleted successfully');
    res.status(200).json({ 
      message: 'Data deleted successfully' ,
    });
  });
});

// Define a PUT route for updating data by ID
app.put('/update-employee/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, city, role } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID parameter' });
  }

  if (!name || !age || !city || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updateQuery = `
    UPDATE employee_list
    SET name = ?, age = ?, city = ?, role = ?
    WHERE id = ?
  `;

  const values = [name, age, city, role, id]

  // Execute the SQL query to update data by ID
  connection.query(updateQuery,values, (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Failed to update data' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    console.log('Data updated successfully');
    res.status(200).json({ 
      message: 'Data updated successfully',
      data: values });
  });
});

// Define a GET route to retrieve all data
app.get('/all-employee', (req, res) => {
  const selectAllQuery = 'SELECT * FROM employee_list';

  // Execute the SQL query to retrieve all data
  connection.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }

    console.log('Data retrieved successfully');
    res.status(200).json(results); // Send the retrieved data as JSON
  });
});

// Define a GET route to retrieve an employee by ID
app.get('/employee/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID parameter' });
  }

  const selectEmployeeQuery = 'SELECT * FROM employee_list WHERE id = ?';

  // Execute the SQL query to retrieve the employee by ID
  connection.query(selectEmployeeQuery, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving employee data:', err);
      return res.status(500).json({ error: 'Failed to retrieve employee data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    console.log('Employee data retrieved successfully');
    res.status(200).json(results[0]); // Send the retrieved employee data as JSON
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});