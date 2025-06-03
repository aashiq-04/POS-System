# 🛒 POS System 

A full-stack Point of Sale (POS) system, built with **Spring Boot** (backend) and **React** (frontend). It helps shop owners manage products, generate bills, and keep records efficiently.

---

## 📂 Project Structure

```
POS/
├── POS-System/        # Spring Boot backend
├── frontend/          # React frontend
└── README.md
```

---

## 🧰 Git Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aashiq-04/pos-system.git
cd pos-system
```


## 🚀 Running the Project

### Backend (Spring Boot)

```bash
cd POS-System
./mvnw spring-boot:run
```

> Make sure PostgreSQL is running and configured in `application.properties`.

### Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

---

## 💡 Features

### ✅ Backend (Spring Boot)
- REST APIs for product and billing operations
- PostgreSQL database integration
- DTOs for clean and structured responses
- Modular code structure with Maven

### ✅ Frontend (React)
- Product listing and billing pages
- Intuitive and responsive UI
- Admin interface (in progress)
- Axios for API communication

---

## 🔄 Git Commands for Development

```bash
# Stage changes
git add .

# Commit with a message
git commit -m "Your message"

# Push to remote
git push origin main
```

---

## 📈 Future Enhancements

- Add user login & roles
- Export printable bills (PDF)
- Inventory alerts and low-stock warnings
- Sales analytics dashboard

---

## 👨‍💻 Author

**Mohammed Aashiq S.**  
AI & Software Developer | Final Year CS Student

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
