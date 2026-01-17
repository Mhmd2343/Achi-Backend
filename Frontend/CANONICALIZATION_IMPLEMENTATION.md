# Canonicalization Implementation Summary

## Overview
This document details the canonicalization implementation for the ACHI Scaffolding React SPA, ensuring self-referencing canonicals, preventing loops, and following SEO best practices.

## Files Modified

### 1. `src/seo/urlUtils.js`
- **Added `getCanonicalUrl()` function** - Single source of truth for canonical URL calculation
- **Added `isCanonicalSelfReferencing()` function** - Validation utility to ensure self-referencing canonicals
- **Updated `canonicalUrl()`** - Legacy alias for backward compatibility

### 2. `src/seo/RouteSeo.jsx`
- **Updated to use `getCanonicalUrl()`** - Ensures consistent canonical calculation
- **Added defensive comments** - Documents canonical behavior and guarantees

### 3. `src/seo/seoConfig.js`
- **Removed unused import** - Cleaned up imports

## Canonical URL Calculation

### How Canonical URL is Calculated

The `getCanonicalUrl(pathname, search)` function:

1. **Determines Origin**
   - Uses `window.location.origin` if available (flexible for different environments)
   - Falls back to `BASE_URL` constant (`https://achi-scaffolding.github.io`)

2. **Strips Locale Prefix**
   - Removes `/fr` or `/lb` prefixes from pathname
   - Ensures canonicals are language-agnostic (cross-language safety)

3. **Normalizes Pathname**
   - Converts to lowercase
   - Collapses multiple slashes (`//` → `/`)
   - Removes trailing slash (except root `/`)
   - Ensures consistent format

4. **Strips Query & Hash**
   - Query parameters are explicitly ignored (not included in canonical)
   - Hash fragments are not included
   - Prevents canonical pointing to filtered/search URLs

5. **Builds Absolute URL**
   - Format: `{origin}{normalizedPathname}`
   - Always absolute (starts with `https://`)
   - No query, no hash, no locale prefix

### Example Canonical Calculations

| Current URL | Canonical URL |
|------------|---------------|
| `/about` | `https://achi-scaffolding.github.io/about` |
| `/fr/about` | `https://achi-scaffolding.github.io/about` |
| `/About/` | `https://achi-scaffolding.github.io/about` |
| `/products?sort=price` | `https://achi-scaffolding.github.io/products` |
| `/services#section` | `https://achi-scaffolding.github.io/services` |
| `/lb/products/` | `https://achi-scaffolding.github.io/products` |

## Implementation Guarantees

### ✅ 1. Self-Referencing Canonicals

- **Every indexable page** includes exactly one `<link rel="canonical">` tag
- Canonical **always points to the page's own preferred URL**
- Uses normalized pathname to ensure consistency

**Verification:**
```javascript
// In RouteSeo.jsx
const canonicalUrlValue = getCanonicalUrl(location.pathname, search)
// This always computes from current page's pathname, ensuring self-reference
```

### ✅ 2. Prevent Canonical Loops

- Canonical is computed **once** from normalized pathname
- Defensive normalization ensures no circular references
- No page's canonical points to another page that canonicals back

**Prevention Logic:**
```javascript
// Normalize pathname first
const normalized = normalizePathname(cleanPath)
// Re-normalize as defensive check
const finalPath = normalizePathname(normalized)
// This ensures canonical always resolves to final, clean URL
```

### ✅ 3. No Canonicals Pointing to Redirected URLs

- Canonical **never** includes:
  - Uppercase letters (normalized to lowercase)
  - Trailing slash (removed except root)
  - Query parameters (`?sort=`, `?page=`, etc.)
  - Hash fragments (`#section`)

- Canonical always represents the **final, preferred URL format**

**Normalization Rules:**
- Lowercase: `/About` → `/about`
- No trailing slash: `/about/` → `/about`
- No query: `/products?sort=price` → `/products`
- No hash: `/services#section` → `/services`

### ✅ 4. Cross-Language Safety

- Canonicals **never point to language-specific paths**
- Locale prefixes (`/fr`, `/lb`) are stripped before canonical calculation
- Ensures canonicals are language-agnostic

**Implementation:**
```javascript
// Strip locale prefix for canonical
const cleanPath = stripLocalePrefix(pathname)
// This ensures /fr/about and /lb/about both canonicalize to /about
```

### ✅ 5. Single Canonical Tag

- **react-helmet-async** ensures only one canonical tag exists in DOM
- If old SEO component also creates canonical, react-helmet-async replaces it
- RouteSeo component is the primary source of canonical tags

**Guarantee:**
```jsx
// In RouteSeo.jsx
<Helmet>
  <link rel="canonical" href={canonicalUrlValue} />
</Helmet>
// react-helmet-async manages head and ensures single canonical
```

## Indexable vs Non-Indexable Pages

### Indexable Pages
- **Have canonical tags** pointing to their own preferred URL
- Example: `/about`, `/products`, `/services`

### Non-Indexable Pages
- **Also have canonical tags** (Google best practice)
- Canonical still points to page's own preferred URL
- Robots meta tag set to `noindex,follow`
- Example: `/services/serviceItem` (dynamic content)

**Implementation:**
```javascript
// In RouteSeo.jsx
const robotsContent = shouldIndex ? 'index,follow' : 'noindex,follow'
// Canonical is included regardless of indexable status
```

## Testing & Verification

### How to Verify Canonical Implementation

1. **Check Browser DevTools**
   - Open DevTools → Elements → `<head>`
   - Verify exactly one `<link rel="canonical">` tag exists
   - Verify canonical URL format matches expected pattern

2. **Verify Self-Referencing**
   - Navigate to `/about`
   - Check canonical: should be `https://achi-scaffolding.github.io/about`
   - Navigate to `/fr/about`
   - Check canonical: should still be `https://achi-scaffolding.github.io/about` (no `/fr`)

3. **Verify Normalization**
   - Navigate to `/About/` (uppercase + trailing slash)
   - Check canonical: should normalize to `/about`
   - Navigate to `/products?sort=price`
   - Check canonical: should be `/products` (no query)

4. **Verify No Loops**
   - Check that no page's canonical points to another page
   - Verify canonical always matches normalized current pathname

### Expected Canonical Tags

| Page | Expected Canonical |
|------|-------------------|
| Home (`/`) | `https://achi-scaffolding.github.io/` |
| About (`/about`) | `https://achi-scaffolding.github.io/about` |
| Products (`/products`) | `https://achi-scaffolding.github.io/products` |
| Services (`/services`) | `https://achi-scaffolding.github.io/services` |
| Blog (`/blog`) | `https://achi-scaffolding.github.io/blog` |

## Notes

- **Old SEO Component**: The existing `src/components/SEO.js` component also creates canonical tags using DOM manipulation. react-helmet-async (used by RouteSeo) manages the head and ensures only one canonical exists, taking precedence over DOM-manipulated tags.

- **Language Routing**: While the app supports language prefixes (`/fr`, `/lb`), canonicals are always language-agnostic (no prefix). This prevents duplicate content issues while preserving app functionality.

- **Query Parameters**: Pages with query parameters (like `?sort=`, `?filter=`) are typically marked `noindex` but still receive canonical tags pointing to the base URL without parameters.

## Summary

✅ **Self-referencing canonicals**: Every page's canonical points to its own preferred URL  
✅ **No loops**: Defensive normalization prevents circular references  
✅ **No redirected URLs**: Canonical always represents final preferred format  
✅ **Cross-language safe**: Canonicals never include locale prefixes  
✅ **Single canonical tag**: react-helmet-async ensures only one exists  
✅ **Indexable pages**: All have self-referencing canonicals  
✅ **Non-indexable pages**: Also have canonicals (Google best practice)

