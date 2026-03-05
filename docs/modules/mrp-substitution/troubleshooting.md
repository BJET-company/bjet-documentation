---
sidebar_position: 3
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: Substitutes (MRP) Tab Does Not Appear

**Symptoms:** After enabling "Allow Substitute Products (MRP)" on the product, the tab does not appear.

**Possible Causes:**
- User does not have the "Allow Substitute Products (MRP)" extra right
- Product type is not set to "Goods"
- User does not have "Product Creation" extra right

**Solution:**
1. Go to **Settings → Users & Companies → Users**
2. Open the user and go to the **Access Rights** tab
3. Enable the **Allow Substitute Products (MRP)** checkbox
4. Verify the product type is set to **Goods**
5. Refresh the page

### Issue: Substitution Is Not Applied When Confirming Manufacturing Order

**Symptoms:** The Manufacturing Order is confirmed, but components are not substituted.

**Possible Causes:**
- Base component has sufficient stock at the source location
- No substitutes are configured on the product
- All configured substitutes are also out of stock

**Solution:**
1. Check the on-hand quantity of the base component at the warehouse location
2. Open the product form and verify the **Substitutes (MRP)** tab has substitute lines
3. Check the **On Hand** column for each substitute — at least one must have available stock

### Issue: Incorrect Substitute Quantities

**Symptoms:** The substitute quantities in the Manufacturing Order seem wrong.

**Possible Causes:**
- Substitution ratio is misconfigured

**Solution:**
1. Verify the substitution ratio for each substitute product
2. Remember: ratio **0.5** means you need **twice** as much substitute, not half
3. Ratio **2** means you need **half** as much substitute

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
