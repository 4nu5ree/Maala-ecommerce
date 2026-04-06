# MAALA - Luxury Women's Accessories (Academic Project)

## About
This is a **college/academic project** demonstrating a full-stack e-commerce website for luxury women's accessories. It's a learning project, not a production-ready application.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL

##  Features
- User login/register (admin & regular user)
- Add/Edit/Delete products (admin only)
- View products and categories
- Responsive design

##  Test Credentials
| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| User | `user` | `user123` |

##  Run Locally

### 1. Setup Database
```sql
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock INT DEFAULT 0
);

```
### 2.Install & Run Backend

cd ecommerce-project/backend
npm install
node server.js

### 3. Open Frontend
Open ecommerce-project/frontend/index.html in browser



## Add to your repo:

```bash
echo "# MAALA - Academic Project" > README.md
# Then copy the content above and paste

git add README.md
git commit -m "Add README for academic project"
git push origin userAdd
```

Author
4nu5ree - Academic Project Submission
