const pool = require('./database');

const Chat = {
  // get all messages for a town's chat
  getMessages: async (locationId) => {
    const query = `SELECT m.id, m.content, u.email, m.sent_at FROM messages m
    JOIN chats c ON m.chat_id = c.id
    JOIN users u ON m.user_id = u.id
    WHERE c.location_id = $1
    ORDER BY m.sent_at DESC`;
    const { rows } = await pool.query(query, [locationId]);

    return rows;
  },

  // Send a new message

  sendMessage: async (chatId, userId, content) => {
    const query = `INSERT INTO messages (chat_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`;
    const { rows } = await pool.query(query, [chatId, userId, content]);
    return rows[0];
  },

  // Get chat ID by location ID
  getChatIdByLocation: async (locationId) => {
    const { rows } = await pool.query(
      'SELECT id FROM chats WHERE location_id = $1',
      [locationId]
    );
    return rows[0]?.id;
  }
};

module.exports = Chat;