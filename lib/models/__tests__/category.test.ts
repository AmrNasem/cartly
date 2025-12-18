import mongoose from 'mongoose';
import Category, { ICategory, CategorySchema } from '../category';

describe('Category Model', () => {
  describe('Schema Definition', () => {
    it('should have correct schema structure', () => {
      const paths = CategorySchema.paths;
      
      expect(paths.name).toBeDefined();
      expect(paths.name.instance).toBe('String');
      expect(paths.name.isRequired).toBe(true);
      
      expect(paths.slug).toBeDefined();
      expect(paths.slug.instance).toBe('String');
      expect(paths.slug.isRequired).toBe(true);
      
      expect(paths.description).toBeDefined();
      expect(paths.description.instance).toBe('String');
      
      expect(paths.parentId).toBeDefined();
    });

    it('should have timestamps enabled', () => {
      expect(CategorySchema.options.timestamps).toBe(true);
    });

    it('should have versionKey disabled', () => {
      expect(CategorySchema.options.versionKey).toBe(false);
    });

    it('should have slug as unique index', () => {
      const slugPath = CategorySchema.path('slug');
      expect(slugPath.options.unique).toBe(true);
      expect(slugPath.options.index).toBe(true);
    });
  });

  describe('Document Creation - Happy Path', () => {
    it('should create a valid category with required fields', async () => {
      const categoryData = {
        name: 'Electronics',
        slug: 'electronics',
      };

      const category = await Category.create(categoryData);

      expect(category._id).toBeDefined();
      expect(category.name).toBe('Electronics');
      expect(category.slug).toBe('electronics');
      expect(category.description).toBe('');
      expect(category.parentId).toBeNull();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.updatedAt).toBeInstanceOf(Date);
    });

    it('should create category with description', async () => {
      const categoryData = {
        name: 'Electronics',
        slug: 'electronics',
        description: 'All electronic items',
      };

      const category = await Category.create(categoryData);

      expect(category.description).toBe('All electronic items');
    });

    it('should create subcategory with parentId', async () => {
      const parent = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      const subcategory = await Category.create({
        name: 'Laptops',
        slug: 'laptops',
        parentId: parent._id,
      });

      expect(subcategory.parentId?.toString()).toBe(parent._id.toString());
    });

    it('should default parentId to null', async () => {
      const category = await Category.create({
        name: 'Root Category',
        slug: 'root',
      });

      expect(category.parentId).toBeNull();
    });

    it('should default description to empty string', async () => {
      const category = await Category.create({
        name: 'Test',
        slug: 'test',
      });

      expect(category.description).toBe('');
    });
  });

  describe('Field Validation and Transformation', () => {
    it('should trim whitespace from name', async () => {
      const category = await Category.create({
        name: '  Electronics  ',
        slug: 'electronics',
      });

      expect(category.name).toBe('Electronics');
    });

    it('should convert slug to lowercase', async () => {
      const category = await Category.create({
        name: 'Electronics',
        slug: 'ELECTRONICS',
      });

      expect(category.slug).toBe('electronics');
    });

    it('should trim whitespace from slug', async () => {
      const category = await Category.create({
        name: 'Electronics',
        slug: '  electronics  ',
      });

      expect(category.slug).toBe('electronics');
    });

    it('should combine lowercase and trim for slug', async () => {
      const category = await Category.create({
        name: 'Electronics',
        slug: '  ELECTRONICS  ',
      });

      expect(category.slug).toBe('electronics');
    });

    it('should handle slug with hyphens', async () => {
      const category = await Category.create({
        name: 'Consumer Electronics',
        slug: 'consumer-electronics',
      });

      expect(category.slug).toBe('consumer-electronics');
    });

    it('should handle slug with numbers', async () => {
      const category = await Category.create({
        name: '3D Printers',
        slug: '3d-printers',
      });

      expect(category.slug).toBe('3d-printers');
    });
  });

  describe('Required Field Validation', () => {
    it('should fail without name', async () => {
      const categoryData = {
        slug: 'test',
      };

      await expect(Category.create(categoryData)).rejects.toThrow();
    });

    it('should fail without slug', async () => {
      const categoryData = {
        name: 'Test',
      };

      await expect(Category.create(categoryData)).rejects.toThrow();
    });

    it('should fail with empty name', async () => {
      const categoryData = {
        name: '',
        slug: 'test',
      };

      await expect(Category.create(categoryData)).rejects.toThrow();
    });

    it('should fail with empty slug', async () => {
      const categoryData = {
        name: 'Test',
        slug: '',
      };

      await expect(Category.create(categoryData)).rejects.toThrow();
    });
  });

  describe('Unique Constraints', () => {
    it('should enforce unique slug constraint', async () => {
      await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      await expect(
        Category.create({
          name: 'Electronics Duplicate',
          slug: 'electronics',
        })
      ).rejects.toThrow();
    });

    it('should enforce unique slug case-insensitively', async () => {
      await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      await expect(
        Category.create({
          name: 'Electronics Upper',
          slug: 'ELECTRONICS',
        })
      ).rejects.toThrow();
    });

    it('should allow same name with different slugs', async () => {
      const cat1 = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      const cat2 = await Category.create({
        name: 'Electronics',
        slug: 'electronics-2',
      });

      expect(cat1.name).toBe(cat2.name);
      expect(cat1.slug).not.toBe(cat2.slug);
    });
  });

  describe('Hierarchical Relationships', () => {
    it('should create multi-level category hierarchy', async () => {
      const root = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      const level1 = await Category.create({
        name: 'Computers',
        slug: 'computers',
        parentId: root._id,
      });

      const level2 = await Category.create({
        name: 'Laptops',
        slug: 'laptops',
        parentId: level1._id,
      });

      expect(level2.parentId?.toString()).toBe(level1._id.toString());
      expect(level1.parentId?.toString()).toBe(root._id.toString());
      expect(root.parentId).toBeNull();
    });

    it('should populate parent category', async () => {
      const parent = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
        description: 'Parent category',
      });

      const child = await Category.create({
        name: 'Laptops',
        slug: 'laptops',
        parentId: parent._id,
      });

      const populated = await Category.findById(child._id).populate('parentId');
      expect(populated?.parentId).toBeDefined();
      if (populated?.parentId && typeof populated.parentId !== 'string') {
        const parentDoc = populated.parentId as any;
        expect(parentDoc.name).toBe('Electronics');
      }
    });

    it('should find all root categories', async () => {
      await Category.create([
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Clothing', slug: 'clothing' },
      ]);

      const parent = await Category.create({
        name: 'Parent',
        slug: 'parent',
      });

      await Category.create({
        name: 'Child',
        slug: 'child',
        parentId: parent._id,
      });

      const rootCategories = await Category.find({ parentId: null });
      expect(rootCategories).toHaveLength(3);
    });

    it('should find all subcategories of a parent', async () => {
      const parent = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
      });

      await Category.create([
        { name: 'Laptops', slug: 'laptops', parentId: parent._id },
        { name: 'Phones', slug: 'phones', parentId: parent._id },
        { name: 'Tablets', slug: 'tablets', parentId: parent._id },
      ]);

      const subcategories = await Category.find({ parentId: parent._id });
      expect(subcategories).toHaveLength(3);
    });
  });

  describe('Update Operations', () => {
    it('should update category fields', async () => {
      const category = await Category.create({
        name: 'Original',
        slug: 'original',
      });

      category.name = 'Updated';
      category.description = 'New description';
      await category.save();

      const updated = await Category.findById(category._id);
      expect(updated?.name).toBe('Updated');
      expect(updated?.description).toBe('New description');
    });

    it('should update slug', async () => {
      const category = await Category.create({
        name: 'Test',
        slug: 'test',
      });

      category.slug = 'test-updated';
      await category.save();

      const updated = await Category.findById(category._id);
      expect(updated?.slug).toBe('test-updated');
    });

    it('should update parentId', async () => {
      const parent1 = await Category.create({
        name: 'Parent 1',
        slug: 'parent-1',
      });

      const parent2 = await Category.create({
        name: 'Parent 2',
        slug: 'parent-2',
      });

      const child = await Category.create({
        name: 'Child',
        slug: 'child',
        parentId: parent1._id,
      });

      child.parentId = parent2._id;
      await child.save();

      const updated = await Category.findById(child._id);
      expect(updated?.parentId?.toString()).toBe(parent2._id.toString());
    });
  });

  describe('Query Operations', () => {
    beforeEach(async () => {
      const electronics = await Category.create({
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic items',
      });

      await Category.create([
        { name: 'Clothing', slug: 'clothing' },
        { name: 'Laptops', slug: 'laptops', parentId: electronics._id },
      ]);
    });

    it('should find category by slug', async () => {
      const category = await Category.findOne({ slug: 'electronics' });
      expect(category).not.toBeNull();
      expect(category?.name).toBe('Electronics');
    });

    it('should find category by name', async () => {
      const category = await Category.findOne({ name: 'Clothing' });
      expect(category).not.toBeNull();
      expect(category?.slug).toBe('clothing');
    });

    it('should count all categories', async () => {
      const count = await Category.countDocuments();
      expect(count).toBe(3);
    });

    it('should search by description', async () => {
      const categories = await Category.find({
        description: /electronic/i,
      });
      expect(categories).toHaveLength(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long names', async () => {
      const longName = 'A'.repeat(1000);
      const category = await Category.create({
        name: longName,
        slug: 'long-slug',
      });

      expect(category.name).toBe(longName);
    });

    it('should handle very long descriptions', async () => {
      const longDescription = 'Description '.repeat(500);
      const category = await Category.create({
        name: 'Test',
        slug: 'test',
        description: longDescription,
      });

      expect(category.description).toBe(longDescription);
    });

    it('should handle special characters in name', async () => {
      const category = await Category.create({
        name: 'Electronics & Gadgets (New!)',
        slug: 'electronics-gadgets',
      });

      expect(category.name).toBe('Electronics & Gadgets (New!)');
    });

    it('should handle unicode in name', async () => {
      const category = await Category.create({
        name: '电子产品 Electronics 日本語',
        slug: 'electronics-unicode',
      });

      expect(category.name).toBe('电子产品 Electronics 日本語');
    });

    it('should handle empty description', async () => {
      const category = await Category.create({
        name: 'Test',
        slug: 'test',
        description: '',
      });

      expect(category.description).toBe('');
    });
  });

  describe('Delete Operations', () => {
    it('should delete category successfully', async () => {
      const category = await Category.create({
        name: 'To Delete',
        slug: 'to-delete',
      });

      await Category.deleteOne({ _id: category._id });

      const found = await Category.findById(category._id);
      expect(found).toBeNull();
    });

    it('should not cascade delete children when parent is deleted', async () => {
      const parent = await Category.create({
        name: 'Parent',
        slug: 'parent',
      });

      const child = await Category.create({
        name: 'Child',
        slug: 'child',
        parentId: parent._id,
      });

      await Category.deleteOne({ _id: parent._id });

      const foundChild = await Category.findById(child._id);
      expect(foundChild).not.toBeNull();
      expect(foundChild?.parentId?.toString()).toBe(parent._id.toString());
    });
  });
});