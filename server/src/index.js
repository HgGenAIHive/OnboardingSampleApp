const express = require('express');
const cors = require('cors');
const store = require('./data/store');
const { calculateProgress } = require('./models');

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

// Update customer
app.put('/api/customers/:id', (req, res) => {
  const { name, industry, region, contactEmail } = req.body;
  const updated = store.updateCustomer(req.params.id, { name, industry, region, contactEmail });
  if (!updated) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  // Mark Customer Info step as completed
  const onboardingState = store.getOnboardingState(req.params.id);
  if (onboardingState) {
    const steps = onboardingState.steps.map(s =>
      s.id === 'step_1' ? { ...s, status: 'completed' } : s
    );
    store.updateOnboardingState(req.params.id, {
      steps,
      progressPercent: calculateProgress(steps)
    });
  }

  res.json(updated);
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
