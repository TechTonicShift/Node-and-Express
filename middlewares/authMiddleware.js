const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided or missing Bearer scheme.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // ✅ This works now because 'jwt' is properly imported
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
