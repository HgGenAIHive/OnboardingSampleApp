const { describe, it } = require('node:test');
const assert = require('node:assert');
const { 
  createCustomer, 
  createTenant, 
  createDefaultOnboardingSteps, 
  calculateProgress 
} = require('./index');

describe('Domain Models', () => {
  describe('createCustomer', () => {
    it('should create a customer with provided data', () => {
      const customer = createCustomer({
        id: 'test_123',
        name: 'Test Corp',
        industry: 'Tech',
        region: 'EMEA'
      });

      assert.strictEqual(customer.id, 'test_123');
      assert.strictEqual(customer.name, 'Test Corp');
      assert.strictEqual(customer.industry, 'Tech');
      assert.strictEqual(customer.region, 'EMEA');
    });

    it('should generate default values for missing fields', () => {
      const customer = createCustomer({});

      assert.ok(customer.id.startsWith('cust_'));
      assert.strictEqual(customer.name, '');
      assert.ok(customer.createdAt);
    });
  });

  describe('calculateProgress', () => {
    it('should return 0 for empty steps', () => {
      assert.strictEqual(calculateProgress([]), 0);
      assert.strictEqual(calculateProgress(null), 0);
    });

    it('should calculate correct percentage', () => {
      const steps = [
        { status: 'completed' },
        { status: 'completed' },
        { status: 'pending' },
        { status: 'pending' }
      ];
      assert.strictEqual(calculateProgress(steps), 50);
    });

    it('should return 100 when all steps completed', () => {
      const steps = [
        { status: 'completed' },
        { status: 'completed' }
      ];
      assert.strictEqual(calculateProgress(steps), 100);
    });
  });

  describe('createDefaultOnboardingSteps', () => {
    it('should create 4 default steps', () => {
      const steps = createDefaultOnboardingSteps();
      
      assert.strictEqual(steps.length, 4);
      assert.strictEqual(steps[0].name, 'Customer Info');
      assert.strictEqual(steps[3].name, 'Import');
    });

    it('should set all steps to pending status', () => {
      const steps = createDefaultOnboardingSteps();
      
      steps.forEach(step => {
        assert.strictEqual(step.status, 'pending');
      });
    });
  });
});
