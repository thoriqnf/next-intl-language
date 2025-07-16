# Day 7 Session 3: Next.js 15+ Internationalization (i18n) Demo

A complete implementation of internationalization using Next.js 15+ and next-intl, featuring a professional dark-themed promotional page with English/Spanish language switching.

## 🌍 Demo Overview

This project demonstrates Next.js 15+ internationalization concepts through a simple, working promotional website that switches between English and Spanish in real-time.

### 🚀 Live Demo
- **Main Demo**: http://localhost:3000/demo/day-7/session-3
- **Simple Version**: http://localhost:3000/demo/day-7/session-3/simple

## 🎯 Features

- ✅ **Real-time Language Switching** - English ↔ Spanish with no page reloads
- ✅ **Professional Dark Theme** - Modern, sleek black interface
- ✅ **Complete Promotional Site** - Hero, Features, Testimonials, Footer
- ✅ **Interactive Testing Tools** - Current locale display and test controls
- ✅ **Pure JavaScript** - No TypeScript dependencies
- ✅ **KISS Principle** - Simple implementation perfect for learning

## 📋 Implementation Guide

### Step 1: Install Dependencies

```bash
npm install next-intl
```

### Step 2: Create i18n Configuration

Create `i18n.js` in your project root:

```javascript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define supported languages
export const locales = ['en', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming 'locale' parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

### Step 3: Configure Next.js

Update `next.config.mjs`:

```javascript
import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl('./i18n.js')(nextConfig);
```

### Step 4: Create Middleware

Create `middleware.js` in your project root:

```javascript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|es)/:path*']
};
```

### Step 5: Create Translation Files

Create `messages/en.json`:

```json
{
  "hero": {
    "title": "Build Amazing Apps",
    "subtitle": "Create modern, scalable applications with Next.js and the latest web technologies",
    "cta": "Get Started",
    "learnMore": "Learn More"
  },
  "features": {
    "title": "Why Choose Our Platform?",
    "feature1": {
      "title": "Fast Performance",
      "description": "Lightning-fast applications with optimized performance"
    }
  }
}
```

Create `messages/es.json`:

```json
{
  "hero": {
    "title": "Crea Aplicaciones Increíbles",
    "subtitle": "Desarrolla aplicaciones modernas y escalables con Next.js",
    "cta": "Comenzar",
    "learnMore": "Saber Más"
  },
  "features": {
    "title": "¿Por Qué Elegir Nuestra Plataforma?",
    "feature1": {
      "title": "Rendimiento Rápido",
      "description": "Aplicaciones ultrarrápidas con rendimiento optimizado"
    }
  }
}
```

### Step 6: Create Language Switcher Component

Create `src/components/LanguageSwitcher.jsx`:

```javascript
'use client';

import { useState } from 'react';

export default function LanguageSwitcher({ locale, onLanguageChange }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-300">Language:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🇺🇸 EN
        </button>
        <button
          onClick={() => onLanguageChange('es')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'es'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🇪🇸 ES
        </button>
      </div>
    </div>
  );
}
```

### Step 7: Create Main Demo Page

Create your main page component:

```javascript
'use client';

import { useState } from 'react';
import enMessages from '../../../../../messages/en.json';
import esMessages from '../../../../../messages/es.json';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function I18nDemo() {
  const [locale, setLocale] = useState('en');
  
  const messages = {
    en: enMessages,
    es: esMessages
  };
  
  const t = messages[locale];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Your component content */}
    </div>
  );
}
```

## 🎨 Dark Theme Implementation

The demo features a complete dark theme with:

- **Background**: Deep gray/black (`bg-gray-900`, `bg-black`)
- **Text**: White and light gray (`text-white`, `text-gray-300`)
- **Cards**: Dark gray with subtle borders (`bg-gray-800`, `border-gray-700`)
- **Buttons**: Blue accent with hover effects
- **Gradients**: Dark purple to blue for hero sections

### Color Palette:
- Primary Background: `#111827` (gray-900)
- Secondary Background: `#1f2937` (gray-800)
- Card Background: `#374151` (gray-700)
- Primary Text: `#ffffff` (white)
- Secondary Text: `#d1d5db` (gray-300)
- Accent: `#2563eb` (blue-600)

## 📁 Project Structure

```
project-root/
├── i18n.js                          # i18n configuration
├── middleware.js                     # Language routing
├── next.config.mjs                   # Next.js + next-intl config
├── messages/
│   ├── en.json                       # English translations (single source of truth)
│   └── es.json                       # Spanish translations (single source of truth)
├── src/
│   ├── app/
│   │   ├── demo/day-7/session-3/
│   │   │   ├── simple/page.jsx       # Main demo page
│   │   │   └── page.jsx              # Alternative demo version
│   │   └── page.jsx                  # Root redirect
│   └── components/
│       └── LanguageSwitcher.jsx      # Language toggle component
└── README.md                         # This file
```

## 🚀 Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Demo**:
   Navigate to `http://localhost:3000`

## 🧪 Testing Features

### Language Switching
- Click the EN/ES buttons in the header
- Watch all content translate instantly
- No page reloads or navigation required

### Interactive Controls
- View current locale in the demo controls
- Use test buttons to switch languages
- See translation keys update in real-time

### Responsive Design
- Test on mobile and desktop
- Dark theme works across all screen sizes
- Language switcher adapts to mobile layout

## 📚 Key Concepts Demonstrated

### 1. **next-intl Setup**
- Proper configuration for Next.js 15+
- Middleware for language routing
- Translation file organization

### 2. **Client-Side i18n**
- Real-time language switching
- State management for locale
- Dynamic content updates

### 3. **Professional UI**
- Dark theme implementation
- Responsive design patterns
- Interactive components

### 4. **Best Practices**
- KISS principle implementation
- Clean code structure
- Performance optimization

## 🔧 Customization

### Adding New Languages
1. Add locale to `i18n.js` locales array
2. Create new translation file in `messages/` directory
3. Add button to `LanguageSwitcher.jsx`
4. Update middleware matcher if needed
5. Import the new JSON file in your demo components

### Modifying Content
1. Edit translation files in `messages/` directory
2. Add new translation keys to JSON files
3. Use keys in your components
4. Test across all languages

### Single Source of Truth
This demo uses a centralized approach:
- **One set of JSON files** (`messages/`) - used by both demos and full i18n
- **No duplication** - all components import from the same source
- **Easy maintenance** - edit one file, updates everywhere

**Benefits:**
- ✅ No confusion about which files to edit
- ✅ Consistent translations across all demos
- ✅ Industry standard JSON format
- ✅ Works with both simple demos and full i18n setup
- ✅ Single source of truth principle

### Styling Changes
1. Update Tailwind classes in components
2. Modify color palette in demo page
3. Test dark theme contrast
4. Ensure accessibility compliance

## 🎯 Learning Outcomes

After implementing this demo, you'll understand:

- ✅ How to set up next-intl with Next.js 15+
- ✅ Creating and organizing translation files
- ✅ Building language switcher components
- ✅ Implementing real-time language switching
- ✅ Dark theme design principles
- ✅ Professional React component patterns

## 📝 Notes

- **JavaScript Only**: No TypeScript dependencies
- **Simple Implementation**: Perfect for 1-hour learning session
- **Production Ready**: Scalable architecture
- **Dark Theme**: Modern, professional appearance
- **Responsive**: Works on all devices

## 🚀 Next Steps

1. **Add More Languages**: French, German, etc.
2. **Database Integration**: Store user language preferences
3. **SEO Optimization**: Meta tags per language
4. **Advanced Features**: Pluralization, number formatting
5. **Testing**: Unit tests for i18n functionality

---

**Built with Next.js 15+ and next-intl** | **Dark Theme Edition** | **Learning Demo**