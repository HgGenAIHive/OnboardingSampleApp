# Canonical Data Model

This document describes the target data model for the accounting application. Source customer data must be mapped to these entities during the onboarding process.

## Design Principles

The canonical model uses consistent conventions that differ from typical source data formats to ensure meaningful mapping work during onboarding:

- **Naming Convention**: PascalCase for all entity and field names
- **Identifiers**: UUID format for all primary keys
- **Dates**: ISO 8601 format with timezone (YYYY-MM-DDTHH:MM:SSZ)
- **Standards**: ISO 4217 for currencies, E.164 for phone numbers

## Entities

### Organization

Represents a business client that the accountant manages. This entity maps from source "Client", "clients", or "customers" data.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| OrganizationId | UUID | Yes | Primary key |
| DisplayName | String | Yes | Common business name |
| LegalName | String | No | Registered legal name |
| OrganizationType | Enum | Yes | Legal structure (see enum below) |
| LifecycleStatus | Enum | Yes | Current engagement status |
| EngagementStartDate | DateTime | Yes | When client relationship began |
| TaxIdentifier | String | No | Tax ID number |
| TaxIdentifierType | Enum | No | Type of tax ID |
| AnnualRevenueAmount | Decimal | No | Yearly revenue figure |
| AnnualRevenueCurrency | String | No | ISO 4217 currency code |
| IndustryCode | String | No | NAICS industry code |
| IndustryDescription | String | No | Industry name |
| DefaultPaymentTermsDays | Integer | No | Payment terms in days |
| BillingCurrency | String | No | Default billing currency |
| PrimaryContactId | UUID | No | FK to primary Contact |
| CreatedAt | DateTime | Yes | Record creation timestamp |
| UpdatedAt | DateTime | Yes | Last update timestamp |

### Contact

Represents individuals associated with an Organization.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ContactId | UUID | Yes | Primary key |
| OrganizationId | UUID | Yes | FK to Organization |
| GivenName | String | Yes | First name |
| FamilyName | String | Yes | Last name |
| EmailAddress | String | No | Email address |
| PhoneNumber | String | No | E.164 format phone number |
| PhoneType | Enum | No | Type of phone number |
| JobTitle | String | No | Role/position |
| Department | Enum | No | Business department |
| ContactStatus | Enum | Yes | Current status |
| PreferredChannel | Enum | No | Communication preference |
| IsPrimary | Boolean | No | Primary contact flag |
| CreatedAt | DateTime | Yes | Record creation timestamp |
| UpdatedAt | DateTime | Yes | Last update timestamp |

### ChartOfAccount

Represents a financial account in the chart of accounts.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| AccountId | UUID | Yes | Primary key |
| AccountCode | String | Yes | Hierarchical code (e.g., 1000.10.01) |
| AccountName | String | Yes | Display name |
| AccountClass | Enum | Yes | Top-level classification |
| AccountType | Enum | Yes | Secondary classification |
| AccountSubType | String | No | Tertiary classification |
| NormalBalance | Enum | Yes | Debit or Credit |
| IsActive | Boolean | Yes | Account is usable |
| IsSystemAccount | Boolean | No | System-managed account |
| Description | String | No | Account description |
| ParentAccountId | UUID | No | FK to parent account |
| TaxCode | String | No | Associated tax code |
| ReportingCategory | String | No | Financial reporting group |
| DisplayOrder | Integer | No | Sort order |

### JournalEntry

Represents the header of a financial transaction.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| EntryId | UUID | Yes | Primary key |
| OrganizationId | UUID | Yes | FK to Organization |
| EntryDate | DateTime | Yes | Transaction date |
| PostingDate | DateTime | No | When posted to ledger |
| EntryNumber | String | Yes | Sequential reference |
| Description | String | No | Transaction description |
| EntryType | Enum | No | Type of journal entry |
| EntryStatus | Enum | Yes | Processing status |
| SourceDocument | String | No | Reference number |
| SourceDocumentType | Enum | No | Type of source document |
| TotalDebitAmount | Decimal | Yes | Sum of debit lines |
| TotalCreditAmount | Decimal | Yes | Sum of credit lines |
| Currency | String | Yes | ISO 4217 currency code |
| CreatedAt | DateTime | Yes | Record creation timestamp |
| UpdatedAt | DateTime | Yes | Last update timestamp |
| PostedBy | String | No | User who posted |
| ApprovedBy | String | No | User who approved |

### JournalEntryLine

Represents individual debit/credit lines within a journal entry.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| LineId | UUID | Yes | Primary key |
| EntryId | UUID | Yes | FK to JournalEntry |
| AccountId | UUID | Yes | FK to ChartOfAccount |
| LineDescription | String | No | Line-level description |
| DebitAmount | Decimal | No | Debit amount (null if credit) |
| CreditAmount | Decimal | No | Credit amount (null if debit) |
| Currency | String | Yes | ISO 4217 currency code |
| ExchangeRate | Decimal | No | FX rate if multi-currency |
| TaxCode | String | No | Tax treatment code |
| CostCenter | String | No | Cost allocation |
| Project | String | No | Project reference |
| LineOrder | Integer | Yes | Display sequence |

## Enums

### OrganizationType

Legal structure of the business.

| Value | Description |
|-------|-------------|
| CORPORATION | C-Corporation |
| S_CORPORATION | S-Corporation |
| LLC | Limited Liability Company |
| LLP | Limited Liability Partnership |
| PARTNERSHIP | General Partnership |
| SOLE_PROPRIETORSHIP | Sole Proprietorship / Sole Trader |
| NONPROFIT | Non-Profit Organization |
| OTHER | Other entity type |

### LifecycleStatus

Current engagement status of the organization.

| Value | Description |
|-------|-------------|
| PROSPECT | Potential client, not yet engaged |
| ONBOARDING | Currently being set up |
| ACTIVE | Current active client |
| ON_HOLD | Temporarily paused engagement |
| CHURNED | Former client, relationship ended |
| ARCHIVED | Historical record only |

### TaxIdentifierType

Type of tax identification number.

| Value | Description |
|-------|-------------|
| EIN | US Employer Identification Number |
| SSN | US Social Security Number |
| UTR | UK Unique Taxpayer Reference |
| VAT | VAT Registration Number |
| OTHER | Other tax identifier type |

### ContactStatus

Current status of a contact.

| Value | Description |
|-------|-------------|
| ACTIVE | Contact is active and reachable |
| INACTIVE | Contact is no longer active |
| PENDING | Contact pending verification |
| BOUNCED | Email has bounced |
| UNSUBSCRIBED | Contact has unsubscribed |

### PhoneType

Type of phone number.

| Value | Description |
|-------|-------------|
| MOBILE | Mobile/cell phone |
| WORK | Work/office phone |
| HOME | Home phone |
| FAX | Fax number |

### Department

Business department classification.

| Value | Description |
|-------|-------------|
| EXECUTIVE | Executive/C-suite |
| FINANCE | Finance/Accounting |
| OPERATIONS | Operations |
| SALES | Sales |
| LEGAL | Legal |
| ADMINISTRATION | Administration/Admin |
| CLINICAL | Clinical (healthcare) |
| TECHNOLOGY | Technology/IT |
| CREATIVE | Creative/Design |
| MANAGEMENT | Management |
| OTHER | Other department |

### PreferredChannel

Preferred communication channel.

| Value | Description |
|-------|-------------|
| EMAIL | Email communication |
| PHONE | Phone calls |
| SMS | Text messages |
| MAIL | Physical mail |
| PORTAL | Customer portal |

### AccountClass

Top-level financial account classification.

| Value | Description |
|-------|-------------|
| ASSET | Asset accounts |
| LIABILITY | Liability accounts |
| EQUITY | Equity accounts |
| REVENUE | Revenue/Income accounts |
| EXPENSE | Expense accounts |

### AccountType

Secondary financial account classification.

| Value | AccountClass | Description |
|-------|--------------|-------------|
| CURRENT_ASSET | ASSET | Short-term assets |
| FIXED_ASSET | ASSET | Long-term assets |
| CONTRA_ASSET | ASSET | Contra asset accounts |
| CURRENT_LIABILITY | LIABILITY | Short-term liabilities |
| LONG_TERM_LIABILITY | LIABILITY | Long-term liabilities |
| OWNERS_EQUITY | EQUITY | Owner's capital |
| RETAINED_EARNINGS | EQUITY | Accumulated profits |
| DRAWINGS | EQUITY | Owner withdrawals |
| OPERATING_REVENUE | REVENUE | Core business revenue |
| OTHER_REVENUE | REVENUE | Non-operating revenue |
| COST_OF_SALES | EXPENSE | Direct costs |
| OPERATING_EXPENSE | EXPENSE | Indirect operating costs |
| OTHER_EXPENSE | EXPENSE | Non-operating expenses |

### NormalBalance

Normal balance type for accounts.

| Value | Description |
|-------|-------------|
| DEBIT | Account normally has debit balance |
| CREDIT | Account normally has credit balance |

### EntryType

Type of journal entry.

| Value | Description |
|-------|-------------|
| STANDARD | Normal transaction entry |
| ADJUSTING | Period-end adjustment |
| CLOSING | Year-end closing entry |
| REVERSING | Reversal of previous entry |

### EntryStatus

Processing status of a journal entry.

| Value | Description |
|-------|-------------|
| DRAFT | Entry is being prepared |
| PENDING_APPROVAL | Awaiting approval |
| APPROVED | Approved but not posted |
| POSTED | Posted to the ledger |
| REVERSED | Entry has been reversed |

### SourceDocumentType

Type of source document for a transaction.

| Value | Description |
|-------|-------------|
| INVOICE | Sales invoice |
| BILL | Vendor bill/purchase invoice |
| PAYMENT | Payment record |
| RECEIPT | Receipt record |
| JOURNAL | Manual journal entry |
| PAYROLL | Payroll transaction |
| BANK_FEED | Bank feed import |
| OTHER | Other document type |

## Usage

Import the canonical model in your code:

```javascript
const {
  // Enums
  OrganizationType,
  LifecycleStatus,
  ContactStatus,
  AccountClass,
  AccountType,
  NormalBalance,
  EntryStatus,
  // Factory functions
  createOrganization,
  createContact,
  createChartOfAccount,
  createJournalEntry,
  createJournalEntryLine
} = require('./canonical');

// Create a new organization
const org = createOrganization({
  DisplayName: 'Acme Corporation',
  OrganizationType: OrganizationType.CORPORATION,
  LifecycleStatus: LifecycleStatus.ONBOARDING
});
```
