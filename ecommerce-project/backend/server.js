const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "ecom_user",
  password: "1234", 
  database: "ecommerce_db"
});

db.connect((err) => {
  if (err) {
    console.log("Connection failed ❌", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.send(result);
  });
});

app.get("/products/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});


app.post("/products", (req, res) => {
  const { name, price, category, stock } = req.body;
  db.query(
    "INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)",
    [name, price, category, stock],
    (err, result) => res.send(result)
  );
});


// ============ USER ENDPOINTS ============

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  db.query(
    "SELECT id, username, name, role FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (result.length === 0) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
      
      res.json(result[0]);
    }
  );
});

// Register endpoint
app.post("/register", (req, res) => {
  const { username, password, name, role } = req.body;
  
  // Check if user already exists
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (result.length > 0) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }
    
    // Insert new user
    db.query(
      "INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)",
      [username, password, name, role || 'user'],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        res.json({ 
          id: result.insertId, 
          username, 
          name, 
          role: role || 'user' 
        });
      }
    );
  });
});


app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err, result) => {
    res.send(result);
  });
});

app.put("/products/:id", (req, res) => {
  const { name, price, category, stock } = req.body;

  const sql = "UPDATE products SET name=?, price=?, category=?, stock=? WHERE id=?";

  db.query(sql, [name, price, category, stock, req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error updating");
    } else {
      res.send("Updated successfully");
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001 🚀");
});