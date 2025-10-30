# LinkedIn-Lite 🧑‍💼

A minimal full-stack LinkedIn clone built using **MERN + Vite + TailwindCSS**.  
Users can register, log in, create posts, like, comment, and view their own profiles — all with a clean and responsive UI.

---

## 🚀 Live Links

- **Frontend (Netlify):** [https://delightful-mooncake-eabc5a.netlify.app](https://delightful-mooncake-eabc5a.netlify.app)
- **Backend (Render):** [https://linkedin-clone-pkxc.onrender.com](https://linkedin-clone-pkxc.onrender.com)
- **GitHub Repo:** [https://github.com/GEEGEEGOOGOO/linkedin-clone](https://github.com/GEEGEEGOOGOO/linkedin-clone)

---

## 🧩 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS + dotenv

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repo
```bash
git clone https://github.com/GEEGEEGOOGOO/linkedin-clone.git
cd linkedin-clone
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
### Create .env inside /backend:
```bash
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_secret_key
```
### Run Server: 
```bash
npm start
Backend runs on: http://localhost:5000
```
 
### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
### Create .env inside /frontend:
```bash
VITE_API_URL=http://localhost:5000
```
### Run Frontend:
```bash
npm run dev
Frontend runs on: http://localhost:5173
```

### 👨‍💻 Author
```bash
Shashank Kumar (LinkedIn-Lite)
```

