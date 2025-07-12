const { verifyToken } = require('../utils/jwt');

const isAdmin = async (req, res, next) => {
  // First verify JWT
  verifyToken(req, res, async () => {
    try {
      const { rows } = await pool.query(
        'SELECT role FROM users WHERE id = $1',
        [req.user.id]
      );
      if (rows[0]?.role !== 'admin') {
        return res.status(403).send('Forbidden: Admins only');
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
};
