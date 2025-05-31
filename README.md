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


# 🚀 Quick Docker Setup for Rentohome

These steps let anyone clone the repo and run MySQL + Express + React with a single command—no local Node/MySQL needed.

## 1. Prerequisites

- **Docker & Docker Compose** installed and running.  
  - Download Docker Desktop for your OS: https://www.docker.com/get-started

---

## 2. Clone Repo

```bash
git clone https://github.com/Sssashko/RentoHome3.git
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

