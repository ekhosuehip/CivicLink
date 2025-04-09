import { Router, Request, Response } from 'express';
import User from '../models/User';

const router: Router = Router();

// Register route
router.post('/register', async (req: Request, res: Response) => {
  const { fullName, email, phone, nin } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ email }, { phone }, { nin }] });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ fullName, email, phone, nin });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Something went wrong', 
      error: (err as Error).message || 'Unknown error' 
    });
  }
});

export default router; // Export the router