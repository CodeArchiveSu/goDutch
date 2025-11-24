## Go Dutch

![easyme](https://i.imgur.com/ZY3w4pH.png)   

## What is GoDutch?
- **go Dutch** is a handy tool designed to **<u>simplify the management of shared expenses</u>** whether it's for household costs in a flatshare or expenses incurred during trips with friends. 
- The app allows users to **<u>easily track and split costs among groups</u>** , ensuring everyone pays their fair share.
-  It also provides a clear **<u>overview of how much you owe and how much you're owed, all in one place.</u>**

## 🚀 Quick Start
Follow the steps below to run **goDutch** locally.

### 1. Clone the repository

```bash
git clone https://github.com/CodeArchiveSu/goDutch.git
cd goDutch
``` 

### 2.Install dependencies

**Install client dependencies**

```
cd client
npm install
```
**Install server dependencies**

```
cd ../server
npm install
```

### 3. Create environment variables

**🟦 Client .env file**

Create a file at:
```
client/.env
```

Add the following:
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_API_KEY_LOCATION=<YOUR_IP_GEOLOCATION_API_KEY>
```

**🟥 Server .env file**

Create a file at:
```
server/.env
```

Add your MongoDB connection details:
```
MONGO_DB=mongodb+srv://<username>:<password>@cluster0.mongodb.net/goDutch
PORT=5001
```

### 4. Start the development servers

**Run Backend**

```
cd server
npx nodemon server.js
```

**Run Frontend**

```
cd ../client
npm start
```

### 5. Open in browser

The app will be available at:

```
👉 http://localhost:3000
```

Backend API runs at:
```
👉 http://localhost:5001
```





## 🛠 Features
- **View Total Amount Owed and Amount Owed to the User**

| <img src="https://i.imgur.com/nb7F09X.gif" width="300" /> |
| --- |

- **Create New Groups and Add Members Using Their Email Addresses**

| <img src="https://i.imgur.com/VFEylwm.gif" width="300" /> |<img src="https://imgur.com/ePyR6gj.gif" width="300" /> |
| --- | --- |


- **Split costs equally or based on usage between users.**

| <img src="https://imgur.com/SMhUMWs.gif" width="300" /> |<img src="https://imgur.com/mtxpqKf.gif" width="300" /> |
| --- | --- |


## Technologies Used

 

- Frontend

  - React (with TypeScript)
  - Redux Toolkit (for state management)
  - React Framer(for UI animation)

- Backend:
  - Node.js (with TypeScript)
  - Express.js (RESTful API)
  - MongoDB (database)
  - Multer (for handling file uploads)
  - Cloudinary (for image hosting)
  - JWT (JSON Web Token)
  - Passport.js (for authentication)
  - bcrypt (for hashing passwords)




