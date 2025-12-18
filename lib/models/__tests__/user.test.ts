import mongoose from 'mongoose';
import User, { IUser, UserSchema, Role } from '../user';

describe('User Model', () => {
  describe('Schema Definition', () => {
    it('should have correct schema structure', () => {
      const paths = UserSchema.paths;
      
      expect(paths.name).toBeDefined();
      expect(paths.name.instance).toBe('String');
      expect(paths.name.isRequired).toBe(true);
      
      expect(paths.email).toBeDefined();
      expect(paths.email.instance).toBe('String');
      expect(paths.email.isRequired).toBe(true);
      
      expect(paths.passwordHash).toBeDefined();
      expect(paths.passwordHash.instance).toBe('String');
      expect(paths.passwordHash.isRequired).toBe(true);
      
      expect(paths.role).toBeDefined();
      expect(paths.role.instance).toBe('String');
      
      expect(paths.isActive).toBeDefined();
      expect(paths.isActive.instance).toBe('Boolean');
    });

    it('should have timestamps enabled', () => {
      expect(UserSchema.options.timestamps).toBe(true);
    });

    it('should have versionKey disabled', () => {
      expect(UserSchema.options.versionKey).toBe(false);
    });

    it('should have email as unique index', () => {
      const emailPath = UserSchema.path('email');
      expect(emailPath.options.unique).toBe(true);
      expect(emailPath.options.index).toBe(true);
    });
  });

  describe('Document Creation - Happy Path', () => {
    it('should create a valid user with all required fields', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
        role: 'user' as Role,
      };

      const user = await User.create(userData);

      expect(user._id).toBeDefined();
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.passwordHash).toBe('hashedpassword123');
      expect(user.role).toBe('user');
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should create user with admin role', async () => {
      const userData = {
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: 'hashedpassword123',
        role: 'admin' as Role,
      };

      const user = await User.create(userData);

      expect(user.role).toBe('admin');
      expect(user.isActive).toBe(true);
    });

    it('should create user with super_admin role', async () => {
      const userData = {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        passwordHash: 'hashedpassword123',
        role: 'super_admin' as Role,
      };

      const user = await User.create(userData);

      expect(user.role).toBe('super_admin');
    });

    it('should default role to user when not specified', async () => {
      const userData = {
        name: 'Default User',
        email: 'default@example.com',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.role).toBe('user');
    });

    it('should default isActive to true', async () => {
      const userData = {
        name: 'Active User',
        email: 'active@example.com',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.isActive).toBe(true);
    });

    it('should allow setting isActive to false', async () => {
      const userData = {
        name: 'Inactive User',
        email: 'inactive@example.com',
        passwordHash: 'hashedpassword123',
        isActive: false,
      };

      const user = await User.create(userData);

      expect(user.isActive).toBe(false);
    });
  });

  describe('Field Validation and Transformation', () => {
    it('should trim whitespace from name', async () => {
      const userData = {
        name: '  John Doe  ',
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.name).toBe('John Doe');
    });

    it('should convert email to lowercase', async () => {
      const userData = {
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.email).toBe('john@example.com');
    });

    it('should trim whitespace from email', async () => {
      const userData = {
        name: 'John Doe',
        email: '  john@example.com  ',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.email).toBe('john@example.com');
    });

    it('should combine lowercase and trim for email', async () => {
      const userData = {
        name: 'John Doe',
        email: '  JOHN@EXAMPLE.COM  ',
        passwordHash: 'hashedpassword123',
      };

      const user = await User.create(userData);

      expect(user.email).toBe('john@example.com');
    });
  });

  describe('Required Field Validation', () => {
    it('should fail without name', async () => {
      const userData = {
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should fail without email', async () => {
      const userData = {
        name: 'John Doe',
        passwordHash: 'hashedpassword123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should fail without passwordHash', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should fail with empty name', async () => {
      const userData = {
        name: '',
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should fail with empty email', async () => {
      const userData = {
        name: 'John Doe',
        email: '',
        passwordHash: 'hashedpassword123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('Unique Constraints', () => {
    it('should enforce unique email constraint', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
      };

      await User.create(userData);

      const duplicateUser = {
        name: 'Jane Doe',
        email: 'john@example.com',
        passwordHash: 'differenthash456',
      };

      await expect(User.create(duplicateUser)).rejects.toThrow();
    });

    it('should enforce unique email case-insensitively', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedpassword123',
      };

      await User.create(userData);

      const duplicateUser = {
        name: 'Jane Doe',
        email: 'JOHN@EXAMPLE.COM',
        passwordHash: 'differenthash456',
      };

      await expect(User.create(duplicateUser)).rejects.toThrow();
    });
  });

  describe('Role Enum Validation', () => {
    it('should accept valid user role', async () => {
      const userData = {
        name: 'User Role',
        email: 'user@example.com',
        passwordHash: 'hash123',
        role: 'user' as Role,
      };

      const user = await User.create(userData);
      expect(user.role).toBe('user');
    });

    it('should accept valid admin role', async () => {
      const userData = {
        name: 'Admin Role',
        email: 'admin@example.com',
        passwordHash: 'hash123',
        role: 'admin' as Role,
      };

      const user = await User.create(userData);
      expect(user.role).toBe('admin');
    });

    it('should accept valid super_admin role', async () => {
      const userData = {
        name: 'Super Admin Role',
        email: 'superadmin@example.com',
        passwordHash: 'hash123',
        role: 'super_admin' as Role,
      };

      const user = await User.create(userData);
      expect(user.role).toBe('super_admin');
    });

    it('should reject invalid role', async () => {
      const userData = {
        name: 'Invalid Role',
        email: 'invalid@example.com',
        passwordHash: 'hash123',
        role: 'invalid_role' as any,
      };

      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('Update Operations', () => {
    it('should update user fields correctly', async () => {
      const user = await User.create({
        name: 'Original Name',
        email: 'original@example.com',
        passwordHash: 'hash123',
      });

      user.name = 'Updated Name';
      user.isActive = false;
      await user.save();

      const updated = await User.findById(user._id);
      expect(updated?.name).toBe('Updated Name');
      expect(updated?.isActive).toBe(false);
    });

    it('should update timestamps on save', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash: 'hash123',
      });

      const originalUpdatedAt = user.updatedAt;
      
      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));
      
      user.name = 'Updated Name';
      await user.save();

      expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('Query Operations', () => {
    beforeEach(async () => {
      await User.create([
        { name: 'User 1', email: 'user1@example.com', passwordHash: 'hash1', role: 'user' },
        { name: 'User 2', email: 'user2@example.com', passwordHash: 'hash2', role: 'admin' },
        { name: 'User 3', email: 'user3@example.com', passwordHash: 'hash3', role: 'user', isActive: false },
      ]);
    });

    it('should find user by email', async () => {
      const user = await User.findOne({ email: 'user1@example.com' });
      expect(user).not.toBeNull();
      expect(user?.name).toBe('User 1');
    });

    it('should find all active users', async () => {
      const users = await User.find({ isActive: true });
      expect(users).toHaveLength(2);
    });

    it('should find users by role', async () => {
      const admins = await User.find({ role: 'admin' });
      expect(admins).toHaveLength(1);
      expect(admins[0].email).toBe('user2@example.com');
    });

    it('should count users', async () => {
      const count = await User.countDocuments();
      expect(count).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long names', async () => {
      const longName = 'A'.repeat(1000);
      const userData = {
        name: longName,
        email: 'long@example.com',
        passwordHash: 'hash123',
      };

      const user = await User.create(userData);
      expect(user.name).toBe(longName);
    });

    it('should handle special characters in name', async () => {
      const userData = {
        name: "O'Brien-Smith José María",
        email: 'special@example.com',
        passwordHash: 'hash123',
      };

      const user = await User.create(userData);
      expect(user.name).toBe("O'Brien-Smith José María");
    });

    it('should handle complex email formats', async () => {
      const userData = {
        name: 'Test User',
        email: 'test+tag@sub.example.co.uk',
        passwordHash: 'hash123',
      };

      const user = await User.create(userData);
      expect(user.email).toBe('test+tag@sub.example.co.uk');
    });

    it('should handle unicode in password hash', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        passwordHash: 'hash123$%^&*()[]{}|\\;:\'",.<>?/🔒',
      };

      const user = await User.create(userData);
      expect(user.passwordHash).toBe('hash123$%^&*()[]{}|\\;:\'",.<>?/🔒');
    });
  });

  describe('Delete Operations', () => {
    it('should delete user successfully', async () => {
      const user = await User.create({
        name: 'To Delete',
        email: 'delete@example.com',
        passwordHash: 'hash123',
      });

      await User.deleteOne({ _id: user._id });

      const found = await User.findById(user._id);
      expect(found).toBeNull();
    });

    it('should handle soft delete by updating isActive', async () => {
      const user = await User.create({
        name: 'To Soft Delete',
        email: 'soft@example.com',
        passwordHash: 'hash123',
      });

      await User.updateOne({ _id: user._id }, { isActive: false });

      const found = await User.findById(user._id);
      expect(found?.isActive).toBe(false);
    });
  });
});