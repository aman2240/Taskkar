# Quick Setup Guide

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

Edit `backend/.env` and update:

```env
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters_long
```

Replace with a secure random string (minimum 32 characters).

**Note:** MongoDB connection string is already configured. If you need to use your own database, update the `MONGO_URI` value.

## Step 3: Start the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

You should see: `Connected to DB & Server is listening on port 4000`

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```

Browser will automatically open at `http://localhost:3000`

## Step 4: Test the Application

1. Click "Signup" in the navigation
2. Create a new account
3. You'll be automatically logged in
4. Create some tasks
5. Try searching, editing, and pagination features

## Features to Test

✅ **Authentication:**
- Sign up with name, email, password
- Login with credentials
- Logout functionality

✅ **Task Management:**
- Create tasks with title, description, and priority
- Edit existing tasks
- Mark tasks as completed
- Delete tasks

✅ **Search with Debouncing:**
- Type in search box
- Notice 500ms delay before search executes
- Search works on title and description

✅ **Pagination:**
- Create more than 10 tasks
- Navigate between pages
- See page numbers and task count

## Troubleshooting

### Backend won't start
- Make sure MongoDB connection string is correct
- Ensure JWT_SECRET is set in `.env`
- Check if port 4000 is available

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is available

### Can't login after signup
- Check browser console for errors
- Verify backend is running on port 4000
- Clear localStorage and try again

### Tasks not showing
- Make sure you're logged in
- Check Authorization header is being sent
- Verify backend logs for errors

## Default Configuration

- Backend Port: 4000
- Frontend Port: 3000
- Tasks per Page: 10
- Search Debounce: 500ms
- JWT Expiry: 7 days
- Bcrypt Salt Rounds: 10

## Need Help?

Check the main README.md for detailed documentation and API endpoints.
