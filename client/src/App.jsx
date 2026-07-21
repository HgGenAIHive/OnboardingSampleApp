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

  const refreshOnboardingData = () => {
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
  };

  useEffect(() => {
    refreshOnboardingData();
  }, []);

  const handleRemoveCustomer = async (customerId) => {
    try {
      const res = await fetch(`/api/customers/${customerId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refreshOnboardingData();
    } catch (err) {
      console.error('Failed to remove customer:', err);
      window.alert(`Failed to remove customer: ${err.message}`);
    }
  };

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
          <DashboardTab data={onboardingData} loading={loading} error={error} onRemoveCustomer={handleRemoveCustomer} />
        )}
        {activeTab === 'customer-info' && (
          <CustomerInfoTab onCustomerAdded={refreshOnboardingData} />
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

function DashboardTab({ data, loading, error, onRemoveCustomer }) {
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
        <div key={item.customerId} className="customer-card">
          <div className="customer-card-header">
            <h3>{item.customerName}</h3>
            <button
              className="remove-button"
              onClick={() => {
                if (window.confirm(`Remove ${item.customerName} from the onboarding queue?`)) {
                  onRemoveCustomer(item.customerId);
                }
              }}
            >
              Remove
            </button>
          </div>
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

function CustomerInfoTab({ onCustomerAdded }) {
  const [form, setForm] = useState({ name: '', industry: '', region: '', contactEmail: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Customer name is required');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const created = await res.json();
      setSuccessMessage(`${created.name} added to the onboarding queue`);
      setForm({ name: '', industry: '', region: '', contactEmail: '' });
      await onCustomerAdded();
    } catch (err) {
      console.error('Failed to add customer:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Customer Info</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Add a new customer to the onboarding queue</p>

      <form className="customer-form" onSubmit={handleSubmit}>
        <label>
          Name*
          <input type="text" value={form.name} onChange={handleChange('name')} required />
        </label>
        <label>
          Industry
          <input type="text" value={form.industry} onChange={handleChange('industry')} />
        </label>
        <label>
          Region
          <input type="text" value={form.region} onChange={handleChange('region')} />
        </label>
        <label>
          Contact Email
          <input type="email" value={form.contactEmail} onChange={handleChange('contactEmail')} />
        </label>

        {error && <p style={{ color: '#dc2626' }}>⚠️ {error}</p>}
        {successMessage && <p style={{ color: '#10b981' }}>✓ {successMessage}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add Customer'}
        </button>
      </form>
    </div>
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
