const helmet = require('helmet');
const cors = require('cors');

// Security headers
exports.securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

// CORS configuration (kept for reference; primary CORS is configured in app.js)
exports.corsOptions = cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
});

// Sanitize data to prevent NoSQL injection
exports.sanitizeData = (req, res, next) => {
  // Sanitize req.body, req.params, and req.query
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          // Remove potentially dangerous characters
          obj[key] = obj[key].replace(/[<>$]/g, '');
        } else if (typeof obj[key] === 'object') {
          sanitize(obj[key]);
        }
      }
    }
  };

  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);
  
  next();
};