Status Page Application
A fullstack web application that allows administrators to manage and update the status of services (e.g., AWS, APIs, Database), while customers can view real-time status and history.

Built with:

Backend: Node.js, Express, MongoDB

Frontend: Create React App + Tailwind CSS

✨ Features
👨‍💻 Admin

Register and login

Create, update, and delete services

Set status: Operational, Degraded Performance, Partial Outage, Major Outage

View status change history for each service

Real-time WebSocket updates

👤 Customer

Register and login

View current service statuses

View status change history

Receive real-time updates

🏗️ Folder Structure
status-page-app/
│
├── backend/
│ ├── package.json
│ ├── .env
│ └── src/
│ ├── index.js
│ ├── config/db.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Service.js
│ │ └── StatusHistory.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── serviceController.js
│ ├── middleware/auth.js
│ └── routes/
│ ├── auth.js
│ └── services.js
│
└── frontend/
└── my-app/
├── package.json
├── public/index.html
└── src/
├── index.js
├── App.js
├── socket.js
├── components/
│ ├── NavBar.js
│ └── ServiceCard.js
└── pages/
├── Login.js
├── Register.js
├── AdminDashboard.js
└── CustomerDashboard.js

⚙️ Backend Setup
Navigate to backend folder:

cd backend

Install dependencies:

npm install

Create .env file inside backend with the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/statusdb
JWT_SECRET=your_jwt_secret

Start backend:

npm run start or npm run start:dev

Backend runs at: http://localhost:5000

💻 Frontend Setup
Navigate to frontend folder:

cd frontend/my-app

Install dependencies:

npm install

Create .env file inside my-app with:

REACT_APP_API_BASE_URL=http://localhost:5000

Start frontend:

npm start

Frontend runs at: http://localhost:3000

🔗 Real-Time Updates
This app uses Socket.IO for real-time status updates. When an admin updates a service, all connected clients receive updates instantly.

📦 Dependencies
Backend:

express

mongoose

cors

dotenv

bcryptjs

jsonwebtoken

socket.io

Frontend:

react-router-dom

socket.io-client

tailwindcss (optional for styling)

🚀 Deployment
You can deploy:

Backend to Render, Railway, or your own VPS

Frontend to Vercel, Netlify, or GitHub Pages

Be sure to update REACT_APP_API_BASE_URL in your frontend .env to your deployed backend URL.
