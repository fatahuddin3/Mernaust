const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middlewares/authMiddleware');


router.post('/send', protect, async (req, res) => {
    const { receiver, content } = req.body;

      if (!receiver || !content) {
        return res.status(400).json({ message: 'Receiver and content are required' });
    }

  try {
        const message = new Message({
            sender: req.user._id,
               receiver,
           content
        });
        await message.save();
         res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

router.get('/conversations', protect, async (req, res) => {
    try {
        const messages = await Message.find({
             $or: [{ sender: req.user._id }, { receiver: req.user._id }]
          }).populate("sender receiver", "name");

      const users = new Map();

         messages.forEach((msg) => {
            const otherUser = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
            users.set(otherUser._id.toString(), { _id: otherUser._id, name: otherUser.name });
        });

        res.json(Array.from(users.values()));
    } catch (error) {
          console.error("Error fetching conversations:", error);
        res.status(500).json({ message: 'Error fetching conversations', error: error.message });
    }
});

router.get('/:receiverId', protect, async (req, res) => {
    const { receiverId } = req.params;

      if (!receiverId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid receiver ID" });
    }

    try {
          const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: receiverId },
                { sender: receiverId, receiver: req.user._id }
            ]
      })
            .populate("sender", "name") 
              .populate("receiver", "name") 
           .sort('createdAt');

        if (!messages || messages.length === 0) {
               return res.status(404).json({ message: "No messages found" });
        }

          res.json(messages);
    }   catch (error) {
           console.error("Error retrieving messages:", error);
       res.status(500).json({ message: "Error retrieving messages", error: error.message });
    }
});


module.exports = router;