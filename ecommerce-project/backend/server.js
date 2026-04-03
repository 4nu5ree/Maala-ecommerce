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

app.post("/products", (req, res) => {
  const { name, price, category, stock } = req.body;
  db.query(
    "INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)",
    [name, price, category, stock],
    (err, result) => res.send(result)
  );
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