# CLAUDE.md - AI Assistant Guide for CookYourWeb AI Agency

> **Last Updated**: 2026-01-21
> **Project**: CookYourWeb AI - Landing Page & Lead Generation System
> **Version**: 0.0.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Codebase Architecture](#codebase-architecture)
4. [Development Workflow](#development-workflow)
5. [Code Conventions & Patterns](#code-conventions--patterns)
6. [Key Components Reference](#key-components-reference)
7. [Configuration Files](#configuration-files)
8. [Business Logic & Domain](#business-logic--domain)
9. [API Integrations](#api-integrations)
10. [Common Modification Patterns](#common-modification-patterns)
11. [Deployment & Build](#deployment--build)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**CookYourWeb AI** is a professional landing page for an AI agency that sells:
- AI automation services for businesses
- Developer training programs (Frontend/Backend AI development)
- Consulting and custom AI solutions

**Business Model**: Lead generation via:
- WhatsApp chatbot qualification system
- Embedded Tally.so forms
- Email/phone contact
- Make.com webhook automation

**Compliance**: RGPD-first with unsubscribe system, privacy policies, cookie consent management.

**Contact Information**:
- Email: veronica@usecookyourwebai.es
- Phone/WhatsApp: +34 688 75 77 82
- Webhook: https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm

---

## Technology Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety (loose mode)
- **Vite 5.4.1** - Build tool with SWC plugin
- **React Router v6.26.2** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4.11** - Utility-first styling
- **shadcn-ui** - 43 pre-built components via Radix-UI
- **Lucide React 0.462** - Icon library
- **Custom neon color scheme** - Brand identity

### State & Data Management
- **TanStack React Query 5.56.2** - Server state
- **React Hook Form 7.53** - Form validation
- **Zod 3.23.8** - Schema validation

### Additional Libraries
- **react-helmet-async** - Meta tags & SEO
- **next-themes** - Dark mode support
- **Sonner** - Toast notifications
- **date-fns** - Date formatting
- **Recharts** - Charts/data visualization

### Development Tools
- **ESLint 9.9** - Code quality
- **Autoprefixer** - CSS vendor prefixes
- **@tailwindcss/typography** - Prose styling

### Deployment
- **Vercel** - Hosting platform (SPA routing configured)

---

## Codebase Architecture

### Directory Structure

```
/home/user/cookyourwebai/
├── src/
│   ├── App.tsx                    # Main app with routing
│   ├── main.tsx                   # Entry point + GTM
│   ├── index.css                  # Global styles (610 lines)
│   ├── App.css                    # Animations
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Landing page (1,419 lines)
│   │   ├── PrivacyPolicy.tsx      # RGPD privacy page
│   │   ├── CookiePolicy.tsx       # Cookie consent info
│   │   ├── LegalNotice.tsx        # Legal compliance
│   │   ├── Unsubscribe.tsx        # RGPD unsubscribe form
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── components/
│   │   ├── Header.tsx             # Sticky navigation
│   │   ├── Footer.tsx             # Contact info + links
│   │   ├── ContactDialog.tsx      # WhatsApp qualification modal
│   │   ├── LegalModal.tsx         # Reusable legal modal
│   │   ├── LegalContent.tsx       # Exportable legal text blocks
│   │   ├── BusinessContactForm.tsx # Business inquiry form
│   │   ├── DeveloperContactForm.tsx # Developer signup form
│   │   ├── SectionCard.tsx        # Service card component
│   │   │
│   │   ├── icons/                 # Custom SVG icons
│   │   │   ├── AiChatbotIcon.tsx
│   │   │   ├── ChatGPTIcon.tsx
│   │   │   ├── OpenAIColorIcon.tsx
│   │   │   └── OpenAIIcon.tsx
│   │   │
│   │   └── ui/                    # shadcn-ui components (43 files)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       └── ...
│   │
│   ├── hooks/
│   │   ├── use-toast.ts           # Toast state management
│   │   └── use-mobile.tsx         # Breakpoint detection (768px)
│   │
│   └── lib/
│       └── utils.ts               # cn() utility for Tailwind
│
├── public/
│   ├── openai-original.svg
│   ├── placeholder.png
│   └── placeholder.svg
│
├── Configuration Files
├── package.json                   # Dependencies & scripts
├── vite.config.ts                 # Vite bundler config
├── tsconfig.json                  # TypeScript settings
├── tailwind.config.ts             # Tailwind customization
├── eslint.config.js               # Linting rules
├── vercel.json                    # Vercel SPA routing
├── components.json                # shadcn-ui config
├── postcss.config.js              # PostCSS plugins
└── index.html                     # HTML entry point
```

### Routing Configuration

File: `/home/user/cookyourwebai/src/App.tsx`

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/politicadeprivacidad" element={<PrivacyPolicy />} />
    <Route path="/cookie-policy" element={<CookiePolicy />} />
    <Route path="/avisolegal" element={<LegalNotice />} />
    <Route path="/baja" element={<Unsubscribe />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

**Important**: Vercel SPA routing configured in `vercel.json` - all routes rewrite to `/index.html`.

### Provider Hierarchy

```tsx
QueryClientProvider        // React Query
  └─ HelmetProvider        // Meta tags
      └─ TooltipProvider   // Radix tooltips
          ├─ Toaster       // shadcn toast
          ├─ Sonner        // Sonner toast
          └─ BrowserRouter // React Router
```

---

## Development Workflow

### NPM Scripts

```bash
npm run dev        # Start dev server on :8080 with HMR
npm run build      # Production build to dist/
npm run build:dev  # Development mode build
npm run lint       # ESLint code quality check
npm run preview    # Preview production build locally
```

### Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Opens http://localhost:8080

# 3. Run linter before committing
npm run lint
```

### Git Workflow

**Current Branch**: `claude/claude-md-mkkwne25eq2aam47-SKSsh`

**Important Git Rules**:
1. Always develop on branches starting with `claude/` and ending with session ID
2. Push with: `git push -u origin <branch-name>`
3. NEVER push to main/master without explicit permission
4. Retry network failures up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

**Recent Commits** (for context):
- Fix: Reducir padding superior en páginas legales
- Fix: Añadir configuración de Vercel para routing de SPA
- Fix: Corregir imports case-sensitive para deploy en producción
- Refactor: Unificar Footer en todas las páginas
- Feat: Implementar sistema de baja/unsubscribe (RGPD)

### Build Process

**Production Build**:
```bash
npm run build
# Output: dist/ directory with optimized assets
# Code splitting enabled by default
# Uses SWC for faster compilation than Babel
```

**Vite Configuration** (`vite.config.ts:1`):
- Port: 8080
- React plugin: @vitejs/plugin-react-swc
- Path alias: `@/` → `src/`

---

## Code Conventions & Patterns

### TypeScript Configuration

**Mode**: Loose (not strict)
- `noImplicitAny: false` - Allows implicit any types
- `strictNullChecks: false` - Relaxed null handling
- `allowJs: true` - JavaScript files allowed
- `jsx: "react-jsx"` - Modern JSX transform

**Path Mapping**:
```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Component Patterns

**Functional Components with TypeScript**:
```tsx
// Standard pattern
const MyComponent = () => {
  return <div>Content</div>;
};

export default MyComponent;

// With props
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return <div onClick={onClick}>{title}</div>;
};
```

### State Management

**Local State**:
```tsx
const [state, setState] = useState(initialValue);
```

**Form State**:
```tsx
// Pattern 1: Controlled components
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: ""
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Pattern 2: HTML form submission
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  // Process data
};
```

**Async State**:
```tsx
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleAsyncAction = async () => {
  setStatus('loading');
  try {
    await apiCall();
    setStatus('success');
  } catch (error) {
    setStatus('error');
  }
};
```

### Styling Conventions

**Tailwind CSS Patterns**:
```tsx
// Basic styling
<div className="p-4 bg-white rounded-lg shadow-md">

// Responsive design (mobile-first)
<div className="text-sm md:text-base lg:text-lg">

// Hover states
<button className="hover:scale-105 transition-transform">

// Gradients (neon theme)
<div className="bg-gradient-to-r from-neonblue via-neonpink to-neonviolet">

// Custom utilities
<div className="animate-pulse-neon text-gradient">
```

**cn() Utility** (`src/lib/utils.ts:1`):
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

**Custom Neon Colors**:
```tsx
// Available in Tailwind config
neonblue: "#32e2ec"
neonpink: "#ec32c7"
neonviolet: "#8f32ec"
neongreen: "#3fec71"

// Usage
<div className="text-neonblue bg-neonpink border-neonviolet">
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `ContactDialog.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Hooks**: kebab-case with `use-` prefix (e.g., `use-toast.ts`)
- **Pages**: PascalCase (e.g., `Index.tsx`, `PrivacyPolicy.tsx`)
- **CSS**: kebab-case (e.g., `index.css`)

### Import Conventions

**Path Aliases**:
```tsx
// Use @ alias for src imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
```

**Case Sensitivity**:
- **CRITICAL**: Imports are case-sensitive in production (Vercel)
- Always match exact file case: `import Button from "@/components/ui/Button"` not `button`
- Reference: Commit "Fix: Corregir imports case-sensitive para deploy en producción"

### ESLint Rules

Key rules enforced:
- React hooks dependency arrays required
- React Refresh component naming conventions
- No unused variables (TypeScript)
- Consistent spacing and formatting

---

## Key Components Reference

### Header Component

File: `/home/user/cookyourwebai/src/components/Header.tsx`

**Features**:
- Sticky navigation with blur backdrop
- Logo + "Agencia IA" badge
- Section anchor links (smooth scroll)
- WhatsApp contact button
- Mobile hamburger menu
- Scroll detection for styling changes

**Props**: None (self-contained)

**State**:
- `isScrolled`: Boolean for sticky header styling
- `isMobileMenuOpen`: Boolean for mobile menu visibility

### Footer Component

File: `/home/user/cookyourwebai/src/components/Footer.tsx`

**Features**:
- Contact information (email, phone)
- Legal links (Privacy, Cookies, Legal Notice)
- Unsubscribe link
- Social media integration
- Consistent across all pages

**Props**: None

### ContactDialog Component

File: `/home/user/cookyourwebai/src/components/ContactDialog.tsx`

**Features**:
- WhatsApp qualification chatbot UI
- 3-step user journey:
  1. Welcome screen
  2. Profile selection (4 options with ROI metrics)
  3. Results display + WhatsApp redirect
- Webhook integration to Make.com
- Form validation

**Props**:
```tsx
interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**State**:
- `step`: 'welcome' | 'profile' | 'results'
- `selectedProfile`: number | null
- `formData`: { name, email, phone }

**Webhook URL**: `https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm`

### LegalModal Component

File: `/home/user/cookyourwebai/src/components/LegalModal.tsx`

**Features**:
- Reusable modal for displaying legal content
- Privacy Policy, Cookie Policy, Legal Notice support
- Scroll area for long content

**Props**:
```tsx
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'cookie' | 'legal';
}
```

### Index Page (Landing)

File: `/home/user/cookyourwebai/src/pages/Index.tsx` (1,419 lines)

**Sections**:
1. Hero with WhatsApp chatbot CTA
2. Main services (4 cards):
   - Automatización Empresarial AI
   - Funnels de Conversión AI
   - Avatares Virtuales AI
   - Consultoría Estratégica AI
3. Individual services (6 modular packages)
4. Featured packages (3 bundles with savings)
5. Developer training programs (2 tracks)
6. Client testimonials (3 business stories)
7. Developer testimonials (3 career transformations)
8. Tech stack showcase (React, OpenAI, Docker, etc.)
9. Cookie consent banner

**Key Data Structures**:
```tsx
const mainServices = [
  {
    id: string,
    title: string,
    price: string,
    description: string,
    gradient: string,
    features: string[]
  }
];

const individualServices = [...];
const featuredPackages = [...];
const developerTracks = [...];
const clientTestimonials = [...];
const developerTestimonials = [...];
const techLogos = [...];
```

### Unsubscribe Page

File: `/home/user/cookyourwebai/src/pages/Unsubscribe.tsx`

**Features**:
- RGPD-compliant unsubscribe form
- Email or phone input
- Confirmation checkbox requirement
- Webhook integration to Make.com
- Loading/success/error states
- 30-day data deletion promise

**State**:
```tsx
const [formData, setFormData] = useState({
  email: "",
  phone: "",
  confirmacion: false
});
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
```

**Webhook URL**: `https://hook.eu2.make.com/TU_WEBHOOK_AQUI` (needs configuration)

---

## Configuration Files

### vite.config.ts

File: `/home/user/cookyourwebai/vite.config.ts`

```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### tailwind.config.ts

File: `/home/user/cookyourwebai/tailwind.config.ts`

**Key Customizations**:
- Dark mode: 'class'
- Custom neon colors (neonblue, neonpink, neonviolet, neongreen)
- Extended fonts: Playfair Display (serif), Inter (sans)
- Custom animations: pulse-neon, fade-in
- Border radius customization
- Container settings

### vercel.json

File: `/home/user/cookyourwebai/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Purpose**: Enable client-side routing for React Router SPA.

### components.json

File: `/home/user/cookyourwebai/components.json`

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

**Purpose**: shadcn-ui configuration for component generation.

---

## Business Logic & Domain

### Service Model

**Main Services** (4 core offerings):
1. **Automatización Empresarial AI** - €799
   - 24/7 chatbots
   - WhatsApp automation
   - Workflow optimization
   - CRM integration
   - Auto-responses
   - Task automation

2. **Funnels de Conversión AI** - €899
   - AI landing pages
   - Smart forms
   - Lead qualification
   - Email sequences
   - Retargeting
   - Analytics

3. **Avatares Virtuales AI** - €1,299
   - Virtual assistants
   - Voice cloning
   - Video generation
   - Multi-language support
   - Platform integration
   - Custom branding

4. **Consultoría Estratégica AI** - Custom pricing
   - Business diagnostics
   - Custom development
   - Team training
   - Strategic planning
   - Change management
   - Ongoing support

**Individual Services** (6 modular packages):
- ChatGPT para Equipos - €99/month
- Automatización WhatsApp - €199/month
- Análisis Predictivo - €149/month
- Email Marketing AI - €129/month
- Atención Cliente 24/7 - €299/month
- RAG para Empresas - €249/month

**Featured Bundles**:
- Starter AI Pack - €599 (save €200)
- Growth AI Pack - €999 (save €400)
- Enterprise AI Suite - €1,899 (save €800)

### Developer Training Programs

**Track 1: Frontend con IA** - €1,200 (3 months)
- React AI integration
- OpenAI API mastery
- Prompt engineering
- Real-world projects
- Portfolio development
- Job placement support

**Track 2: Backend con IA** - €1,400 (3 months)
- Python/Node.js AI
- Vector databases
- RAG systems
- API development
- Production deployment
- Career guidance

### Lead Qualification System

**WhatsApp Chatbot Flow**:

Step 1: Welcome
- Message: "¿Formulario manual en 2024? Verónica te ayudará en 20 segundos por WhatsApp"

Step 2: Profile Selection (4 options)
1. "Pierdo tiempo en tareas repetitivas"
   - ROI: €45,000/year
   - Time saved: 15h/week

2. "Quiero automatizar atención al cliente"
   - ROI: €65,000/year
   - Time saved: 25h/week

3. "Necesito más leads/ventas"
   - ROI: €80,000/year
   - Time saved: 20h/week

4. "Quiero formarme como dev IA"
   - ROI: €35,000 salary increase
   - Career transformation

Step 3: Results + WhatsApp Redirect
- Display personalized metrics
- Pre-fill WhatsApp message with user info
- Open WhatsApp Business: +34 688 75 77 82

---

## API Integrations

### Make.com Webhooks

**Lead Capture Webhook**:
- URL: `https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm`
- Method: POST
- Headers: `Content-Type: application/json`
- Query params: `?source=web&canal=whatsapp&accion=nuevo_lead_desde_web`
- Payload:
  ```json
  {
    "nombre": "string",
    "email": "string",
    "telefono": "string",
    "origen": "web"
  }
  ```
- Used in: `ContactDialog.tsx`

**Unsubscribe Webhook**:
- URL: `https://hook.eu2.make.com/TU_WEBHOOK_AQUI` (needs configuration)
- Method: POST
- Headers: `Content-Type: application/json`
- Payload:
  ```json
  {
    "email": "string",
    "telefono": "string",
    "fecha_solicitud": "ISO date string"
  }
  ```
- Used in: `Unsubscribe.tsx`

### Tally.so Forms

**Business Contact Form**:
- Embed URL: `https://tally.so/r/w77ZyP`
- Used in: `BusinessContactForm.tsx`
- Display: iframe embed

**Developer Form**:
- Embed URL: `https://tally.so/r/n0YDZ0`
- Used in: `DeveloperContactForm.tsx`
- Display: iframe embed

### WhatsApp Business API

**Contact**: +34 688 75 77 82
**Integration Pattern**:
```typescript
const message = encodeURIComponent(`
  Hola Verónica, soy ${name}.
  Email: ${email}
  Teléfono: ${phone}
  Interesado en: ${service}
`);

window.open(`https://wa.me/34688757782?text=${message}`);
```

### Google Tag Manager

**Container ID**: GTM-P9J6QN6T
**Implementation**: `main.tsx:15`

```typescript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js'
});
```

**Purpose**: Google Analytics tracking, conversion tracking, remarketing.

### localStorage API

**Cookie Consent**:
```typescript
// Save consent
localStorage.setItem('cookieConsent', 'true');

// Check consent
const hasConsent = localStorage.getItem('cookieConsent') === 'true';
```

**Statistics Cookies**:
```typescript
localStorage.setItem('statisticsCookies', 'true');
```

---

## Common Modification Patterns

### Adding a New Page

1. Create page component in `src/pages/`:
   ```tsx
   // src/pages/NewPage.tsx
   const NewPage = () => {
     return (
       <div className="min-h-screen">
         <Header />
         <main className="container mx-auto px-4 py-8">
           {/* Content */}
         </main>
         <Footer />
       </div>
     );
   };

   export default NewPage;
   ```

2. Add route in `App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```

3. Add navigation link in `Header.tsx` or `Footer.tsx`.

### Adding a New Service

Edit: `/home/user/cookyourwebai/src/pages/Index.tsx`

1. Add to `mainServices` array (~line 50):
   ```tsx
   {
     id: "unique-service-id",
     title: "Service Name",
     price: "€999",
     description: "Brief description",
     gradient: "from-blue-500 via-purple-500 to-pink-500",
     features: [
       "Feature 1",
       "Feature 2",
       "Feature 3",
       "Feature 4",
       "Feature 5",
       "Feature 6"
     ]
   }
   ```

2. Or add to `individualServices` for modular offerings.

3. Component will automatically render the new service.

### Updating Contact Information

**Email**: Search for `veronica@usecookyourwebai.es` and replace globally.

**Phone**: Search for `688757782` (without +34) and replace.

**WhatsApp Link**: Search for `https://wa.me/34688757782` and update.

Files to check:
- `/home/user/cookyourwebai/src/pages/Index.tsx`
- `/home/user/cookyourwebai/src/components/ContactDialog.tsx`
- `/home/user/cookyourwebai/src/components/Footer.tsx`
- `/home/user/cookyourwebai/src/pages/PrivacyPolicy.tsx`

### Updating Webhook URLs

**Lead Capture Webhook**:
- File: `/home/user/cookyourwebai/src/components/ContactDialog.tsx:120`
- Search: `https://hook.eu2.make.com/0bx5m15241a6roo7r8n2hwxp5tr046lm`

**Unsubscribe Webhook**:
- File: `/home/user/cookyourwebai/src/pages/Unsubscribe.tsx`
- Search: `https://hook.eu2.make.com/TU_WEBHOOK_AQUI`
- Replace with actual webhook URL

### Adding a New UI Component

1. Install from shadcn-ui:
   ```bash
   npx shadcn-ui@latest add <component-name>
   ```

   Example: `npx shadcn-ui@latest add dropdown-menu`

2. Component will be added to `src/components/ui/`.

3. Import and use:
   ```tsx
   import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
   } from "@/components/ui/dropdown-menu";
   ```

### Updating Styles & Theme

**Colors**: Edit `/home/user/cookyourwebai/tailwind.config.ts`
```typescript
extend: {
  colors: {
    neonblue: "#32e2ec",    // Update hex values
    neonpink: "#ec32c7",
    neonviolet: "#8f32ec",
    neongreen: "#3fec71",
  }
}
```

**Fonts**: Update `tailwind.config.ts` and import in `index.css`

**Animations**: Add to `src/index.css` or `src/App.css`

### Adding Analytics Events

```typescript
// Push custom event to GTM
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'custom_event_name',
  eventCategory: 'Category',
  eventAction: 'Action',
  eventLabel: 'Label'
});
```

---

## Deployment & Build

### Production Build Process

```bash
# 1. Run linter
npm run lint

# 2. Build for production
npm run build
# Output: dist/ directory

# 3. Preview locally (optional)
npm run preview
```

### Vercel Deployment

**Platform**: Vercel
**Framework Preset**: Vite
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

**Environment Variables** (if needed):
- None currently required
- Add via Vercel dashboard if integrating external APIs

**Automatic Deployments**:
- Push to main branch triggers production deployment
- Pull requests get preview deployments

### Build Optimization

**Vite Optimizations**:
- Code splitting enabled by default
- Tree shaking for unused imports
- CSS minification
- Asset optimization

**Performance Tips**:
- Lazy load routes: `const Page = React.lazy(() => import('./Page'))`
- Optimize images: Use WebP format
- Minimize bundle size: Check `npm run build` output

---

## Troubleshooting

### Common Issues

**Issue**: Routes not working in production (404 errors)

**Solution**: Ensure `vercel.json` has rewrite rules:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

**Issue**: Case-sensitive import errors in production

**Solution**: Match exact file case in imports:
```tsx
// ❌ Wrong
import Button from "@/components/ui/button";

// ✅ Correct
import Button from "@/components/ui/Button";
```

---

**Issue**: Webhook not receiving data

**Solution**:
1. Check webhook URL is correct
2. Verify Content-Type header: `application/json`
3. Test with curl:
   ```bash
   curl -X POST "https://hook.eu2.make.com/..." \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Test","email":"test@test.com"}'
   ```
4. Check Make.com scenario is active

---

**Issue**: Google Analytics not tracking

**Solution**:
1. Verify GTM container ID: `GTM-P9J6QN6T`
2. Check GTM script in `index.html:6`
3. Ensure cookie consent is granted
4. Test with Google Tag Assistant browser extension

---

**Issue**: TypeScript errors on build

**Solution**: Project uses loose mode. If strict errors appear:
1. Check `tsconfig.json` has `noImplicitAny: false`
2. Use `any` type as escape hatch: `const data: any = ...`
3. Add `// @ts-ignore` for single-line suppressions

---

**Issue**: Tailwind classes not applying

**Solution**:
1. Check class names are correct
2. Verify Tailwind config includes custom classes
3. Use `cn()` utility for conditional classes
4. Check for typos in custom utilities

---

**Issue**: Mobile menu not closing on navigation

**Solution**: Add `onClick` handler to menu items:
```tsx
<a href="#section" onClick={() => setIsMobileMenuOpen(false)}>
  Link
</a>
```

---

### Debug Commands

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for unused dependencies
npx depcheck

# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Test production build locally
npm run build && npm run preview
```

---

## Additional Resources

### Documentation Links

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn-ui**: https://ui.shadcn.com
- **React Router**: https://reactrouter.com
- **TanStack Query**: https://tanstack.com/query
- **Radix UI**: https://radix-ui.com

### Project-Specific Docs

- **README.md**: Basic project setup and tech stack
- **WEBHOOK_BAJA_INSTRUCCIONES.md**: Unsubscribe webhook setup guide

### Contact & Support

- **Email**: veronica@usecookyourwebai.es
- **Phone/WhatsApp**: +34 688 75 77 82

---

## AI Assistant Guidelines

### When Making Changes

1. **Always read files before editing** - Never propose changes without reading current code
2. **Use path aliases** - Import with `@/` not relative paths
3. **Match case exactly** - Production builds are case-sensitive
4. **Test locally** - Run `npm run dev` to verify changes
5. **Run linter** - Execute `npm run lint` before committing
6. **Update this file** - If you make architectural changes, update CLAUDE.md

### Code Quality Standards

1. **TypeScript**: Use types when possible, but `any` is acceptable (loose mode)
2. **Components**: Functional components with hooks only
3. **Styling**: Tailwind utility classes, avoid inline styles
4. **Formatting**: Consistent spacing and indentation (2 spaces)
5. **Comments**: Only for complex business logic, code should be self-documenting

### When to Ask for Clarification

- Changing business logic (service prices, ROI metrics, etc.)
- Modifying webhook URLs or external integrations
- Updating legal/compliance content (RGPD requirements)
- Changing contact information (email, phone, WhatsApp)
- Major architectural changes (state management, routing, etc.)

### Commit Message Conventions

Follow recent commit patterns:
- `Feat:` - New features
- `Fix:` - Bug fixes
- `Refactor:` - Code refactoring without functionality changes
- `Docs:` - Documentation updates
- `Style:` - Formatting, missing semicolons, etc.

Examples:
- `Feat: Añadir nueva sección de testimonios`
- `Fix: Corregir validación de formulario de contacto`
- `Refactor: Extraer componente reutilizable de servicio`

---

**End of CLAUDE.md** - Last updated: 2026-01-21
