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

## 📂 Projekta struktūra

