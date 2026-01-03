const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { setupDatabase } = require('./config/database');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Production only
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'astrivya-backend'
  });
});

// API routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    code: err.code || 'INTERNAL_ERROR',
    ...(isDevelopment && { stack: err.stack })
  });
});

// Validate required environment variables
function validateEnvironment() {
  const requiredVars = {
    'NODE_ENV': 'Node environment (production/development)',
    'ALLOWED_ORIGINS': 'Comma-separated list of allowed frontend URLs',
    'JWT_SECRET': 'Secret key for JWT token generation',
    'JWT_EXPIRES_IN': 'JWT token expiration time',
    'OTP_EXPIRY_MINUTES': 'OTP code expiration in minutes',
    'SUPABASE_URL': 'Supabase project URL',
    'SUPABASE_ANON_KEY': 'Supabase anonymous key',
    'RESEND_API_KEY': 'Resend email API key'
  };

  const missing = [];
  const warnings = [];

  // Check required variables
  for (const [key, description] of Object.entries(requiredVars)) {
    if (!process.env[key]) {
      missing.push({ key, description });
    }
  }

  // Check CORS configuration
  if (process.env.ALLOWED_ORIGINS) {
    const origins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
    console.log('✅ CORS configured for:', origins);

    if (origins.some(o => o.includes('localhost') || o.includes('127.0.0.1'))) {
      warnings.push('⚠️  WARNING: localhost detected in ALLOWED_ORIGINS - this should only be used in development!');
    }
  }

  // Check JWT secret strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    warnings.push('⚠️  WARNING: JWT_SECRET is less than 32 characters - use a stronger secret!');
  }

  // Print warnings
  warnings.forEach(warning => console.warn(warning));

  // If missing variables, print detailed error and exit
  if (missing.length > 0) {
    console.error('\n❌ MISSING REQUIRED ENVIRONMENT VARIABLES:\n');
    console.error('The following environment variables are required but not set:\n');

    missing.forEach(({ key, description }) => {
      console.error(`  • ${key}`);
      console.error(`    Description: ${description}\n`);
    });

    console.error('\n📋 Setup Instructions:\n');
    console.error('1. Create a .env file in the backend directory');
    console.error('2. Add all required variables (see backend/.env.example)');
    console.error('3. Or set them in your hosting platform environment settings\n');
    console.error('Example .env file:');
    console.error('─────────────────────────────────────────────────');
    console.error('NODE_ENV=production');
    console.error('ALLOWED_ORIGINS=https://astrivya.ai,https://www.astrivya.ai');
    console.error('JWT_SECRET=your_very_long_random_secret_key_here');
    console.error('JWT_EXPIRES_IN=7d');
    console.error('OTP_EXPIRY_MINUTES=10');
    console.error('SUPABASE_URL=https://your-project.supabase.co');
    console.error('SUPABASE_ANON_KEY=your_supabase_anon_key');
    console.error('RESEND_API_KEY=re_your_resend_api_key');
    console.error('─────────────────────────────────────────────────\n');

    process.exit(1);
  }

  console.log('\n✅ All required environment variables are configured\n');
}

// Initialize database and start server
async function startServer() {
  try {
    // Validate environment first
    validateEnvironment();

    // Setup database connection
    await setupDatabase();
    console.log('✅ Database connection established');

    app.listen(PORT, () => {
      console.log('\n' + '═'.repeat(60));
      console.log('🚀 Astrivya Backend Server Started Successfully');
      console.log('═'.repeat(60));
      console.log(`📡 Port: ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔐 JWT Expiry: ${process.env.JWT_EXPIRES_IN}`);
      console.log(`⏰ OTP Expiry: ${process.env.OTP_EXPIRY_MINUTES} minutes`);
      console.log(`🌐 CORS Origins: ${allowedOrigins.length} configured`);
      console.log('═'.repeat(60) + '\n');
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

startServer();
