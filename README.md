# 🌟 goDutch — Shared Expense Manager

goDutch is a smart and intuitive full-stack application designed to help groups **track, split, and settle shared expenses easily** — whether it's for trips, flatshares, events, or daily shared costs.


## 📖 Contents  
- [What is goDutch?](#-what-is-godutch)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Architecture](#-architecture)  
- [Folder Structure](#-folder-structure)  
- [Quick Start](#-quick-start)  
- [Environment Variables](#%EF%B8%8F-environment-variables)  
- [API Endpoints](#-api-endpoints)  
- [Future Improvements](#-future-improvements)  
- [Contributing](#-contributing)  

## ❓ What is goDutch?

- **go Dutch** simplifies the management of shared expenses.
- Easily **track and split costs among groups** such as roommates, travel friends, or project teams.
- Provides a clear **overview of what you owe and what others owe you** — all in one place.


## 🛠 Features


- **View total amount owed and amount owed to you**

| <img src="https://i.imgur.com/nb7F09X.gif" width="300" /> |
| --- |

- **Create and join groups**

| <img src="https://i.imgur.com/VFEylwm.gif" width="300" /> |<img src="https://imgur.com/ePyR6gj.gif" width="300" /> |
| --- | --- |


- **Add bills and split expenses**

| <img src="https://imgur.com/SMhUMWs.gif" width="300" /> |<img src="https://imgur.com/mtxpqKf.gif" width="300" /> |
| --- | --- |


- **View user details and balances**
- **Location-based currency detection**
- **Cloudinary image upload**
- **JWT-based authentication**



## 🧰 Tech Stack

### **Frontend**
- React  
- TypeScript  
- Redux Toolkit  
- React Router  

### **Backend**
- Node.js  
- Express  
- MongoDB / Mongoose  
- Passport + JWT
- bcrypt (for hashing passwords)
- Multer (for handling file uploads)


### **External APIs / Services**
- Cloudinary  
- ipgeolocation API  
- MongoDB Atlas


## 🏛 Architecture

```
Client (React + TypeScript)
        ↓
Server (Node.js + Express)
        ↓
MongoDB Atlas (Database)

Authentication: JWT
File Uploads: Cloudinary
Location API: ipgeolocation.io
```

## 📂 Folder Structure

```
goDutch/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── functions/
│   │   ├── utils/
│   │   ├── @types/
│   │   ├── react-app-env.d.ts
│   │   └── App.tsx
│   └── package.json
│
└── server/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── index.js
    └── package.json
```



## 🚀 Quick Start

Follow the steps below to run **goDutch** locally.


### 1. Clone the repository

```bash
git clone https://github.com/CodeArchiveSu/goDutch.git
cd goDutch
```

### 2. Install dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```



### 3. Set up environment variables

#### 🟦 Client `.env`

Create:

```
client/.env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5001
REACT_APP_API_KEY_LOCATION=<YOUR_IP_GEO_KEY>
```



#### 🟥 Server `.env`

Create:

```
server/.env
```

Add:

```env
MONGO_DB=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/goDutch
PORT=5001

```


### 4. Start the development servers

#### Backend
```bash
cd server
npx nodemon server.js
```

#### Frontend
```bash
cd ../client
npm start
```

Open the frontend:  
👉 http://localhost:3000



## 🔗 API Endpoints

### **Auth**
```
POST /api/users/signup
POST /api/users/login
POST /api/updateUser
GET  /api/users/profile
GET  /api/users/findUser/:email

```

### **Groups**
```
POST /api/groups/newGroup
GET  /api/groups/allGroups
GET  /api/groups/:userID
GET  /api/groups/detail/:groupID

```

### **Bills**
```
POST /api/bills/addNewBills
GET  /api/bills/laodBills/:group_id
```


## 🚧 Future Improvements

- Add settlement feature for balance clearing  
- Real-time updates via WebSockets  
- Push Notifications  
- Multi-language support  
- Add PWA mode  



## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.



## 📄 License
This project is licensed under the MIT License.

 






