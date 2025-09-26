// Minimal roleMiddleware.js placeholder
function requireRole(role) {
  return (req, res, next) => {
    // Dummy middleware: allow all requests
    next();
  };
}

module.exports = { requireRole };
