# 🚀 AI Resume Builder


<p align="center">
  <b>Create, manage, and share professional resumes with AI-powered assistance.</b>
</p>

---

# 📌 Overview

AI Resume Builder is a full-stack web application that allows users to create, edit, manage, and share resumes efficiently. The platform combines modern frontend technologies with a powerful Node.js backend and AI integration to help users generate high-quality resume content.

The application includes:

- 🔐 Secure authentication system
- 🤖 AI-assisted resume generation
- 📄 Resume creation and management
- ☁️ File uploads and storage
- 📤 Resume sharing and downloading
- 📱 Responsive UI for desktop and mobile devices

---

# ✨ Features

## 🔐 Authentication System
- User registration and login.
- Password encryption using **bcrypt**.
- JWT-based authentication.
- Secure cookie handling.
- Protected routes and middleware.

---

## 👤 User Management
- Create user accounts.
- Login and logout functionality.
- Store user profile information.
- Persistent authentication state.

---

## 📄 Resume Management
- Create new resumes.
- Edit existing resumes.
- Delete resumes.
- Store multiple resumes per user.
- Save resume information in MongoDB.

---

## 🤖 AI Resume Assistance
- AI-powered content generation.
- Generate professional summaries.
- Improve resume descriptions.
- Assist with skills and experience sections.
- Reduce manual writing effort.

---

## ☁️ File Upload Support
- Upload profile images and resume assets.
- Integration with ImageKit.
- Secure file handling using Multer.

---

## 📤 Resume Sharing & Export
- Share resume using generated links.
- Print and download resume.
- Public resume viewing support.

---

## 🎨 Modern User Interface
- Responsive design.
- Built with React and Tailwind CSS.
- Toast notifications.
- Reusable components.
- Fast navigation with React Router.

---

## ⚡ State Management
- Redux Toolkit for global state.
- Authentication state management.
- Efficient data flow.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| ⚛️ React 19 | User Interface |
| ⚡ Vite | Development & Build Tool |
| 🎨 Tailwind CSS | Styling |
| 🧭 React Router DOM | Routing |
| 📦 Redux Toolkit | State Management |
| 🔄 React Redux | Store Integration |
| 🌐 Axios | API Requests |
| 🔔 React Hot Toast | Notifications |
| 🎯 Lucide React | Icons |
| 🎨 React Icons | Additional Icons |

---

## Backend

| Technology | Purpose |
|------------|----------|
| 🟢 Node.js | Runtime Environment |
| 🚂 Express.js | Backend Framework |
| 🍃 MongoDB | Database |
| 🗄️ Mongoose | ODM |
| 🔑 JWT | Authentication |
| 🔒 bcrypt | Password Hashing |
| 🍪 Cookie Parser | Cookie Management |
| 🌍 CORS | Cross-Origin Requests |
| 📧 Nodemailer | Email Services |
| 📂 Multer | File Upload |
| ☁️ ImageKit | Media Storage |
| 🤖 OpenAI SDK | AI Features |

---


# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhishek140304/Resume-Builder.git
cd Resume-Builder
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
OPENAI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"
OPEN_AI_MODEL = "gemini-3.5-flash"

IMAGEKIT_PRIVATE_KEY=

EMAIL=
EMAIL_PASSWORD=

NODE_ENV='development'
CLIENT_URL=http://localhost:5173

```

---

## Frontend `.env`

```env
VITE_BASE_URL=http://localhost:5000
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd server
npm run server
```

or

```bash
npm start
```

---

## Start Frontend

```bash
cd client
npm run dev
```

---

# 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# 🔄 Application Flow

1. User registers or logs in.
2. JWT token is generated.
3. User creates or edits resumes.
4. Resume data is stored in MongoDB.
5. AI generates professional content.
6. User downloads or shares resume.

---


# 🚀 Future Improvements

- Multiple resume templates
- PDF export customization
- Dark mode
- Resume analytics
- Drag-and-drop sections
- ATS score checker
- Resume version history
- Multi-language support


---


# ⭐ Support

If you found this project useful:

🌟 Star the repository  
🍴 Fork the repository  
🛠️ Contribute to the project
