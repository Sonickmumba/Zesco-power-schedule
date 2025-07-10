const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// GET /chats/:location_id/messages
router.get('/:location_id/messages', chatController.getMessages);

// POST /chats/:location_id/messages
router.post('/:location_id/messages', chatController.sendMessage);

module.exports = router;