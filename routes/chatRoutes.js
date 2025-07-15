const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { isAdmin } = require('../middlewares/auth')

// GET /chats/:location_id/messages
router.get('/:location_id/messages', chatController.getMessages);

// POST /chats/:location_id/messages
router.post('/:location_id/messages', chatController.sendMessage);

// DELETE /chats/messages/:message_id
router.delete('/messages/:message_id', isAdmin, chatController.deleteMessage)

module.exports = router;