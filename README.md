# OnboardingSampleApp

A sample application for testing data onboarding workflows.

## Sample Data

The `sample-data/` directory contains test data from three fictional accounting customers, each using different data schemas and formats. This data is designed to test the application's ability to map varying schemas and data values to a target system.

See [sample-data/README.md](sample-data/README.md) for detailed documentation of the schema differences between customers.

### Quick Overview

| Customer | Schema Style | Date Format |
|----------|--------------|-------------|
| ABC Accounting | Title Case columns | MM/DD/YYYY |
| XYZ Financial Services | camelCase columns | YYYY-MM-DD |
| Premier Bookkeeping | snake_case columns | DD-MM-YYYY |

Each customer folder contains:
- Clients (10-12 records)
- Contacts (15-20 records)
- Chart of Accounts (35-40 entries)
- Transactions (25 records)
