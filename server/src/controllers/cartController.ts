import { Response } from 'express';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/auth';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let cart = await Cart.findOne({ userId: req.user.userId })
      .populate('items.influencerId', 'name email')
      .populate('items.campaignId', 'title');

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.userId,
        items: [],
        totalAmount: 0,
      });
    }

    res.json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { influencerId, campaignId, price } = req.body;

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.userId,
        items: [],
        totalAmount: 0,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.influencerId.toString() === influencerId
    );

    if (existingItem) {
      res.status(400).json({ message: 'Influencer already in cart' });
      return;
    }

    cart.items.push({
      influencerId,
      campaignId,
      price,
      addedAt: new Date(),
    });

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.influencerId', 'name email');
    await cart.populate('items.campaignId', 'title');

    res.json({ cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { influencerId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter(
      (item) => item.influencerId.toString() !== influencerId
    );

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.influencerId', 'name email');
    await cart.populate('items.campaignId', 'title');

    res.json({ cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { items: [], totalAmount: 0 },
      { new: true }
    );

    res.json({ message: 'Cart cleared successfully', cart: { items: [], totalAmount: 0 } });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { influencerId } = req.params;
    const { campaignId, price } = req.body;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.influencerId.toString() === influencerId
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    if (campaignId !== undefined) cart.items[itemIndex].campaignId = campaignId;
    if (price !== undefined) cart.items[itemIndex].price = price;

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.influencerId', 'name email');
    await cart.populate('items.campaignId', 'title');

    res.json({ cart });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
