# Component & Design Reference

## Tailwind Classes Used

### Buttons
```jsx
// Primary Button
className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"

// Gradient Button (CTA)
className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"

// Secondary Button
className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"

// Text Button
className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
```

### Cards
```jsx
// Card Container
className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all"

// Analysis Card
className="card p-6 cursor-pointer hover:shadow-xl transition-all"

// Alert Card
className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded"
```

### Forms
```jsx
// Input Field
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"

// Text Area
className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"

// Select Dropdown
className="input-field"
```

### Badges & Tags
```jsx
// Blue Badge
className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"

// Green Badge
className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"

// Purple Badge
className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
```

### Layouts
```jsx
// Hero Section
className="relative overflow-hidden"

// Max Width Container
className="max-w-7xl mx-auto px-6"

// Grid 2 Columns
className="grid md:grid-cols-2 gap-8"

// Grid 3 Columns
className="grid md:grid-cols-3 gap-8"
```

### Typography
```jsx
// Page Title
className="text-4xl font-bold text-gray-900"

// Section Title
className="text-2xl font-bold text-gray-900"

// Card Title
className="text-xl font-bold text-gray-900"

// Description Text
className="text-gray-600 text-sm"
```

### Icons & Emojis
Used throughout:
- 📋 Patent
- 🔍 Search
- 💡 Ideas
- 📄 Document
- 🤖 AI/Bot
- 🔋 Battery
- ☀️ Solar
- ⚠️ Warning
- ➤ Send

## Color Reference

### Blue Palette
```
#1e40af - Primary Dark Blue
#1e3a8a - Darker Blue
#2563eb - Bright Blue
#3b82f6 - Light Blue
#60a5fa - Lighter Blue
#93c5fd - Very Light Blue
```

### Gray Palette
```
#111827 - Text Dark (gray-900)
#374151 - Text Medium (gray-700)
#6b7280 - Text Light (gray-600)
#9ca3af - Text Lighter (gray-500)
#f3f4f6 - Background Light (gray-100)
#f9fafb - Background Lighter (gray-50)
```

### Status Colors
```
#10b981 - Success Green
#f59e0b - Warning Yellow
#ef4444 - Error Red
```

## Responsive Breakpoints

```
sm: 640px   (small devices)
md: 768px   (tablets)
lg: 1024px  (large screens)
xl: 1280px  (extra large)
2xl: 1536px (desktops)
```

## Shadow Utilities

```jsx
// Subtle Shadow
className="shadow-sm"

// Default Shadow
className="shadow-md"

// Hover Shadow
className="hover:shadow-lg"

// Strong Shadow
className="hover:shadow-xl"
```

## Spacing Scale

```
0 (0px), 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px)
8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px)
```

## Transitions

```jsx
// Standard Transition
className="transition-all"

// Color Transition
className="transition-colors"

// Shadow Transition
className="transition-shadow"

// Duration & Easing
className="transition-all duration-300 ease-in-out"
```

## Common Patterns

### Navigation Header
```jsx
<header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo */}
    {/* Nav items */}
  </div>
</header>
```

### Section Container
```jsx
<section className="max-w-7xl mx-auto px-6 py-20">
  {/* Content */}
</section>
```

### Feature Grid
```jsx
<div className="grid md:grid-cols-3 gap-8">
  {/* Card 1 */}
  {/* Card 2 */}
  {/* Card 3 */}
</div>
```

### Form Layout
```jsx
<form className="space-y-5">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Label
    </label>
    <input className="input-field" />
  </div>
</form>
```

### Dropdown Menu
```jsx
{showMenu && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
    <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
      Item
    </a>
  </div>
)}
```

## Animation Classes

```jsx
// Pulse Animation
className="animate-pulse"

// Hover Scale
className="transform hover:scale-105"

// Delay (for staggered animations)
className="delay-2000"
```

## Accessibility Features

- Semantic HTML (header, nav, main, footer, section, article)
- Proper heading hierarchy (h1, h2, h3)
- Form labels with htmlFor
- Focus states on interactive elements
- Sufficient color contrast
- Alt text on icons (using ARIA labels when needed)
- Skip to main content links (when needed)

## Performance Tips

1. Use Tailwind's JIT mode (already configured)
2. Purge unused CSS in production
3. Lazy load images
4. Use React.memo for complex components
5. Split large pages into smaller components
6. Use React Router code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

For more information, refer to:
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com/)
