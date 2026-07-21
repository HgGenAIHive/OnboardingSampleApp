const express = require('express');
const cors = require('cors');
const store = require('./data/store');
const { createCustomer, createTenant, createDefaultOnboardingSteps } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all customers
app.get('/api/customers', (req, res) => {
  res.json(store.getCustomers());
});

// Get customer by ID
app.get('/api/customers/:id', (req, res) => {
  const customer = store.getCustomerById(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// Add a new customer to the onboarding queue
app.post('/api/customers', (req, res) => {
  const { name, industry, region, contactEmail } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const customer = createCustomer({ name, industry, region, contactEmail });
  store.addCustomer(customer);

  const tenant = createTenant({ customerId: customer.id });
  store.addTenant(tenant);

  const onboardingState = {
    customerId: customer.id,
    steps: createDefaultOnboardingSteps(),
    progressPercent: 0
  };
  store.addOnboardingState(onboardingState);

  res.status(201).json(customer);
});

// Remove a customer from the onboarding queue
app.delete('/api/customers/:id', (req, res) => {
  const removed = store.removeCustomer(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.status(204).end();
});

// Get onboarding state for a customer
app.get('/api/customers/:id/onboarding', (req, res) => {
  const state = store.getOnboardingState(req.params.id);
  if (!state) {
    return res.status(404).json({ error: 'Onboarding state not found' });
  }
  res.json(state);
});

// Get all onboarding states (dashboard view)
app.get('/api/onboarding', (req, res) => {
  const states = store.getAllOnboardingStates();
  const customers = store.getCustomers();

  // Join customer info with onboarding state
  const dashboard = states.map(state => {
    const customer = customers.find(c => c.id === state.customerId);
    return {
      ...state,
      customerName: customer?.name || 'Unknown',
      customerIndustry: customer?.industry || '',
      customerRegion: customer?.region || ''
    };
  });

  res.json(dashboard);
});

// Get tenant by customer ID
app.get('/api/tenants/:customerId', (req, res) => {
  const tenant = store.getTenantByCustomerId(req.params.customerId);
  if (!tenant) {
    return res.status(404).json({ error: 'Tenant not found' });
  }
  res.json(tenant);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Onboarding API server running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
