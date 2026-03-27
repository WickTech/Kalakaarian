import { Router, Request, Response } from 'express';
import Message from '../models/Message';
import Conversation from '../models/Conversation';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/send', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user!.userId;
    const senderRole = req.user!.role;

    if (!receiverId || !content) {
      res.status(400).json({ message: 'Receiver ID and content are required' });
      return;
    }

    const receiverRole = senderRole === 'brand' ? 'influencer' : 'brand';

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const message = await Message.create({
      conversationId: conversation._id.toString(),
      senderId,
      senderRole,
      receiverId,
      receiverRole,
      content,
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    res.status(201).json({ message, conversation });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/conversations', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const conversations = await Conversation.find({
      participants: userId
    })
      .populate('participants', 'name email role')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/conversations/:conversationId', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const userId = req.user!.userId;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    if (!conversation.participants.some(p => p.toString() === userId)) {
      res.status(403).json({ message: 'Not authorized to view this conversation' });
      return;
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 });

    res.json({ conversation, messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/conversations/:conversationId/read', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const userId = req.user!.userId;

    await Message.updateMany(
      { conversationId, receiverId: userId, read: false },
      { read: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
