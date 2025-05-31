# 🏠 Rentohome — Real Estate Rental Platform

**Diploma Project** for Rīgas Valsts Tehnikums, Datorikas nodaļa  
Izstrādāts: 2025

---

## 📖 Overview

Rentohome ir pilnvērtīga nekustamo īpašumu īres un izīrēšanas platforma, kas radīta, lai:

- Īpašniekiem ļautu ērti publicēt un pārvaldīt savus nekustamos īpašumus ar fotoattēliem, aprakstiem un cenām.
- Īrniekiem nodrošinātu jaudīgu meklēšanas un filtrēšanas sistēmu dažādiem kritērijiem (cena, lielums, atrašanās vieta, klase).
- Veiktu automatizētu īres līgumu izveidi un drošus maksājumus.
- Piedāvātu sociālās funkcijas: komentārus, “patīk” sistēmu un 2-faktoru autentifikāciju.
- Sniedz administratoram pilnīgu administrēšanas paneli, kurā var pārvaldīt lietotājus un visas īres sludinājumu.

---

## 🚀 Tehnoloģijas

| Slānis         | Tehnoloģija            |
| -------------- | ---------------------- |
| **Front-end**  | React, TypeScript, Tailwind CSS, React Hook Form, Zustand |
| **Back-end**   | Node.js, Express, TypeScript, MySQL2, Bcrypt, Multer, JWT |
| **DB**         | MySQL (InnoDB, UTF8)   |
| **Autent.**    | JWT + HTTP-Only cookies|
| **CI / Dev**   | nodemon, ESLint, Prettier |

---

## ⚙️ Funkcionalitāte

1. **Reģistrācija / Pieslēgšanās**  
   – E-pasta verifikācija, parole šifrēta ar Bcrypt, 2-faktoru opcija.

2. **Profils**  
   – Lietotāja dati: vārds, e-pasts, parole, profila attēls (avatar).  
   – Paroles maiņa ar tiešsaistes drošības padomiem.

3. **Īres objekti (Homes)**  
   – CRUD operācijas saviem sludinājumiem.  
   – Attēlu galerija, cena, platība, tips, klase, valsts, apraksts.

4. **Meklēšana un filtrēšana**  
   – Brīvteksta meklēšana, cenu diapazons, tips, valsts, klase.

5. **Sociālās funkcijas**  
   – “Patīk” (likes) ar trigeriem un skaitītājiem.  
   – Komentāru sistēma uz katru sludinājumu.

6. **Admin Panel**  
   – Pilna lietotāju un sludinājumu pārvaldība.  
   – Lietotāju atjaunošana (email, username, parole, avatar), dzēšana.  
   – Sludinājumu dzēšana un pārskatīšana.

---

# 🏠 Rentohome — Local Development Setup

---

## 🔧 Prerequisites

1. **Node.js & npm**  
   Install from [nodejs.org](https://nodejs.org) (v16+ recommended).

2. **MySQL**  
   Install MySQL Community Server. Ensure you have a user with privileges to create databases.

3. **Git**  
   To clone the repository.

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/Sssashko/RentoHome3.git
cd rentohome
````

---

## ⚙️ 2. Environment Variables

### 2.1 Server (`/server/.env`)

Create a file at `server/.env` with:

```ini
PORT=4000
SERVER_URL=http://localhost:4000
CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=rentohome

JWT_SECRET=your_jwt_secret_here

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_smtp_app_password
```

> 🔑 **Replace** `YOUR_DB_PASSWORD`, and SMTP settings with your own values.

### 2.2 Client (`/client/.env`)

Create a file at `client/.env` with:

```ini
VITE_PORT=3000
VITE_SERVER_URL=http://localhost:4000
```

> If you’re using Create React App instead of Vite, name it `.env.local` and prefix with `REACT_APP_` instead of `VITE_`.

---

## 🗄️ 3. Database Initialization

1. **Start MySQL** and log in:

   ```bash
   mysql -u root -p
   ```

2. **Create database & schema**:

   ```sql
   CREATE DATABASE IF NOT EXISTS rentohome
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci;
   USE rentohome;
   SOURCE ./server/database/schema.sql;
   EXIT;
   ```

> The file `server/database/schema.sql` contains all `CREATE TABLE` statements with `ON DELETE CASCADE`.

---

## 📦 4. Install Dependencies

Open two terminals.

### Terminal A: Server

```bash
cd server
npm install
```

### Terminal B: Client

```bash
cd client
npm install
```

---

## 🚀 5. Run in Development

### Server

```bash
# in terminal A
cd server
npm run dev          # starts Express on port 4000 with nodemon
```

### Client

```bash
# in terminal B
cd client
npm run dev          # starts React on port 3000
```

---

## 🌐 6. Access the App

* **Frontend** → [http://localhost:3000](http://localhost:3000)
* **API Health Check** → [http://localhost:4000/health](http://localhost:4000/health)

---

## 📝 Tips & Troubleshooting

* **SMTP**: For email verification you must use app-passwords (Gmail) or valid SMTP credentials.

---

You’re now ready to develop and test **Rentohome** locally! 🎉

````markdown
# 🚀 Quick Docker Setup for Rentohome

These steps let anyone clone the repo and run MySQL + Express + React with a single command—no local Node/MySQL needed.

---

## 1. Prerequisites

- **Docker & Docker Compose** installed and running.  
  - Download Docker Desktop for your OS: https://www.docker.com/get-started

---

## 2. Clone Repo

```bash
git clone https://github.com/YourUsername/RentoHome3.git
cd RentoHome3
````

---

## 3. Run with Docker Compose

From the project root (where `docker-compose.yml` lives), simply run:

```bash
docker-compose up --build
```

* This builds three services:

  1. **MySQL** → database on host port 3307.
  2. **Backend** (Express + TS) → listens on host port 4000.
  3. **Frontend** (React + Vite) → listens on host port 3000.

---

## 4. Verify

* **Frontend**: open [http://localhost:3000](http://localhost:3000)
* **Backend health**: open [http://localhost:4000/health](http://localhost:4000/health) (should return `{"status":"OK"}`)
* **MySQL** (if needed): connect on `127.0.0.1:3307` with user `root` / `root_pass`.

---

## 5. Stop & Clean Up

```bash
# Stop all containers and networks
docker-compose down

# (Optional) Also delete the MySQL data volume:
docker-compose down -v
```

---

That’s it—your friend can now just clone and run `docker-compose up --build` to launch Rentohome! 🎉

```
```

