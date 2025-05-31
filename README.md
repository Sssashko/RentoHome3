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

# 🚀 Quick Start: Run RentoHome via Docker

This guide shows how anyone can clone the repository from GitHub and launch the entire stack (MySQL, Backend, Frontend) with Docker. Environment files (`.env`) are **not** included in the repo; you must create them before starting.

---

## 🐳 Prerequisites

1. **Install Docker & Docker Compose**  
   - Download and install Docker Desktop (which includes Docker Compose) from  
     [https://www.docker.com/get-started](https://www.docker.com/get-started).  
   - Verify installation:

   ```bash
   docker --version
   docker-compose --version


---

## 1. Clone the Repository

```bash
git clone https://github.com/Sssashko/RentoHome3.git
cd RentoHome3
```

---

## 2. Create Environment Files

### 2.1 Frontend (`/client/.env`)

Create `client/.env` and paste:

```ini
VITE_PORT=3000
VITE_SERVER_URL=http://localhost:4000
VITE_GOOGLE_AUTH=http://localhost:4000/auth/google
```

### 2.2 Backend (Local Dev) (`/server/.env`)

Create `server/.env` and paste:

```ini
PORT=4000

SERVER_URL=http://localhost:4000
CLIENT_URL=http://localhost:3000

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=prizma12
DATABASE_NAME=rentohome

GOOGLE_CLIENT_ID=843413896856-o3knsirjcfpun6imo8hldi7qlvvm02tl.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-bsYeLThmmnWj_w-808CWdiD-02d

JWT_SECRET=g)PZ%.Z]h757/X%%>P

# Email SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rentohomecontact@gmail.com
SMTP_PASS=iaze tjqk bsqe ksme
```

### 2.3 Backend (Docker) (`/server/.env.docker`)

Create `server/.env.docker` and paste:

```ini
# When running inside Docker, "mysql" resolves to the MySQL service
DATABASE_HOST=mysql
DATABASE_USER=root
DATABASE_PASSWORD=prizma12
DATABASE_NAME=rentohome

# Port Express listens on inside the container
PORT=4000

# For CORS in backend
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000

# OAuth / JWT / SMTP (same as local .env)
GOOGLE_CLIENT_ID=843413896856-o3knsirjcfpun6imo8hldi7qlvvm02tl.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-bsYeLThmmnWj_w-808CWdiD-02d

JWT_SECRET=g)PZ%.Z]h757/X%%>P

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rentohomecontact@gmail.com
SMTP_PASS=iaze tjqk bsqe ksme
```

---

## 3. Run Everything with Docker Compose

In the project root, run:

```bash
docker-compose up --build
```

This will start:

1. **MySQL** (host port 3307 → container 3306)
2. **Backend** (Express + TypeScript, port 4000)
3. **Frontend** (Vite React, port 3000)

> **Note:**
>
> * MySQL data is stored in a named volume `db_data`, so it persists after restarts.
> * If you already have MySQL on port 3306, the container’s port 3306 is mapped to your host’s port 3307.

---

## 4. Verify the Setup

1. **Frontend**
   Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the React application.

```markdown
2. **Backend Health Check**  
   Open [http://localhost:4000](http://localhost:4000).  
   Expected response:

```

Hello, world!

```
```


3. **MySQL (optional)**

   ```bash
   mysql -h 127.0.0.1 -P 3307 -u root -p
   # Enter password: root_pass
   SHOW DATABASES;  # "rentohome" should appear
   ```

---

## 5. Stop & Remove Containers

To stop and remove containers and networks, run:

```bash
docker-compose down
```

To also delete the MySQL data volume, add `-v`:

```bash
docker-compose down -v
```

---

**You’re all set!** 🎉 Now others can quickly launch RentoHome with a single `docker-compose` command. \`\`\`

