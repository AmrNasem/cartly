import mongoose from 'mongoose';
import Product, { IProduct, ProductSchema, ProductImageSchema, IProductImage } from '../product';
import Category from '../category';
import User from '../user';

describe('Product Model', () => {
  let categoryId: mongoose.Types.ObjectId;
  let userId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const category = await Category.create({
      name: 'Test Category',
      slug: 'test-category',
    });
    categoryId = category._id;

    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: 'hash123',
    });
    userId = user._id;
  });

  describe('Schema Definition', () => {
    it('should have correct schema structure', () => {
      const paths = ProductSchema.paths;
      
      expect(paths.title).toBeDefined();
      expect(paths.title.instance).toBe('String');
      expect(paths.title.isRequired).toBe(true);
      
      expect(paths.slug).toBeDefined();
      expect(paths.slug.instance).toBe('String');
      expect(paths.slug.isRequired).toBe(true);
      
      expect(paths.price).toBeDefined();
      expect(paths.price.instance).toBe('Number');
      expect(paths.price.isRequired).toBe(true);
      
      expect(paths.stock).toBeDefined();
      expect(paths.stock.instance).toBe('Number');
      
      expect(paths.categoryId).toBeDefined();
      expect(paths.createdBy).toBeDefined();
      expect(paths.isPublished).toBeDefined();
      expect(paths.images).toBeDefined();
    });

    it('should have timestamps enabled', () => {
      expect(ProductSchema.options.timestamps).toBe(true);
    });

    it('should have versionKey disabled', () => {
      expect(ProductSchema.options.versionKey).toBe(false);
    });

    it('should have slug as unique index', () => {
      const slugPath = ProductSchema.path('slug');
      expect(slugPath.options.unique).toBe(true);
      expect(slugPath.options.index).toBe(true);
    });
  });

  describe('ProductImage SubDocument Schema', () => {
    it('should have correct image schema structure', () => {
      const paths = ProductImageSchema.paths;
      
      expect(paths.url).toBeDefined();
      expect(paths.url.instance).toBe('String');
      expect(paths.url.isRequired).toBe(true);
      
      expect(paths.alt).toBeDefined();
      expect(paths.order).toBeDefined();
    });

    it('should generate _id for subdocuments', () => {
      expect(ProductImageSchema.options._id).toBe(true);
    });
  });

  describe('Document Creation - Happy Path', () => {
    it('should create a valid product with required fields', async () => {
      const productData = {
        title: 'Test Product',
        slug: 'test-product',
        price: 99.99,
        categoryId,
        createdBy: userId,
      };

      const product = await Product.create(productData);

      expect(product._id).toBeDefined();
      expect(product.title).toBe('Test Product');
      expect(product.slug).toBe('test-product');
      expect(product.price).toBe(99.99);
      expect(product.stock).toBe(0);
      expect(product.compareAtPrice).toBe(0);
      expect(product.isPublished).toBe(false);
      expect(product.description).toBe('');
      expect(product.images).toEqual([]);
      expect(product.categoryId.toString()).toBe(categoryId.toString());
      expect(product.createdBy.toString()).toBe(userId.toString());
      expect(product.createdAt).toBeInstanceOf(Date);
      expect(product.updatedAt).toBeInstanceOf(Date);
    });

    it('should create product with all optional fields', async () => {
      const productData = {
        title: 'Full Product',
        slug: 'full-product',
        description: 'Complete description',
        price: 99.99,
        compareAtPrice: 149.99,
        stock: 50,
        categoryId,
        createdBy: userId,
        isPublished: true,
        images: [
          { url: 'https://example.com/image1.jpg', alt: 'Image 1', order: 1 },
          { url: 'https://example.com/image2.jpg', alt: 'Image 2', order: 2 },
        ],
      };

      const product = await Product.create(productData);

      expect(product.description).toBe('Complete description');
      expect(product.compareAtPrice).toBe(149.99);
      expect(product.stock).toBe(50);
      expect(product.isPublished).toBe(true);
      expect(product.images).toHaveLength(2);
      expect(product.images[0].url).toBe('https://example.com/image1.jpg');
      expect(product.images[0].alt).toBe('Image 1');
      expect(product.images[0].order).toBe(1);
    });

    it('should default isPublished to false', async () => {
      const product = await Product.create({
        title: 'Draft Product',
        slug: 'draft-product',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.isPublished).toBe(false);
    });

    it('should default stock to 0', async () => {
      const product = await Product.create({
        title: 'No Stock Product',
        slug: 'no-stock',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.stock).toBe(0);
    });

    it('should default compareAtPrice to 0', async () => {
      const product = await Product.create({
        title: 'No Compare Price',
        slug: 'no-compare',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.compareAtPrice).toBe(0);
    });
  });

  describe('Field Validation and Transformation', () => {
    it('should trim whitespace from title', async () => {
      const product = await Product.create({
        title: '  Test Product  ',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.title).toBe('Test Product');
    });

    it('should convert slug to lowercase', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'TEST-PRODUCT',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.slug).toBe('test-product');
    });

    it('should trim whitespace from slug', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: '  test-product  ',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.slug).toBe('test-product');
    });

    it('should trim image URLs', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
        images: [{ url: '  https://example.com/image.jpg  ' }],
      });

      expect(product.images[0].url).toBe('https://example.com/image.jpg');
    });
  });

  describe('Required Field Validation', () => {
    it('should fail without title', async () => {
      await expect(
        Product.create({
          slug: 'test',
          price: 50,
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should fail without slug', async () => {
      await expect(
        Product.create({
          title: 'Test',
          price: 50,
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should fail without price', async () => {
      await expect(
        Product.create({
          title: 'Test',
          slug: 'test',
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should fail without categoryId', async () => {
      await expect(
        Product.create({
          title: 'Test',
          slug: 'test',
          price: 50,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should fail without createdBy', async () => {
      await expect(
        Product.create({
          title: 'Test',
          slug: 'test',
          price: 50,
          categoryId,
        })
      ).rejects.toThrow();
    });
  });

  describe('Price Validation', () => {
    it('should accept valid price', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 99.99,
        categoryId,
        createdBy: userId,
      });

      expect(product.price).toBe(99.99);
    });

    it('should accept price of 0', async () => {
      const product = await Product.create({
        title: 'Free Product',
        slug: 'free',
        price: 0,
        categoryId,
        createdBy: userId,
      });

      expect(product.price).toBe(0);
    });

    it('should reject negative price', async () => {
      await expect(
        Product.create({
          title: 'Test',
          slug: 'test',
          price: -10,
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should handle decimal prices correctly', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 99.999,
        categoryId,
        createdBy: userId,
      });

      expect(product.price).toBeCloseTo(99.999, 3);
    });
  });

  describe('Stock Validation', () => {
    it('should accept positive stock', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        stock: 100,
        categoryId,
        createdBy: userId,
      });

      expect(product.stock).toBe(100);
    });

    it('should accept stock of 0', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        stock: 0,
        categoryId,
        createdBy: userId,
      });

      expect(product.stock).toBe(0);
    });

    it('should handle large stock numbers', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        stock: 1000000,
        categoryId,
        createdBy: userId,
      });

      expect(product.stock).toBe(1000000);
    });
  });

  describe('Image Subdocuments', () => {
    it('should create product with single image', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
        images: [{ url: 'https://example.com/image.jpg' }],
      });

      expect(product.images).toHaveLength(1);
      expect(product.images[0]._id).toBeDefined();
      expect(product.images[0].url).toBe('https://example.com/image.jpg');
      expect(product.images[0].alt).toBe('');
      expect(product.images[0].order).toBe(0);
    });

    it('should create product with multiple images', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
        images: [
          { url: 'https://example.com/1.jpg', alt: 'First', order: 1 },
          { url: 'https://example.com/2.jpg', alt: 'Second', order: 2 },
          { url: 'https://example.com/3.jpg', alt: 'Third', order: 3 },
        ],
      });

      expect(product.images).toHaveLength(3);
      expect(product.images[0].order).toBe(1);
      expect(product.images[1].order).toBe(2);
      expect(product.images[2].order).toBe(3);
    });

    it('should require url for images', async () => {
      await expect(
        Product.create({
          title: 'Test',
          slug: 'test',
          price: 50,
          categoryId,
          createdBy: userId,
          images: [{ alt: 'No URL' } as any],
        })
      ).rejects.toThrow();
    });

    it('should default image alt to empty string', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
        images: [{ url: 'https://example.com/image.jpg' }],
      });

      expect(product.images[0].alt).toBe('');
    });

    it('should default image order to 0', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
        images: [{ url: 'https://example.com/image.jpg' }],
      });

      expect(product.images[0].order).toBe(0);
    });
  });

  describe('Unique Constraints', () => {
    it('should enforce unique slug', async () => {
      await Product.create({
        title: 'Product 1',
        slug: 'same-slug',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      await expect(
        Product.create({
          title: 'Product 2',
          slug: 'same-slug',
          price: 60,
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });

    it('should enforce unique slug case-insensitively', async () => {
      await Product.create({
        title: 'Product 1',
        slug: 'unique-slug',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      await expect(
        Product.create({
          title: 'Product 2',
          slug: 'UNIQUE-SLUG',
          price: 60,
          categoryId,
          createdBy: userId,
        })
      ).rejects.toThrow();
    });
  });

  describe('Update Operations', () => {
    it('should update product fields', async () => {
      const product = await Product.create({
        title: 'Original',
        slug: 'original',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      product.title = 'Updated';
      product.price = 75;
      product.stock = 10;
      await product.save();

      const updated = await Product.findById(product._id);
      expect(updated?.title).toBe('Updated');
      expect(updated?.price).toBe(75);
      expect(updated?.stock).toBe(10);
    });

    it('should add images to existing product', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      product.images.push({ url: 'https://example.com/new.jpg', alt: 'New Image' });
      await product.save();

      const updated = await Product.findById(product._id);
      expect(updated?.images).toHaveLength(1);
    });

    it('should update isPublished status', async () => {
      const product = await Product.create({
        title: 'Draft',
        slug: 'draft',
        price: 50,
        categoryId,
        createdBy: userId,
        isPublished: false,
      });

      product.isPublished = true;
      await product.save();

      const updated = await Product.findById(product._id);
      expect(updated?.isPublished).toBe(true);
    });
  });

  describe('Query Operations', () => {
    beforeEach(async () => {
      await Product.create([
        { title: 'Product 1', slug: 'product-1', price: 100, isPublished: true, categoryId, createdBy: userId },
        { title: 'Product 2', slug: 'product-2', price: 200, isPublished: true, categoryId, createdBy: userId },
        { title: 'Product 3', slug: 'product-3', price: 50, isPublished: false, categoryId, createdBy: userId, stock: 0 },
      ]);
    });

    it('should find product by slug', async () => {
      const product = await Product.findOne({ slug: 'product-1' });
      expect(product).not.toBeNull();
      expect(product?.title).toBe('Product 1');
    });

    it('should find published products', async () => {
      const products = await Product.find({ isPublished: true });
      expect(products).toHaveLength(2);
    });

    it('should find products by category', async () => {
      const products = await Product.find({ categoryId });
      expect(products).toHaveLength(3);
    });

    it('should find products in price range', async () => {
      const products = await Product.find({ price: { $gte: 50, $lte: 150 } });
      expect(products).toHaveLength(2);
    });

    it('should find products in stock', async () => {
      await Product.updateMany({ slug: { $in: ['product-1', 'product-2'] } }, { stock: 10 });
      const products = await Product.find({ stock: { $gt: 0 } });
      expect(products).toHaveLength(2);
    });
  });

  describe('Population', () => {
    it('should populate categoryId', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      const populated = await Product.findById(product._id).populate('categoryId');
      expect(populated?.categoryId).toBeDefined();
      if (populated?.categoryId && typeof populated.categoryId !== 'string') {
        const category = populated.categoryId as any;
        expect(category.name).toBe('Test Category');
      }
    });

    it('should populate createdBy', async () => {
      const product = await Product.create({
        title: 'Test',
        slug: 'test',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      const populated = await Product.findById(product._id).populate('createdBy');
      expect(populated?.createdBy).toBeDefined();
      if (populated?.createdBy && typeof populated.createdBy !== 'string') {
        const user = populated.createdBy as any;
        expect(user.email).toBe('test@example.com');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long titles', async () => {
      const longTitle = 'A'.repeat(1000);
      const product = await Product.create({
        title: longTitle,
        slug: 'long',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.title).toBe(longTitle);
    });

    it('should handle unicode in title', async () => {
      const product = await Product.create({
        title: '电子产品 Product 日本語 🔥',
        slug: 'unicode',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      expect(product.title).toBe('电子产品 Product 日本語 🔥');
    });

    it('should handle very high prices', async () => {
      const product = await Product.create({
        title: 'Expensive',
        slug: 'expensive',
        price: 999999999.99,
        categoryId,
        createdBy: userId,
      });

      expect(product.price).toBe(999999999.99);
    });

    it('should handle many images', async () => {
      const images = Array.from({ length: 20 }, (_, i) => ({
        url: `https://example.com/image${i}.jpg`,
        alt: `Image ${i}`,
        order: i,
      }));

      const product = await Product.create({
        title: 'Many Images',
        slug: 'many-images',
        price: 50,
        categoryId,
        createdBy: userId,
        images,
      });

      expect(product.images).toHaveLength(20);
    });
  });

  describe('Delete Operations', () => {
    it('should delete product successfully', async () => {
      const product = await Product.create({
        title: 'To Delete',
        slug: 'to-delete',
        price: 50,
        categoryId,
        createdBy: userId,
      });

      await Product.deleteOne({ _id: product._id });

      const found = await Product.findById(product._id);
      expect(found).toBeNull();
    });
  });
});