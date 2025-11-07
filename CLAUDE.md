# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Common Commands:**
- `npm run start` - Start development server at http://localhost:3000
- `npm run build` - Generate production static site to `build/` directory
- `npm run serve` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run clear` - Clear Docusaurus build cache and generated files

**Requirements:**
- Node.js >= 20.0
- Yarn or npm

## Project Overview

This is a **Docusaurus 3.9.2** static documentation website built with React. It's a classic Docusaurus template with documentation, blog functionality, and custom components. The site generates static pages that can be deployed to any static hosting service.

## Directory Structure

- **`/docs`** - Markdown/MDX documentation files organized by category
- **`/blog`** - Blog posts with MD/MDX support and frontmatter
- **`/src/pages`** - Custom React pages (e.g., homepage)
- **`/src/components`** - Reusable React components
- **`/src/css/custom.css`** - Global CSS with Infima theme overrides
- **`/static`** - Static assets (images, icons, favicon, etc.)

## Key Configuration Files

- **`docusaurus.config.js`** - Main site configuration (title, URL, navbar, footer, themes, plugins)
  - Configured for GitHub integration (edit links, deployment)
  - Light theme: GitHub, Dark theme: Dracula
  - i18n set to English (default)
  - Color mode: system preference (respects prefers-color-scheme)

- **`sidebars.js`** - Documentation sidebar configuration (auto-generated from docs structure)
- **`package.json`** - Dependencies and npm/yarn scripts

## Content Management

**Documentation:**
- Files in `/docs` with frontmatter are automatically added to the sidebar
- `_category_.json` files in subdirectories control sidebar grouping and ordering
- MDX files support React components within Markdown

**Blog:**
- Posts support both MD and MDX formats
- Frontmatter required: title, author, tags, date
- `authors.yml` and `tags.yml` in `/blog` manage blog metadata

## Architecture Notes

- Built with **React 19** and **Docusaurus 3.9.2**
- Uses **Infima** CSS framework for styling
- Static Site Generation (SSG) for fast, SEO-friendly pages
- MDX integration enables interactive documentation with React components
- No test framework currently configured (no Jest, Vitest, or test files)

## Development Workflow

1. **Local Development:** Run `yarn start` for live-reload development server
2. **Content Creation:** Add MD/MDX files to `/docs` or `/blog` directories
3. **Custom Components:** Create React components in `/src/components`
4. **Build:** Run `yarn build` to generate static files
5. **Deploy:** Use `yarn deploy` (configured for GitHub Pages) or deploy `build/` to static host

## Key Features

- Responsive design with mobile support
- Dark/light mode toggle
- Syntax highlighting via Prism
- Search-ready (plugin configured)
- RSS/Atom feeds for blog
- Internationalization support (i18n)
- GitHub integration (edit this page, deployment)

## 设计规范
@DETAILED_DESIGN.md
@PROJECT_PLAN.md

## 开发规范
@FRONTEND_CHECK_RULES.md