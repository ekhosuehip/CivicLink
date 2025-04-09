import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';  // Import the user routes, not the model

const app: Application = express();  // Declare the app as an Application

app.use(express.json());  // Middleware to parse JSON requests

// Use user routes in your app
app.use('/api/users', userRoutes);  // Use the userRoutes for registration

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection failed:', err));

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
