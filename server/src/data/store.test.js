const { describe, it } = require('node:test');
const assert = require('node:assert');
const store = require('./store');

describe('Data Store', () => {
  describe('seed data', () => {
    it('should seed the onboarding queue with sample customers', () => {
      const customers = store.getCustomers();
      const names = customers.map(c => c.name);

      assert.ok(names.includes('Acme Corporation'));
      assert.ok(names.includes('ABC Accounting'));
      assert.ok(names.includes('XYZ Financial Services'));
      assert.ok(names.includes('Premier Bookkeeping'));
    });

    it('should give every seeded customer a tenant and onboarding state', () => {
      const customers = store.getCustomers();

      customers.forEach(customer => {
        assert.ok(store.getTenantByCustomerId(customer.id), `expected tenant for ${customer.name}`);
        assert.ok(store.getOnboardingState(customer.id), `expected onboarding state for ${customer.name}`);
      });
    });
  });

  describe('addCustomer / removeCustomer', () => {
    it('should add a customer and make it retrievable', () => {
      const customer = store.addCustomer({ id: 'cust_test_add', name: 'Test Co' });

      assert.strictEqual(store.getCustomerById('cust_test_add'), customer);

      store.removeCustomer('cust_test_add');
    });

    it('should remove a customer along with its tenant and onboarding state', () => {
      const customer = store.addCustomer({ id: 'cust_test_remove', name: 'Removable Co' });
      store.addTenant({ id: 'tenant_test_remove', customerId: customer.id });
      store.addOnboardingState({ customerId: customer.id, steps: [], progressPercent: 0 });

      const removed = store.removeCustomer(customer.id);

      assert.strictEqual(removed, true);
      assert.strictEqual(store.getCustomerById(customer.id), undefined);
      assert.strictEqual(store.getTenantByCustomerId(customer.id), undefined);
      assert.strictEqual(store.getOnboardingState(customer.id), undefined);
    });

    it('should return false when removing a customer that does not exist', () => {
      const removed = store.removeCustomer('cust_does_not_exist');
      assert.strictEqual(removed, false);
    });
  });
});
