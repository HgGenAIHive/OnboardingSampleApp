/**
 * In-Memory Data Store
 * Simple storage for the training exercise - no database needed
 */

const { createCustomer, createTenant, createDefaultOnboardingSteps } = require('../models');

// In-memory storage
const store = {
  customers: [],
  tenants: [],
  onboardingStates: []
};

// Sample customers awaiting onboarding, sourced from sample-data/
const SEED_CUSTOMERS = [
  {
    id: 'cust_001',
    name: 'Acme Corporation',
    industry: 'Manufacturing',
    region: 'North America',
    contactEmail: 'onboarding@acme.example.com',
    createdAt: '2025-01-15T10:00:00Z',
    tenantPlan: 'professional'
  },
  {
    id: 'cust_002',
    name: 'ABC Accounting',
    industry: 'Accounting',
    region: 'North America',
    contactEmail: 'onboarding@abcaccounting.example.com',
    createdAt: '2025-02-01T10:00:00Z',
    tenantPlan: 'professional'
  },
  {
    id: 'cust_003',
    name: 'XYZ Financial Services',
    industry: 'Accounting',
    region: 'North America',
    contactEmail: 'onboarding@xyzfinancial.example.com',
    createdAt: '2025-02-10T10:00:00Z',
    tenantPlan: 'enterprise'
  },
  {
    id: 'cust_004',
    name: 'Premier Bookkeeping',
    industry: 'Accounting',
    region: 'EMEA',
    contactEmail: 'onboarding@premierbookkeeping.example.com',
    createdAt: '2025-02-18T10:00:00Z',
    tenantPlan: 'starter'
  }
];

// Seed with example data
function seedData() {
  SEED_CUSTOMERS.forEach((seed, index) => {
    const customer = createCustomer({
      id: seed.id,
      name: seed.name,
      industry: seed.industry,
      region: seed.region,
      contactEmail: seed.contactEmail,
      createdAt: seed.createdAt
    });

    const tenant = createTenant({
      id: `tenant_00${index + 1}`,
      customerId: seed.id,
      status: 'pending',
      plan: seed.tenantPlan,
      createdAt: seed.createdAt
    });

    const onboardingState = {
      customerId: seed.id,
      steps: createDefaultOnboardingSteps(),
      progressPercent: 0
    };

    store.customers.push(customer);
    store.tenants.push(tenant);
    store.onboardingStates.push(onboardingState);
  });
}

// Initialize with seed data
seedData();

// Store access functions
function getCustomers() {
  return [...store.customers];
}

function getCustomerById(id) {
  return store.customers.find(c => c.id === id);
}

function addCustomer(customer) {
  store.customers.push(customer);
  return customer;
}

function removeCustomer(id) {
  const index = store.customers.findIndex(c => c.id === id);
  if (index === -1) {
    return false;
  }

  store.customers.splice(index, 1);
  store.tenants = store.tenants.filter(t => t.customerId !== id);
  store.onboardingStates = store.onboardingStates.filter(s => s.customerId !== id);
  return true;
}

function getTenants() {
  return [...store.tenants];
}

function getTenantByCustomerId(customerId) {
  return store.tenants.find(t => t.customerId === customerId);
}

function addTenant(tenant) {
  store.tenants.push(tenant);
  return tenant;
}

function getOnboardingState(customerId) {
  return store.onboardingStates.find(s => s.customerId === customerId);
}

function getAllOnboardingStates() {
  return [...store.onboardingStates];
}

function addOnboardingState(state) {
  store.onboardingStates.push(state);
  return state;
}

function updateOnboardingState(customerId, updates) {
  const index = store.onboardingStates.findIndex(s => s.customerId === customerId);
  if (index !== -1) {
    store.onboardingStates[index] = { ...store.onboardingStates[index], ...updates };
    return store.onboardingStates[index];
  }
  return null;
}

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  removeCustomer,
  getTenants,
  getTenantByCustomerId,
  addTenant,
  getOnboardingState,
  getAllOnboardingStates,
  addOnboardingState,
  updateOnboardingState
};
