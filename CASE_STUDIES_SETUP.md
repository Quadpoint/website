# Case Studies Section - Setup Guide

Your new **Case Studies** section is now live on the homepage! Here's how to customize it with your real client work.

## 📁 File Structure

```
project-root/
├── components/sections/
│   └── CaseStudiesSection.tsx        ← Interactive grid & lightbox modal
├── lib/
│   └── case-studies.ts               ← Case study data (customize this)
├── public/
│   └── case-studies/                 ← Add your images here
│       ├── retail-thumb.png
│       ├── retail-1.png
│       ├── retail-2.png
│       ├── retail-3.png
│       ├── service-thumb.png
│       ├── service-1.png
│       ├── service-2.png
│       ├── health-thumb.png
│       ├── health-1.png
│       ├── health-2.png
│       ├── health-3.png
│       └── health-4.png
└── app/
    └── page.tsx                      ← CaseStudiesSection imported here
```

## 🎨 How It Works

1. **Grid View**: Displays case study cards with thumbnail images
   - Hover effect shows "Click to view" indicator
   - Shows category, title, description, and quick results preview

2. **Click to Expand**: Opens a modal lightbox
   - Full-size images with navigation arrows
   - Image indicators (dots) at the bottom
   - Complete results breakdown
   - Smooth fade transitions between images

3. **Mobile Responsive**: Works great on all device sizes

## 🔧 Customization Steps

### Step 1: Prepare Your Images

Create a `public/case-studies/` folder and add:
- **Thumbnails** (aspect ratio ~4:3, 600x450px recommended):
  - `your-client-thumb.png`
  
- **Case Study Images** (multiple images per case study):
  - `your-client-1.png`
  - `your-client-2.png`
  - etc.

**Supported formats**: PNG, JPG, WebP

### Step 2: Update Case Studies Data

Edit [`lib/case-studies.ts`](lib/case-studies.ts):

```typescript
export const caseStudies: CaseStudy[] = [
  {
    id: "case-your-client",
    title: "Your Client - Project Name",
    category: "Business Software", // or "AI & Automation"
    description: "One-line description of the project",
    thumbnail: "/case-studies/your-client-thumb.png",
    clientName: "Your Client Name",      // Optional
    year: "2024",                         // Optional
    challenge: "What problem did they face?",  // Optional
    solution: "How did you solve it?",    // Optional
    images: [
      "/case-studies/your-client-1.png",
      "/case-studies/your-client-2.png",
      "/case-studies/your-client-3.png",
    ],
    results: [
      { label: "Metric 1", value: "+45%" },
      { label: "Metric 2", value: "$50K" },
      { label: "Metric 3", value: "-60 hrs" },
    ],
  },
  // Add more case studies...
];
```

### Step 3: No Code Changes Needed!

The `CaseStudiesSection` component automatically reads from your `caseStudies` array. Just update the data file and your site refreshes.

## 📊 Results Formatting

Use these formats for the `results` array:

```typescript
results: [
  { label: "Speed Improvement", value: "+35%" },
  { label: "Cost Savings", value: "$40K/year" },
  { label: "Time Saved", value: "-60 hours" },
  { label: "Accuracy", value: "99.2%" },
  { label: "User Growth", value: "+150%" },
]
```

## 🎯 Example Case Study

```typescript
{
  id: "acme-pos-2024",
  title: "ACME Retail - POS System Modernization",
  category: "Business Software",
  description: "Unified point-of-sale system for 12-location retail chain",
  thumbnail: "/case-studies/acme-thumb.png",
  clientName: "ACME Retail Group",
  year: "2024",
  challenge: "Fragmented systems across locations, slow checkouts, inventory issues",
  solution: "Implemented cloud-based POS with real-time sync and analytics",
  images: [
    "/case-studies/acme-dashboard.png",
    "/case-studies/acme-checkout.png",
    "/case-studies/acme-inventory.png",
  ],
  results: [
    { label: "Checkout Speed", value: "+40%" },
    { label: "Inventory Accuracy", value: "98.5%" },
    { label: "Revenue Increase", value: "+18%" },
    { label: "Staff Training Time", value: "-50%" },
  ],
}
```

## 🖼️ Image Tips

- **Thumbnail**: Show the dashboard/interface overview
- **Detail Images**: Screenshot actual features, results, or impact
- **Professional**: Use clean screenshots without UI clutter if possible
- **Branding**: Include client logos if they allow it
- **Variety**: Mix interface screenshots, results graphs, and team photos

## 📍 Where It Appears

The case studies section appears on the homepage between:
1. Solutions Section
2. **← YOU ARE HERE →**
3. Portfolio Section (your products)

## ❓ FAQ

**Q: Can I have different numbers of images per case study?**
A: Yes! Some can have 2 images, others 5. The component handles it automatically.

**Q: Can I add more than 3 case studies?**
A: Yes! The grid will wrap to new rows. Currently shows 3 columns on desktop.

**Q: How do I hide/show a case study?**
A: Comment it out in `lib/case-studies.ts` or remove it from the array.

**Q: Can I change the section title?**
A: Yes! Edit line 93 in `CaseStudiesSection.tsx`:
```tsx
<h2 id="case-studies-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
  Your Title Here
</h2>
```

**Q: How do I rearrange case studies?**
A: Just reorder them in the array in `lib/case-studies.ts`.

---

Need help? Check the component comments in `CaseStudiesSection.tsx` for more details.
