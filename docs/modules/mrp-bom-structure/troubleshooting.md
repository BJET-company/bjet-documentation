---
sidebar_position: 3
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: BOM Structure tab is empty

**Symptoms:** The BOM Structure tab is displayed but does not contain any data.

**Possible Causes:**
- The product does not have an assigned Bill of Materials
- The Bill of Materials does not contain any components

**Solution:**
1. Go to **Manufacturing → Bills of Materials**
2. Make sure a Bill of Materials with components exists for the product
3. Verify that the Bill of Materials has a status that allows it to be used

### Issue: Product Category is not displayed

**Symptoms:** The "Product Category" column is empty for some components.

**Possible Causes:**
- The "Product Category" field is not populated on the product form

**Solution:**
1. Open the product form of the component
2. Go to the **General Information** tab
3. Make sure the **Product Category** field is populated
4. Save the changes

### Issue: Structure does not update after changing quantity

**Symptoms:** After changing the quantity in the Manufacturing Order, the BOM Structure tab shows old data.

**Possible Causes:**
- Changes were not saved
- Browser cache

**Solution:**
1. Save the Manufacturing Order after changing the quantity
2. Refresh the page (F5 or Ctrl+R)
3. If the issue persists — clear the browser cache

### Issue: Deeply nested components are not displayed

**Symptoms:** Some hierarchy levels of components are not displayed in the tree.

**Possible Causes:**
- Maximum nesting depth exceeded (20 levels)
- Circular references in Bills of Materials

**Solution:**
1. Check the nesting depth of Bills of Materials — the module supports up to 20 levels
2. Make sure that Bills of Materials do not contain circular references (component A references B, which references A)

### Issue: Slow loading with large Bills of Materials

**Symptoms:** The BOM Structure tab takes a long time to load for products with complex Bills of Materials.

**Possible Causes:**
- Large number of levels and components in the Bill of Materials

**Solution:**
1. This is expected behavior for very complex Bills of Materials
2. Use level collapsing to improve performance
3. Contact support if loading time exceeds 10 seconds

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
