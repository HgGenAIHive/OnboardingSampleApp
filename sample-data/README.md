# Sample Data for Onboarding Testing

This directory contains sample data from three fictional accounting customers, each using different data schemas and formats. This data is designed to test the onboarding application's ability to map varying schemas and data values to a target system.

## Customer Overview

| Customer | Folder | Industry Focus | Schema Style |
|----------|--------|----------------|--------------|
| ABC Accounting | CustomerA_ABCAccounting | General US businesses | Title Case columns, MM/DD/YYYY dates |
| XYZ Financial Services | CustomerB_XYZFinancialServices | Mixed US businesses | camelCase columns, YYYY-MM-DD dates |
| Premier Bookkeeping | CustomerC_PremierBookkeeping | UK businesses | snake_case columns, DD-MM-YYYY dates |

## Data Files

Each customer folder contains four CSV files:

1. **Clients** - Business client information
2. **Contacts** - Contact persons for each client
3. **Chart of Accounts** - Financial account structure
4. **Transactions** - Financial transaction records

## Schema Differences

### Client Entity

| Field Concept | Customer A | Customer B | Customer C |
|---------------|------------|------------|------------|
| ID | Client ID | clientCode | customer_id |
| Name | Client Name | companyName | business_name |
| Entity Type | Business Type | entityType | legal_structure |
| Status | Status | clientStatus | account_status |
| Start Date | Date Onboarded | startDate | registration_date |
| Tax ID | Tax ID | federalTaxId | tax_reference |
| Revenue | Annual Revenue | yearlyRevenue | gross_revenue |
| Industry | Industry | sectorCode | industry_sector |
| Terms | Payment Terms | billingTerms | credit_terms |

### Status Values (Picklist Example)

| Meaning | Customer A | Customer B | Customer C |
|---------|------------|------------|------------|
| Active | Active | A | ACTIVE |
| Inactive | Inactive | I | DORMANT |
| Pending | Pending | P | SUSPENDED |

### Entity Type Values (Picklist Example)

| Meaning | Customer A | Customer B | Customer C |
|---------|------------|------------|------------|
| Corporation | Corporation | CORP | Limited Company |
| S-Corporation | S-Corporation | SCORP | Limited Company |
| LLC | LLC | LLC | LLP |
| Partnership | Partnership | PART | Partnership |
| Sole Proprietor | Sole Proprietorship | SOLE | Sole Trader |
| Non-Profit | Non-Profit | NPROF | (not used) |

### Date Formats

| Customer | Format | Example |
|----------|--------|---------|
| Customer A | MM/DD/YYYY | 01/15/2024 |
| Customer B | YYYY-MM-DD | 2024-01-15 |
| Customer C | DD-MM-YYYY | 15-01-2024 |

### Transaction Types (Picklist Example)

| Meaning | Customer A | Customer B | Customer C |
|---------|------------|------------|------------|
| Debit | Debit | DR | D |
| Credit | Credit | CR | C |

### Transaction Status Values

| Meaning | Customer A | Customer B | Customer C |
|---------|------------|------------|------------|
| Completed | Cleared | POSTED | Reconciled |
| Pending | Pending | PENDING | Unreconciled |
| Cancelled | Voided | VOID | Cancelled |

### Payment Methods (Picklist Example)

| Customer A | Customer B | Customer C |
|------------|------------|------------|
| Wire Transfer | WIRE | Bank Transfer / Wire |
| ACH | EFT / ACH | BACS |
| Check | CHECK | Cheque |
| Credit Card | CARD | Credit Card / Card Payment |
| Cash | CASH | Cash |
| Direct Deposit | ACH | BACS |
| Bank Transfer | BANK | Bank Transfer |

### Account Types (Chart of Accounts)

| Meaning | Customer A | Customer B | Customer C |
|---------|------------|------------|------------|
| Asset | Asset | ASSET | Assets |
| Liability | Liability | LIABILITY | Liabilities |
| Equity | Equity | EQUITY | Capital |
| Revenue | Revenue | REVENUE | Income |
| Expense | Expense | EXPENSE | Direct Costs / Overheads |

## Usage

This sample data can be used to:

1. Test schema mapping functionality - mapping different column names to target fields
2. Test value mapping functionality - mapping different picklist values to target values
3. Test date format parsing and normalization
4. Test currency/number format handling
5. Validate the onboarding workflow with realistic data volumes

## Data Characteristics

- Each customer has 10-12 client records
- Each customer has 15-20 contact records
- Each customer has 35-40 chart of accounts entries
- Each customer has 25 transaction records
- Data includes various statuses, types, and edge cases
