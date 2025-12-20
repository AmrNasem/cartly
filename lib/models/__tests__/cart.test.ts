import mongoose from 'mongoose';
import Cart, { CartItem, ICart, ICartItem, CartSchema, CartItemSchema } from '../cart';
import User from '../user';
import Product from '../product';
import Category from '../category';

describe('Cart and CartItem Models', () => {
  let userId: mongoose.Types.ObjectId;
  let productId: mongoose.Types.ObjectId;
  let cartId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: 'hash123',
    });
    userId = user._id;

    const category = await Category.create({
      name: 'Test Category',
      slug: 'test-category',
    });

    const product = await Product.create({
      title: 'Test Product',
      slug: 'test-product',
      price: 99.99,
      categoryId: category._id,
      createdBy: userId,
    });
    productId = product._id;
  });

  describe('Cart Schema Definition', () => {
    it('should have correct schema structure', () => {
      const paths = CartSchema.paths;
      
      expect(paths.userId).toBeDefined();
      expect(paths.userId.isRequired).toBe(true);
    });

    it('should have timestamps enabled', () => {
      expect(CartSchema.options.timestamps).toBe(true);
    });

    it('should have versionKey disabled', () => {
      expect(CartSchema.options.versionKey).toBe(false);
    });

    it('should have userId indexed', () => {
      const userIdPath = CartSchema.path('userId');
      expect(userIdPath.options.index).toBe(true);
    });
  });

  describe('CartItem Schema Definition', () => {
    it('should have correct schema structure', () => {
      const paths = CartItemSchema.paths;
      
      expect(paths.cartId).toBeDefined();
      expect(paths.cartId.isRequired).toBe(true);
      
      expect(paths.productId).toBeDefined();
      expect(paths.productId.isRequired).toBe(true);
      
      expect(paths.quantity).toBeDefined();
      expect(paths.quantity.instance).toBe('Number');
      expect(paths.quantity.isRequired).toBe(true);
    });

    it('should have timestamps enabled', () => {
      expect(CartItemSchema.options.timestamps).toBe(true);
    });

    it('should have indexes on cartId and productId', () => {
      const cartIdPath = CartItemSchema.path('cartId');
      const productIdPath = CartItemSchema.path('productId');
      
      expect(cartIdPath.options.index).toBe(true);
      expect(productIdPath.options.index).toBe(true);
    });
  });

  describe('Cart Creation - Happy Path', () => {
    it('should create a valid cart with required fields', async () => {
      const cart = await Cart.create({
        userId,
      });

      expect(cart._id).toBeDefined();
      expect(cart.userId.toString()).toBe(userId.toString());
      expect(cart.createdAt).toBeInstanceOf(Date);
      expect(cart.updatedAt).toBeInstanceOf(Date);
    });

    it('should create multiple carts for different users', async () => {
      const user2 = await User.create({
        name: 'User 2',
        email: 'user2@example.com',
        passwordHash: 'hash123',
      });

      const cart1 = await Cart.create({ userId });
      const cart2 = await Cart.create({ userId: user2._id });

      expect(cart1.userId.toString()).toBe(userId.toString());
      expect(cart2.userId.toString()).toBe(user2._id.toString());
    });
  });

  describe('Cart Required Field Validation', () => {
    it('should fail without userId', async () => {
      await expect(Cart.create({})).rejects.toThrow();
    });

    it('should fail with invalid userId', async () => {
      await expect(
        Cart.create({ userId: 'invalid' as any })
      ).rejects.toThrow();
    });
  });

  describe('CartItem Creation - Happy Path', () => {
    beforeEach(async () => {
      const cart = await Cart.create({ userId });
      cartId = cart._id;
    });

    it('should create a valid cart item with required fields', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 2,
      });

      expect(cartItem._id).toBeDefined();
      expect(cartItem.cartId.toString()).toBe(cartId.toString());
      expect(cartItem.productId.toString()).toBe(productId.toString());
      expect(cartItem.quantity).toBe(2);
      expect(cartItem.createdAt).toBeInstanceOf(Date);
      expect(cartItem.updatedAt).toBeInstanceOf(Date);
    });

    it('should default quantity to 1', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
      });

      expect(cartItem.quantity).toBe(1);
    });

    it('should create multiple cart items', async () => {
      const product2 = await Product.create({
        title: 'Product 2',
        slug: 'product-2',
        price: 49.99,
        categoryId: (await Category.findOne())!._id,
        createdBy: userId,
      });

      const item1 = await CartItem.create({
        cartId,
        productId,
        quantity: 1,
      });

      const item2 = await CartItem.create({
        cartId,
        productId: product2._id,
        quantity: 3,
      });

      expect(item1.cartId.toString()).toBe(item2.cartId.toString());
      expect(item1.productId.toString()).not.toBe(item2.productId.toString());
    });
  });

  describe('CartItem Quantity Validation', () => {
    beforeEach(async () => {
      const cart = await Cart.create({ userId });
      cartId = cart._id;
    });

    it('should accept positive quantities', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 5,
      });

      expect(cartItem.quantity).toBe(5);
    });

    it('should accept quantity of 1', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 1,
      });

      expect(cartItem.quantity).toBe(1);
    });

    it('should reject quantity of 0', async () => {
      await expect(
        CartItem.create({
          cartId,
          productId,
          quantity: 0,
        })
      ).rejects.toThrow();
    });

    it('should reject negative quantities', async () => {
      await expect(
        CartItem.create({
          cartId,
          productId,
          quantity: -1,
        })
      ).rejects.toThrow();
    });

    it('should handle large quantities', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 1000,
      });

      expect(cartItem.quantity).toBe(1000);
    });
  });

  describe('CartItem Required Field Validation', () => {
    beforeEach(async () => {
      const cart = await Cart.create({ userId });
      cartId = cart._id;
    });

    it('should fail without cartId', async () => {
      await expect(
        CartItem.create({
          productId,
          quantity: 1,
        })
      ).rejects.toThrow();
    });

    it('should fail without productId', async () => {
      await expect(
        CartItem.create({
          cartId,
          quantity: 1,
        })
      ).rejects.toThrow();
    });
  });

  describe('Cart Update Operations', () => {
    it('should update cart timestamp on modification', async () => {
      const cart = await Cart.create({ userId });
      const originalUpdatedAt = cart.updatedAt;

      await new Promise(resolve => setTimeout(resolve, 10));

      cart.userId = userId; // Trigger update
      await cart.save();

      expect(cart.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
    });
  });

  describe('CartItem Update Operations', () => {
    beforeEach(async () => {
      const cart = await Cart.create({ userId });
      cartId = cart._id;
    });

    it('should update cart item quantity', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 1,
      });

      cartItem.quantity = 5;
      await cartItem.save();

      const updated = await CartItem.findById(cartItem._id);
      expect(updated?.quantity).toBe(5);
    });

    it('should update timestamps on modification', async () => {
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity: 1,
      });

      const originalUpdatedAt = cartItem.updatedAt;
      
      await new Promise(resolve => setTimeout(resolve, 10));
      
      cartItem.quantity = 3;
      await cartItem.save();

      expect(cartItem.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('Cart Query Operations', () => {
    beforeEach(async () => {
      const user2 = await User.create({
        name: 'User 2',
        email: 'user2@example.com',
        passwordHash: 'hash123',
      });

      await Cart.create([
        { userId },
        { userId: user2._id },
      ]);
    });

    it('should find cart by userId', async () => {
      const cart = await Cart.findOne({ userId });
      expect(cart).not.toBeNull();
      expect(cart?.userId.toString()).toBe(userId.toString());
    });

    it('should count all carts', async () => {
      const count = await Cart.countDocuments();
      expect(count).toBe(2);
    });

    it('should populate userId', async () => {
      const cart = await Cart.findOne({ userId }).populate('userId');
      expect(cart).not.toBeNull();
      if (cart?.userId && typeof cart.userId !== 'string') {
        const user = cart.userId as any;
        expect(user.email).toBe('test@example.com');
      }
    });
  });

  describe('CartItem Query Operations', () => {
    beforeEach(async () => {
      const cart = await Cart.create({ userId });
      cartId = cart._id;

      const category = await Category.findOne();
      const products = await Product.create([
        { title: 'P1', slug: 'p1', price: 10, categoryId: category!._id, createdBy: userId },
        { title: 'P2', slug: 'p2', price: 20, categoryId: category!._id, createdBy: userId },
      ]);

      await CartItem.create([
        { cartId, productId: products[0]._id, quantity: 2 },
        { cartId, productId: products[1]._id, quantity: 3 },
      ]);
    });

    it('should find all items in a cart', async () => {
      const items = await CartItem.find({ cartId });
      expect(items).toHaveLength(2);
    });

    it('should find specific product in cart', async () => {
      const item = await CartItem.findOne({ cartId, productId });
      expect(item).not.toBeNull();
    });

    it('should populate cart reference', async () => {
      const item = await CartItem.findOne({ cartId }).populate('cartId');
      expect(item).not.toBeNull();
      if (item?.cartId && typeof item.cartId !== 'string') {
        const cart = item.cartId as any;
        expect(cart.userId.toString()).toBe(userId.toString());
      }
    });

    it('should populate product reference', async () => {
      const item = await CartItem.findOne({ cartId }).populate('productId');
      expect(item).not.toBeNull();
      if (item?.productId && typeof item.productId !== 'string') {
        const product = item.productId as any;
        expect(product.title).toBeDefined();
      }
    });

    it('should count items in cart', async () => {
      const count = await CartItem.countDocuments({ cartId });
      expect(count).toBe(2);
    });
  });

  describe('Delete Operations', () => {
    it('should delete cart successfully', async () => {
      const cart = await Cart.create({ userId });
      await Cart.deleteOne({ _id: cart._id });

      const found = await Cart.findById(cart._id);
      expect(found).toBeNull();
    });

    it('should delete cart item successfully', async () => {
      const cart = await Cart.create({ userId });
      const cartItem = await CartItem.create({
        cartId: cart._id,
        productId,
        quantity: 1,
      });

      await CartItem.deleteOne({ _id: cartItem._id });

      const found = await CartItem.findById(cartItem._id);
      expect(found).toBeNull();
    });

    it('should not cascade delete cart items when cart is deleted', async () => {
      const cart = await Cart.create({ userId });
      const cartItem = await CartItem.create({
        cartId: cart._id,
        productId,
        quantity: 1,
      });

      await Cart.deleteOne({ _id: cart._id });

      const foundItem = await CartItem.findById(cartItem._id);
      expect(foundItem).not.toBeNull();
    });

    it('should delete all items in a cart', async () => {
      const cart = await Cart.create({ userId });
      
      await CartItem.create([
        { cartId: cart._id, productId, quantity: 1 },
        { cartId: cart._id, productId, quantity: 2 },
      ]);

      await CartItem.deleteMany({ cartId: cart._id });

      const items = await CartItem.find({ cartId: cart._id });
      expect(items).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle cart with no items', async () => {
      const cart = await Cart.create({ userId });
      const items = await CartItem.find({ cartId: cart._id });
      
      expect(items).toHaveLength(0);
    });

    it('should handle same product in different carts', async () => {
      const user2 = await User.create({
        name: 'User 2',
        email: 'user2@example.com',
        passwordHash: 'hash123',
      });

      const cart1 = await Cart.create({ userId });
      const cart2 = await Cart.create({ userId: user2._id });

      const item1 = await CartItem.create({
        cartId: cart1._id,
        productId,
        quantity: 2,
      });

      const item2 = await CartItem.create({
        cartId: cart2._id,
        productId,
        quantity: 3,
      });

      expect(item1.productId.toString()).toBe(item2.productId.toString());
      expect(item1.cartId.toString()).not.toBe(item2.cartId.toString());
    });

    it('should handle very large quantity', async () => {
      const cart = await Cart.create({ userId });
      const cartItem = await CartItem.create({
        cartId: cart._id,
        productId,
        quantity: Number.MAX_SAFE_INTEGER,
      });

      expect(cartItem.quantity).toBe(Number.MAX_SAFE_INTEGER);
    });
  });
});