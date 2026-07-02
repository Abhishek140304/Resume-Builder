# 🚀 AI Resume Builder

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)
![Redux](https://img.shields.io/badge/Redux_Toolkit-purple?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blue?logo=tailwindcss)

# 🤖 AI Resume Builder
### Create, manage, and share professional resumes with AI-powered assistance.

</div>

---

# 🌐 Live Demo

🚀 **Deployed Application**

```text
https://your-project-name.vercel.app
```

---

# 📖 Overview

AI Resume Builder is a modern full-stack web application that helps users create professional resumes quickly and efficiently with the help of Artificial Intelligence.

The platform provides:

- 🔐 Secure Authentication
- 🤖 AI-Powered Resume Writing
- 📄 Resume Creation & Management
- ☁️ Cloud Storage Integration
- 📤 Resume Sharing & Downloading
- 📱 Fully Responsive User Interface

The application is designed for students, job seekers, and professionals who want to build ATS-friendly resumes with minimal effort.

---

# ✨ Features

# 🔐 Authentication System

### User Registration
- Create an account securely.
- Email and password-based authentication.
- Validation for invalid credentials.

### User Login
- JWT-based authentication.
- Secure cookie handling.
- Persistent login sessions.

### Password Security
- Password hashing using bcrypt.
- Protected against plain-text password storage.

### Route Protection
- Middleware-based authorization.
- Private pages accessible only to authenticated users.

---

# 👤 User Management

### User Profiles
- Store personal information.
- Maintain authentication state.
- Easy login/logout functionality.

### Session Management
- Automatic authentication persistence.
- Secure session handling.

---

# 📄 Resume Management

### Create Resume
Users can:

✅ Create multiple resumes.

✅ Add personal information.

✅ Add education details.

✅ Add projects and experience.

✅ Add skills and certifications.

---

### Edit Resume
- Update resume information anytime.
- Modify sections independently.

---

### Delete Resume
- Remove unwanted resumes permanently.

---

### Multiple Resume Support
- Store multiple resumes under a single account.
- Manage resumes independently.

---

# 🤖 AI Resume Assistance

The application's biggest feature is AI-powered resume generation.

### AI Features

#### Professional Summary Generation
Generate impressive professional summaries instantly.

#### Experience Enhancement
Improve job descriptions using AI.

#### Skills Suggestions
Receive relevant skills based on your profile.

#### Content Optimization
Generate ATS-friendly content and professional wording.

#### Reduced Manual Effort
Create professional resumes in minutes instead of hours.

---

# ☁️ File Upload & Storage

### Image Upload Support
- Upload profile images.
- Upload resume assets.

### ImageKit Integration
- Secure cloud storage.
- Optimized image delivery.
- Fast loading.

### Multer Integration
- Secure file handling.
- Backend upload management.

---

# 📤 Resume Sharing & Export

### Share Resume
- Generate public links.
- Share resumes with recruiters.

### Public Resume Viewing
- Recruiters can access resumes directly.

### Download & Print
- Download resumes.
- Print directly from the browser.

---

# 🎨 Modern User Interface

### Responsive Design
- Desktop support.
- Tablet support.
- Mobile support.

### User Experience
- Beautiful UI with Tailwind CSS.
- Smooth navigation.
- Toast notifications.
- Modern icons.

---

# ⚡ State Management

### Redux Toolkit
- Centralized state management.
- Authentication state.
- Resume state management.
- Predictable data flow.

---

# 🛠️ Tech Stack

# 🎨 Frontend

| Technology | Purpose |
|------------|----------|
| ⚛️ React 19 | User Interface |
| ⚡ Vite | Development & Build Tool |
| 🎨 Tailwind CSS | Styling |
| 🧭 React Router DOM | Routing |
| 📦 Redux Toolkit | State Management |
| 🔄 React Redux | Redux Integration |
| 🌐 Axios | API Communication |
| 🔔 React Hot Toast | Notifications |
| 🎯 Lucide React | Icons |
| 🎨 React Icons | Additional Icons |

---

# 🖥️ Backend

| Technology | Purpose |
|------------|----------|
| 🟢 Node.js | Runtime Environment |
| 🚂 Express.js | Backend Framework |
| 🍃 MongoDB | Database |
| 🗄️ Mongoose | ODM |
| 🔑 JWT | Authentication |
| 🔒 bcrypt | Password Security |
| 🍪 Cookie Parser | Cookie Handling |
| 🌍 CORS | Cross-Origin Communication |
| 📧 Nodemailer | Email Services |
| 📂 Multer | File Upload |
| ☁️ ImageKit | Cloud Storage |
| 🤖 OpenAI SDK | AI Features |

---


# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhishek140304/Resume-Builder
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

## Backend (.env)

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPEN_AI_MODEL=gemini-3.5-flash

IMAGEKIT_PRIVATE_KEY=

EMAIL=
EMAIL_PASSWORD=

NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

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

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:5000
```

---

# 🔄 Application Flow

```text
User Registration/Login
          ↓
JWT Authentication
          ↓
Resume Creation
          ↓
Resume Stored in MongoDB
          ↓
AI Content Generation
          ↓
Download / Share Resume
```

---

# 🎯 Major Highlights

✅ Full Stack MERN Project

✅ Authentication System

✅ AI Integration

✅ Cloud Image Storage

✅ Resume Sharing

✅ Responsive Design

✅ Production Ready Architecture

---

# 🔮 Future Improvements

- 📄 Multiple Resume Templates
- 🎨 PDF Export Customization
- 🌙 Dark Mode
- 📊 Resume Analytics
- 🖱️ Drag and Drop Sections
- 🤖 ATS Score Checker
- 🕒 Resume Version History
- 🌍 Multi-language Support