const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ─── MONGODB CONNECTION ───────────────────────────────────────────────────────
let isDBConnected = false;

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://nehashrama311_db_user:MCA12345@ac-kb99mon-shard-00-00.2ppgquq.mongodb.net:27017,ac-kb99mon-shard-00-01.2ppgquq.mongodb.net:27017,ac-kb99mon-shard-00-02.2ppgquq.mongodb.net:27017/royal-jewellery?ssl=true&authSource=admin&retryWrites=true&w=majority';
    
    console.log('\n🔌 Connecting to MongoDB...');

    
    await mongoose.connect(mongoURI);

    isDBConnected = true;
    console.log('✅ MongoDB Connected Successfully!');
    return true;
  } catch (error) {
    isDBConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Falling back to In-Memory mode...');
    return false;
  }
};
// Connect to MongoDB
connectDB();

// ─── USER SCHEMA ──────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  loginAt: [
    {
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// ─── IN-MEMORY FALLBACK DATABASE ──────────────────────────────────────────────
let inMemoryUsers = [
  {
    id: 1,
    name: 'Neha Sharma',
    email: 'neha@example.com',
    password: 'password123',
    phone: '+91 98765 43210',
    loginAt: [],
    createdAt: new Date()
  }
];

let nextUserId = 2;

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ Server is running!',
    timestamp: new Date(),
    database: isDBConnected ? '✅ MongoDB Connected' : '💾 In-Memory Mode'
  });
});

// ─── LOGIN ROUTE ──────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password required' 
      });
    }

    let user = null;

    if (isDBConnected) {
      // Try MongoDB first
      user = await User.findOne({ email });
    } else {
      // Fallback to in-memory
      user = inMemoryUsers.find(u => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Add login timestamp
    if (isDBConnected) {
      user.loginAt.push({ timestamp: new Date() });
      await user.save();
    } else {
      if (!user.loginAt) user.loginAt = [];
      user.loginAt.push({ timestamp: new Date() });
    }

    const timestamp = new Date().toLocaleString('en-IN');
    const mode = isDBConnected ? '📊 MongoDB' : '💾 In-Memory';
    
    console.log(`\n✅ LOGIN SUCCESS`);
    console.log(`   👤 User: ${user.name}`);
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   🕐 Time: ${timestamp}`);
    console.log(`   🗄️  Mode: ${mode}\n`);

    // Send response
    res.json({
      success: true,
      message: 'Login successful',
      token: Buffer.from(`${user._id || user.id}:${user.name}`).toString('base64'),
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error(`\n❌ Login Error: ${error.message}\n`);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ─── SIGNUP ROUTE ─────────────────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and password required' 
      });
    }

    let newUser = null;

    if (isDBConnected) {
      // Try MongoDB first
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User already exists' 
        });
      }

      newUser = new User({
        name,
        email,
        password,
        phone: phone || ''
      });

      await newUser.save();
    } else {
      // Fallback to in-memory
      const existingUser = inMemoryUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User already exists' 
        });
      }

      newUser = {
        id: nextUserId++,
        name,
        email,
        password,
        phone: phone || '',
        loginAt: [],
        createdAt: new Date()
      };

      inMemoryUsers.push(newUser);
    }

    const timestamp = new Date().toLocaleString('en-IN');
    const mode = isDBConnected ? '📊 MongoDB' : '💾 In-Memory';
    
    console.log(`\n✅ SIGNUP SUCCESS`);
    console.log(`   👤 User: ${newUser.name}`);
    console.log(`   📧 Email: ${newUser.email}`);
    console.log(`   🕐 Time: ${timestamp}`);
    console.log(`   🗄️  Mode: ${mode}\n`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: Buffer.from(`${newUser._id || newUser.id}:${newUser.name}`).toString('base64'),
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.error(`\n❌ Signup Error: ${error.message}\n`);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ─── GET ALL USERS (For testing) ──────────────────────────────────────────────
app.get('/api/users', async (req, res) => {
  try {
    let users = [];

    if (isDBConnected) {
      users = await User.find().select('-password');
    } else {
      users = inMemoryUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        loginAt: u.loginAt,
        createdAt: u.createdAt
      }));
    }
    
    res.json({
      success: true,
      total: users.length,
      database: isDBConnected ? '✅ MongoDB' : '💾 In-Memory',
      users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${'═'.repeat(70)}`);
  console.log('🎭 ROYAL JEWELLERY SERVER');
  console.log(`${'═'.repeat(70)}`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
  console.log(`\n📚 Available Routes:`);
  console.log('  POST   /api/auth/login       - User Login');
  console.log('  POST   /api/auth/signup      - User Signup');
  console.log('  GET    /api/users            - Get all users');
  console.log('  GET    /api/health           - Health check');
  console.log(`\n${'═'.repeat(70)}`);
  
  if (isDBConnected) {
    console.log('✅ MongoDB Connected - Data saves to database\n');
  } else {
    console.log('⚠️  In-Memory Mode - Data will NOT persist after restart\n');
  }
  
  console.log(`📌 Test Users:`);
  console.log(`   Email: neha@example.com`);
  console.log(`   Password: password123`);
  console.log(`${'═'.repeat(70)}\n`);
});