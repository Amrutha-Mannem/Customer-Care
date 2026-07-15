# Customer Care Registry System - Description

## What It Does

This is a **customer support and complaint management system** that allows organizations to efficiently track, manage, and resolve customer issues.

### Core Functionality:

**For Customers:**
- **Register and Login** - Create an account to access the system
- **Submit Complaints** - File support tickets with details about their issues
- **Track Status** - Monitor the progress of their complaints (Pending, In Progress, Resolved, etc.)
- **View History** - Access all their past and current complaints in one place
- **Update Information** - Edit or add details to existing complaints

**For Support Staff/Admins:**
- **View All Complaints** - See a dashboard of all customer issues
- **Assign and Manage** - Update complaint status, assign to team members
- **Filter and Search** - Find specific complaints by status, date, or customer
- **Respond to Issues** - Add notes and updates to complaints
- **Mark as Resolved** - Close tickets once issues are fixed

### Key Features:

1. **User Authentication** - Secure login system with JWT tokens and password encryption
2. **Role-Based Access** - Different permissions for customers vs support staff
3. **Real-Time Updates** - Track complaint status changes
4. **Organized Workflow** - Categorize and prioritize support tickets
5. **Responsive Design** - Works on desktop, tablet, and mobile devices
6. **RESTful API** - Backend API that can be integrated with other systems

### Use Cases:

- **IT Support Teams** - Track technical issues and bug reports
- **Customer Service Departments** - Manage customer inquiries and complaints
- **Product Support** - Handle product-related issues and feedback
- **Internal Help Desk** - Employee support and IT requests
- **Service Companies** - Manage service tickets and field operations

### Business Value:

✅ **Improves Response Time** - Organized ticketing system ensures no complaint is missed  
✅ **Better Customer Satisfaction** - Transparent tracking keeps customers informed  
✅ **Efficient Workflow** - Support team can prioritize and manage workload effectively  
✅ **Data Insights** - Track resolution times and common issues  
✅ **Scalable Solution** - Can handle growing number of support requests


**In simple terms:** It's like a digital help desk where customers can report problems and support teams can track and resolve them efficiently, with full visibility into the status of every issue.
##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 User Authentication & Authorization
- 📝 Create, Read, Update, Delete (CRUD) complaints
- 📊 Track complaint status
- 👥 Role-based access control
- 🎨 Modern, responsive UI
- 🚀 RESTful API architecture
- 📱 Mobile-friendly design

## ️ Tech Stack

### Frontend
- **React 18** - Frontend library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```text
Customer-Care/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Node.js application
│   ├── config/
│   │   ── db.js          # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── .env               # Environment variables
└── README.md
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud) or local installation

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/[Your-GitHub-Username]/Customer-Care.git
cd Customer-Care
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🔑 Environment Variables

### Backend Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/customer-care
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/customer-care

NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

*Important: Never commit your `.env` file to GitHub!*

##  Running the Application

### Development Mode

You need to run both backend and frontend simultaneously:

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Server runs on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### Production Mode

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd server
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Complaint Routes (`/api/complaints`)
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get single complaint
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

## 🌐 Deployment

### Deploy Backend (Server)




Made with ❤️ by [Your Name]
```
