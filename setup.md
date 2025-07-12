# Raarya Property Website Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Quick Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Environment Setup
Create a `.env` file in the `raarya-backend` directory:
```
MONGO_URI=mongodb://localhost:27017/raarya-properties
PORT=5000
```

**Note**: If you're using MongoDB Atlas, replace the MONGO_URI with your Atlas connection string.

### 3. Run Both Frontend and Backend
```bash
npm run dev:all
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173 (Vite default)

## Individual Commands

### Run Backend Only
```bash
npm run backend
```

### Run Frontend Only
```bash
npm run frontend
```

## Manual Setup (Alternative)

If the concurrent setup doesn't work, you can run them in separate terminals:

**Terminal 1 (Backend):**
```bash
cd raarya-backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd project
npm install
npm run dev
```

## API Endpoints

The backend provides these endpoints:
- `GET /` - API status
- `GET /properties` - Get all properties
- `POST /properties` - Create new property
- `GET /properties/:id` - Get specific property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

## Troubleshooting

1. **Port already in use**: Change the PORT in the .env file
2. **MongoDB connection error**: Ensure MongoDB is running or check your connection string
3. **Module not found**: Run `npm install` in the respective directories 