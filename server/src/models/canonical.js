/**
 * Canonical Data Model for Target Accounting Application
 * 
 * This module defines the target schema that source customer data
 * must be mapped to during the onboarding process. The schema uses
 * PascalCase naming conventions and standardized enum values.
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Organization type enum - legal structure of the business
 * @readonly
 * @enum {string}
 */
const OrganizationType = {
  CORPORATION: 'CORPORATION',
  S_CORPORATION: 'S_CORPORATION',
  LLC: 'LLC',
  LLP: 'LLP',
  PARTNERSHIP: 'PARTNERSHIP',
  SOLE_PROPRIETORSHIP: 'SOLE_PROPRIETORSHIP',
  NONPROFIT: 'NONPROFIT',
  OTHER: 'OTHER'
};

/**
 * Organization lifecycle status enum
 * @readonly
 * @enum {string}
 */
const LifecycleStatus = {
  PROSPECT: 'PROSPECT',
  ONBOARDING: 'ONBOARDING',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  CHURNED: 'CHURNED',
  ARCHIVED: 'ARCHIVED'
};

/**
 * Tax identifier type enum
 * @readonly
 * @enum {string}
 */
const TaxIdentifierType = {
  EIN: 'EIN',           // US Employer Identification Number
  SSN: 'SSN',           // US Social Security Number
  UTR: 'UTR',           // UK Unique Taxpayer Reference
  VAT: 'VAT',           // VAT Registration Number
  OTHER: 'OTHER'
};

/**
 * Contact status enum
 * @readonly
 * @enum {string}
 */
const ContactStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  BOUNCED: 'BOUNCED',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
};

/**
 * Phone type enum
 * @readonly
 * @enum {string}
 */
const PhoneType = {
  MOBILE: 'MOBILE',
  WORK: 'WORK',
  HOME: 'HOME',
  FAX: 'FAX'
};

/**
 * Department enum - business unit classification
 * @readonly
 * @enum {string}
 */
const Department = {
  EXECUTIVE: 'EXECUTIVE',
  FINANCE: 'FINANCE',
  OPERATIONS: 'OPERATIONS',
  SALES: 'SALES',
  LEGAL: 'LEGAL',
  ADMINISTRATION: 'ADMINISTRATION',
  CLINICAL: 'CLINICAL',
  TECHNOLOGY: 'TECHNOLOGY',
  CREATIVE: 'CREATIVE',
  MANAGEMENT: 'MANAGEMENT',
  OTHER: 'OTHER'
};

/**
 * Preferred communication channel enum
 * @readonly
 * @enum {string}
 */
const PreferredChannel = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  SMS: 'SMS',
  MAIL: 'MAIL',
  PORTAL: 'PORTAL'
};

/**
 * Account class enum - top-level financial classification
 * @readonly
 * @enum {string}
 */
const AccountClass = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY',
  REVENUE: 'REVENUE',
  EXPENSE: 'EXPENSE'
};

/**
 * Account type enum - secondary financial classification
 * @readonly
 * @enum {string}
 */
const AccountType = {
  // Asset types
  CURRENT_ASSET: 'CURRENT_ASSET',
  FIXED_ASSET: 'FIXED_ASSET',
  CONTRA_ASSET: 'CONTRA_ASSET',
  // Liability types
  CURRENT_LIABILITY: 'CURRENT_LIABILITY',
  LONG_TERM_LIABILITY: 'LONG_TERM_LIABILITY',
  // Equity types
  OWNERS_EQUITY: 'OWNERS_EQUITY',
  RETAINED_EARNINGS: 'RETAINED_EARNINGS',
  DRAWINGS: 'DRAWINGS',
  // Revenue types
  OPERATING_REVENUE: 'OPERATING_REVENUE',
  OTHER_REVENUE: 'OTHER_REVENUE',
  // Expense types
  COST_OF_SALES: 'COST_OF_SALES',
  OPERATING_EXPENSE: 'OPERATING_EXPENSE',
  OTHER_EXPENSE: 'OTHER_EXPENSE'
};

/**
 * Normal balance enum - debit or credit
 * @readonly
 * @enum {string}
 */
const NormalBalance = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT'
};

/**
 * Journal entry type enum
 * @readonly
 * @enum {string}
 */
const EntryType = {
  STANDARD: 'STANDARD',
  ADJUSTING: 'ADJUSTING',
  CLOSING: 'CLOSING',
  REVERSING: 'REVERSING'
};

/**
 * Journal entry status enum
 * @readonly
 * @enum {string}
 */
const EntryStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  POSTED: 'POSTED',
  REVERSED: 'REVERSED'
};

/**
 * Source document type enum
 * @readonly
 * @enum {string}
 */
const SourceDocumentType = {
  INVOICE: 'INVOICE',
  BILL: 'BILL',
  PAYMENT: 'PAYMENT',
  RECEIPT: 'RECEIPT',
  JOURNAL: 'JOURNAL',
  PAYROLL: 'PAYROLL',
  BANK_FEED: 'BANK_FEED',
  OTHER: 'OTHER'
};

// ============================================================================
// ENTITY TYPE DEFINITIONS
// ============================================================================

/**
 * Organization entity - represents a business client
 * @typedef {Object} Organization
 * @property {string} OrganizationId - UUID primary key
 * @property {string} DisplayName - Common business name
 * @property {string} [LegalName] - Registered legal name
 * @property {OrganizationType} OrganizationType - Legal structure
 * @property {LifecycleStatus} LifecycleStatus - Current engagement status
 * @property {string} EngagementStartDate - ISO 8601 datetime
 * @property {string} [TaxIdentifier] - Tax ID number
 * @property {TaxIdentifierType} [TaxIdentifierType] - Type of tax ID
 * @property {number} [AnnualRevenueAmount] - Yearly revenue figure
 * @property {string} [AnnualRevenueCurrency] - ISO 4217 currency code
 * @property {string} [IndustryCode] - NAICS industry code
 * @property {string} [IndustryDescription] - Industry name
 * @property {number} [DefaultPaymentTermsDays] - Payment terms in days
 * @property {string} [BillingCurrency] - Default billing currency (ISO 4217)
 * @property {string} [PrimaryContactId] - FK to primary Contact
 * @property {string} CreatedAt - ISO 8601 timestamp
 * @property {string} UpdatedAt - ISO 8601 timestamp
 */

/**
 * Contact entity - represents individuals associated with an Organization
 * @typedef {Object} Contact
 * @property {string} ContactId - UUID primary key
 * @property {string} OrganizationId - FK to Organization
 * @property {string} GivenName - First name
 * @property {string} FamilyName - Last name
 * @property {string} [EmailAddress] - Email address
 * @property {string} [PhoneNumber] - E.164 format phone number
 * @property {PhoneType} [PhoneType] - Type of phone number
 * @property {string} [JobTitle] - Role/position
 * @property {Department} [Department] - Business department
 * @property {ContactStatus} ContactStatus - Current status
 * @property {PreferredChannel} [PreferredChannel] - Communication preference
 * @property {boolean} [IsPrimary] - Primary contact flag
 * @property {string} CreatedAt - ISO 8601 timestamp
 * @property {string} UpdatedAt - ISO 8601 timestamp
 */

/**
 * ChartOfAccount entity - represents a financial account
 * @typedef {Object} ChartOfAccount
 * @property {string} AccountId - UUID primary key
 * @property {string} AccountCode - Hierarchical code (e.g., 1000.10.01)
 * @property {string} AccountName - Display name
 * @property {AccountClass} AccountClass - Top-level classification
 * @property {AccountType} AccountType - Secondary classification
 * @property {string} [AccountSubType] - Tertiary classification
 * @property {NormalBalance} NormalBalance - Debit or Credit
 * @property {boolean} IsActive - Account is usable
 * @property {boolean} [IsSystemAccount] - System-managed account
 * @property {string} [Description] - Account description
 * @property {string} [ParentAccountId] - FK to parent account
 * @property {string} [TaxCode] - Associated tax code
 * @property {string} [ReportingCategory] - Financial reporting group
 * @property {number} [DisplayOrder] - Sort order
 */

/**
 * JournalEntry entity - represents a financial transaction header
 * @typedef {Object} JournalEntry
 * @property {string} EntryId - UUID primary key
 * @property {string} OrganizationId - FK to Organization
 * @property {string} EntryDate - ISO 8601 datetime
 * @property {string} [PostingDate] - ISO 8601 datetime when posted
 * @property {string} EntryNumber - Sequential reference
 * @property {string} [Description] - Transaction description
 * @property {EntryType} [EntryType] - Type of journal entry
 * @property {EntryStatus} EntryStatus - Processing status
 * @property {string} [SourceDocument] - Reference number
 * @property {SourceDocumentType} [SourceDocumentType] - Type of source document
 * @property {number} TotalDebitAmount - Sum of debit lines
 * @property {number} TotalCreditAmount - Sum of credit lines
 * @property {string} Currency - ISO 4217 currency code
 * @property {string} CreatedAt - ISO 8601 timestamp
 * @property {string} UpdatedAt - ISO 8601 timestamp
 * @property {string} [PostedBy] - User who posted
 * @property {string} [ApprovedBy] - User who approved
 */

/**
 * JournalEntryLine entity - represents a debit/credit line within a journal entry
 * @typedef {Object} JournalEntryLine
 * @property {string} LineId - UUID primary key
 * @property {string} EntryId - FK to JournalEntry
 * @property {string} AccountId - FK to ChartOfAccount
 * @property {string} [LineDescription] - Line-level description
 * @property {number} [DebitAmount] - Debit amount (null if credit)
 * @property {number} [CreditAmount] - Credit amount (null if debit)
 * @property {string} Currency - ISO 4217 currency code
 * @property {number} [ExchangeRate] - FX rate if multi-currency
 * @property {string} [TaxCode] - Tax treatment code
 * @property {string} [CostCenter] - Cost allocation
 * @property {string} [Project] - Project reference
 * @property {number} LineOrder - Display sequence
 */

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Generates a UUID v4
 * @returns {string}
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Creates a new Organization object
 * @param {Partial<Organization>} data
 * @returns {Organization}
 */
function createOrganization(data) {
  const now = new Date().toISOString();
  return {
    OrganizationId: data.OrganizationId || generateUUID(),
    DisplayName: data.DisplayName || '',
    LegalName: data.LegalName || null,
    OrganizationType: data.OrganizationType || OrganizationType.OTHER,
    LifecycleStatus: data.LifecycleStatus || LifecycleStatus.ONBOARDING,
    EngagementStartDate: data.EngagementStartDate || now,
    TaxIdentifier: data.TaxIdentifier || null,
    TaxIdentifierType: data.TaxIdentifierType || null,
    AnnualRevenueAmount: data.AnnualRevenueAmount || null,
    AnnualRevenueCurrency: data.AnnualRevenueCurrency || null,
    IndustryCode: data.IndustryCode || null,
    IndustryDescription: data.IndustryDescription || null,
    DefaultPaymentTermsDays: data.DefaultPaymentTermsDays || null,
    BillingCurrency: data.BillingCurrency || null,
    PrimaryContactId: data.PrimaryContactId || null,
    CreatedAt: data.CreatedAt || now,
    UpdatedAt: data.UpdatedAt || now
  };
}

/**
 * Creates a new Contact object
 * @param {Partial<Contact>} data
 * @returns {Contact}
 */
function createContact(data) {
  const now = new Date().toISOString();
  return {
    ContactId: data.ContactId || generateUUID(),
    OrganizationId: data.OrganizationId || '',
    GivenName: data.GivenName || '',
    FamilyName: data.FamilyName || '',
    EmailAddress: data.EmailAddress || null,
    PhoneNumber: data.PhoneNumber || null,
    PhoneType: data.PhoneType || null,
    JobTitle: data.JobTitle || null,
    Department: data.Department || null,
    ContactStatus: data.ContactStatus || ContactStatus.ACTIVE,
    PreferredChannel: data.PreferredChannel || null,
    IsPrimary: data.IsPrimary || false,
    CreatedAt: data.CreatedAt || now,
    UpdatedAt: data.UpdatedAt || now
  };
}

/**
 * Creates a new ChartOfAccount object
 * @param {Partial<ChartOfAccount>} data
 * @returns {ChartOfAccount}
 */
function createChartOfAccount(data) {
  return {
    AccountId: data.AccountId || generateUUID(),
    AccountCode: data.AccountCode || '',
    AccountName: data.AccountName || '',
    AccountClass: data.AccountClass || AccountClass.ASSET,
    AccountType: data.AccountType || AccountType.CURRENT_ASSET,
    AccountSubType: data.AccountSubType || null,
    NormalBalance: data.NormalBalance || NormalBalance.DEBIT,
    IsActive: data.IsActive !== undefined ? data.IsActive : true,
    IsSystemAccount: data.IsSystemAccount || false,
    Description: data.Description || null,
    ParentAccountId: data.ParentAccountId || null,
    TaxCode: data.TaxCode || null,
    ReportingCategory: data.ReportingCategory || null,
    DisplayOrder: data.DisplayOrder || null
  };
}

/**
 * Creates a new JournalEntry object
 * @param {Partial<JournalEntry>} data
 * @returns {JournalEntry}
 */
function createJournalEntry(data) {
  const now = new Date().toISOString();
  return {
    EntryId: data.EntryId || generateUUID(),
    OrganizationId: data.OrganizationId || '',
    EntryDate: data.EntryDate || now,
    PostingDate: data.PostingDate || null,
    EntryNumber: data.EntryNumber || '',
    Description: data.Description || null,
    EntryType: data.EntryType || EntryType.STANDARD,
    EntryStatus: data.EntryStatus || EntryStatus.DRAFT,
    SourceDocument: data.SourceDocument || null,
    SourceDocumentType: data.SourceDocumentType || null,
    TotalDebitAmount: data.TotalDebitAmount || 0,
    TotalCreditAmount: data.TotalCreditAmount || 0,
    Currency: data.Currency || 'USD',
    CreatedAt: data.CreatedAt || now,
    UpdatedAt: data.UpdatedAt || now,
    PostedBy: data.PostedBy || null,
    ApprovedBy: data.ApprovedBy || null
  };
}

/**
 * Creates a new JournalEntryLine object
 * @param {Partial<JournalEntryLine>} data
 * @returns {JournalEntryLine}
 */
function createJournalEntryLine(data) {
  return {
    LineId: data.LineId || generateUUID(),
    EntryId: data.EntryId || '',
    AccountId: data.AccountId || '',
    LineDescription: data.LineDescription || null,
    DebitAmount: data.DebitAmount || null,
    CreditAmount: data.CreditAmount || null,
    Currency: data.Currency || 'USD',
    ExchangeRate: data.ExchangeRate || 1.0,
    TaxCode: data.TaxCode || null,
    CostCenter: data.CostCenter || null,
    Project: data.Project || null,
    LineOrder: data.LineOrder || 1
  };
}

module.exports = {
  // Enums
  OrganizationType,
  LifecycleStatus,
  TaxIdentifierType,
  ContactStatus,
  PhoneType,
  Department,
  PreferredChannel,
  AccountClass,
  AccountType,
  NormalBalance,
  EntryType,
  EntryStatus,
  SourceDocumentType,
  // Factory functions
  generateUUID,
  createOrganization,
  createContact,
  createChartOfAccount,
  createJournalEntry,
  createJournalEntryLine
};
