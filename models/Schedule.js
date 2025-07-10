const pool = require('./db');

const Schedule = {
  // Get outages for a town
  getByTown: async (townName) => {
    const query = `
      SELECT s.start_time, s.end_time, s.description, p.name AS provider
      FROM schedules s
      JOIN locations l ON s.location_id = l.id
      LEFT JOIN providers p ON s.provider_id = p.id
      WHERE l.name = $1 AND s.end_time > NOW()
      ORDER BY s.start_time`;
    const { rows } = await pool.query(query, [townName]);
    return rows;
  }
};

module.exports = Schedule;