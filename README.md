SONIC - Case Save Fix

This version fixes the Case Builder/Edit Case save path.

Key fixes:
- Investigation validation now matches the actual Case data model (`findings[]`).
- Edit Case correctly converts persisted investigation findings back to the builder's `finding` field.
- Save Case safely parses and updates localStorage without crashing on malformed entries.
- Review questions are optional for saving; if present, they are validated.
- Existing cases are replaced by ID instead of duplicated.

Difficulty convention remains:
Priority 1 = Easy
Priority 2 = Medium
Priority 3 = Hard
