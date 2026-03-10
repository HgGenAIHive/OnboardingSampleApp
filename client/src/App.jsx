import React, { useState, useEffect } from 'react';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'customer-info', label: 'Customer Info' },
  { id: 'data-mapping', label: 'Data Mapping' },
  { id: 'tenant-setup', label: 'Tenant Setup' },
  { id: 'import', label: 'Import' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [onboardingData, setOnboardingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  function refreshOnboardingData() {
    return fetch('/api/onboarding')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid response format');
        return data;
      })
      .then(data => {
        setOnboardingData(data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch onboarding data:', err);
        setError(err.message);
        setOnboardingData([]);
        setLoading(false);
      });
  }

  useEffect(() => {
    refreshOnboardingData();
  }, []);

  function handleSelectCustomer(customerId) {
    setSelectedCustomerId(customerId);
    setActiveTab('customer-info');
  }

  return (
    <div className="app">
      <header>
        <h1>Onboarding Dashboard</h1>
        <p>Customer Success Team - Internal Tool</p>
      </header>

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'dashboard' && (
          <DashboardTab data={onboardingData} loading={loading} error={error} onSelectCustomer={handleSelectCustomer} />
        )}
        {activeTab === 'customer-info' && (
          <CustomerInfoTab customerId={selectedCustomerId} onSave={refreshOnboardingData} />
        )}
        {activeTab === 'data-mapping' && (
          <PlaceholderTab title="Data Mapping" description="Map customer data to platform configuration" />
        )}
        {activeTab === 'tenant-setup' && (
          <PlaceholderTab title="Tenant Setup" description="Provision and configure customer tenant" />
        )}
        {activeTab === 'import' && (
          <PlaceholderTab title="Import" description="Import customer data into the platform" />
        )}
      </main>
    </div>
  );
}

function DashboardTab({ data, loading, error, onSelectCustomer }) {
  if (loading) {
    return <div className="placeholder"><p>Loading...</p></div>;
  }

  if (error) {
    return (
      <div className="placeholder">
        <p style={{ color: '#dc2626' }}>⚠️ Failed to load onboarding data</p>
        <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="placeholder"><p>No customers in the onboarding queue</p></div>;
  }

  return (
    <div>
      <h2>Onboarding Queue</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        {data.length} customer(s) awaiting onboarding
      </p>

      {data.map(item => (
        <div
          key={item.customerId}
          className="customer-card clickable"
          onClick={() => onSelectCustomer(item.customerId)}
        >
          <h3>{item.customerName}</h3>
          <div className="customer-meta">
            <span>📍 {item.customerRegion}</span>
            <span>🏭 {item.customerIndustry}</span>
          </div>

          <div className="progress-section">
            <ProgressBar percent={item.progressPercent} />
            <Checklist steps={item.steps} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomerInfoTab({ customerId, onSave }) {
  const [form, setForm] = useState({ name: '', industry: '', region: '', contactEmail: '' });
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!customerId) return;
    setLoadingCustomer(true);
    setMessage(null);
    fetch(`/api/customers/${customerId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setForm({
          name: data.name || '',
          industry: data.industry || '',
          region: data.region || '',
          contactEmail: data.contactEmail || ''
        });
        setLoadingCustomer(false);
      })
      .catch(err => {
        setMessage({ type: 'error', text: `Failed to load customer: ${err.message}` });
        setLoadingCustomer(false);
      });
  }, [customerId]);

  if (!customerId) {
    return (
      <div className="placeholder">
        <h2>Customer Info</h2>
        <p>Please select a customer from the Dashboard to view their information.</p>
      </div>
    );
  }

  if (loadingCustomer) {
    return <div className="placeholder"><p>Loading customer...</p></div>;
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    fetch(`/api/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        setMessage({ type: 'success', text: 'Customer information saved successfully.' });
        setSaving(false);
        onSave();
      })
      .catch(err => {
        setMessage({ type: 'error', text: `Failed to save: ${err.message}` });
        setSaving(false);
      });
  }

  return (
    <div>
      <h2>Customer Info</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Edit customer details and save to mark this step as complete.
      </p>

      {message && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input id="industry" name="industry" type="text" value={form.industry} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <input id="region" name="region" type="text" value={form.region} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input id="contactEmail" name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Customer Info'}
        </button>
      </form>
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${Math.max(percent, 0)}%` }}
      >
        {percent > 0 ? `${percent}%` : ''}
      </div>
    </div>
  );
}

function Checklist({ steps }) {
  return (
    <ul className="checklist">
      {steps.map(step => (
        <li key={step.id}>
          <span className={`step-status ${step.status}`}>
            {step.status === 'completed' ? '✓' : step.order}
          </span>
          <span>{step.name}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#9ca3af' }}>
            {step.status.replace('_', ' ')}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlaceholderTab({ title, description }) {
  return (
    <div className="placeholder">
      <h2>{title}</h2>
      <p>{description}</p>
      <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
        🚧 This section is ready to be built
      </p>
    </div>
  );
}

export default App;
