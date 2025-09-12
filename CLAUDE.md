# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.6.3 documentation site for BJET Odoo modules. The site is designed to host documentation for multiple Odoo modules, with the API Synchronization Module (v18.0.1.0.2) currently documented.

## Key Commands

### Development
```bash
npm install          # Install dependencies
npm start           # Start development server (default port 3000)
npm run serve       # Serve built site (default port 3000)
npm run serve -- --port 3002  # Serve on custom port
```

### Build & Deployment
```bash
npm run build       # Build static site to ./build directory
npm run clear       # Clear cache and temp files
```

The site auto-deploys to GitHub Pages via GitHub Actions when pushing to main branch.

## Architecture & Structure

### Multi-Module Documentation Architecture
The site is structured to support multiple Odoo modules:
- Each module lives under `docs/modules/[module-name]/`
- Currently only `api-sync` module is documented
- New modules can be added by creating new folders under `docs/modules/`

### Configuration Files
- `docusaurus.config.js` - Main configuration (site metadata, navbar, footer, themes)
- `sidebars.js` - Sidebar navigation structure
- `src/css/custom.css` - Custom styling
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

### Important Paths
```
docs/
├── intro.md                    # Landing page for all modules
└── modules/
    └── api-sync/               # API Synchronization Module
        ├── index.md            # Module overview
        ├── configuration/      # Configuration guides
        ├── python-scripts/     # Python script documentation
        └── troubleshooting.md  # Troubleshooting guide

static/
└── postman/                    # Postman collections
    └── bjet-api-sync-collection.json

src/
├── css/custom.css             # Custom styling
└── pages/
    └── postman.md             # Postman download page
```

## Adding New Modules

To add a new Odoo module to the documentation:

1. Create directory structure: `docs/modules/[new-module-name]/`
2. Add module overview at `docs/modules/[new-module-name]/index.md`
3. Update `sidebars.js` to include the new module in navigation
4. Add module to dropdown in `docusaurus.config.js` navbar items
5. Update landing page `docs/intro.md` to list the new module

## Deployment Configuration

Before deploying, update these placeholders in `docusaurus.config.js`:
- Line 16: Replace `your-github-username` with actual GitHub username
- Line 22: Replace `your-github-username` with actual GitHub username  
- Line 45: Update edit URL with correct GitHub repository

## Module Documentation Pattern

Each module should follow this structure:
- `index.md` - Module overview with version, features, quick start
- `configuration/` - Step-by-step configuration guides
- `troubleshooting.md` - Common issues and solutions
- Additional sections as needed for the module

## Postman Collections

Postman collections are stored in `static/postman/` and linked from the `/postman` page. Each module can have its own collection.

## Known Issues

- Some internal documentation links may show warnings during build but site still functions
- The `onBrokenLinks` is set to 'warn' to allow builds with broken links
- Images should be placed in `static/img/` directory

## Context

This documentation was created from a PDF manual for the BJET API Synchronization Module for Odoo 18.0. The content focuses on:
- Bidirectional API synchronization (inbound/outbound)
- Authentication methods (No Auth, Basic, Bearer Token)
- Field mapping and Python script transformations
- Troubleshooting and best practices