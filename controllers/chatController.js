const Chat = require('../models/Chat');

exports.getMessages = async (req, res) => {
  try {
    const { location_id } = req.params;
    const messages = await Chat.getMessages(location_id);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { location_id } = req.params;
    const { user_id, content } = req.body;

    // Validate input
    if (!content) return res.status(400).send('Message content required');

    const chatId = await Chat.getChatIdByLocation(location_id);
    if (!chatId) return res.status(404).send('Chat not found');

    const newMessage = await Chat.sendMessage(chatId, user_id, content);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const remainingMessages = await Chat.deleteMessage(message_id);

    if (!remainingMessages) {
      return res.status(404).send('Message not found');
    }

    res.status(200).json({ message: 'Message deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
