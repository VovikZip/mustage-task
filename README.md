# 🧠 Mustage Task Manager

Це десктопний додаток для управління задачами, розроблений на стеку:

- **Frontend**: React + Vite + TailwindCSS + Electron
- **Backend**: Node.js + NestJS + PostgreSQL

---

## 🔁 Структура репозиторію

Проєкт розділений на **дві гілки**:
- `frontend` — інтерфейс користувача (React + Electron)
- `backend` — API сервер з Nest.js та PostgreSQL

---

## 🖥️ 1. Запуск фронтенду (гілка `frontend`)

### 1.1 Клонування гілки

```bash
git clone -b frontend https://github.com/ІМ'Я-КОРИСТУВАЧА/mustage-task.git mustage-task-frontend
cd mustage-task-frontend
```

### 1.2 Встановлення залежностей

```bash
npm install
```

### 1.3 Запуск у dev-режимі

```bash
npm run dev
```

Відкриється:
- локальний сервер Vite: http://localhost:5173
- Electron-додаток

### 1.4 Білд та упаковка

```bash
npm run dist:win
# або
npm run dist:mac
# або
npm run dist:linux
```

> Екзешник буде у `dist/`

---

## 🗄️ 2. Запуск бекенду (гілка `backend`)

### 2.1 Клонування гілки

```bash
git clone -b backend https://github.com/ІМ'Я-КОРИСТУВАЧА/mustage-task.git mustage-task-backend
cd mustage-task-backend
```

### 2.2 Встановлення залежностей

```bash
npm install
```

### 2.3 Налаштування бази даних PostgreSQL

#### 🔹 Встанови PostgreSQL

> Використай [PostgreSQL Installer](https://www.postgresql.org/download/) або Docker

#### 🔹 Створи `.env` файл у корені:

```
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/mustage
```

#### 🔹 Створи базу в PostgreSQL

```sql
CREATE DATABASE mustage;
```

#### 🔹 Якщо використовується Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 2.4 Запуск сервера

```bash
npm run start:dev
```

> Сервер запуститься на http://localhost:3000

---

## ✅ Перевірка

1. Переконайся, що бекенд працює: http://localhost:3000/api/tasks
2. Запусти фронтенд
3. Перевір, що завантажуються задачі

---

## 📂 Структура проєкту

```
- frontend/
  ├── src/
  ├── dist-react/
  └── electron/

- backend/
  ├── src/
  ├── prisma/
  └── .env
```

---

## 📄 Ліцензія

MIT © VovikZip
