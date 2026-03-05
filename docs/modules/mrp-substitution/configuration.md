---
sidebar_position: 2
title: Configuration
sidebar_label: Configuration
---

# Configuration

## How to Enable Substitutes on a Product Form

1. Open the product form
2. Make sure the product type is set to **Goods**
3. Enable the checkbox: **Allow Substitute Products (MRP)**
4. After that, a new tab will appear — **Substitutes (MRP)**
5. If the tab does not appear, check the user's access rights

![Product form with Allow Substitute Products checkbox and Substitutes (MRP) tab](/img/mrp-substitution/product-enable-substitutes-en.png)

## Adding Substitutes

In the **Substitutes (MRP)** tab:

1. Click **Add a line**
2. Select the substitute product
3. Arrange substitutes by priority (higher in the list = higher priority)
4. Specify the substitution ratio
5. Other fields are filled automatically

![Substitutes (MRP) tab with substitute product lines](/img/mrp-substitution/substitutes-list-en.png)

## About the Substitution Ratio

The ratio defines how much of the base component is covered by one unit of the substitute.

For example:
- **1** → one-to-one replacement
- **0.5** → twice as much substitute is required
- **2** → half as much substitute is required

**Practical Example:** You need 10 units of the main raw material (Sugar in 1 kg packs). The substitute (Sugar in 500 g packs) has a ratio of 0.5. The system will calculate: 20 units of the substitute are required to cover the demand. Everything is calculated automatically — no manual math is needed.

## How It Works in a Manufacturing Order

The module is triggered when confirming a Manufacturing Order: **Manufacturing → Manufacturing Orders → Confirm**

1. **If the base component is not sufficiently available in stock,** the system checks whether substitutes are configured and available. Then the automatic selection logic starts.

   1. **If the First Substitute Is Sufficient**, the system: selects the highest-priority substitute, recalculates the required quantity based on the substitution ratio, updates the component lines in the Manufacturing Order. Production can start.

   2. **If the First Substitute Is Not Enough**, the system proceeds step by step: takes the maximum available quantity from the first substitute, if still insufficient — takes the next substitute, then the third one, and so on. As a result, the Manufacturing Order may contain: part of the base component, part of Substitute №1, part of Substitute №2. This is normal — the system maximizes the use of available stock.

2. **If No Substitutes Are Available:** Nothing changes. The component remains unavailable, and the order waits for stock replenishment.

![Manufacturing Order with substituted components](/img/mrp-substitution/manufacturing-order-en.png)

## Important Notes

- Priority truly matters — the system processes substitutes from top to bottom
- The substitution ratio affects the accuracy of material consumption
- Substitution applies only within the specific Manufacturing Order
- The BOM is not modified
- All changes are visible directly in the document
