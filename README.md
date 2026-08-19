# 📚 StudyNotion — AI-Powered Ed-Tech Platform

<p align="center">
  <strong>A full-stack Learning Management System built with the MERN stack, featuring secure authentication, course management, online payments, learning progress tracking, quizzes, and AI-powered learning assistance.</strong>
</p>

<p align="center">
  <a href="https://studynotion-ed-tech-platform-five.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-success?style=for-the-badge" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

---

## 🔗 Live Demo

**Deployment Link:** [https://studynotion-ed-tech-platform-five.vercel.app/](https://studynotion-ed-tech-platform-five.vercel.app/)

---

## 📖 Overview

**StudyNotion** is a full-stack Ed-Tech / Learning Management System designed to connect instructors and learners through a structured online learning experience.

The platform allows users to:

* Create and manage educational courses
* Browse and enroll in courses
* Make secure course purchases
* Watch course lectures
* Track learning progress
* Rate and review courses
* Take quizzes
* Generate quizzes using AI
* Ask an AI tutor to explain concepts
* Generate personalized learning paths
* Receive learning recommendations based on course progress and quiz performance

The project follows a modular client-server architecture with **React + Redux on the frontend**, **Node.js + Express on the backend**, and **MongoDB/Mongoose for persistent data storage**.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

* User registration and login
* OTP-based email verification during signup
* Password hashing using `bcrypt`
* JWT-based authentication
* HTTP-only authentication cookie
* Role/account-type based access control
* Change password functionality
* Forgot password workflow
* Password reset using time-limited reset tokens

Authentication is handled through dedicated controllers, routes, middleware, and MongoDB models. JWTs contain the user's identity and account type and expire after a configured period.

---

## 👨‍🏫 Course Management

### For Instructors

* Create courses
* Upload course thumbnails
* Add course descriptions
* Define learning objectives
* Add tags and categories
* Add course instructions
* Save courses as drafts
* Edit existing courses
* Manage course sections
* Manage subsections/lectures
* View instructor-specific courses

Course creation integrates **Cloudinary** for media uploads and maintains relationships between instructors, courses, categories, sections, and subsections.

### For Students

* Browse available courses
* View course details
* View complete course content
* Enroll in courses
* Access enrolled courses
* Watch lectures
* Track completed lectures
* View course progress
* Rate and review courses

---

# 💳 Online Payments

StudyNotion integrates **Razorpay** to support paid course enrollment.

### Payment Flow

```text
Student selects courses
        ↓
Backend validates courses
        ↓
Razorpay Order Created
        ↓
Student completes payment
        ↓
Razorpay returns payment details
        ↓
Backend verifies payment signature
        ↓
Student is enrolled
        ↓
Course progress record is created
        ↓
Enrollment email is sent
```

The backend verifies the Razorpay signature using HMAC-SHA256 before enrolling the student, then creates course-progress records and sends an enrollment email.

---

# 🤖 AI-Powered Learning

One of the major features of this project is its **Gemini-powered learning layer**.

The backend centralizes Gemini API communication through a dedicated client utility, allowing different learning features to use the same AI integration.

## 🧠 AI Quiz Generator

Automatically generates multiple-choice quizzes from lecture information.

```text
Course Lecture
      ↓
Lecture title + description
      ↓
Gemini
      ↓
Generated MCQs
      ↓
Quiz stored in MongoDB
```

The generated quiz contains:

* Questions
* Four answer options
* Correct answer
* Explanation

Previously generated quizzes can also be reused instead of unnecessarily generating another quiz.

---

## 📝 Quiz From Text

Users can provide arbitrary notes or text and generate an MCQ quiz from that content.

```text
Notes / Study Material
          ↓
       Gemini AI
          ↓
   Generated Questions
          ↓
      Take Quiz
```

This provides a flexible study tool independent of a specific course lecture.

---

## 👨‍💻 AI Tutor

Students can ask questions and receive AI-generated explanations based on their learning level.

Supported learning levels include:

* Beginner
* Intermediate
* Advanced

The AI response is adjusted according to the selected level to make explanations more appropriate for the learner.

---

## 🗺️ AI Learning Path Generator

Students can provide:

* Their learning goal
* Skills they already know

The system then generates a structured learning roadmap containing ordered learning steps and estimated time requirements.

---

## 📊 Personalized Learning Recommendations

StudyNotion can analyze:

* Course progress
* Completed lectures
* Quiz scores
* Recent learning activity

and use this information to generate personalized learning recommendations with priority levels.

```text
Course Progress ───────┐
                       │
Quiz Performance ──────┼──→ Gemini AI ──→ Recommendations
                       │
Learning Activity ─────┘
```

This makes the platform more than a traditional course-management application by introducing an adaptive learning component.

---

# 🧪 Quiz & Assessment System

The platform includes a complete quiz workflow:

1. Generate or retrieve a quiz
2. Display questions and options
3. Submit answers
4. Calculate score
5. Store quiz attempt
6. Display performance
7. Use performance data for learning recommendations

Quiz attempts are persisted using a dedicated `QuizAttempt` model.

---

# 📈 Learning Progress Tracking

For enrolled courses, StudyNotion tracks completed lectures.

The backend calculates:

* Completed lectures
* Total lectures
* Course duration
* Course progress

Course progress is stored separately and connected to both the student and course.

---

# ⭐ Ratings & Reviews

Students can provide ratings and reviews for courses.

The course system supports relationships between courses and their rating/review records, allowing course information to be displayed together with learner feedback.

---

# ☁️ Media Management

Course thumbnails and uploaded media are handled using **Cloudinary**.

The backend configures Cloudinary using environment variables and stores secure Cloudinary URLs for uploaded assets.

---

# 📧 Email Services

StudyNotion uses **Brevo's transactional email API** for application emails.

Email functionality includes:

* Email verification
* Password reset
* Course enrollment confirmation
* Payment success notifications
* Contact form communication

The backend keeps email templates separated into the `mailTemplates` directory.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Student        │
                    │      Instructor      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │ React + Redux        │
                    │ React Router         │
                    │ Tailwind CSS         │
                    │ Axios                │
                    └──────────┬───────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Node.js + Express   │
                    │                      │
                    │ Controllers          │
                    │ Routes               │
                    │ Middleware           │
                    │ Authentication       │
                    └──────┬───────┬───────┘
                           │       │
                ┌──────────┘       └───────────┐
                ▼                              ▼
       ┌────────────────┐             ┌────────────────┐
       │    MongoDB     │             │ External APIs  │
       │                │             │                │
       │ Users          │             │ Razorpay       │
       │ Courses        │             │ Cloudinary     │
       │ Progress       │             │ Brevo          │
       │ Quizzes        │             │ Gemini         │
       │ Reviews        │             └────────────────┘
       └────────────────┘
```

The backend is organized into configuration, controllers, middleware, models, routes, utilities, and mail templates, while the frontend separates pages, components, Redux slices, services, hooks, and utilities.

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                     |
| --------------- | ---------------------------- |
| React 19        | User interface              |
| Vite            | Development & build tooling |
| React Router    | Client-side routing         |
| Redux Toolkit   | Global state management     |
| Axios           | API communication           |
| Tailwind CSS    | Styling                     |
| React Hook Form | Form handling               |
| React Dropzone  | File uploads                |
| Chart.js        | Data visualization          |
| Swiper          | Sliders/carousels           |
| React Player    | Video playback              |
| React Markdown  | Markdown rendering          |
| React Hot Toast | Notifications               |
| React Icons     | UI icons                    |

The frontend package configuration confirms React, Vite, Redux Toolkit, Axios, Tailwind CSS, Chart.js, React Hook Form, React Dropzone, Swiper, React Player, and other supporting libraries.

---

## Backend

| Technology         | Purpose                      |
| ------------------ | ----------------------------- |
| Node.js            | Runtime                      |
| Express.js         | REST API                     |
| MongoDB            | Database                     |
| Mongoose           | ODM                          |
| JWT                | Authentication               |
| bcrypt             | Password hashing             |
| Razorpay           | Payments                     |
| Cloudinary         | Media storage                |
| Brevo              | Transactional emails         |
| Nodemailer         | Email utilities              |
| express-fileupload | File uploads                 |
| OTP Generator      | OTP creation                 |
| Node Schedule      | Scheduled backend tasks      |
| Gemini API         | AI-powered learning features |

The backend dependency configuration includes Express, Mongoose/MongoDB, JWT, bcrypt, Razorpay, Cloudinary, Brevo, file upload utilities, OTP generation, and scheduling support.

---

# 📁 Project Structure

```text
StudyNotion-Ed-Tech-Platform/
│
├── backend/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── database.js
│   │   └── razorpay.js
│   │
│   ├── controllers/
│   │   ├── Auth.js
│   │   ├── Category.js
│   │   ├── ContactUs.js
│   │   ├── Course.js
│   │   ├── Payments.js
│   │   ├── Profile.js
│   │   ├── Quiz.js
│   │   ├── RatingAndReview.js
│   │   ├── ResetPassword.js
│   │   ├── Section.js
│   │   ├── SubSection.js
│   │   └── courseProgress.js
│   │
│   ├── mailTemplates/
│   │   ├── contactFormRes.js
│   │   ├── courseEnrollmentEmail.js
│   │   ├── emailVerificationTemplate.js
│   │   ├── passwordUpdate.js
│   │   └── paymentSuccessEmail.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Category.js
│   │   ├── Course.js
│   │   ├── CourseProgress.js
│   │   ├── OTP.js
│   │   ├── Profile.js
│   │   ├── Quiz.js
│   │   ├── QuizAttempt.js
│   │   ├── RatingAndReview.js
│   │   ├── Section.js
│   │   ├── SubSection.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── Contact.js
│   │   ├── Course.js
│   │   ├── Payments.js
│   │   ├── Profile.js
│   │   ├── Quiz.js
│   │   └── User.js
│   │
│   ├── utils/
│   │   ├── geminiClient.js
│   │   ├── imageUploader.js
│   │   ├── mailSender.js
│   │   └── setToDuration.js
│   │
│   ├── index.js
│   └── package.json
│
├── frontend/
│   └── my-app/
│       │
│       ├── public/
│       │
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── common/
│       │   │   ├── core/
│       │   │   └── ContactPage/
│       │   │
│       │   ├── data/
│       │   ├── hooks/
│       │   ├── pages/
│       │   ├── reducer/
│       │   ├── services/
│       │   ├── slices/
│       │   ├── utils/
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── package.json
│       ├── tailwind.config.js
│       └── vite.config.mjs
│
└── .gitignore
```

The repository currently follows this frontend/backend separation and the backend contains dedicated controllers, models, routes, middleware, configuration, utilities, and email templates.

---

# 🔌 API Architecture

The Express server exposes modular API namespaces:

```text
/api/v1/auth
/api/v1/profile
/api/v1/course
/api/v1/payment
/api/v1/reach
/api/v1/quiz
```

This keeps authentication, profile management, courses, payments, contact functionality, and AI/quiz functionality separated into independent route modules.

---

# 🔄 Core User Flow

## Student Flow

```text
Sign Up
  ↓
OTP Verification
  ↓
Login
  ↓
Browse Courses
  ↓
View Course
  ↓
Purchase Course
  ↓
Razorpay Payment
  ↓
Payment Verification
  ↓
Course Enrollment
  ↓
Watch Lectures
  ↓
Track Progress
  ↓
Take AI-Generated Quizzes
  ↓
Receive Learning Recommendations
```

## Instructor Flow

```text
Login
  ↓
Instructor Dashboard
  ↓
Create Course
  ↓
Upload Thumbnail
  ↓
Add Sections
  ↓
Add Subsections / Lectures
  ↓
Publish Course
  ↓
Manage Course
  ↓
Monitor Learner Activity
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/ayushsingh47744/StudyNotion-Ed-Tech-Platform.git

cd StudyNotion-Ed-Tech-Platform
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

```env
PORT=4000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

BREVO_API_KEY=your_brevo_api_key

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

The variable names above are based on the repository's actual configuration files. MongoDB uses `MONGODB_URL`, Cloudinary uses `CLOUD_NAME`, `API_KEY`, and `API_SECRET`, Razorpay uses `RAZORPAY_KEY` and `RAZORPAY_SECRET`, and the Gemini client uses `GEMINI_API_KEY` and optionally `GEMINI_MODEL`.

Start the backend:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:4000
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend/my-app
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend is built using Vite and the repository also provides scripts for running the frontend and backend together.

---

# 🔒 Environment Variables

Never commit sensitive credentials.

Add the following to `.gitignore`:

```text
.env
node_modules/
dist/
```

Required third-party credentials include:

* MongoDB
* Cloudinary
* Razorpay
* Brevo
* Gemini

---

# 🧩 Development Scripts

## Backend

```bash
npm start
```

Runs the production Node.js server.

```bash
npm run dev
```

Runs the backend with Nodemon.

## Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build.

```bash
npm start
```

Runs the frontend and backend together using `concurrently`.

---

# 🧠 What Makes This Project Interesting?

StudyNotion goes beyond a standard MERN CRUD application.

### 1. Full-stack architecture

The application contains a dedicated frontend, backend API, database layer, authentication layer, external service integrations, and modular business logic.

### 2. Secure authentication

The project implements password hashing, JWT authentication, cookies, OTP verification, and password-reset tokens.

### 3. Real payment workflow

Course enrollment is connected to Razorpay payment creation and server-side signature verification rather than simply changing an enrollment flag on the frontend.

### 4. Media handling

Course thumbnails are uploaded to Cloudinary instead of being stored directly on the application server.

### 5. AI integration

Gemini is integrated into multiple parts of the learning experience:

* Quiz generation
* AI tutoring
* Quiz generation from notes
* Learning path generation
* Personalized recommendations

This creates an adaptive learning layer on top of the core LMS.

---

# 📸 Screenshots

> Add screenshots/GIFs here to make the repository more attractive to recruiters.

### 🏠 Homepage

```text
![Homepage](./screenshots/home.png)
```

### 📚 Course Catalog

```text
![Course Catalog](./screenshots/catalog.png)
```

### 🎓 Course Details

```text
![Course Details](./screenshots/course-details.png)
```

### 📊 Dashboard

```text
![Dashboard](./screenshots/dashboard.png)
```

### 🤖 AI Learning Tools

```text
![AI Tools](./screenshots/ai-tools.png)
```

### 🧠 AI Quiz

```text
![AI Quiz](./screenshots/ai-quiz.png)
```

---

# 🚀 Future Improvements

Potential improvements for future versions include:

* Real-time notifications
* Live classes
* Discussion forums
* Instructor analytics dashboard
* Course search and advanced filtering
* Certificate generation
* More granular authorization policies
* Rate limiting for authentication and AI endpoints
* Automated testing and API documentation
* Improved production monitoring
* More advanced AI-based course recommendations

---

# 🛡️ Security Considerations

The application already uses several security-oriented mechanisms including:

* Password hashing with bcrypt
* JWT authentication
* HTTP-only cookies
* Environment variables for secrets
* Server-side payment signature verification
* Authentication middleware
* Expiring password-reset tokens

For production hardening, additional protections such as rate limiting, stronger request validation, security headers, and stricter input sanitization can be added.

---

# 📚 Learning Outcomes

Building StudyNotion provides practical experience with:

* MERN stack development
* REST API design
* MongoDB data modeling
* Mongoose relationships
* JWT authentication
* Password hashing
* OTP verification
* Role-based authorization
* File uploads
* Cloudinary integration
* Payment gateway integration
* Transactional emails
* Redux state management
* Protected routes
* Course progress tracking
* Quiz systems
* AI API integration
* Prompt engineering
* AI-generated structured JSON
* Personalized learning systems
* Full-stack deployment

---

# 👨‍💻 Project Highlights

```text
✔ MERN Full-Stack Application
✔ Modular REST API
✔ JWT Authentication
✔ OTP Verification
✔ Password Reset
✔ Course Management
✔ Instructor & Student Workflows
✔ Cloudinary Media Uploads
✔ Razorpay Payments
✔ Course Progress Tracking
✔ Ratings & Reviews
✔ AI Quiz Generation
✔ AI Tutor
✔ Quiz From Notes
✔ AI Learning Path Generation
✔ Personalized Learning Recommendations
✔ Transactional Email System
✔ Responsive React UI
✔ Redux Toolkit State Management
```

---

# 📄 License

This project is intended for educational and portfolio purposes.

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  Built with ❤️ using the MERN Stack and AI
</p>
