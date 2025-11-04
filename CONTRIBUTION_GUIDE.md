# CONTRIBUTION GUIDE - Adding New Module Documentation

## Overview

This guide is for developers who need to add documentation for a new BJET Odoo module to this documentation site.

**Workflow:** Ukrainian → Verify → Copy to i18n/uk → Translate to English

---

## Prerequisites

Before you start:
- [ ] Module Ukrainian documentation content ready
- [ ] Module version number
- [ ] Screenshots/images prepared
- [ ] Node.js 18+ installed
- [ ] Repository cloned locally

---

## Step-by-Step Guide

### Step 1: Create Ukrainian Documentation Structure

**1.1 Create directories:**

```bash
# Module documentation directory
mkdir -p docs/modules/[module-name]

# Images directory
mkdir -p static/img/[module-name]
```

**Example for "inventory-manager" module:**
```bash
mkdir -p docs/modules/inventory-manager
mkdir -p static/img/inventory-manager
```

---

### Step 2: Write Ukrainian Content in /docs/

**2.1 Create `index.md` (main overview page):**

```bash
touch docs/modules/[module-name]/index.md
```

**Template structure:**

```markdown
---
sidebar_position: 2
title: [Назва Модуля]
sidebar_label: [Назва Модуля]
---

# BJet [Назва Модуля]

## Опис модуля

[Опис що робить модуль]

## Призначення та можливості

Модуль призначений для компаній, які хочуть:

- [можливість 1];
- [можливість 2];
- [можливість 3].

## Швидкі посилання

- [Встановлення та активація](./installation.md)
- [Налаштування](./configuration.md)
- [Усунення несправностей](./troubleshooting.md)
```

**2.2 Create additional pages (all in Ukrainian):**

```bash
touch docs/modules/[module-name]/installation.md
touch docs/modules/[module-name]/configuration.md
touch docs/modules/[module-name]/troubleshooting.md
# Add more as needed
```

**Minimum required pages:**
- `index.md` - Огляд модуля
- `installation.md` - Встановлення та активація
- `troubleshooting.md` - Усунення типових проблем

**Optional pages:**
- `configuration.md` - Детальне налаштування
- `gpt-integration.md` - Інтеграція з AI
- `template-variables.md` - Довідник змінних
- `faq.md` - Часті питання

**2.3 Write all content in Ukrainian**

Fill all pages with Ukrainian content using your documentation source.

---

### Step 3: Update Sidebar Navigation

**File:** `sidebars.js`

**Location in file:** Find the `tutorialSidebar` array inside the `items` under `Modules` category.

**Add your module:**

```javascript
{
  type: 'category',
  label: '[Назва Модуля]',
  link: {
    type: 'doc',
    id: 'modules/[module-name]/index',
  },
  items: [
    'modules/[module-name]/installation',
    'modules/[module-name]/configuration',
    'modules/[module-name]/troubleshooting',
    // Add all your pages here
  ],
},
```

**Example for "inventory-manager":**

```javascript
{
  type: 'category',
  label: 'Керування Запасами',
  link: {
    type: 'doc',
    id: 'modules/inventory-manager/index',
  },
  items: [
    'modules/inventory-manager/installation',
    'modules/inventory-manager/configuration',
    'modules/inventory-manager/troubleshooting',
  ],
},
```

**Position:** Add after existing modules (after Print Form Builder).

---

### Step 4: Add Module Card to Landing Page

**File:** `docs/intro.md`

**Find:** The `<div className="row margin-bottom--lg">` section with module cards.

**Add new card:**

```jsx
<div className="col col--4">
  <div className="card shadow--md">
    <div className="card__header">
      <h3>[Emoji] [Назва Модуля]</h3>
    </div>
    <div className="card__body">
      <p><strong>Версія:</strong> [version]</p>
      <p>[Короткий опис українською]</p>
      <ul style={{fontSize: '0.9em'}}>
        <li>[Ключова функція 1]</li>
        <li>[Ключова функція 2]</li>
        <li>[Ключова функція 3]</li>
      </ul>
    </div>
    <div className="card__footer">
      <Link
        className="button button--primary button--block"
        to="/docs/modules/[module-name]">
        Переглянути документацію
      </Link>
    </div>
  </div>
</div>
```
---

### Step 5: Add Images

**5.1 Copy images to static folder:**

```bash
cp path/to/screenshots/*.png static/img/[module-name]/
```

**5.2 Reference in markdown:**

```markdown
![Опис зображення](/img/[module-name]/screenshot-name.png)
```

**Best practices:**
- Use descriptive names: `step-1-configuration.png`, `main-interface.png`
- Format: PNG preferred for screenshots
- Size: Max 1200px width
- Compress before adding

---

### Step 6: Build and Verify Ukrainian Content

**6.1 Install dependencies (if first time):**

```bash
npm install
```

**6.2 Build the site:**

```bash
npm run build
```

**Expected output:**
```
[SUCCESS] Generated static files in "build".
[SUCCESS] Generated static files in "build/uk".
```

**6.3 Test locally:**

```bash
npm run serve
```

**6.4 Verify in browser:**

- Open: `http://localhost:3000/docs/modules/[module-name]`
- Check:
  - ✅ All pages load
  - ✅ Navigation works
  - ✅ Images display
  - ✅ Links work
  - ✅ Content is in Ukrainian

**If build fails:** Check console errors, verify file paths and frontmatter syntax.

---

### Step 7: Copy Ukrainian Content to Translation Directory

**After verifying Ukrainian content works correctly:**

**7.1 Create Ukrainian translation directory:**

```bash
mkdir -p i18n/uk/docusaurus-plugin-content-docs/current/modules/[module-name]
```

**7.2 Copy all Ukrainian files:**

```bash
cp docs/modules/[module-name]/*.md \
   i18n/uk/docusaurus-plugin-content-docs/current/modules/[module-name]/
```

**7.3 Verify copy:**

```bash
ls -la i18n/uk/docusaurus-plugin-content-docs/current/modules/[module-name]/
```

**You should see:**
```
index.md
installation.md
configuration.md
troubleshooting.md
[all other files]
```

---

### Step 8: Translate /docs/ Content to English

Now translate all files in `/docs/modules/[module-name]/` from Ukrainian to English.

better to use Claude Code and text - important don't create new phrase and term, just translate as is

**8.1 Translate index.md:**

**Before (Ukrainian):**
```markdown
---
sidebar_position: 2
title: Керування Запасами
sidebar_label: Керування Запасами
---

# BJet Керування Запасами

## Опис модуля

Модуль для керування запасами...
```

**After (English):**
```markdown
---
sidebar_position: 2
title: Inventory Management
sidebar_label: Inventory Management
---

# BJet Inventory Management

## Module Description

Module for inventory management...
```

**8.2 Translate all other pages:**

Translate each file:
- installation.md → English
- configuration.md → English
- troubleshooting.md → English
- [all other files] → English

**What to keep identical:**
- Frontmatter keys (`sidebar_position`, `title`, `sidebar_label`)
- File names
- Image paths
- Link paths (only translate link text)
- Code blocks

**What to translate:**
- All Ukrainian text
- Headers and titles
- Descriptions
- UI labels
- Button text

---

### Step 9: Translate Landing Page Card

**File:** `docs/intro.md`

**Find your module card and translate:**

**Before (Ukrainian):**
```jsx
<h3>🏪 Керування Запасами</h3>
...
<p>Модуль для керування запасами та складом</p>
...
<li>Автоматичне відстеження</li>
...
to="/docs/modules/inventory-manager">
  Переглянути документацію
</Link>
```

**After (English):**
```jsx
<h3>🏪 Inventory Management</h3>
...
<p>Module for inventory and warehouse management</p>
...
<li>Automatic tracking</li>
...
to="/docs/modules/inventory-manager">
  View Documentation
</Link>
```

---

### Step 10: Final Build and Verification

**10.1 Clean build:**

```bash
npm run clear
npm run build
```

**10.2 Verify both locales build successfully:**

```
[INFO] [en] Creating an optimized production build...
[SUCCESS] Generated static files in "build".
[INFO] [uk] Creating an optimized production build...
[SUCCESS] Generated static files in "build/uk".
```

**10.3 Test both locales:**

```bash
npm run serve
```

**Check:**
- English: `http://localhost:3000/docs/modules/[module-name]`
- Ukrainian: `http://localhost:3000/uk/docs/modules/[module-name]`

pay attention Ukrainian version can't be checked locally

**Verify:**
- ✅ English version shows English content
- ✅ Ukrainian version shows Ukrainian content
- ✅ Navigation works in both languages
- ✅ Images display in both languages
- ✅ All links work in both languages
- ✅ Landing page shows correct language

---

## File Structure Reference

**After completion, your structure should look like:**

```
bjet-documentation/
├── docs/
│   ├── intro.md (updated with module card - English)
│   └── modules/
│       └── [module-name]/
│           ├── index.md (English)
│           ├── installation.md (English)
│           ├── configuration.md (English)
│           └── troubleshooting.md (English)
│
├── i18n/
│   └── uk/
│       └── docusaurus-plugin-content-docs/
│           └── current/
│               └── modules/
│                   └── [module-name]/
│                       ├── index.md (Ukrainian)
│                       ├── installation.md (Ukrainian)
│                       ├── configuration.md (Ukrainian)
│                       └── troubleshooting.md (Ukrainian)
│
├── static/
│   └── img/
│       └── [module-name]/
│           ├── screenshot-1.png
│           └── screenshot-2.png
│
└── sidebars.js (updated with module navigation)
```

---

## Workflow Diagram

```
┌─────────────────────────────────────────┐
│ 1. Write Ukrainian in /docs/           │
│    docs/modules/[module-name]/*.md      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 2. Update sidebars.js                   │
│    Add module navigation                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 3. Update intro.md (Ukrainian)          │
│    Add module card                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 4. Add images to /static/img/           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 5. Build & Verify                       │
│    npm run build                         │
│    npm run serve                         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 6. Copy to /i18n/uk/                    │
│    cp docs/modules/[name]/*.md          │
│    i18n/uk/.../modules/[name]/          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 7. Translate /docs/ to English          │
│    Keep structure, translate content    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 8. Translate intro.md card to English   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 9. Final Build & Test Both Locales      │
│    English: /docs/modules/[name]        │
│    Ukrainian: /uk/docs/modules/[name]   │
└─────────────────────────────────────────┘
```

---

## Quality Checklist

Before submitting:

### Ukrainian Content
- [ ] All Ukrainian pages created in `/docs/modules/[module-name]/`
- [ ] Proper frontmatter in all files
- [ ] All images added to `/static/img/[module-name]/`
- [ ] Module added to `sidebars.js`
- [ ] Module card added to `intro.md` (Ukrainian)
- [ ] Build succeeds: `npm run build`
- [ ] Tested locally: `npm run serve`
- [ ] All links work
- [ ] All images display

### Copy to Ukrainian Translation
- [ ] Ukrainian files copied to `/i18n/uk/.../modules/[module-name]/`
- [ ] All files present in translation directory
- [ ] Build still succeeds after copy

### English Translation
- [ ] All files in `/docs/` translated to English
- [ ] Frontmatter values updated (titles in English)
- [ ] File names unchanged
- [ ] Image paths unchanged
- [ ] Link paths unchanged (only text translated)
- [ ] `intro.md` card translated to English
- [ ] Final build succeeds for both locales
- [ ] English tested: `http://localhost:3000/docs/modules/[module-name]`
- [ ] Ukrainian tested: `http://localhost:3000/uk/docs/modules/[module-name]`

---

## Common Issues

### Issue 1: Build fails with "document not found"
**Cause:** File path in sidebars.js doesn't match actual file location
**Solution:** Verify paths in sidebars.js match actual file names

### Issue 2: Ukrainian locale shows English content
**Cause:** Files not copied to `/i18n/uk/` directory
**Solution:** Check files exist in full path: `/i18n/uk/docusaurus-plugin-content-docs/current/modules/[module-name]/`

### Issue 3: Images don't display
**Cause:** Incorrect image path
**Solution:** Use absolute paths starting with `/img/` not relative paths `./img/`

### Issue 4: Navigation doesn't show new module
**Cause:** Sidebar not updated or syntax error
**Solution:** Check `sidebars.js` syntax and file structure

### Issue 5: Module card doesn't appear on landing page
**Cause:** Syntax error in JSX or wrong column class
**Solution:** Check JSX syntax, verify `className="col col--4"` and proper nesting

### Issue 6: Links broken after translation
**Cause:** Link paths changed during translation
**Solution:** Keep link paths identical, only translate the link text

---

## Reference Example

**Use Print Form Builder module as reference:**

**Ukrainian source:**
- `/docs/modules/print-form-builder/` - English content
- `/i18n/uk/.../modules/print-form-builder/` - Ukrainian content

**Files:**
```
print-form-builder/
├── index.md
├── installation.md
├── creating-forms.md
├── gpt-integration.md
├── template-variables.md
└── troubleshooting.md
```

**Study these files to understand:**
- Frontmatter structure
- Image referencing
- Internal linking
- Content organization

---

## Commands Reference

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm start

# Build production site
npm run build

# Serve built site locally
npm run serve

# Clear cache and rebuild
npm run clear && npm run build

# Serve on custom port
npm run serve -- --port 3002
```

---

## Support

If you encounter issues:

1. Check this guide first
2. Review existing modules (api-sync, print-form-builder)
3. Verify file paths and names
4. Check build output for specific errors
5. Contact: support@bjetpro.com

---

## Git Workflow

```bash
# Create feature branch
git checkout -b docs/add-[module-name]

# Add files
git add docs/modules/[module-name]
git add i18n/uk/.../modules/[module-name]
git add static/img/[module-name]
git add sidebars.js
git add docs/intro.md

# Commit
git commit -m "docs: add [Module Name] documentation

- Add Ukrainian documentation
- Add English translation
- Add module card to landing page
- Add images and screenshots"

# Push
git push origin docs/add-[module-name]

# Create Pull Request
# Review and merge
```

---

**Last Updated:** 2024-11-04
**Documentation Version:** 1.0
**Docusaurus Version:** 3.6.3