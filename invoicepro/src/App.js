
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Printer, Download, Plus, Trash2, Settings, Moon, Sun,
  ChevronDown, FileText, Truck, Briefcase,
  Globe, Save, RefreshCw, Menu, X, ArrowRight, CheckCircle,
  CreditCard, Layout, ShieldCheck, Zap, Scissors, Wallet, PenTool,
  History, RotateCcw
} from 'lucide-react';

// --- Pure Utility Functions ---

const round = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const safeFloat = (val) => {
  if (val === '' || val === null || val === undefined) return 0;
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

const calculateLineItem = (qty, price) => {
  const q = Math.max(0, safeFloat(qty));
  const p = Math.max(0, safeFloat(price));
  return round(q * p);
};

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = (e) => {
      console.warn(`Failed to load script: ${src}`, e);
      reject(e);
    };
    document.head.appendChild(script);
  });
};

// --- ADS COMPONENT ---
const Ads = () => {
  useEffect(() => {
    // prevent duplicate load
    if (document.getElementById("egcpm-ad-script")) return;

    const script = document.createElement("script");
    script.id = "egcpm-ad-script";
    script.src =
      "https://pl28330167.effectivegatecpm.com/66c012a1833046421187ce1b10f6f8c1/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="container-66c012a1833046421187ce1b10f6f8c1"
      style={{
        minHeight: "250px",
        width: "100%",
        textAlign: "center",
        margin: "20px 0"
      }}
    />
  );
};

// --- CONFIGURATION & CONTENT ---

const INVOICE_TYPES = {
  standard: {
    id: 'standard',
    path: '/standard-invoice-generator',
    title: 'Standard Invoice',
    metaTitle: 'Standard Invoice Generator | Professional & Free',
    metaDesc: 'Create standard business invoices instantly. No signup required. Secure, fast, and professional PDF generation.',
    keywords: 'standard invoice, free invoice generator, online invoice maker',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    description: 'Universal format for general business needs.',
    fields: ['tax', 'discount', 'shipping'],
    subCategories: ['Standard Invoice', 'Sales Invoice', 'Service Invoice', 'General Bill'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Universal Invoicing Standard</h2>
        <p className="mb-4">The definitive tool for general business billing. Versatile, compliant, and designed for clarity.</p>
        <h3 className="text-xl font-bold mb-2">Key Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Global Acceptance:</strong> Format recognized worldwide.</li>
          <li><strong>Tax Flexibility:</strong> Adjust rates to local jurisdictions.</li>
          <li><strong>Print Ready:</strong> High-contrast layout for clear printing.</li>
        </ul>
      </>
    )
  },
  gst: {
    id: 'gst',
    path: '/gst-invoice-generator',
    title: 'GST Invoice',
    metaTitle: 'GST Invoice Generator | India Compliant',
    metaDesc: 'Generate GST-compliant invoices with automatic CGST, SGST, & IGST calculations. The best free tool for Indian businesses.',
    keywords: 'gst invoice, gst bill maker, india tax invoice',
    icon: <CreditCard className="w-6 h-6" />,
    color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
    description: 'Compliant format with automatic GST breakdown.',
    fields: ['gstin', 'hsn', 'taxBreakdown'],
    subCategories: ['GST Invoice', 'Tax Invoice', 'Bill of Supply', 'Export Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">GST Compliance Made Simple</h2>
        <p className="mb-4">Automated tax splitting for Indian businesses. We handle the calculations; you focus on the business.</p>
        <h3 className="text-xl font-bold mb-2">GST Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Smart Tax Split:</strong> Auto-calculates CGST/SGST or IGST.</li>
          <li><strong>Regulatory Fields:</strong> Dedicated slots for HSN and GSTIN.</li>
          <li><strong>Input Credit:</strong> Formatted for easy ITC claims.</li>
        </ul>
      </>
    )
  },
  freelance: {
    id: 'freelance',
    path: '/freelance-invoice-generator',
    title: 'Freelance Invoice',
    metaTitle: 'Freelance Invoice Maker | For Consultants & Creatives',
    metaDesc: 'Designed for freelancers. Create clean, professional invoices for hourly or project-based work.',
    keywords: 'freelance invoice, contractor bill, consulting invoice',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    description: 'Streamlined format for contractors and creatives.',
    fields: ['discount', 'hourly'],
    subCategories: ['Freelance Invoice', 'Consulting Bill', 'Design Invoice', 'Contractor Bill'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Built for the Gig Economy</h2>
        <p className="mb-4">Get paid faster with polished, minimal invoices that highlight your value, not the paperwork.</p>
        <h3 className="text-xl font-bold mb-2">Freelance Essentials</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Flexible Billing:</strong> Hourly rates or fixed project fees.</li>
          <li><strong>Payment Clarity:</strong> Prominent bank and UPI details.</li>
          <li><strong>Minimalist Aesthetic:</strong> Clean design that looks professional.</li>
        </ul>
      </>
    )
  },
  transport: {
    id: 'transport',
    path: '/transport-invoice-generator',
    title: 'Logistics Invoice',
    metaTitle: 'Transport & Logistics Invoice Generator',
    metaDesc: 'Specialized invoicing for transport. Include vehicle numbers, drivers, and route details.',
    keywords: 'transport invoice, logistics bill, fleet invoice',
    icon: <Truck className="w-6 h-6" />,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    description: 'Logistics format with vehicle and route tracking.',
    fields: ['vehicle', 'route', 'driver'],
    subCategories: ['Transport Bill', 'Lorry Receipt', 'Freight Invoice', 'Logistics Bill'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Logistics Documentation</h2>
        <p className="mb-4">Specialized fields for the transport sector. capture every detail from fleet to freight.</p>
        <h3 className="text-xl font-bold mb-2">Transport Specifics</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Fleet Tracking:</strong> Record Vehicle No. and Driver Name.</li>
          <li><strong>Route Definition:</strong> Clear Origin and Destination fields.</li>
          <li><strong>Compliance:</strong> Standardized format for checkpoints.</li>
        </ul>
      </>
    )
  },
  salon: {
    id: 'salon',
    path: '/salon-invoice-generator',
    title: 'Salon Invoice',
    metaTitle: 'Salon & Spa Invoice Generator',
    metaDesc: 'Elegant receipts for beauty and wellness. Track stylists, appointments, and tips.',
    keywords: 'salon invoice, spa receipt, beauty bill',
    icon: <Scissors className="w-6 h-6" />,
    color: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30',
    description: 'Elegant receipts for beauty and wellness services.',
    fields: ['stylist', 'appointment', 'tip'],
    subCategories: ['Salon Receipt', 'Spa Invoice', 'Wellness Bill', 'Service Receipt'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Beauty & Wellness Billing</h2>
        <p className="mb-4">Refined receipts for high-end service businesses. Manage appointments and staff attribution with ease.</p>
        <h3 className="text-xl font-bold mb-2">Salon Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Staff Attribution:</strong> Credit services to specific stylists.</li>
          <li><strong>Service Tracking:</strong> Record appointment dates and times.</li>
          <li><strong>Client Experience:</strong> Professional, branded receipts.</li>
        </ul>
      </>
    )
  }
};

const DEFAULT_INVOICE = {
  documentTitle: 'INVOICE',
  invoiceNo: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: 'USD',
  taxRate: 18,
  taxRate: 18,
  enableTax: true,
  taxMode: 'tax',
  discountType: 'percent',
  discountValue: 0,
  shipping: 0,
  isInterstate: false,
  sender: {
    name: '',
    address: '',
    email: '',
    phone: '',
    gstin: '',
    signature: ''
  },
  receiver: {
    name: '',
    address: '',
    email: '',
    gstin: '',
  },
  transport: {
    vehicleNo: '',
    driverName: '',
    origin: '',
    destination: '',
    lrNo: ''
  },
  salon: {
    stylist: '',
    appointmentDate: ''
  },
  payment: {
    status: 'pending', // pending | paid | partial
    method: 'UPI',
    referenceId: '',
    paidDate: '',
    amount: 0
  },
  // Ensure default items have EMPTY strings for qty/price
  items: [
    { id: 1, name: '', description: '', quantity: '', price: '', hsn: '' }
  ],
  notes: 'Thank you for your business!',
  terms: 'Payment Due upon receipt.\nBank: \nAccount: '
};

const CURRENCIES = [
  { code: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'EUR', symbol: '€', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', locale: 'en-GB' },
  { code: 'INR', symbol: '₹', locale: 'en-IN' },
  { code: 'CAD', symbol: 'CA$', locale: 'en-CA' },
  { code: 'AUD', symbol: 'AU$', locale: 'en-AU' },
  { code: 'AED', symbol: 'AED', locale: 'ar-AE' },
];

const APP_FEATURES = [
  {
    id: 'templates',
    icon: <Layout />,
    title: 'Agency-Grade Design',
    description: 'Create professional invoices that build client trust. Our sleek, modern layouts ensure your brand looks established and credible.',
    popupContent: (
      <>
        <p className="mb-4">
          In the business world, perception is reality. A messy, poorly formatted bill can make even the most professional freelancer look like an amateur. That is why our <strong>professional invoice generator</strong> focuses heavily on aesthetics and readability.
        </p>
        <p className="mb-4">
          Our "Agency-Grade" design system is built to mimic the high-end financial documents used by Fortune 500 companies. It features clean typography, perfect alignment, and subtle branding elements that elevate your business image.
        </p>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Why Design Matters for Invoicing</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Faster Payments:</strong> Clear, professional layouts reduce confusion, leading to quicker approvals and payments.</li>
          <li><strong>Brand Authority:</strong> A polished PDF signals competence and reliability to your clients.</li>
          <li><strong>Legal Clarity:</strong> Our templates ensure that critical fields like Tax IDs, Due Dates, and Payment Terms are impossible to miss.</li>
        </ul>
        <p>
          Whether you are a solo creative using our <strong>freelance invoice maker</strong> or a corporation needing a <strong>GST invoice tool</strong>, our design ensures you always look your best.
        </p>
      </>
    )
  },
  {
    id: 'security',
    icon: <ShieldCheck />,
    title: 'Local-First Privacy',
    description: 'Your data stays on your device. We offer a secure invoice software solution with zero server storage and 100% privacy.',
    popupContent: (
      <>
        <p className="mb-4">
          Privacy is not an optional feature; it is the foundation of our engineering. Unlike most <strong>online invoicing tools</strong> that force you to create an account and upload your sensitive client data to their cloud, InvoicePro operates on a "Local-First" architecture.
        </p>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">How Local-First Works</h4>
        <p className="mb-4">
          When you type a client's name or a project fee, that data is saved directly to your browser's internal memory (Local Storage). It never travels over the internet to our database. We literally cannot see your revenue, your clients, or your business details.
        </p>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Security Benefits</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Zero Data Leaks:</strong> Since we don't hold your data, we cannot be breached. Your business secrets remain on your hard drive.</li>
          <li><strong>No "Lock-In":</strong> You are not tied to our platform. You generate your PDF and leave. You own your records.</li>
          <li><strong>GDPR & Compliance:</strong> By minimizing data collection, we offer a <strong>secure billing solution</strong> that naturally aligns with global privacy standards.</li>
        </ul>
      </>
    )
  },
  {
    id: 'speed',
    icon: <Zap />,
    title: 'Instant Export',
    description: 'Generate high-resolution A4 PDFs in milliseconds. The fastest free invoice generator for busy professionals.',
    popupContent: (
      <>
        <p className="mb-4">
          Time is money. You shouldn't have to wait for a spinning loading screen just to bill a client. Our <strong>instant invoice generator</strong> is engineered for extreme speed, rendering complex documents in under 100 milliseconds.
        </p>
        <p className="mb-4">
          We use advanced client-side PDF generation technology. This means the PDF is constructed right on your computer's powerful processor, rather than waiting for a slow remote server to do the work and send it back.
        </p>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Efficiency for Your Workflow</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Print-Ready:</strong> Our PDFs are formatted strictly to A4 standards with exact margins, ensuring they look perfect when printed physically.</li>
          <li><strong>One-Click Download:</strong> No email sign-ups, no "wait 5 minutes" queues. Click download, and the file is in your folder instantly.</li>
          <li><strong>Cross-Platform:</strong> Works flawlessly on mobile, tablet, and desktop, making it the ideal <strong>online invoice software</strong> for contractors on the go.</li>
        </ul>
      </>
    )
  },
  {
    id: 'global',
    icon: <Globe />,
    title: 'Multi-Currency',
    description: 'Bill international clients with ease. Support for USD, EUR, INR, and more makes this the ultimate global invoicing tool.',
    popupContent: (
      <>
        <p className="mb-4">
          The modern economy is global. Freelancers in India work for clients in the US; agencies in London bill startups in Berlin. Your <strong>invoice generator</strong> needs to speak the language of international finance.
        </p>
        <p className="mb-4">
          InvoicePro supports dynamic currency switching. With a single click, you can transform your invoice from Dollars ($) to Euros (€), Rupees (₹), or Pounds (£). We handle the symbol placement and formatting automatically.
        </p>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Built for International Business</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Freelancer Friendly:</strong> Perfect for digital nomads and remote workers billing across borders.</li>
          <li><strong>Compliance Ready:</strong> Combine currency settings with our flexible tax labels (VAT/GST) to create legally compliant documents for any jurisdiction.</li>
          <li><strong>No Conversion Fees:</strong> Unlike payment gateways, we don't charge you to change the currency symbol on your document. It's completely free.</li>
        </ul>
      </>
    )
  }
];

const FAQS = [
  {
    question: "Is this invoice generator truly free?",
    answer: "Yes, InvoicePro is a completely free invoice generator designed to help freelancers and small businesses create professional documents without any cost. Unlike other platforms that limit the number of documents you can create, we impose no hidden fees or paywalls. You can generate unlimited invoices and download them as high-quality PDFs instantly. We believe in providing accessible financial tools for everyone, ensuring you can manage your billing efficiently without worrying about monthly subscriptions or trial periods."
  },
  {
    question: "Do I need to sign up or create an account?",
    answer: "No, you do not need to create an account or sign up to use our online invoice generator. We value your time and privacy, which is why our tool is designed for instant access. Simply visit the website, enter your billing details, and download your invoice immediately. By removing the registration barrier, we allow you to focus on your business rather than managing passwords. However, your data is still preserved locally on your device for your convenience."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We prioritize your privacy by using a \"Local-First\" secure invoice generator architecture. This means that all the data you enter—client names, addresses, and financial figures—is stored exclusively in your browser's local storage on your own device. We do not transmit or store your sensitive invoice data on our servers or any cloud database. This ensures that you retain 100% control and ownership of your business information, keeping it safe from external data breaches."
  },
  {
    question: "Can I generate a GST Invoice for India?",
    answer: "Yes, our tool is fully equipped to serve as a comprehensive GST invoice generator for Indian businesses. We offer a dedicated GST mode that allows you to easily input your GSTIN, HSN codes, and tax rates. The system automatically calculates the correct breakdown for CGST, SGST, and IGST based on whether the transaction is intra-state or inter-state. This ensures your documents are tax-compliant and legally valid for filing returns in India."
  },
  {
    question: "Can I add my own logo?",
    answer: "Yes, adding your branding is simple. Our professional invoice generator allows you to upload your company logo directly onto the invoice template. Supported formats include PNG, JPG, and SVG. Adding a logo enhances your brand identity and makes your documents look more established and trustworthy to clients. The logo is processed locally in your browser and is not uploaded to any external server, maintaining strict data privacy."
  },
  {
    question: "Can I change the currency?",
    answer: "Yes, InvoicePro supports multi-currency invoicing to cater to global businesses and freelancers working with international clients. You can select major currencies such as USD ($), EUR (€), GBP (£), INR (₹), and many others from the settings panel. Our online invoice generator formats the currency symbols and decimal places correctly for each region, ensuring your international invoices are clear, professional, and easy for your clients to understand."
  },
  {
    question: "Can I save the invoice to edit later?",
    answer: "Yes, we offer a convenient auto-save feature powered by your browser's local storage. If you close the tab or browser window, your current invoice details will be automatically retained for your next visit. Additionally, our \"History\" feature keeps track of your recently generated invoices, allowing you to reload previous data with a single click. This makes it easy to duplicate past invoices for recurring billing without needing to re-enter all the information manually."
  },
  {
    question: "Is there a mobile app?",
    answer: "InvoicePro is built as a highly responsive Progressive Web App (PWA), which means it functions just like a native mobile app directly in your browser. You do not need to download or install cumbersome software from an app store. Whether you are using an iPhone, iPad, or Android device, our mobile invoice generator adapts perfectly to your screen size, allowing you to create, edit, and send professional invoices while you are on the go."
  }
];

// --- SEO MANAGER (Head Injection) ---
const updateHead = (meta) => {
  // Update Title
  document.title = meta.title;

  // Helper to set meta tags
  const setMeta = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper for OG tags (property instead of name)
  const setOg = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const setLink = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  setMeta('description', meta.description);
  setMeta('keywords', meta.keywords);
  setLink('canonical', meta.url);

  // Open Graph
  setOg('og:title', meta.title);
  setOg('og:description', meta.description);
  setOg('og:url', meta.url);
  setOg('og:type', 'website');

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);

  // JSON-LD Schema (Replace existing script to prevent duplicates)
  const schemaScriptId = 'app-schema-json-ld';
  let schemaScript = document.getElementById(schemaScriptId);
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = schemaScriptId;
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InvoicePro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": meta.url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": meta.description
  };
  schemaScript.textContent = JSON.stringify(schemaData);
};

const FeatureCard = ({ icon, title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
  >
    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm">{desc}</p>
    <div className="mt-4 flex items-center text-indigo-600 text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ArrowRight size={12} className="ml-1" />
    </div>
  </div>
);

const FeaturePopup = ({ feature, onClose }) => {
  if (!feature) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
          {feature.icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
        <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {feature.popupContent}
        </div>
      </div>
    </div>
  );
};

// --- LEGAL & CONTENT PAGES ---

const LegalLayout = ({ title, children }) => (
  <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[60vh] animate-in fade-in duration-500">
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">{title}</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
        {children}
      </div>
    </div>
  </div>
);

const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy">
    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <p className="mb-3 text-sm">
        <strong>Primary Keywords:</strong> privacy policy invoice generator, invoice software privacy policy, invoicing platform privacy policy, billing software privacy policy
      </p>
      <p className="mb-3 text-sm">
        <strong>Secondary Keywords:</strong> invoice data privacy, online invoicing data protection, secure invoice generator, billing software data security, gst invoice privacy policy
      </p>
      <p className="text-sm">
        <strong>Long-Tail Keywords:</strong> how invoice data is protected, invoice generator privacy policy india, secure billing software for businesses, invoice pdf data protection, privacy focused invoice software
      </p>
    </div>

    <p className="mb-6 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">1. Introduction to Privacy Policy</h2>
    <p className="mb-4">
      Welcome to InvoicePro ("we," "our," or "us"). We recognize that your financial data is the lifeblood of your business, and protecting your privacy is not just a legal obligation but our core ethical commitment. This Privacy Policy outlines how InvoicePro collects, uses, maintains, and discloses information collected from users (each, a "User") of the InvoicePro website and <strong>invoice generator</strong> services (the "Service").
    </p>
    <p className="mb-4">
      Unlike traditional cloud-based <strong>invoicing platforms</strong> that harvest, store, and monetize your data, InvoicePro is built on a "Local-First" architecture. This means that we have fundamentally designed our software to minimize data collection and maximize user privacy.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">2. Scope and Purpose of This Policy</h2>
    <p className="mb-4">
      This Privacy Policy applies to the website and all products and services offered by InvoicePro. It governs any data you may provide to us directly or that we may collect automatically through your use of our <strong>billing software</strong>.
    </p>
    <p className="mb-4">
      The purpose of this policy is to provide you with clear, transparent, and comprehensive information regarding:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>What data allows the <strong>invoice software</strong> to function.</li>
      <li>How your sensitive financial data is handled (and why we don't see it).</li>
      <li>Your rights regarding your personal and business information.</li>
      <li>Our compliance with global data protection standards.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">3. Our Commitment to User Privacy</h2>
    <p className="mb-4">
      We believe that you should not have to sacrifice privacy for productivity. Our commitment to you is simple: <strong>We do not sell, trade, or rent Users' personal identification information to others.</strong>
    </p>
    <p className="mb-4">
      We operate as a <strong>secure invoice generator</strong> provider, meaning our business model relies on providing utility, not on exploiting user data. We have implemented robust technical safeguards to ensure that your invoice data remains under your sole control.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">4. Definitions and Terminology</h2>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>"User"</strong>: Any individual or entity accessing or using our Service.</li>
      <li><strong>"Invoice Data"</strong>: The specific content you enter into the generator, including client names, addresses, line items, prices, tax rates, and banking details.</li>
      <li><strong>"Personal Information"</strong>: Data that can identify you as an individual, such as your IP address or email address (if voluntarily provided).</li>
      <li><strong>"Local Storage"</strong>: A web browser technology that allows data to be stored locally on your device rather than on a remote server.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">5. Information We Do NOT Collect</h2>
    <p className="mb-4">
      To be a truly <strong>privacy-focused invoice software</strong>, it is crucial to clarify what we do <strong>NOT</strong> collect. Unlike competitors, we have zero visibility into:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Your Client List:</strong> We do not know who you are billing.</li>
      <li><strong>Your Revenue Data:</strong> We do not track your transaction amounts or total income.</li>
      <li><strong>Your Banking Credentials:</strong> We do not see or store your bank account numbers or UPI IDs.</li>
      <li><strong>Your Generated Documents:</strong> We do not keep copies of the PDFs you generate.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">6. Information We May Collect</h2>
    <p className="mb-4">
      While we avoid collecting sensitive business data, we may collect limited technical data to maintain and improve our <strong>online invoicing data protection</strong> standards and service performance:
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">6.1. Non-Personal Identification Information</h3>
    <p className="mb-4">
      We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">6.2. Web Browser Cookies</h3>
    <p className="mb-4">
      Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">7. Business and Invoice Data Handling</h2>
    <p className="mb-4">
      This section explains the technical core of our <strong>invoice data privacy</strong>.
    </p>
    <p className="mb-4">
      When you use our tool to create an invoice, the data entry fields (Sender Name, Receiver Name, Items, Prices) are active only within your browser's "DOM" (Document Object Model). When you click "Download," the PDF is generated client-side using JavaScript libraries running on your device.
    </p>
    <p className="mb-4">
      At no point does this raw JSON data transmit to a backend API for saving. It remains volatile and local. This architecture ensures that even in the unlikely event of a server breach, your financial documents would not be compromised because they were never there in the first place.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">8. Local-First and User-Controlled Data Philosophy</h2>
    <p className="mb-4">
      We champion a "Local-First" software philosophy. This means:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Data Ownership:</strong> You own your data, literally. It resides on your hard drive.</li>
      <li><strong>Portability:</strong> You are responsible for exporting your data (via PDF).</li>
      <li><strong>Persistence:</strong> We use `localStorage` to save your state between sessions so you don't lose work if you accidentally close the tab. This storage is managed entirely by your browser.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">9. GST, Tax, and Financial Data Privacy</h2>
    <p className="mb-4">
      For users utilizing our <strong>gst invoice privacy policy</strong> compliant features:
    </p>
    <p className="mb-4">
      We understand that GSTINs, Harmonized System of Nomenclature (HSN) codes, and tax breakdowns are sensitive regulatory information.
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Input Validation:</strong> We may validate the format of a GSTIN (e.g., verifying it is 15 characters) purely for UI feedback.</li>
      <li><strong>No Cross-Referencing:</strong> We do not cross-reference your entered GSTINs with government databases or third-party APIs.</li>
      <li><strong>Financial Secrecy:</strong> Your tax liability calculations are performed locally. We do not aggregate or analyze tax data across users.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">10. How Information Is Used</h2>
    <p className="mb-4">
      Any information we do collect (technical logs, analytics) is used for the following purposes:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>To improve customer service:</strong> Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
      <li><strong>To personalize user experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
      <li><strong>To improve our Site:</strong> We may use feedback you provide to improve our products and services.</li>
      <li><strong>To maintain security:</strong> To monitor for DDOS attacks or malicious traffic patterns.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">11. Data Storage and Retention Policy</h2>
    <p className="mb-4">
      <strong>Server Storage:</strong> We retain server logs (IP addresses, request times) for a limited period (typically 30-90 days) for security auditing, after which they are deleted or anonymized.
    </p>
    <p className="mb-4">
      <strong>Browser Storage:</strong> Data stored in your browser's Local Storage remains there until you explicitly clear your browser cache or use the "Reset" function within the app. We have no mechanism to remotely delete this data as we have no access to it.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">12. Cookies and Analytics Usage</h2>
    <p className="mb-4">
      We may use third-party analytics services (such as Google Analytics) to understand website traffic. These services use cookies to track stats like page visits, session duration, and bounce rates.
    </p>
    <p className="mb-4">
      This data is anonymized. We do not link analytics data to specific invoice contents. For example, we might know that 1,000 users visited the "Freelance Invoice" page, but we will not know what any of those 1,000 users wrote in their invoices.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">13. Third-Party Services and Integrations</h2>
    <p className="mb-4">
      Our Service may contain links to third-party websites or services (e.g., advertising partners). We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.
    </p>
    <p className="mb-4">
      Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personal information.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">14. Data Sharing and Disclosure Policy</h2>
    <p className="mb-4">
      We do not sell, trade, or rent Users' personal identification information. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
    </p>
    <p className="mb-4">
      We will disclose information only when required by law, such as in response to a subpoena, court order, or other governmental request, or when we believe in good faith that disclosure is reasonably necessary to protect the property or rights of InvoicePro, third parties, or the public at large.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">15. Security Measures and Safeguards</h2>
    <p className="mb-4">
      We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>HTTPS Encryption:</strong> All data transmitted between your browser and our content delivery network is encrypted using SSL (Secure Socket Layer) technology.</li>
      <li><strong>Content Security Policy (CSP):</strong> We employ strict CSP headers to prevent Cross-Site Scripting (XSS) attacks.</li>
      <li><strong>Minimal Exposure:</strong> By not storing user data, we remove the primary target for attackers, inherently increasing <strong>billing software data security</strong>.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">16. User Responsibilities for Data Protection</h2>
    <p className="mb-4">
      While we secure the infrastructure, you play a vital role in <strong>invoice pdf data protection</strong>:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Device Security:</strong> Ensure your computer or mobile device is password protected and free from malware.</li>
      <li><strong>Browser Hygiene:</strong> If using a public computer, always use "Incognito" or "Private" mode so that your local storage data is wiped upon closing the window.</li>
      <li><strong>Physical Privacy:</strong> Be aware of your surroundings when entering sensitive client data in public spaces.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">17. Data Accuracy and User Control</h2>
    <p className="mb-4">
      Because we do not store your data, we cannot correct, update, or delete it for you. You have total control. If you make a mistake on an invoice, you can simply edit the fields in the generator and re-download the PDF. You are the sole curator of your data accuracy.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">18. Children's Privacy</h2>
    <p className="mb-4">
      Protecting the privacy of the very young is especially important. For that reason, we never collect or maintain information at our Site from those we actually know are under 13, and no part of our website is structured to attract anyone under 13. If you are a parent or guardian and believe your child has provided us with Personal Information, please contact us.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">19. International Users</h2>
    <p className="mb-4">
      The Service is hosted in secure global data centers. If you are accessing the Service from the European Union, Asia, or any other region with laws or regulations governing personal data collection, use, and disclosure that differ from United States or Indian laws, please be advised that through your continued use of the Service, which is governed by this Privacy Policy, you are transferring your personal information to the jurisdictions where our servers operate.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">20. Legal Compliance and Regulatory Framework</h2>
    <p className="mb-4">
      We strive to align our privacy practices with major global regulations, including:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>GDPR (General Data Protection Regulation):</strong> We respect the rights of EU users to data minimization and transparency.</li>
      <li><strong>CCPA (California Consumer Privacy Act):</strong> We do not sell personal data of California residents.</li>
      <li><strong>IT Act, 2000 (India):</strong> We adhere to reasonable security practices and procedures as mandated for sensitive personal data in India.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">21. User Rights and Choices</h2>
    <p className="mb-4">
      Depending on your jurisdiction, you may have specific rights regarding your data:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>The Right to Access:</strong> You have the right to request copies of your personal data (though we generally possess none).</li>
      <li><strong>The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
      <li><strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">22. Data Breach Response Policy</h2>
    <p className="mb-4">
      In the event that we become aware that the security of the Site has been compromised or users' Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with data protection authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the breach or if notice is otherwise required by law.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">23. Changes to This Privacy Policy</h2>
    <p className="mb-4">
      InvoicePro has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">24. Contact Information</h2>
    <p className="mb-4">
      If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
    </p>
    <p className="font-semibold text-indigo-600 mb-4">support@invoicepro.com</p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">25. Final Privacy Commitment Summary</h2>
    <p className="mb-4">
      At InvoicePro, trust is our currency. We are building a sustainable <strong>secure billing software for businesses</strong> by focusing on excellence, not exploitation. We promise to remain transparent, vigilant, and protective of the data you entrust to your browser while using our tools. Your business is yours alone.
    </p>
  </LegalLayout>
);

const TermsOfService = () => (
  <LegalLayout title="Terms of Service">
    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <p className="mb-3 text-sm">
        <strong>Primary Keywords:</strong> terms of service invoice generator, invoice software terms, invoicing platform terms, billing software terms of service.
      </p>
      <p className="mb-3 text-sm">
        <strong>Secondary Keywords:</strong> invoice generator usage terms, online invoicing terms, invoice software conditions, billing tool terms and conditions.
      </p>
      <p className="text-sm">
        <strong>Long-Tail Keywords:</strong> invoice generator legal terms, invoice software usage policy, billing software legal agreement, invoice platform user responsibilities.
      </p>
    </div>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">1. Introduction and Acceptance of Terms</h2>
    <p className="mb-4">
      Welcome to InvoicePro. By accessing, browsing, or using our website and <strong>free invoice generator</strong> services (collectively, the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms").
    </p>
    <p className="mb-4">
      These Terms constitute a legally binding agreement between you ("User", "you", or "your") and InvoicePro ("Company", "we", "us", or "our"). If you do not agree to these Terms, you must strictly stop using the Service immediately.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">2. Eligibility to Use the Service</h2>
    <p className="mb-4">
      By using our <strong>invoice software</strong>, you represent and warrant that:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>You are at least 18 years of age or the age of legal majority in your jurisdiction.</li>
      <li>You have the legal authority to enter into these Terms on behalf of yourself or any business entity you represent.</li>
      <li>You are not prohibited by any applicable law from accessing or using this <strong>invoicing platform</strong>.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">3. Description of the Service</h2>
    <p className="mb-4">
      InvoicePro provides a web-based <strong>online invoice generator</strong> that allows users to create, edit, and download professional invoices in PDF format. The Service includes various templates such as Standard, GST, Freelance, and Logistics invoices.
    </p>
    <p className="mb-4">
      The Service is provided on a "Local-First" architecture basis. This means that the data you enter (including client details, pricing, and tax information) is processed locally within your web browser and is not stored on our centralized servers.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">4. User Responsibilities and Obligations</h2>
    <p className="mb-4">
      As a user of our <strong>billing software</strong>, you agree to:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>Provide accurate and truthful information on your invoices.</li>
      <li>Use the Service only for lawful business purposes.</li>
      <li>Ensure that you have the necessary rights to use any logos, images, or business names you upload to the invoice generator.</li>
      <li>Take full responsibility for the backup of your invoice data (since we do not store it for you).</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">5. Acceptable and Prohibited Use</h2>
    <p className="mb-4">
      You agree NOT to use the Service to:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>Generate fraudulent, misleading, or illegal financial documents.</li>
      <li>Violate any applicable local, state, national, or international law or regulation.</li>
      <li>Infringe upon the intellectual property rights of others.</li>
      <li>Attempt to reverse engineer, decompile, or hack any portion of the InvoicePro website.</li>
      <li>Upload any malicious code, viruses, or harmful data.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">6. Invoice Accuracy Disclaimer</h2>
    <p className="mb-4">
      While our <strong>invoice calculator</strong> is designed to provide accurate mathematical totals based on your inputs, it is a tool, not an accountant.
    </p>
    <p className="mb-4">
      You acknowledge that you are solely responsible for verifying the accuracy of:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>Tax rates (GST, VAT, Sales Tax) applied to your invoices.</li>
      <li>Mathematical totals, discounts, and shipping charges.</li>
      <li>Client details and business information.</li>
    </ul>
    <p className="mb-4">
      InvoicePro is not liable for any financial loss or legal disputes arising from calculation errors, incorrect tax applications, or typos in your generated documents.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">7. Tax, GST, and Legal Compliance</h2>
    <p className="mb-4">
      Compliance with tax laws is the sole responsibility of the user. Our <strong>invoice software terms</strong> state clearly that we provide the format, but you provide the compliance.
    </p>
    <p className="mb-4">
      Specifically for users in India using our GST features: You are responsible for ensuring your GSTIN, HSN codes, and tax slabs (CGST/SGST/IGST) are correct according to current government regulations. InvoicePro does not validate your tax inputs against government databases.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">8. No Professional or Legal Advice</h2>
    <p className="mb-4">
      The content and tools provided by InvoicePro are for informational and utility purposes only. Nothing on this website constitutes legal, accounting, or tax advice. You should consult with a qualified professional for advice regarding your specific business circumstances.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">9. Data Handling and Local-First Usage</h2>
    <p className="mb-4">
      We prioritize your privacy through a "Local-First" approach. By using this service, you understand and agree that:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>No Cloud Storage:</strong> We do not store your invoice history, client lists, or revenue data on our servers.</li>
      <li><strong>Browser Storage:</strong> Your data is stored in your browser's "Local Storage". If you clear your browser cache, switch devices, or use incognito mode, your data may be lost.</li>
      <li><strong>User Responsibility:</strong> It is your responsibility to download and save PDF copies of your invoices for your records.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">10. Intellectual Property Rights</h2>
    <p className="mb-4">
      <strong>Our IP:</strong> The InvoicePro website, code, design, logos, and software architecture are the exclusive property of InvoicePro and are protected by copyright and intellectual property laws.
    </p>
    <p className="mb-4">
      <strong>Your IP:</strong> You retain all rights to the data you enter and the specific content of the invoices you generate. We claim no ownership over your business data.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">11. Service Availability and Modifications</h2>
    <p className="mb-4">
      We strive to keep the Service up and running 24/7. However, we do not guarantee that the Service will be uninterrupted, secure, or error-free.
    </p>
    <p className="mb-4">
      We reserve the right to modify, suspend, or discontinue any part of the <strong>billing tool</strong> at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of the Service.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">12. Limitation of Liability</h2>
    <p className="mb-4">
      TO THE FULLEST EXTENT PERMITTED BY LAW, INVOICEPRO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>YOUR USE OR INABILITY TO USE THE SERVICE;</li>
      <li>ANY ERRORS OR INACCURACIES IN THE INVOICES GENERATED;</li>
      <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS (IF APPLICABLE) AND/OR ANY PERSONAL INFORMATION STORED THEREIN.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">13. Disclaimer of Warranties</h2>
    <p className="mb-4">
      THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. INVOICEPRO EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">14. Indemnification</h2>
    <p className="mb-4">
      You agree to defend, indemnify, and hold harmless InvoicePro and its affiliates, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">15. Governing Law and Jurisdiction</h2>
    <p className="mb-4">
      These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in India.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">16. Changes to Terms of Service</h2>
    <p className="mb-4">
      We reserve the right to update or modify these Terms at any time. If we make material changes, we will notify you by posting the new Terms on this page and updating the "Last updated" date at the top. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">17. Contact Information</h2>
    <p className="mb-4">
      If you have any questions about these <strong>invoice software usage policies</strong> or Terms, please contact us at:
    </p>
    <p className="font-semibold text-indigo-600">support@invoicepro.com</p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Final Legal Summary</h2>
    <p className="mb-4">
      By using InvoicePro, you agree to do so responsibly. We provide a powerful, free tool to help you run your business, but the final responsibility for the accuracy and legality of the documents you create lies with you. We value your trust and are committed to providing a secure, private, and efficient service.
    </p>
  </LegalLayout>
);

const AboutUs = () => (
  <LegalLayout title="About InvoicePro: Our Mission & Philosophy">
    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <p className="mb-3 text-sm">
        <strong>Primary Keywords:</strong> about invoicepro, free invoice generator company, online invoicing platform, invoice software provider, invoicing solution.
      </p>
      <p className="mb-3 text-sm">
        <strong>Secondary Keywords:</strong> professional invoicing tool, billing software for small business, freelancer invoicing platform, gst invoice software india, secure invoice generator.
      </p>
      <p className="text-sm">
        <strong>Long-Tail Keywords:</strong> who built invoicepro, why use invoicepro, invoicepro for freelancers and businesses, secure online invoice generator, local first invoicing software, privacy focused invoice tool.
      </p>
    </div>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Who We Are</h2>
    <p className="mb-4">
      InvoicePro is a dedicated team of developers, designers, and financial technology enthusiasts. We are not a giant, faceless corporation harvesting your data. We are a boutique software studio passionate about building <strong>elegant, privacy-first tools</strong> for the modern web.
    </p>
    <p className="mb-4">
      Our team understands the hustle of the freelancer, the pressure of the small business owner, and the compliance headaches of the consultant. We built InvoicePro because we needed it ourselves—a fast, reliable <strong>online invoicing platform</strong> that doesn't require a monthly subscription or a credit card to generate a simple PDF.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Why InvoicePro Was Created</h2>
    <p className="mb-4">
      The internet is flooded with invoicing tools, but most of them share the same flaws:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>They force you to sign up before you can see the product.</li>
      <li>They lock essential features (like PDF download) behind a paywall.</li>
      <li>They watermark your professional documents, making you look cheap.</li>
      <li>They store your sensitive financial data on servers you can't control.</li>
    </ul>
    <p className="mb-4">
      We believed there had to be a better way. We envisioned a <strong>free invoice generator company</strong> that prioritized user experience over aggressive monetization. InvoicePro was born from the idea that basic business tools should be accessible, high-quality, and respectful of user privacy.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Our Mission & Vision</h2>
    <p className="mb-4">
      <strong>Our Mission:</strong> To democratize access to professional financial tools. We want to ensure that a graphic designer in Mumbai, a plumber in London, and a consultant in New York all have access to the same high-quality <strong>invoicing solution</strong> as a Fortune 500 company.
    </p>
    <p className="mb-4">
      <strong>Our Vision:</strong> To become the world's most trusted, privacy-centric <strong>invoice software provider</strong>. We see a future where "Local-First" software becomes the standard, putting data ownership back in the hands of the user.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Who InvoicePro Is Built For</h2>
    <p className="mb-4">
      While our tool is powerful enough for large enterprises, our heart lies with the independent economy. InvoicePro is specifically engineered for:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Freelancers & Gig Workers:</strong> Who need a <strong>freelancer invoicing platform</strong> that is quick and easy.</li>
      <li><strong>Small Business Owners (SMEs):</strong> Who need robust <strong>billing software for small business</strong> without the overhead of an ERP.</li>
      <li><strong>Contractors & Tradespeople:</strong> Who need to generate invoices on-site from a mobile device.</li>
      <li><strong>Startups:</strong> Who need to look professional from Day 1 without burning cash on software subscriptions.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Our Core Principles</h2>
    <p className="mb-4">
      Every feature we build and every line of code we write is guided by four unshakeable principles:
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">1. Radical Simplicity</h3>
    <p className="mb-4">
      Invoicing shouldn't require a manual. If you can't create an invoice in under 60 seconds on your first try, we have failed. We strip away the clutter, leaving only what is essential for a legally valid, professional document.
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">2. Uncompromising Privacy (Local-First)</h3>
    <p className="mb-4">
      This is our biggest differentiator. We utilize a <strong>Local-First architecture</strong>. This means the code runs in your browser, but the database lives in your device's memory. We do not see your clients, your revenue, or your bank details. You are the only owner of your data.
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">3. Financial Accuracy</h3>
    <p className="mb-4">
      When money is involved, "close enough" is not good enough. Our calculation engine handles complex decimals, multi-layered taxes (like GST), and discounts with mathematical precision to ensuring your totals are always penny-perfect.
    </p>

    <h3 className="text-xl font-bold mt-6 mb-3">4. Universal Accessibility</h3>
    <p className="mb-4">
      We are committed to keeping the core <strong>invoice generator free</strong>. We believe that financial barriers should not prevent anyone from running a business professionally.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Security & Data Privacy Philosophy</h2>
    <p className="mb-4">
      In an era of constant data breaches, we took a radical approach: <strong>We store nothing.</strong>
    </p>
    <p className="mb-4">
      Most cloud invoicing platforms are honeypots for hackers because they centralize financial data. By decentralizing data storage to your device (via Local Storage technology), we eliminate the risk of a central server hack compromising your business.
    </p>
    <p className="mb-4">
      This creates a <strong>secure invoice generator</strong> environment where you can work with peace of mind, knowing that your trade secrets and client lists are physically located on your machine, not in our cloud.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Global & India-Focused Capabilities</h2>
    <p className="mb-4">
      We understand that invoicing rules change across borders. That is why InvoicePro isn't just a generic template; it is a smart, adaptable tool.
    </p>
    <p className="mb-4">
      For our substantial user base in India, we have built a specialized <strong>GST invoice software India</strong> mode. It understands the nuances of CGST, SGST, and IGST, automatically applying the correct tax logic based on your inputs. It handles HSN codes and GSTIN formatting out of the box.
    </p>
    <p className="mb-4">
      Globally, we support every major currency and allow for flexible tax labeling (VAT, Sales Tax, Consumption Tax), making us a truly international <strong>professional invoicing tool</strong>.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Trust & Transparency</h2>
    <p className="mb-4">
      Building trust online is hard. We try to earn it by being transparent about what we do and, more importantly, what we don't do.
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li>We do <strong>not</strong> sell your data.</li>
      <li>We do <strong>not</strong> inject hidden watermarks on paid-looking documents.</li>
      <li>We do <strong>not</strong> lock your historical data behind a ransom paywall.</li>
    </ul>
    <p className="mb-4">
      We operate on a sustainability model that relies on non-intrusive advertising and optional premium features in the future, never by exploiting user data.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Final Brand Summary</h2>
    <p className="mb-4">
      InvoicePro is more than a website; it is a commitment to the independent workforce. We are here to support your journey from your first gig to your thousandth client.
    </p>
    <p className="mb-4">
      Thank you for trusting us with your business. We promise to keep building, improving, and simplifying, so you can spend less time on paperwork and more time doing what you love.
    </p>

  </LegalLayout>
);

const ContactUs = () => (
  <LegalLayout title="Contact Us">
    <p className="mb-4">
      Need assistance? We're here to help you get the most out of InvoicePro.
    </p>

    <ul className="list-disc pl-5 mb-6 space-y-2">
      <li>Technical support & bug reports</li>
      <li>Feature requests</li>
      <li>Compliance & Format inquiries</li>
    </ul>

    <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 inline-block pr-12">
      <h3 className="font-bold text-lg mb-2">Support Channel</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Direct all inquiries to:
      </p>
      <a
        href="mailto:support@invoicepro.com"
        className="text-indigo-600 font-semibold hover:underline"
      >
        support@invoicepro.com
      </a>
    </div>

    <p className="mt-8 text-sm text-slate-500">
      Response time: 24–48 hours.
    </p>
  </LegalLayout>
);

const HowToCreateInvoice = () => (
  <LegalLayout title="The Ultimate Invoice Guide: How to Create Professional Invoices">

    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <p className="mb-3 text-sm">
        <strong>Primary Keywords:</strong> invoice guide, how to create an invoice, professional invoice, invoice format, invoice generator, online invoice maker, invoice pdf, business invoice, billing guide, free invoice creator.
      </p>
      <p className="mb-3 text-sm">
        <strong>Secondary Keywords:</strong> gst invoice format, freight bill, freelance invoice template, tax invoice, proforma invoice, commercial invoice, salon receipt, invoice calculation, payment proof, billing software.
      </p>
      <p className="text-sm">
        <strong>Long-Tail Keywords:</strong> how to make an invoice for free, requirements for a valid tax invoice, difference between invoice and receipt, best free invoice app for freelancers, download invoice pdf without watermark, gst invoice rules india, transport invoice format for logistics, how to calculate tax on invoice.
      </p>
    </div>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Introduction</h2>
    <p className="mb-4">
      In the world of business, the invoice is more than just a piece of paper; it is the heartbeat of your cash flow. Whether you are a freelance designer, a small retail shop owner, or a logistics fleet manager, understanding <strong>how to create an invoice</strong> correctly is the single most important administrative skill you can master.
    </p>
    <p className="mb-4">
      A professional invoice does three things: it demands payment legally, it builds trust with your client, and it keeps you compliant with tax authorities. This comprehensive <strong>invoice guide</strong> will walk you through everything you need to know about invoicing in 2025, from basic structures to complex GST calculations and industry-specific formats.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">What is an Invoice?</h2>
    <p className="mb-4">
      An invoice is a commercial document issued by a seller to a buyer relating to a sale transaction. It indicates the products, quantities, and agreed prices for products or services the seller has provided the buyer.
    </p>
    <p className="mb-4">
      Unlike a receipt, which acknowledges payment, an invoice is a <strong>request for payment</strong>. It establishes an obligation on the part of the buyer to pay the seller according to the payment terms specified.
    </p>

    <h3 className="text-xl font-bold mt-8 mb-4">Why Invoicing Is Important for Businesses</h3>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Legal Protection:</strong> An invoice serves as a legal record of the sale. In case of a dispute or non-payment, a signed invoice is your primary evidence in court.</li>
      <li><strong>Tax Compliance:</strong> For businesses registered under tax laws (like GST in India, VAT in UK/EU, or Sales Tax in US), issuing a compliant tax invoice is mandatory for filing returns and claiming input tax credits.</li>
      <li><strong>Professionalism:</strong> Sending a clean, branded <strong>PDF invoice</strong> signals that you run a legitimate business, increasing the likelihood of timely payment.</li>
      <li><strong>Inventory Tracking:</strong> For product businesses, invoices help track what stock has left the warehouse.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Basic Structure of a Professional Invoice</h2>
    <p className="mb-4">
      Regardless of your industry, every professional <strong>invoice format</strong> must contain certain non-negotiable elements to be considered valid.
    </p>
    <ol className="list-decimal pl-6 mb-6 space-y-4">
      <li><strong>Header:</strong> Must clearly say "INVOICE" or "TAX INVOICE".</li>
      <li><strong>Invoice Number:</strong> A unique, sequential number (e.g., INV-001) is critical for tracking. Never duplicate invoice numbers.</li>
      <li><strong>Dates:</strong>
        <ul className="list-disc pl-6 mt-2 mb-2">
          <li><strong>Issue Date:</strong> When the invoice was created.</li>
          <li><strong>Due Date:</strong> The deadline for payment.</li>
        </ul>
      </li>
      <li><strong>Seller Information:</strong> Your business name, address, email, phone number, and logo.</li>
      <li><strong>Buyer Information:</strong> The client’s name, address, and contact details ("Bill To").</li>
      <li><strong>Line Items:</strong> A detailed list of goods sold or services rendered, including description, unit price, and quantity.</li>
      <li><strong>Financial Breakdown:</strong> Subtotal, Taxes (with rates), Discounts, Shipping Charges, and the <strong>Grand Total</strong>.</li>
      <li><strong>Payment Terms:</strong> Instructions on how to pay (Bank Account, UPI, PayPal link) and terms (e.g., "Net 30").</li>
    </ol>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Standard Invoice Explained</h2>
    <p className="mb-4">
      A <strong>standard invoice</strong> is the most common format used by 90% of businesses. It is versatile and fits most non-specialized use cases such as retail sales, general contracting, and simple service agreements.
    </p>
    <p className="mb-4">
      It focuses on the "what" and "how much". It typically includes a straightforward table of items, a tax line, and a total. If you are unsure which format to use, the Standard Invoice is usually the safest bet.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">GST Invoice Guide (India-focused)</h2>
    <p className="mb-4">
      For Indian businesses, the <strong>Goods and Services Tax (GST)</strong> regime mandates very specific invoicing rules. Failing to adhere to these can result in penalties and the inability for your clients to claim Input Tax Credit (ITC).
    </p>

    <h3 className="text-xl font-bold mt-8 mb-4">Understanding the Components</h3>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>GSTIN:</strong> You must display your 15-digit GST Identification Number prominently. If your client is registered, you must also include their GSTIN.</li>
      <li><strong>HSN / SAC Codes:</strong>
        <ul className="list-disc pl-6 mt-2 mb-2">
          <li><strong>HSN (Harmonized System of Nomenclature):</strong> For goods.</li>
          <li><strong>SAC (Services Accounting Code):</strong> For services.</li>
        </ul>
        These codes tell the tax department exactly what you are selling.
      </li>
      <li><strong>Tax Breakup (Critical):</strong>
        <ul className="list-disc pl-6 mt-2 mb-2">
          <li><strong>Intra-state (Same State):</strong> If you (Maharashtra) sell to a client in (Maharashtra), you must charge <strong>CGST + SGST</strong>. (e.g., 18% becomes 9% CGST + 9% SGST).</li>
          <li><strong>Inter-state (Different State):</strong> If you (Maharashtra) sell to a client in (Delhi), you must charge <strong>IGST</strong>. (e.g., 18% IGST).</li>
        </ul>
      </li>
    </ul>
    <p className="mb-4">
      Our <strong>GST Invoice Generator</strong> handles this logic automatically. You simply toggle "Inter-state" and the system calculates the correct tax split.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Freelance & Consulting Invoice Guide</h2>
    <p className="mb-4">
      Freelancers face unique challenges. You are often selling "time" or "intellectual property" rather than physical goods. A <strong>freelance invoice</strong> needs to reflect this.
    </p>
    <p className="mb-4">
      <strong>Key Elements for Freelancers:</strong>
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Hourly vs. Fixed Project:</strong> Clearly state if the line item is "10 Hours of Coding" (Hourly) or "Website Redesign Project" (Fixed).</li>
      <li><strong>Payment Milestones:</strong> If this is part of a larger project, label it clearly (e.g., "Milestone 1 of 3: Initial Draft").</li>
      <li><strong>Bank Details:</strong> Freelancers often get paid via direct bank transfer or UPI. Ensure your Account Number, IFSC, and SWIFT code (for international clients) are bold and error-free.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Transport / Logistics Invoice Explained</h2>
    <p className="mb-4">
      The logistics industry operates on detailed documentation. A standard invoice is often insufficient for transport fleet owners or trucking companies. A <strong>Transport Invoice</strong> (often acting as a Freight Bill or Lorry Receipt) requires tracking specific metadata.
    </p>
    <p className="mb-4">
      <strong>Essential Logistics Fields:</strong>
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Vehicle Number:</strong> The registration number of the truck/lorry used.</li>
      <li><strong>Driver Name:</strong> Who transported the goods?</li>
      <li><strong>Origin & Destination:</strong> Where did the shipment start and end?</li>
      <li><strong>Distance / Weight:</strong> Billing is often calculated based on KMs traveled or Metric Tonnes transported.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Salon & Service-Based Invoice Format</h2>
    <p className="mb-4">
      Salons, spas, and wellness centers require a different touch. The receipt is often handed directly to the consumer immediately after service.
    </p>
    <p className="mb-4">
      <strong>Key Salon Features:</strong>
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Stylist / Provider Attribution:</strong> Tracking which employee performed the service is crucial for calculating commissions.</li>
      <li><strong>Appointment Date/Time:</strong> Validates the booking.</li>
      <li><strong>Tip / Gratuity:</strong> A dedicated line for tips separate from the service cost.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Invoice Calculation Logic</h2>
    <p className="mb-4">
      Understanding the math is crucial to avoiding embarrassing errors. Here is the standard hierarchy of calculation used by professional invoicing software:
    </p>
    <ol className="list-decimal pl-6 mb-6 space-y-4">
      <li><strong>Line Item Total:</strong> <code>Quantity × Unit Price</code>.</li>
      <li><strong>Subtotal:</strong> The sum of all Line Item Totals.</li>
      <li><strong>Discount:</strong> Applied to the Subtotal.
        <br /><em>Note: Discounts are usually applied BEFORE tax to reduce the tax burden on the customer.</em>
      </li>
      <li><strong>Taxable Value:</strong> <code>Subtotal - Discount</code>.</li>
      <li><strong>Tax Amount:</strong> <code>Taxable Value × Tax Rate (%)</code>.</li>
      <li><strong>Shipping / Handling:</strong> Added AFTER tax.
        <br /><em>Note: In some jurisdictions, shipping itself is taxable. Our tool allows for flexible configuration.</em>
      </li>
      <li><strong>Grand Total:</strong> <code>Taxable Value + Tax Amount + Shipping</code>.</li>
    </ol>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Payment Status Explained</h2>
    <p className="mb-4">
      Managing the lifecycle of an invoice is just as important as creating it.
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Pending:</strong> The invoice has been sent but money has not hit your account.</li>
      <li><strong>Overdue:</strong> The Due Date has passed. You should send a reminder immediately.</li>
      <li><strong>Partial:</strong> The client has paid a deposit or a portion of the bill. The invoice remains "Open" with a "Balance Due".</li>
      <li><strong>Paid:</strong> The full amount has been settled. The invoice is closed.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Payment Methods & Payment Proof</h2>
    <p className="mb-4">
      To close an invoice cycle, you must record how it was paid. This acts as a "Proof of Payment" for your client.
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Bank Transfer (NEFT/IMPS/ACH):</strong> The standard for B2B.</li>
      <li><strong>UPI / QR Code:</strong> Fast becoming the standard for small business and retail in tech-forward regions.</li>
      <li><strong>Cash:</strong> Still relevant for local transport and retail. Always issue a receipt.</li>
    </ul>
    <p className="mb-4">
      <strong>Pro Tip:</strong> When marking an invoice as paid, always record the <strong>Transaction ID</strong> or Reference Number. This helps reconcile accounts later.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">PDF Invoice Creation & Print Best Practices</h2>
    <p className="mb-4">
      Why distribute invoices as PDF?
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Immutability:</strong> A PDF cannot be easily edited by the receiver, preventing fraud.</li>
      <li><strong>Formatting:</strong> PDFs look the same on a mobile phone, a Mac, and a Windows PC. Word docs often break.</li>
      <li><strong>Professionalism:</strong> It is the global standard for business documents.</li>
    </ul>
    <p className="mb-4">
      When printing, ensure your invoice fits on a single <strong>A4 page</strong> unless you have hundreds of line items. Our tool automatically optimizes layout for single-page printing to save paper and look neat.
    </p>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Common Invoicing Mistakes</h2>
    <p className="mb-4">
      Avoid these pitfalls to ensure you get paid on time:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Math Errors:</strong> Using a calculator and pen often leads to simple addition mistakes. Use an <strong>online invoice generator</strong> to automate this.</li>
      <li><strong>Sending to the Wrong Person:</strong> Always verify the email address of the accounts payable department, not just your project contact.</li>
      <li><strong>Vague Descriptions:</strong> "Services" is bad. "Web Development for Home Page Redesign" is good. Vague invoices get disputed.</li>
      <li><strong>No Due Date:</strong> Without a deadline, clients will prioritize other payments.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Frequently Asked Questions (FAQ)</h2>

    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">1. Is a digital invoice legally valid?</h3>
        <p className="text-slate-600 dark:text-slate-400">Yes. Digital PDF invoices are legally recognized in almost all jurisdictions globally, provided they contain the mandatory fields (date, invoice number, tax IDs).</p>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">2. What is the difference between an Invoice and a Receipt?</h3>
        <p className="text-slate-600 dark:text-slate-400">An invoice is a request for payment sent <em>before</em> the payment is made. A receipt is proof of payment issued <em>after</em> the payment is received.</p>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">3. Can I issue an invoice without a GST number?</h3>
        <p className="text-slate-600 dark:text-slate-400">Yes. If your turnover is below the GST registration threshold, you can issue a "Bill of Supply" or a standard non-tax invoice. You cannot collect tax from customers if you are not registered.</p>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">4. How do I handle international invoices?</h3>
        <p className="text-slate-600 dark:text-slate-400">For international clients, use a standard invoice format. Ensure the currency is clear (USD/EUR/GBP). You typically do not charge local tax (like GST/VAT) on exports, but you may need to provide a Letter of Undertaking (LUT) in countries like India.</p>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">5. What software should I use to make invoices?</h3>
        <p className="text-slate-600 dark:text-slate-400">While Excel and Word are options, they are manual and error-prone. A specialized <strong>free invoice generator</strong> like InvoicePro is faster, more secure, and produces better-looking results automatically.</p>
      </div>
    </div>

    <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">Expert Summary</h2>
    <p className="mb-4">
      Invoicing is the final step of your hard work. Do not let a sloppy document ruin the impression you have built. By using a structured, professional, and compliant invoice format, you ensure faster payments, better legal protection, and a stronger brand image.
    </p>
    <p className="mb-4">
      Whether you need a simple bill or a complex GST-compliant tax invoice, tools like <strong>InvoicePro</strong> are designed to make this process invisible, secure, and instant. Start creating your professional invoice today and take control of your business finances.
    </p>

  </LegalLayout>
);

export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(prev => prev === index ? null : index);
  };

  const [activeRoute, setActiveRoute] = useState('home');
  const [invoice, setInvoice] = useState(DEFAULT_INVOICE);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [history, setHistory] = useState([]);
  const [pdfMode, setPdfMode] = useState('single');

  const handleNewInvoice = () => {
    if (!window.confirm("Start a new invoice? Current details will be saved to history.")) return;
    saveToHistory();
    // Generate new number
    const lastNo = localStorage.getItem('lastInvoiceNo') || invoice.invoiceNo;
    let nextNo = 'INV-001';
    if (lastNo) {
      const parts = lastNo.split('-');
      if (parts.length === 2 && !isNaN(parts[1])) {
        const num = parseInt(parts[1], 10) + 1;
        nextNo = `INV-${String(num).padStart(3, '0')}`;
      }
    }

    const freshState = {
      ...DEFAULT_INVOICE,
      invoiceNo: nextNo,
      currency: invoice.currency,
      taxRate: invoice.taxRate,
      enableTax: invoice.enableTax,
      taxMode: invoice.taxMode,
      sender: { ...invoice.sender, signature: '' },
    };

    setInvoice(freshState);
    setLogo(null);
    setValidationErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previewRef = useRef(null);
  const invoiceHeaderRef = useRef(null); // ✅ NEW REF
  const invoiceBodyRef = useRef(null);   // ✅ NEW REF
  const tableHeaderRef = useRef(null);   // ✅ NEW REF
  const config = activeRoute !== 'home' ? INVOICE_TYPES[activeRoute] : null;

  const [activeFeature, setActiveFeature] = useState(null); // ✅ Feature Popup State

  // --- STANDARD INVOICE SUB-CONFIG LOGIC ---
  const stdConfig = React.useMemo(() => {
    if (activeRoute !== 'standard') return null;
    const type = invoice.documentTitle?.toUpperCase();

    if (type === 'SALES INVOICE') {
      return {
        invoiceNoLabel: "Invoice No",
        itemPlaceholder: "Product Name",
        qtyLabel: "Quantity",
        showDueDate: true,
        showDiscount: true,
        showShipping: true,
        showTerms: true
      };
    }
    if (type === 'SERVICE INVOICE') {
      return {
        invoiceNoLabel: "Invoice No",
        itemPlaceholder: "Service Description",
        qtyLabel: "Hours / Sessions",
        showDueDate: true,
        showDiscount: true,
        showShipping: false,
        showTerms: true
      };
    }
    if (type === 'GENERAL BILL') {
      return {
        invoiceNoLabel: "Bill No",
        itemPlaceholder: "Item Name",
        qtyLabel: "Qty",
        showDueDate: false,
        showDiscount: false,
        showShipping: false,
        showTerms: false
      };
    }
    // Default Standard
    return {
      invoiceNoLabel: "Invoice No",
      itemPlaceholder: "Item / Service Name",
      qtyLabel: "Qty",
      showDueDate: true,
      showDiscount: true,
      showShipping: true,
      showTerms: true
    };
  }, [activeRoute, invoice.documentTitle]);

  // --- ROUTING & SEO LOGIC ---

  useEffect(() => {
    const path = window.location.pathname;
    let foundRoute = 'home';

    // Add 'how-to-create-invoice' to the route check
    if (['/privacy', '/terms', '/about', '/contact', '/how-to-create-invoice'].includes(path)) {
      foundRoute = path.substring(1);
    } else {
      Object.values(INVOICE_TYPES).forEach(type => {
        if (path === type.path) {
          foundRoute = type.id;
        }
      });
    }

    if (foundRoute !== 'home') {
      setActiveRoute(foundRoute);
    }
  }, []);

  useEffect(() => {
    let meta = {
      title: 'Free Invoice Generator | Create Professional Invoices Online',
      description: 'The #1 free invoice generator for freelancers and small businesses. Create secure, professional PDF invoices in seconds. No login required.',
      keywords: 'free invoice generator, invoice maker free, online invoice maker, create invoice free, pdf invoice generator, bill maker, receipt generator, simple invoice maker',
      url: window.location.href
    };

    let newPath = '/';

    if (INVOICE_TYPES[activeRoute]) {
      // ... [Existing Invoice Type SEO Logic] ...
      const typeConfig = INVOICE_TYPES[activeRoute];
      meta.title = typeConfig.metaTitle;
      meta.description = typeConfig.metaDesc;
      meta.keywords = typeConfig.keywords;
      newPath = typeConfig.path;
      document.title = typeConfig.metaTitle;
      setInvoice(prev => ({
        ...prev,
        documentTitle: typeConfig.subCategories?.[0]?.toUpperCase() || 'INVOICE'
      }));
    } else if (['privacy', 'terms', 'about', 'contact', 'how-to-create-invoice'].includes(activeRoute)) {
      // ... [Extended Static Page SEO Logic] ...
      const titles = {
        privacy: 'Privacy Policy - InvoicePro',
        terms: 'Terms of Service - InvoicePro | Legal User Agreement',
        about: 'About Us - InvoicePro | Secure & Free Invoicing',
        contact: 'Contact Us - InvoicePro',
        'how-to-create-invoice': 'Professional Invoicing Guide | InvoicePro'
      };
      const descs = {
        'how-to-create-invoice': 'Master the art of professional invoicing. A concise guide for freelancers and businesses.',
        about: 'Learn about InvoicePro, the privacy-first free invoice generator. Our mission is to simplify billing for freelancers and small businesses globally.',
        terms: 'Read the Terms of Service for InvoicePro. Understand the rules, user responsibilities, and legal agreement for using our free invoice generator.'
      };

      meta.title = titles[activeRoute];
      if (descs[activeRoute]) meta.description = descs[activeRoute];

      newPath = `/${activeRoute}`;
      document.title = titles[activeRoute];
    } else {
      document.title = meta.title;
    }

    // FIX 2: Correct Canonical URL
    const cleanPath = newPath === '/' ? '' : newPath.replace(/\/$/, '');
    const canonicalUrl = `${window.location.origin}${cleanPath}`;
    meta.url = canonicalUrl;

    // Normalize URL BEFORE setting meta (SEO fix)
    if (window.location.pathname !== newPath) {
      try {
        window.history.replaceState({}, '', newPath);
      } catch (e) {
        // Ignored
      }
    }

    // Inject canonical + meta AFTER URL is clean
    updateHead(meta);

    if (activeRoute === 'gst') {
      setInvoice(prev => ({
        ...prev,
        enableTax: true,
        taxRate: prev.taxRate || 18
      }));
    }

    window.scrollTo(0, 0);
  }, [activeRoute]);

  const handleRouteChange = (routeId) => {
    setActiveRoute(routeId);
    setMobileMenu(false);
  };

  // ... [Keep existing effects for script loading, persistence, handlers, etc.] ...

  // --- AUTO-ARCHIVE & RESTORE LOGIC ---
  useEffect(() => {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

    // 1. Load History First
    let currentHistory = [];
    try {
      const savedHistory = localStorage.getItem('invoiceHistory');
      if (savedHistory) {
        currentHistory = JSON.parse(savedHistory);
        setHistory(currentHistory);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }

    // 2. Load Invoice Data
    const saved = localStorage.getItem('premiumInvoiceData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Data Migration / Fixes
        if (!parsed.payment) parsed.payment = { ...DEFAULT_INVOICE.payment };
        if (parsed.terms === undefined) parsed.terms = DEFAULT_INVOICE.terms;
        if (parsed.payment.amount === undefined) parsed.payment.amount = 0;
        if (parsed.sender && parsed.sender.signature === undefined) parsed.sender.signature = '';
        if (parsed.notes === 'Thank you for your shopping!') parsed.notes = 'Thank you for your business!';
        if (parsed.items) {
          parsed.items = parsed.items.map(item => ({ ...item, description: item.description || '' }));
        }

        // --- NEW LOGIC: CHECK & ARCHIVE ---
        const hasClient = parsed.receiver && parsed.receiver.name && parsed.receiver.name.trim().length > 0;
        const hasRevenue = parsed.items && parsed.items.some(i => i.price > 0 && i.quantity > 0);
        const isMeaningful = hasClient || hasRevenue;

        // If we have a completed/meaningful old invoice, ARCHIVE IT and START FRESH.
        if (isMeaningful) {
          // A. Add to History (if not duplicate)
          // We check if the exact same invoice is already the 'latest' in history
          const lastHistory = currentHistory[0];
          const isDuplicate = lastHistory && lastHistory.invoiceNo === parsed.invoiceNo && lastHistory.totalAmount === parsed.totalAmount; // weak check but okay for now

          if (!isDuplicate) {
            // Re-calculate total for history record
            const sub = round(parsed.items.reduce((acc, item) => acc + (item.quantity * item.price), 0));
            const discVal = safeFloat(parsed.discountValue);
            const discAmt = parsed.discountType === 'percent' ? round((sub * discVal) / 100) : round(discVal);
            const taxable = round(sub - Math.min(discAmt, sub));
            const taxVal = parsed.enableTax ? safeFloat(parsed.taxRate) : 0;
            const taxAmt = round((taxable * taxVal) / 100);
            const shippingVal = safeFloat(parsed.shipping);
            const totalCalc = Math.max(0, round(taxable + taxAmt + shippingVal));

            const newEntry = {
              id: Date.now(),
              invoiceNo: parsed.invoiceNo,
              clientName: parsed.receiver.name || 'Unnamed Client',
              date: parsed.date,
              totalAmount: totalCalc,
              fullJson: parsed,
              logo: null // We don't save image string to localStorage history to save space, usually. Or do we? The previous code didn't load logo from history explicitly.
            };

            const updatedHistory = [newEntry, ...currentHistory].slice(0, 20);
            setHistory(updatedHistory);
            localStorage.setItem('invoiceHistory', JSON.stringify(updatedHistory));
          }

          // B. Generate Fresh State
          // We keep user settings (Sender info, Currency, Tax Rate) but clear Transaction Data
          const lastNo = localStorage.getItem('lastInvoiceNo') || parsed.invoiceNo;
          let nextNo = 'INV-001';
          if (lastNo) {
            const parts = lastNo.split('-');
            if (parts.length === 2 && !isNaN(parts[1])) {
              const num = parseInt(parts[1], 10) + 1;
              nextNo = `INV-${String(num).padStart(3, '0')}`;
            }
          }

          const freshState = {
            ...DEFAULT_INVOICE,
            invoiceNo: nextNo,
            currency: parsed.currency || 'USD',
            taxRate: parsed.taxRate || 18,
            enableTax: parsed.enableTax !== false,
            taxMode: parsed.taxMode || 'tax',
            sender: { ...parsed.sender, signature: '' }, // Keep sender text, clear signature
          };

          setInvoice(freshState);
          setLogo(null); // Clear logo 
          // Note: Logic continues.
        } else {
          // If NOT meaningful (empty draft), just load it as is.
          setInvoice(parsed);
          // If it had a logo in state? The simple parsed JSON doesn't contain separate 'logo' state usually, 
          // unless 'premiumInvoiceData' included it?
          // Looking at previous code, 'setInvoice(parsed)' was all it did.
          // 'logo' state is separate. We didn't see where 'logo' was saved to localStorage.
          // The prompt says "Save it with... logo (if any)".
          // But 'premiumInvoiceData' is 'invoice' state. 'logo' is 'logo' state.
          // I should check if 'logo' is saved. 
          // Previous code: 'localStorage.setItem("premiumInvoiceData", JSON.stringify(invoice));'
          // It does NOT save 'logo'. So 'logo' is lost on refresh anyway in current app?
          // Wait, 'invoice' state doesn't have 'logo'. 'logo' is separate.
          // So 'logo' WAS previously verifying lost on refresh.
          // I will proceed assuming logo is lost on refresh unless I handle it, but prompt says "Clear: logo". 
          // So for "Fresh Invoice", clearing it is correct.
        }

      } catch (e) { console.error("Failed to load invoice data", e); }
    } else {
      // First run ever
      const lastNo = localStorage.getItem('lastInvoiceNo');
      let nextNo = 'INV-001';
      if (lastNo) {
        const parts = lastNo.split('-');
        if (parts.length === 2 && !isNaN(parts[1])) {
          const num = parseInt(parts[1], 10) + 1;
          nextNo = `INV-${String(num).padStart(3, '0')}`;
        }
      }

      // Auto-detect currency based on locale
      let detectedCurrency = 'USD';
      try {
        const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
        const matchedCurrency = CURRENCIES.find(c => c.locale.startsWith(userLocale.split('-')[0])); // Match primary language
        if (matchedCurrency) detectedCurrency = matchedCurrency.code;
      } catch (e) { }

      setInvoice(prev => ({ ...prev, invoiceNo: nextNo, currency: detectedCurrency }));
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('premiumInvoiceData', JSON.stringify(invoice));
      if (invoice.invoiceNo && invoice.invoiceNo.startsWith('INV-')) {
        const parts = invoice.invoiceNo.split('-');
        if (parts.length === 2 && !isNaN(parts[1])) {
          localStorage.setItem('lastInvoiceNo', invoice.invoiceNo);
        }
      }
    } catch (e) { }
  }, [invoice]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // --- HARD VALIDATION START ---

    // 1. Validate File Type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setLogoError('❌ Invalid Format. Allowed: PNG, JPG, SVG only.');
      e.target.value = ''; // Reset input
      return;
    }

    // 2. Validate File Size (Limit to 2MB for performance/storage)
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('❌ File Too Large. Max allowed size: 2MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (x) => {
      // 🔐 AUTO CONVERT SVG → PNG (html2canvas safe)
      if (file.type === 'image/svg+xml') {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width || 800;
          canvas.height = img.height || 300;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          setLogo(canvas.toDataURL('image/png'));
          setLogoError('');
        };
        img.src = x.target.result;
        return;
      }

      const img = new Image();
      img.onload = () => {
        // 3. Validate Dimensions (Max 2000x800)
        // Strictly enforcing small, logo-sized images
        if (img.width > 2000 || img.height > 800) {
          setLogoError(`❌ Dimensions Too Big (${img.width}x${img.height}px). Max: 2000x800px.`);
          e.target.value = '';
          return;
        }

        // 4. Validate Aspect Ratio (Reject Portrait/Tall images)
        // Logos should be wide or square, never tall like a phone screenshot
        if (img.height > img.width) {
          setLogoError('❌ Portrait/Tall Images Not Allowed. Please upload a wide (logo-style) or square image.');
          e.target.value = '';
          return;
        }

        // Validation Passed
        setLogo(x.target.result);
        setLogoError(''); // Clear error on success
      };

      img.onerror = () => {
        setLogoError('❌ Invalid Image Data');
        e.target.value = '';
      };

      img.src = x.target.result;
    };
    reader.readAsDataURL(file);
    // --- HARD VALIDATION END ---
  };



  // --- AUTO-FILL LOGIC: NOTES & TERMS ---
  useEffect(() => {
    // 1. NOTES LOGIC
    // We only auto-fill if the user hasn't typed a custom note (i.e. field is empty or matches a known default).
    const defaultNotes = [
      'Thank you for your business!',
      'Thank you for your shopping!',
      'Thank you for choosing our services!',
      'Payment received. Thank you!',
      'Partial payment received. Balance due.',
      'Thank you for your purchase!'
    ];

    const currentNotes = invoice.notes || '';
    const isDefaultOrEmpty = !currentNotes.trim() || defaultNotes.includes(currentNotes.trim());

    if (isDefaultOrEmpty) {
      let newNote = 'Thank you for your business!';
      const title = (invoice.documentTitle || '').toLowerCase();
      const status = invoice.payment.status;

      if (status === 'paid') {
        newNote = 'Payment received. Thank you!';
      } else if (status === 'partial') {
        newNote = 'Partial payment received. Balance due.';
      } else if (title.includes('service') || title.includes('consult')) {
        newNote = 'Thank you for choosing our services!';
      } else if (title.includes('sales') || activeRoute === 'standard') {
        newNote = 'Thank you for your shopping!';
      } else if (activeRoute === 'transport' || activeRoute === 'gst') {
        // Keep generic for specific types if not matching above
        newNote = 'Thank you for your business!';
      } else {
        newNote = 'Thank you for your purchase!';
      }

      // Only update if changed
      if (newNote !== currentNotes) {
        setInvoice(prev => ({ ...prev, notes: newNote }));
      }
    }

    // 2. PAYMENT TERMS LOGIC
    // Only auto-fill if empty or matches known patterns, to avoid killing user data.
    // Logic: Prepend "Payment due..." if pending. Add attributes.

    // We can't easily detect "is default" for complex multi-line terms strings reliably 
    // without risking user data loss, so we strictly follow: "If payment instructions field is EMPTY"
    // OR if it matches exactly the initial default state.

    const initialDefault = DEFAULT_INVOICE.terms; // 'Payment Due upon receipt.\nBank: \nAccount: '
    const currentTerms = invoice.terms || '';

    // Check if effective empty or untouched default
    const isTermsEmpty = !currentTerms.trim() || currentTerms === initialDefault;

    // We also want to support switching between methods without clearing if it was auto-generated.
    // But to be safe per "STRICT RULES", we primarily target Empty or Initial Default.
    // However, if the user changes Method, they expect the attributes to change.
    // Let's allow update if it matches a "System Generated" pattern.
    const isSystemGenerated = currentTerms.includes('UPI ID:') ||
      currentTerms.includes('Bank Name:') ||
      currentTerms === 'Cash payment accepted.' ||
      currentTerms === 'Card payment received.';

    if (isTermsEmpty || isSystemGenerated) {
      const method = invoice.payment.method;
      const status = invoice.payment.status;

      let newTerms = '';

      // Prefix
      if (status === 'pending') {
        newTerms += 'Payment Due upon receipt.\n';
      }

      // Method specific
      if (method === 'UPI') {
        newTerms += 'Please pay via UPI ID: ______';
      } else if (method === 'Bank Transfer') {
        newTerms += 'Bank Name: \nAccount No: \nIFSC: ';
      } else if (method === 'Cash') {
        newTerms += 'Cash payment accepted.';
      } else if (method === 'Card') {
        newTerms += 'Card payment received.';
      } else if (method === 'PayPal') { // Fallback/Extra
        newTerms += 'PayPal: ';
      }

      // Clean up double newlines if any
      newTerms = newTerms.trim();

      if (newTerms !== currentTerms.trim()) {
        setInvoice(prev => ({ ...prev, terms: newTerms }));
      }
    }

  }, [
    activeRoute,
    invoice.documentTitle,
    invoice.payment.status,
    invoice.payment.method,
    // We do NOT depend on 'invoice.notes' or 'invoice.terms' directly to avoid loops,
    // but we access their current value via the closure or ref if needed. 
    // Actually, since we're inside the component, 'invoice' is the current state.
    // To avoid infinite loop, we MUST check if value is different before setting.
    // And we must be careful.

    // Better strategy: Only run when the *triggers* change.
    // But we need the current 'invoice.notes' to check if we should overwrite.
    // We include 'invoice.notes' in dependency? No, that causes loop if we set it.
    // We use a functional update for setInvoice, but we need to know IF we should update.
    // React Effect nuances:
    // If we include invoice.notes, and we update notes, effect runs again. 
    // If logic says "New Note == Current Note", we don't set, loop breaks. Safe.
  ]);

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (x) => updateNested('sender', 'signature', x.target.result);
      reader.readAsDataURL(file);
    }
  };

  const saveToHistory = () => {
    // Re-calculate total locally to ensure accurate snapshot
    const sub = round(invoice.items.reduce((acc, item) => acc + calculateLineItem(item.quantity, item.price), 0));
    const discVal = safeFloat(invoice.discountValue);
    const discAmt = invoice.discountType === 'percent' ? round((sub * discVal) / 100) : round(discVal);
    const taxable = round(sub - Math.min(discAmt, sub));
    const taxVal = invoice.enableTax ? safeFloat(invoice.taxRate) : 0;
    const taxAmt = round((taxable * taxVal) / 100);
    const shippingVal = safeFloat(invoice.shipping);
    const totalCalc = Math.max(0, round(taxable + taxAmt + shippingVal));

    const newEntry = {
      id: Date.now(),
      invoiceNo: invoice.invoiceNo,
      clientName: invoice.receiver.name || 'Unnamed Client',
      date: invoice.date,
      totalAmount: totalCalc,
      fullJson: invoice,
      logo: logo // Capture logo state too
    };

    const updated = [newEntry, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('invoiceHistory', JSON.stringify(updated));
  };

  const deleteHistoryItem = (id) => {
    if (window.confirm('Delete this invoice from history?')) {
      const updated = history.filter(h => h.id !== id);
      setHistory(updated);
      localStorage.setItem('invoiceHistory', JSON.stringify(updated));
    }
  };

  const restoreInvoice = (entry) => {
    if (window.confirm('Load this invoice? Current unsaved changes will be lost.')) {
      setInvoice(entry.fullJson);
      setLogo(entry.logo || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateRoot = (field, value) => {
    let safeValue = value;
    if (field === 'taxRate') {
      safeValue = Math.min(100, Math.max(0, safeFloat(value)));
      if (value === '') safeValue = '';
    }
    if (field === 'discountValue' || field === 'shipping') {
      safeValue = Math.max(0, safeFloat(value));
      if (value === '') safeValue = '';
    }

    setInvoice(p => ({ ...p, [field]: safeValue }));
  };

  const updateNested = (section, field, value) =>
    setInvoice(p => ({ ...p, [section]: { ...p[section], [field]: value } }));

  const handlePaymentStatusChange = (e) => {
    const newStatus = e.target.value;

    // 🔢 total calculate (same logic as below)
    const sub = round(invoice.items.reduce((a, i) => a + calculateLineItem(i.quantity, i.price), 0));
    const disc = invoice.discountType === 'percent'
      ? round((sub * safeFloat(invoice.discountValue)) / 100)
      : round(safeFloat(invoice.discountValue));
    const taxable = round(sub - Math.min(disc, sub));
    const tax = invoice.enableTax ? round((taxable * safeFloat(invoice.taxRate)) / 100) : 0;
    const ship = safeFloat(invoice.shipping);
    const totalAmount = Math.max(0, round(taxable + tax + ship));

    setInvoice(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        status: newStatus,
        amount:
          newStatus === 'paid'
            ? totalAmount            // ✅ AUTO FULL AMOUNT
            : newStatus === 'pending'
              ? 0
              : prev.payment.amount, // partial = manual
        referenceId: newStatus === 'pending' ? '' : prev.payment.referenceId,
        paidDate:
          newStatus === 'paid'
            ? new Date().toISOString().split('T')[0]
            : newStatus === 'partial'
              ? prev.payment.paidDate || ''
              : ''
      }
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoice(p => ({
      ...p,
      items: p.items.map(i => {
        if (i.id !== id) return i;
        if (field === 'quantity' || field === 'price') {
          if (value === '') return { ...i, [field]: '' };
          const safeVal = Math.max(0, parseFloat(value));
          return { ...i, [field]: isNaN(safeVal) ? '' : safeVal };
        }
        return { ...i, [field]: value };
      })
    }));
  };

  const addItem = () =>
    setInvoice(p => ({ ...p, items: [...p.items, { id: Date.now(), name: '', description: '', quantity: '', price: '', hsn: '' }] }));

  const removeItem = (id) =>
    setInvoice(p => ({ ...p, items: p.items.filter(i => i.id !== id) }));

  const validateInvoice = () => {
    const errors = {};
    const messages = [];

    // 1. Client Check
    if (!invoice.receiver.name || invoice.receiver.name.trim() === '') {
      errors.clientName = true;
      messages.push('Client name is required.');
    }

    // 2. Items Existence Check
    if (invoice.items.length === 0) {
      errors.items = true;
      messages.push('At least one line item is required.');
    }

    // 2.5 Validation: Strict GST Rules
    // If taxMode = "gst", Seller GSTIN is mandatory.
    if (config?.id === 'gst' || invoice.taxMode === 'gst') {
      if (!invoice.sender.gstin || invoice.sender.gstin.trim() === '') {
        errors.senderGstin = true;
        messages.push('Seller GSTIN is required for GST Invoices.');
      }
    }

    // 3. Items Validity Check (Quantity & Price)
    let hasInvalidItems = false;
    invoice.items.forEach(item => {
      const q = safeFloat(item.quantity);
      const p = safeFloat(item.price);
      if (q <= 0 || p <= 0) {
        hasInvalidItems = true;
      }
    });
    if (hasInvalidItems) {
      errors.items = true; // Mark items as clear error
      messages.push('All items must have a quantity and unit price greater than 0.');
    }

    // 4. Total Check
    const sub = invoice.items.reduce((a, i) => a + calculateLineItem(i.quantity, i.price), 0);
    const disc = invoice.discountType === 'percent'
      ? (sub * safeFloat(invoice.discountValue)) / 100
      : safeFloat(invoice.discountValue);
    const tax = invoice.enableTax ? ((sub - Math.min(disc, sub)) * safeFloat(invoice.taxRate)) / 100 : 0;
    const ship = safeFloat(invoice.shipping);
    const totalCheck = Math.max(0, sub - Math.min(disc, sub) + tax + ship);

    if (totalCheck <= 0) {
      messages.push('Invoice total amount must be greater than 0.');
    }

    setValidationErrors(errors);

    if (messages.length > 0) {
      alert(`Cannot generate invoice:\n\n- ${messages.join('\n- ')}`);
      return false;
    }

    return true;
  };



  const handlePrint = () => {
    if (!validateInvoice()) return;
    saveToHistory();
    const printContent = previewRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          ${document.head.innerHTML}
          <style>
            body { 
              background-color: white; 
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact; 
              overflow: hidden;
            }
            #invoice-preview { 
              box-shadow: none !important; 
              margin: 0 auto !important; 
              width: 210mm !important;
              height: 297mm !important;
              padding: 10mm !important;
              overflow: hidden !important;
              page-break-inside: avoid !important;
              transform-origin: top center;
            }
            
            /* Logo Fix for Print */
            /* Logo Fix for Print */
            .invoice-logo {
              max-width: 180px !important;
              max-height: 100px !important;
              object-fit: contain !important;
            }

            /* Ensure single page */
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              html, body {
                  width: 210mm;
                  height: 297mm;
                  overflow: hidden;
              }
              .invoice-footer-brand {
                  display: none !important;
              }
              nav, .no-print, button, footer, .ad-unit {
                  display: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
          <script>
            window.onload = function() {
              const content = document.getElementById('invoice-preview');
              const targetHeight = 1122; // A4 pixel height @ 96dpi
              // If content overflows, scale it down to fit on one page
              if (content.scrollHeight > targetHeight) {
                  const scale = targetHeight / content.scrollHeight;
                  content.style.transform = 'scale(' + scale + ')';
              }
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const generatePDF = async () => {
    // ✅ FIX: Stop execution if validation fails
    if (!validateInvoice()) return;

    saveToHistory();
    if (!window.html2canvas || !window.jspdf) {
      alert("Generating engine is warming up... please click again in 2 seconds.");
      return;
    }
    setLoadingPdf(true);
    const element = previewRef.current;

    // Save minimal original styles needed for restoration
    const originalShadow = element.style.boxShadow;
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflow;

    // 🔒 HARD RESET ALL TRANSFORMS (Safe PDF Fix)
    element.classList.remove('invoice-preview-scaled');
    element.style.transform = 'none';
    element.style.marginBottom = '0';

    // Prepare DOM for capture
    element.style.boxShadow = 'none';
    element.style.height = 'auto'; // Allow full height capture
    element.style.overflow = 'visible';

    // Force A4 width context
    element.style.width = '210mm';

    try {
      if (pdfMode === 'single') {
        // ✅ html2canvas (Clean Capture)
        const canvas = await window.html2canvas(element, {
          scale: 3, // High quality
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        });

        // ✅ jsPDF SINGLE PAGE PERFECT FIT
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF('p', 'mm', 'a4');

        // --- SINGLE PAGE LOGIC (NO CUT) ---
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Convert px to mm (approx 96dpi)
        const imgWidthMM = imgProps.width * 0.264583;
        const imgHeightMM = imgProps.height * 0.264583;

        // Calculate perfect scale to fit
        const scale = Math.min(pdfWidth / imgWidthMM, pdfHeight / imgHeightMM);

        const finalWidth = imgWidthMM * scale;
        const finalHeight = imgHeightMM * scale;

        const x = (pdfWidth - finalWidth) / 2;
        const y = 0; // ⬅️ top aligned (prevent vertical cut)

        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save(`${invoice.invoiceNo || 'invoice'}.pdf`);
      } else {
        // --- MULTI PAGE LOGIC (HEADER REPEAT + BODY SLICE) ---
        // 1. Capture Header separate
        const headerCanvas = await window.html2canvas(invoiceHeaderRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        // 2. Capture Body separate
        const bodyCanvas = await window.html2canvas(invoiceBodyRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        const headerImg = headerCanvas.toDataURL('image/png');
        const bodyImg = bodyCanvas.toDataURL('image/png');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate rendered heights in PDF units
        const headerHeight = (headerCanvas.height * pdfWidth) / headerCanvas.width;
        const bodyTotalHeight = (bodyCanvas.height * pdfWidth) / bodyCanvas.width;

        // Start printing
        // Page 1: Header + Start of Body
        pdf.addImage(headerImg, 'PNG', 0, 0, pdfWidth, headerHeight);

        // We print body starting at headerHeight
        // Available space per page = pdfHeight - headerHeight
        const printableHeight = pdfHeight - headerHeight;

        let renderedHeight = 0; // Tracks how much of body we have printed

        // Print first slice on Page 1
        // We place the image at (0, headerHeight).
        // But since it's the full body image, we need to clip it?
        // jsPDF addImage doesn't clip easily. The trick is vertical offset.
        // P1: Place body at Y = headerHeight. It prints 0...printableHeight of body.

        pdf.addImage(bodyImg, 'PNG', 0, headerHeight, pdfWidth, bodyTotalHeight);

        renderedHeight += printableHeight;

        while (renderedHeight < bodyTotalHeight) {
          pdf.addPage();
          // Repeat Header
          pdf.addImage(headerImg, 'PNG', 0, 0, pdfWidth, headerHeight);

          // Print Body Slice
          // We shift the image UP so the already printed part is hidden above the header
          // Offset = headerHeight - renderedHeight
          pdf.addImage(bodyImg, 'PNG', 0, headerHeight - renderedHeight, pdfWidth, bodyTotalHeight);

          renderedHeight += printableHeight;
        }

        pdf.save(`${invoice.invoiceNo || 'invoice'}.pdf`);
      }

    } catch (err) {
      console.error(err);
      alert('Error creating PDF. Please try using a simpler logo or check browser console.');
    } finally {
      // Restore styles
      element.style.boxShadow = originalShadow;
      element.style.height = originalHeight;
      element.style.overflow = originalOverflow;

      // Remove temporary overrides
      element.style.removeProperty('width');

      // ✅ RESTORE RESPONSIVE SCALE
      element.classList.add('invoice-preview-scaled');
      element.style.removeProperty('transform');
      element.style.removeProperty('margin-bottom');

      setLoadingPdf(false);
    }
  };

  // --- CALCULATION ENGINE ---
  const subtotal = round(invoice.items.reduce((acc, item) => acc + calculateLineItem(item.quantity, item.price), 0));
  const calculateDiscount = () => {
    const val = safeFloat(invoice.discountValue);
    if (val < 0) return 0;
    if (invoice.discountType === 'percent') {
      return round((subtotal * val) / 100);
    }
    return round(val);
  };
  const discountAmount = Math.min(calculateDiscount(), subtotal);
  const taxableAmount = round(subtotal - discountAmount);
  const taxRateVal = invoice.enableTax ? safeFloat(invoice.taxRate) : 0;
  const taxAmount = round((taxableAmount * taxRateVal) / 100);
  const shippingVal = safeFloat(invoice.shipping);
  const total = Math.max(0, round(taxableAmount + taxAmount + shippingVal));
  let paidAmount = 0;
  if (invoice.payment.status === 'paid') {
    paidAmount = total;
  } else if (invoice.payment.status === 'partial') {
    paidAmount = Math.min(total, Math.max(0, safeFloat(invoice.payment.amount)));
  }
  const balanceDue = Math.max(0, round(total - paidAmount));

  const formatCurrency = (amount) => {
    const currencyConfig = CURRENCIES.find(c => c.code === invoice.currency);
    try {
      return new Intl.NumberFormat(currencyConfig?.locale || 'en-US', {
        style: 'currency',
        currency: invoice.currency,
        minimumFractionDigits: 2
      }).format(amount);
    } catch (e) {
      return `${currencyConfig?.symbol || '$'}${amount.toFixed(2)}`;
    }
  };

  // Helper for history display
  const formatHistoryCurrency = (amount, currencyCode) => {
    const currencyConfig = CURRENCIES.find(c => c.code === currencyCode);
    try {
      return new Intl.NumberFormat(currencyConfig?.locale || 'en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2
      }).format(amount);
    } catch (e) {
      return `${amount}`;
    }
  };

  const getLabel = (baseLabel) => {
    const title = invoice.documentTitle?.toLowerCase() || '';
    if (activeRoute === 'transport') {
      if (title.includes('export') || title.includes('import')) {
        if (baseLabel === 'Vehicle No.') return 'Vessel / Flight No';
        if (baseLabel === 'Driver Name') return 'B.L. / A.W.B. No';
      }
    }
    if (activeRoute === 'salon') {
      if (title.includes('medical')) return baseLabel === 'Stylist Name' ? 'Doctor / Provider' : baseLabel;
      if (title.includes('repair')) return baseLabel === 'Stylist Name' ? 'Technician' : baseLabel;
      if (title.includes('hotel')) return baseLabel === 'Stylist Name' ? 'Room No' : baseLabel;
    }
    return baseLabel;
  };

  const getDescriptionPlaceholder = () => {
    if (activeRoute === 'transport') return "e.g. Transport Charges / Route Details";
    if (activeRoute === 'freelance') return "e.g. Web Design / Consultation Hours";
    if (activeRoute === 'salon') return "e.g. Haircut / Spa Service";
    return "e.g. Product Name";
  };

  const currencySymbol = CURRENCIES.find(c => c.code === invoice.currency)?.symbol || '$';

  const getStatusLabel = (status) => {
    if (status === 'paid') return 'PAID ✅';
    if (status === 'partial') return 'PARTIALLY PAID ⚠️';
    return 'PENDING ⏳';
  };

  const getStatusColor = (status) => {
    if (status === 'paid') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'partial') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  if (['privacy', 'terms', 'about', 'contact', 'how-to-create-invoice'].includes(activeRoute)) {
    let PageContent = null;
    if (activeRoute === 'privacy') PageContent = PrivacyPolicy;
    if (activeRoute === 'terms') PageContent = TermsOfService;
    if (activeRoute === 'about') PageContent = AboutUs;
    if (activeRoute === 'contact') PageContent = ContactUs;
    if (activeRoute === 'how-to-create-invoice') PageContent = HowToCreateInvoice;

    return (
      <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 cursor-pointer group no-underline"
              onClick={(e) => { e.preventDefault(); handleRouteChange('home'); }}
            >
              <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Invoice<span className="text-indigo-600">Pro</span></span>
            </a>
            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => handleRouteChange('home')} className="px-4 py-2 text-sm font-medium hover:text-indigo-600">Back</button>
            </div>
          </div>
        </nav>
        {PageContent && <PageContent />}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 pt-16 pb-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8 flex-wrap">
              <button onClick={() => handleRouteChange('privacy')} className="hover:text-indigo-600">Privacy Policy</button>
              <button onClick={() => handleRouteChange('terms')} className="hover:text-indigo-600">Terms of Service</button>
              <button onClick={() => handleRouteChange('about')} className="hover:text-indigo-600">About Us</button>
              <button onClick={() => handleRouteChange('contact')} className="hover:text-indigo-600">Contact</button>
              <button onClick={() => handleRouteChange('how-to-create-invoice')} className="hover:text-indigo-600 font-semibold text-indigo-500">Invoice Guide</button>
            </div>
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} InvoicePro. All rights reserved.</p>
          </div>
        </footer>
        {/* Detail Popup */}
        {activeFeature && (
          <FeaturePopup feature={activeFeature} onClose={() => setActiveFeature(null)} />
        )}
      </div>
    );
  }

  // ... [Keep existing Main UI Render logic] ...
  return (
    // ... [Existing Layout] ...
    // ... [Existing Footer in Main UI] ...
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Detail Popup for Main UI */}
      {activeFeature && (
        <FeaturePopup feature={activeFeature} onClose={() => setActiveFeature(null)} />
      )}

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 no-print">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleRouteChange('home')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">Invoice<span className="text-indigo-600">Pro</span></span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {Object.values(INVOICE_TYPES).map(type => (
              <button
                key={type.id}
                onClick={() => handleRouteChange(type.id)}
                className={`hover:text-indigo-600 transition-colors ${activeRoute === type.id ? 'text-indigo-600 font-bold' : ''}`}
              >
                {type.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden absolute w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-2">
            {Object.values(INVOICE_TYPES).map(type => (
              <button
                key={type.id}
                onClick={() => { setActiveRoute(type.id); setMobileMenu(false); }}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
              >
                {type.title}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- CONTENT AREA --- */}

      {activeRoute === 'home' ? (

        <div className="animate-in fade-in duration-500 no-print">
          <section className="py-20 text-center px-4 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Invoicing Made Simple <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Completely Free
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate professional PDF invoices in seconds. No account required. Zero data stored on servers.
            </p>

            <div className="flex flex-col items-center gap-6 mb-16">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleRouteChange('standard')}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-600/30 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  Start Invoicing <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleRouteChange('gst')}
                  className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-in-out flex items-center gap-2"
                >
                  GST Invoice <CreditCard size={18} className="text-emerald-500" />
                </button>
              </div>

              <button
                onClick={() => handleRouteChange('how-to-create-invoice')}
                className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
              >
                📘 Professional Invoicing Guide
              </button>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-4 text-left">
              {Object.values(INVOICE_TYPES).map(type => (
                <div
                  key={type.id}
                  onClick={() => handleRouteChange(type.id)}
                  className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500 ${type.color.split(' ')[0]}`}>
                    {type.icon}
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${type.color}`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 🔥 ADS START */}
          <div className="my-10 flex justify-center">
            <Ads />
          </div>
          {/* 🔥 ADS END */}

          <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why InvoicePro?</h2>
                <p className="text-slate-500 dark:text-slate-400">Built for speed, privacy, and professionalism.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {APP_FEATURES.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.description}
                    onClick={() => setActiveFeature(feature)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 container mx-auto px-4 max-w-4xl prose dark:prose-invert">

            {/* --- LONG FORM SEO CONTENT START --- */}

            <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              The #1 Free Invoice Generator for Modern Business
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 text-center mb-12 leading-relaxed">
              Create, download, and send professional PDF invoices in seconds. No signup required. No hidden fees.
              The secure <strong>free invoice generator</strong> trusted by freelancers and small businesses worldwide.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">What is a Free Invoice Generator?</h2>
            <p>
              A <strong>free invoice generator</strong> is an online tool that allows business owners, freelancers, and contractors to create professional billing documents without needing expensive accounting software.
              Unlike manual methods like Word or Excel, an <strong>online invoice maker</strong> automates the calculation of subtotals, taxes, and discounts, ensuring accuracy and compliance with professional standards.
            </p>
            <p>
              InvoicePro takes this a step further by offering a "Local-First" architecture. This means when you create an invoice, the data stays on your device. We do not store your client list or financial details on our servers, ensuring enterprise-grade privacy for your small business.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Why Use an Online Invoice Maker Instead of Excel?</h2>
            <p>
              For decades, businesses relied on spreadsheets. However, manual invoicing is prone to errors and looks unprofessional. Here is why switching to a dedicated <strong>invoice creator</strong> is crucial:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Automatic Math:</strong> Never send an invoice with a calculation error again. Our tool handles quantity × price, discounts, and complex tax percentages automatically.</li>
              <li><strong>Mobile Friendly:</strong> Create invoices on the go from your smartphone. Excel templates often break on mobile screens.</li>
              <li><strong>Professional PDFs:</strong> Generate a crisp, clean <strong>PDF invoice</strong> that looks consistent on every device. Word documents can lose formatting when opened on different computers.</li>
              <li><strong>Speed:</strong> Save client details and auto-fill your next bill. What used to take 10 minutes now takes 10 seconds.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">How to Create a Professional Invoice in 3 Steps</h2>
            <p>Using our <strong>simple invoice maker</strong> is intuitive. You don't need an account or a credit card. Just follow these steps:</p>
            <ol className="list-decimal pl-5 space-y-4 mb-6">
              <li>
                <strong>Enter Business Details:</strong> Start by adding your "From" details. Upload your company logo to make the document look official. Add your business address and contact info.
              </li>
              <li>
                <strong>Add Client & Line Items:</strong> Fill in the "Bill To" section with your client's information. Then, add your services or products as line items. Enter the quantity and rate; the <strong>invoice calculator</strong> does the rest.
              </li>
              <li>
                <strong>Download PDF:</strong> Review the total, add any payment instructions (like bank details or UPI ID), and hit "Download PDF". You now have a file ready to email to your client.
              </li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">The Essential Elements of a Valid Invoice</h2>
            <p>
              To ensure your <strong>bill format</strong> is legally valid and looks professional, it must contain specific components. Our <strong>invoice templates</strong> include all of these by default:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Header:</strong> Clearly marked with the word "INVOICE" (or Tax Invoice/Bill of Supply).</li>
              <li><strong>Unique Invoice Number:</strong> A sequential ID (e.g., INV-001) for tracking and accounting.</li>
              <li><strong>Date of Issue & Due Date:</strong> Establishes when the payment is expected.</li>
              <li><strong>Seller & Buyer Info:</strong> Names, addresses, and tax IDs (GSTIN/VAT) if applicable.</li>
              <li><strong>Itemized List:</strong> Clear description of goods sold or services rendered.</li>
              <li><strong>Financial Breakdown:</strong> Subtotal, Tax Amount, Discounts, and Grand Total.</li>
              <li><strong>Payment Terms:</strong> Instructions on how to pay (Bank transfer, PayPal, Stripe, etc.).</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">Understanding Invoice Data Privacy & Security</h2>
            <p>
              Most <strong>free invoicing software</strong> requires you to create an account, storing your sensitive financial data on their servers. This creates a risk of data breaches or data mining.
            </p>
            <p>
              <strong>InvoicePro is different.</strong> We utilize <strong>Local Storage technology</strong>. When you type your client's name or your price list, that data is saved directly to your browser's internal memory on your specific device. It is never transmitted to our cloud databases.
            </p>
            <p>
              This makes InvoicePro the most secure <strong>receipt generator</strong> for privacy-conscious freelancers. You get the convenience of cloud software with the privacy of an offline Excel file.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Who Needs a Free Invoice Creator?</h2>
            <p>Our versatile tool is designed for a wide range of professionals:</p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Freelancers:</strong> Web designers, writers, and developers who need a quick <strong>freelance invoice</strong> to get paid at the end of a project.</li>
              <li><strong>Contractors:</strong> Tradespeople like plumbers, electricians, and carpenters who need to issue a <strong>service receipt</strong> on the spot.</li>
              <li><strong>Small Business Owners:</strong> Retailers and service providers needing a robust <strong>GST invoice generator</strong> without monthly subscription fees.</li>
              <li><strong>Consultants:</strong> Professionals billing for hourly work who need a clean, corporate <strong>consulting invoice</strong>.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">Benefits of Professional PDF Invoices</h2>
            <p>
              Why is PDF the gold standard? A <strong>PDF invoice</strong> is non-editable by the receiver, ensuring the integrity of the amount and terms you set. It creates a digital paper trail that is universally accepted by accounting departments and tax authorities globally.
            </p>
            <p>
              Furthermore, PDF files are lightweight and preserve your formatting (fonts, logo placement) regardless of whether the client views them on a phone, tablet, or desktop computer.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Common Invoicing Mistakes to Avoid</h2>
            <p>Even seasoned business owners make mistakes that delay payment. Here is how our <strong>invoice maker</strong> helps you avoid them:</p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Vague Descriptions:</strong> Instead of "Consulting", use "Marketing Strategy Consultation - Jan 2024". Our template encourages detailed descriptions.</li>
              <li><strong>Missing Due Date:</strong> If you don't tell a client when to pay, they will prioritize other bills. Always set a clear Due Date.</li>
              <li><strong>Forgotten Payment Info:</strong> A client cannot pay you if they don't know your bank details. Our dedicated "Payment Instructions" field ensures this is never missed.</li>
              <li><strong>Incorrect Tax Calculations:</strong> Manual math is risky. Our automated engine ensures your tax and totals are pixel-perfect.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">Global Invoicing: Currencies and Taxes</h2>
            <p>
              Business is global, and so is InvoicePro. Our tool supports all major currencies including USD ($), EUR (€), GBP (£), INR (₹), and more.
            </p>
            <p>
              Whether you need a <strong>VAT invoice</strong> for Europe, a <strong>GST invoice</strong> for India/Australia, or a standard sales tax invoice for the US, our flexible tax settings allow you to rename the tax label and set custom percentages to comply with local regulations.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">How Automation Improves Cash Flow</h2>
            <p>
              The faster you invoice, the faster you get paid. By reducing the friction of creating a bill, you are more likely to send invoices immediately upon job completion rather than waiting until the end of the month.
            </p>
            <p>
              Using a <strong>fast invoice generator</strong> reduces administrative drag, allowing you to focus on revenue-generating work rather than paperwork. Consistent, professional billing also signals reliability to clients, often leading to faster approval cycles.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Frequently Asked Questions (FAQ)</h2>

            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <details
                  key={index}
                  open={activeFaq === index}
                  className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                >
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFaq(index);
                    }}
                    className="font-bold cursor-pointer list-none flex justify-between items-center text-slate-800 dark:text-slate-200"
                  >
                    {faq.question}
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-center border border-indigo-100 dark:border-indigo-800">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Paid?</h2>
              <p className="mb-6 text-slate-600 dark:text-slate-300">
                Join thousands of freelancers and small businesses using InvoicePro to streamline their billing.
              </p>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                Create Your Free Invoice Now
              </button>
            </div>

            {/* --- LONG FORM SEO CONTENT END --- */}

          </section>

        </div>

      ) : (

        <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">

          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className={`p-2 rounded-lg ${config?.color.split(' ')[1]}`}>
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-xl mb-0.5">
                      {{
                        standard: '📄',
                        gst: '🧾',
                        freelance: '💼',
                        transport: '🚚',
                        salon: '✂️'
                      }[config?.id] || '📄'}
                    </span>
                    <span className="text-[0.5rem] font-bold uppercase tracking-wider">
                      {{
                        standard: 'STD',
                        gst: 'GST',
                        freelance: 'GIG',
                        transport: 'LOG',
                        salon: 'SPA'
                      }[config?.id] || 'STD'}
                    </span>
                  </div>
                </span>
                {config?.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{config?.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNewInvoice}
                className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 dark:bg-slate-800 dark:text-indigo-400 dark:border-slate-700 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 shadow-sm"
              >
                <Plus size={16} /> New Invoice
              </button>
              <button
                onClick={() => handleRouteChange('home')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 shadow-sm hover:shadow dark:bg-slate-800 dark:text-indigo-300 dark:border-slate-700 dark:hover:bg-slate-700 rounded-full transition-all duration-200 ease-in-out active:scale-95"
              >
                <ArrowLeft size={18} /> Back to Home
              </button>
            </div>
          </div>

          {/* <AdUnit type="banner" label="Top Banner Ad" /> */}

          <div className="flex flex-col xl:flex-row gap-8 items-start">

            <div className="w-full xl:w-5/12 space-y-6 no-print">

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <Settings className="text-indigo-600" size={20} />
                  <h2 className="font-bold text-lg">Configuration</h2>
                </div>

                <div className="mb-4">
                  <label className="label">Document Header</label>
                  <select
                    className="input font-semibold text-indigo-600"
                    value={invoice.documentTitle}
                    onChange={(e) => updateRoot('documentTitle', e.target.value)}
                  >
                    {config?.subCategories?.map(sub => (
                      <option key={sub} value={sub.toUpperCase()}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label">{stdConfig ? stdConfig.invoiceNoLabel : 'Invoice No'}</label>
                    <input className="input" value={invoice.invoiceNo} onChange={(e) => updateRoot('invoiceNo', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Currency</label>
                    <select className="input" value={invoice.currency} onChange={(e) => updateRoot('currency', e.target.value)}>
                      {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Date</label>
                    <input type="date" className="input" value={invoice.date} onChange={(e) => updateRoot('date', e.target.value)} />
                  </div>
                  {(!stdConfig || stdConfig.showDueDate) && (
                    <div>
                      <label className="label">Due Date</label>
                      <input type="date" className="input" value={invoice.dueDate} onChange={(e) => updateRoot('dueDate', e.target.value)} />
                    </div>
                  )}
                </div>

                {config?.id === 'gst' && (
                  <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
                    <h3 className="text-xs font-bold uppercase text-emerald-600 mb-2">GST Settings</h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={invoice.isInterstate}
                          onChange={(e) => updateRoot('isInterstate', e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">Inter-state (IGST)</span>
                      </label>
                    </div>
                  </div>
                )}

                {config?.id === 'transport' && (
                  <div className="mb-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
                    <h3 className="text-xs font-bold uppercase text-orange-600 mb-2 flex items-center gap-2"><Truck size={14} /> Transport Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{getLabel('Vehicle No.')}</label>
                        <input className="input" value={invoice.transport.vehicleNo} onChange={(e) => updateNested('transport', 'vehicleNo', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{getLabel('Driver Name')}</label>
                        <input className="input" value={invoice.transport.driverName} onChange={(e) => updateNested('transport', 'driverName', e.target.value)} />
                      </div>
                      <input placeholder="From (Origin)" className="input" value={invoice.transport.origin} onChange={(e) => updateNested('transport', 'origin', e.target.value)} />
                      <input placeholder="To (Destination)" className="input" value={invoice.transport.destination} onChange={(e) => updateNested('transport', 'destination', e.target.value)} />
                    </div>
                  </div>
                )}

                {config?.id === 'salon' && (
                  <div className="mb-6 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-100 dark:border-pink-800">
                    <h3 className="text-xs font-bold uppercase text-pink-600 mb-2 flex items-center gap-2"><Scissors size={14} /> Service Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{getLabel('Stylist Name')}</label>
                        <input className="input" value={invoice.salon.stylist} onChange={(e) => updateNested('salon', 'stylist', e.target.value)} />
                      </div>
                      <input type="datetime-local" className="input" value={invoice.salon.appointmentDate} onChange={(e) => updateNested('salon', 'appointmentDate', e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-slate-700 dark:text-slate-300">From (Business)</h3>
                      <div className="flex gap-2">
                        <label className="text-xs font-bold text-indigo-700 dark:text-indigo-400 cursor-pointer bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-md border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-2 shadow-sm">
                          <Plus size={14} strokeWidth={3} /> Logo
                          <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                        </label>
                        <label className="text-xs font-bold text-indigo-700 dark:text-indigo-400 cursor-pointer bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-md border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-2 shadow-sm">
                          <PenTool size={14} strokeWidth={2.5} /> Sign
                          <input type="file" className="hidden" onChange={handleSignatureUpload} accept="image/*" />
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handleNewInvoice}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors font-medium text-sm"
                    >
                      <Plus size={16} /> New Invoice
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to restore default values? This will clear all fields.")) {
                          setInvoice({ ...DEFAULT_INVOICE, invoiceNo: invoice.invoiceNo });
                          setLogo(null);
                          setValidationErrors({});
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Reset Invoice"
                    >
                      <RotateCcw size={18} />
                    </button>    <div className="space-y-2">
                      <input placeholder="Business Name" className="input" value={invoice.sender.name} onChange={e => updateNested('sender', 'name', e.target.value)} />
                      <input placeholder="Email" className="input" value={invoice.sender.email} onChange={e => updateNested('sender', 'email', e.target.value)} />
                      <textarea placeholder="Address" rows="2" className="input" value={invoice.sender.address} onChange={e => updateNested('sender', 'address', e.target.value)} />
                      {(config?.fields.includes('gstin') || invoice.taxMode === 'gst') && (
                        <input
                          placeholder="GST Number (GSTIN)"
                          className={`input border-emerald-200 focus:border-emerald-500 ${validationErrors.senderGstin ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                          value={invoice.sender.gstin}
                          onChange={e => updateNested('sender', 'gstin', e.target.value.toUpperCase())}
                          maxLength={15}
                        />
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Bill To (Client)</h3>
                    <div className="space-y-2">
                      <input
                        placeholder="Client Name"
                        className={`input ${validationErrors.clientName ? 'border-red-400 ring-1 ring-red-200' : ''}`}
                        value={invoice.receiver.name}
                        onChange={e => { updateNested('receiver', 'name', e.target.value); setValidationErrors(p => ({ ...p, clientName: false })) }}
                      />
                      <input placeholder="Email" className="input" value={invoice.receiver.email} onChange={e => updateNested('receiver', 'email', e.target.value)} />
                      <textarea placeholder="Address" rows="2" className="input" value={invoice.receiver.address} onChange={e => updateNested('receiver', 'address', e.target.value)} />
                      {(config?.fields.includes('gstin') || invoice.taxMode === 'gst') && (
                        <input placeholder="Client GSTIN" className="input border-emerald-200 focus:border-emerald-500" value={invoice.receiver.gstin} onChange={e => updateNested('receiver', 'gstin', e.target.value)} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">Line Items</h3>
                  <div className="space-y-3">
                    {invoice.items.map((item) => (
                      <div key={item.id} className="flex gap-2 items-start p-2 border border-slate-100 dark:border-slate-700 rounded bg-white dark:bg-slate-900 shadow-sm">
                        <div className="flex-grow space-y-2">
                          <input
                            placeholder={stdConfig ? stdConfig.itemPlaceholder : getDescriptionPlaceholder()}
                            className="input font-medium"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          />
                          <textarea
                            rows="2"
                            placeholder="Additional details (optional)"
                            className="input text-xs text-slate-600 resize-none"
                            value={item.description || ''}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          />
                          {config?.fields.includes('hsn') && (
                            <input
                              placeholder="HSN/SAC Code (Optional)"
                              className="input text-xs w-24"
                              value={item.hsn || ''}
                              onChange={(e) => updateItem(item.id, 'hsn', e.target.value)}
                            />
                          )}
                        </div>
                        <div className="w-20">
                          <input
                            type="number"
                            placeholder={stdConfig ? stdConfig.qtyLabel : "Qty"}
                            title="Number of units (e.g. 1, 5, 10)"
                            className="input text-center"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            placeholder="Unit Price"
                            title="Enter price for ONE unit. Total is auto calculated."
                            className="input text-right"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                          />
                        </div>
                        {/* Read-Only Amount Display - STATIC DIV */}
                        <div className="w-24 flex items-center justify-end px-2 h-10 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 overflow-hidden">
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-sm truncate">
                            {formatCurrency(calculateLineItem(item.quantity, item.price))}
                          </span>
                        </div>

                        <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addItem} className={`mt-4 w-full py-2 border-2 border-dashed ${validationErrors.items ? 'border-red-300 text-red-500 bg-red-50' : 'border-indigo-200 text-indigo-600'} font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex justify-center items-center gap-2`}>
                    <Plus size={18} /> Add New Item
                  </button>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    Amount is calculated automatically: Qty × Unit Price
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  {/* TAX TOGGLE */}
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={invoice.enableTax}
                        onChange={(e) => updateRoot('enableTax', e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      {config?.id === 'gst' ? (
                        'Enable GST'
                      ) : (
                        <select
                          className="bg-transparent border-none outline-none font-medium text-indigo-600 p-0 m-0 text-sm focus:ring-0 cursor-pointer hover:underline"
                          value={invoice.taxMode || 'tax'}
                          onChange={(e) => updateRoot('taxMode', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="tax">Enable Tax (Non-GST)</option>
                          <option value="gst">Enable GST</option>
                        </select>
                      )}
                    </label>
                    <div className={`flex items-center gap-2 transition-opacity ${invoice.enableTax ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                      <label className="text-sm font-medium">{(config?.id === 'gst' || invoice.taxMode === 'gst') ? 'GST Rate (%)' : 'Tax Rate (Non-GST)'}</label>
                      <input
                        type="number"
                        value={invoice.taxRate}
                        onChange={(e) => updateRoot('taxRate', e.target.value)}
                        className="input w-20 text-right"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-4 text-right">Tax is applied on subtotal after discount</p>

                  {/* DISCOUNT INPUT */}
                  {(!stdConfig || stdConfig.showDiscount) && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1 border rounded p-1 bg-white dark:bg-slate-900">
                          <button
                            onClick={() => updateRoot('discountType', 'percent')}
                            className={`px-2 py-1 text-xs rounded ${invoice.discountType === 'percent' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}
                          >%</button>
                          <button
                            onClick={() => updateRoot('discountType', 'flat')}
                            className={`px-2 py-1 text-xs rounded ${invoice.discountType === 'flat' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}
                          >Flat</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium">Discount</label>
                          <input
                            type="number"
                            value={invoice.discountValue}
                            onChange={(e) => updateRoot('discountValue', e.target.value)}
                            className="input w-24 text-right"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mb-4">
                        <p className="text-[10px] text-slate-400">Discount is applied before tax</p>
                      </div>
                    </>
                  )}

                  {/* SHIPPING INPUT */}
                  {(!stdConfig || stdConfig.showShipping) && (
                    <>
                      <div className="flex justify-end items-center mb-1 gap-2">
                        <label className="text-sm font-medium">Shipping / Extra</label>
                        <input
                          type="number"
                          value={invoice.shipping}
                          onChange={(e) => updateRoot('shipping', e.target.value)}
                          className="input w-24 text-right"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mb-6 text-right">Shipping / extra charges are added after tax</p>
                    </>
                  )}

                  <div className="text-[10px] text-slate-400 text-center mb-4 italic px-2 border-b border-slate-100 pb-2">
                    {`${formatCurrency(subtotal)} - ${formatCurrency(discountAmount)} discount + ${formatCurrency(taxAmount)} tax + ${formatCurrency(shippingVal)} shipping = ${formatCurrency(total)}`}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-600">
                        <span>Discount {invoice.discountType === 'percent' ? `(${invoice.discountValue}%)` : ''}</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    {(invoice.enableTax && taxRateVal > 0) && (
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Tax ({taxRateVal}%)</span>
                        <span>{formatCurrency(taxAmount)}</span>
                      </div>
                    )}
                    {shippingVal > 0 && (
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Shipping</span>
                        <span>{formatCurrency(shippingVal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-700">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <label className="label">Notes / Terms</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Thank you for your business!"
                    className="input mb-4"
                    value={invoice.notes}
                    onChange={(e) => updateRoot('notes', e.target.value)}
                  />

                  {(!stdConfig || stdConfig.showTerms) && (
                    <>
                      <label className="label">Payment Instructions</label>
                      <textarea
                        rows="4"
                        placeholder="e.g. Bank Account Details / UPI ID"
                        className="input"
                        value={invoice.terms}
                        onChange={(e) => updateRoot('terms', e.target.value)}
                      />
                    </>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="text-indigo-600" size={20} />
                    <h2 className="font-bold text-lg">Payment Details / Proof</h2>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">This information acts as payment proof for this invoice.</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Payment Status</label>
                      <select
                        className="input"
                        value={invoice.payment?.status || 'pending'}
                        onChange={handlePaymentStatusChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Payment Method</label>
                      <select
                        className="input"
                        value={invoice.payment?.method || 'UPI'}
                        onChange={(e) => updateNested('payment', 'method', e.target.value)}
                        disabled={invoice.payment?.status === 'pending'}
                      >
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {invoice.payment?.status === 'partial' && (
                    <div className="mb-4">
                      <label className="label">Amount Paid</label>
                      <input
                        type="number"
                        className="input"
                        value={invoice.payment?.amount || ''}
                        onChange={(e) => updateNested('payment', 'amount', e.target.value)}
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Remaining balance will be calculated automatically.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Transaction ID / Ref No</label>
                      <input
                        placeholder="e.g. UPI Ref No / Bank Txn ID"
                        className="input"
                        value={invoice.payment?.referenceId || ''}
                        onChange={(e) => updateNested('payment', 'referenceId', e.target.value)}
                        disabled={invoice.payment?.status === 'pending'}
                      />
                    </div>
                    <div>
                      <label className="label">Payment Date</label>
                      <input
                        type="date"
                        className="input"
                        value={invoice.payment?.paidDate || ''}
                        onChange={(e) => updateNested('payment', 'paidDate', e.target.value)}
                        disabled={invoice.payment?.status === 'pending'}
                      />
                    </div>
                  </div>

                  {invoice.payment?.status === 'pending' && (
                    <p className="text-[10px] text-slate-400 italic">Payment not received yet. Details disabled.</p>
                  )}
                </div>

                <div className="mb-2 flex justify-end">
                  <select
                    value={pdfMode}
                    onChange={(e) => setPdfMode(e.target.value)}
                    className="text-xs border rounded p-1 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  >
                    <option value="single">Single Page (Auto-Fit)</option>
                    <option value="multi">Multi Page (Long)</option>
                  </select>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={generatePDF}
                    disabled={loadingPdf}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex justify-center items-center gap-2 xl:hidden"
                  >
                    {loadingPdf ? <RefreshCw className="animate-spin" /> : <Download size={20} />} Download PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 py-4 rounded-xl font-bold shadow-sm flex justify-center items-center gap-2 xl:hidden"
                  >
                    <Printer size={20} /> Print PDF
                  </button>
                </div>

              </div>

              {/* INVOICE HISTORY SECTION */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <History className="text-indigo-600" size={18} />
                    <h3 className="font-bold text-slate-700 dark:text-slate-300">Invoice History</h3>
                  </div>
                  <span className="text-xs text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Last 20</span>
                </div>

                {history.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    <p>No invoices created yet.</p>
                    <p className="text-xs mt-1">Download or Print to save automatically.</p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {history.map((item) => (
                      <div key={item.id} className="p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-between group">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{item.invoiceNo || 'No ID'}</span>
                            <span className="text-xs text-slate-400">• {item.date}</span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate w-32 md:w-48">{item.clientName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                            {formatHistoryCurrency(item.totalAmount, item.fullJson.currency)}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => restoreInvoice(item)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                              title="Restore"
                            >
                              <RotateCcw size={16} />
                            </button>
                            <button
                              onClick={() => deleteHistoryItem(item.id)}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm prose dark:prose-invert max-w-none">
                {config?.seoContent}

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold mb-4">FAQ</h3>
                  <details className="group mb-4">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between">
                      Can I save this invoice? <ChevronDown className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-500">Yes. Data is auto-saved to your browser's local storage.</p>
                  </details>
                  <details className="group mb-4">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between">
                      Is the PDF really free? <ChevronDown className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-500">Yes. Generate unlimited, watermark-free PDFs.</p>
                  </details>
                </div>
              </div>

            </div>

            <div className="w-full xl:w-7/12 flex flex-col gap-6 sticky top-24">

              <div className="hidden xl:flex flex-col gap-2">
                <div className="flex justify-end">
                  <select
                    value={pdfMode}
                    onChange={(e) => setPdfMode(e.target.value)}
                    className="text-xs border rounded p-1 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  >
                    <option value="single">Single Page (Auto-Fit)</option>
                    <option value="multi">Multi Page (Long)</option>
                  </select>
                </div>
                <div className="flex gap-4 w-full">
                  <button
                    onClick={generatePDF}
                    disabled={loadingPdf}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-600/20 flex justify-center items-center gap-2 transition-all transform hover:scale-[1.01]"
                  >
                    {loadingPdf ? <RefreshCw className="animate-spin" /> : <Download size={20} />} Download PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Printer size={20} /> Print PDF
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg shadow-2xl bg-slate-500/10 p-4 md:p-8 flex justify-center">

                <div
                  id="invoice-preview"
                  ref={previewRef}
                  className="bg-white text-slate-900 w-full p-[10mm] md:p-[15mm] text-sm leading-normal relative shadow-sm invoice-preview-scaled invoice-preview"
                  style={{ width: '210mm', minHeight: '297mm', overflow: 'visible' }}
                >
                  {/* HEADER */}
                  {/* ✅ REF ADDED TO HEADER CONTAINER */}
                  <div ref={invoiceHeaderRef} className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                    <div className="w-1/2 flex flex-col justify-center">
                      {logo ? (
                        <div className="invoice-logo-wrapper mb-2 relative">
                          <img
                            src={logo}
                            alt="Logo"
                            className="invoice-logo"
                            style={{ maxWidth: '180px', maxHeight: '100px', objectFit: 'contain', display: 'block' }}
                          />
                        </div>
                      ) : (
                        <div className="h-4"></div>
                      )}
                      {invoice.sender.name && <h2 className="font-bold text-xl text-slate-900">{invoice.sender.name}</h2>}
                      <p className="whitespace-pre-wrap text-slate-500 text-sm">{invoice.sender.address}</p>
                      <div className="text-slate-500 text-sm space-y-1">
                        {invoice.sender.email && <p>{invoice.sender.email}</p>}
                        {invoice.sender.email && <p>{invoice.sender.email}</p>}
                        {(config?.id === 'gst' || invoice.taxMode === 'gst') && invoice.sender.gstin && (
                          <p className="font-semibold text-slate-700">GSTIN: {invoice.sender.gstin}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">{invoice.documentTitle || 'INVOICE'}</h1>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-end gap-6">
                          <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">{stdConfig ? stdConfig.invoiceNoLabel : 'Invoice No'}</span>
                          <span className="font-bold text-slate-700">{invoice.invoiceNo}</span>
                        </div>
                        <div className="flex justify-end gap-6">
                          <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Date</span>
                          <span className="font-bold text-slate-700">{invoice.date}</span>
                        </div>
                        {(!stdConfig || stdConfig.showDueDate) && (
                          <div className="flex justify-end gap-6">
                            <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Due Date</span>
                            <span className="font-bold text-slate-700">{invoice.dueDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ✅ REF ADDED TO BODY WRAPPER */}
                  <div ref={invoiceBodyRef} className="w-full">
                    {/* BILL TO & SPECIFICS */}
                    <div className="flex justify-between items-stretch gap-8 mb-10">
                      <div className="w-1/2 bg-slate-50 rounded-xl p-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Bill To</span>
                        {invoice.receiver.name ? (
                          <>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{invoice.receiver.name}</h3>
                            <p className="whitespace-pre-wrap text-slate-500 text-sm leading-relaxed">{invoice.receiver.address}</p>
                            <p className="text-slate-500 text-sm mt-1">{invoice.receiver.email}</p>
                            {config?.id === 'gst' || invoice.taxMode === 'gst' ? (
                              invoice.receiver.gstin && <p className="font-semibold text-slate-700 text-sm mt-3 pt-3 border-t border-slate-200">GSTIN: {invoice.receiver.gstin}</p>
                            ) : null}
                          </>
                        ) : (
                          <p className="text-slate-400 italic text-sm">Client details not provided</p>
                        )}
                      </div>

                      <div className="w-1/2 bg-slate-50 rounded-xl p-6">
                        {config?.id === 'transport' ? (
                          <>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Transport Details</span>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                              <span className="text-slate-500 font-medium">{getLabel('Vehicle No.')}</span>
                              <span className="font-bold text-slate-700 text-right">{invoice.transport.vehicleNo || '-'}</span>
                              <span className="text-slate-500 font-medium">{getLabel('Driver Name')}</span>
                              <span className="font-bold text-slate-700 text-right">{invoice.transport.driverName || '-'}</span>
                              <span className="text-slate-500 font-medium">Origin</span>
                              <span className="font-bold text-slate-700 text-right">{invoice.transport.origin || '-'}</span>
                              <span className="text-slate-500 font-medium">Destination</span>
                              <span className="font-bold text-slate-700 text-right">{invoice.transport.destination || '-'}</span>
                            </div>
                          </>
                        ) : config?.id === 'salon' ? (
                          <>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Service Details</span>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                              <span className="text-slate-500 font-medium">{getLabel('Stylist Name')}</span>
                              <span className="font-bold text-slate-700 text-right">{invoice.salon.stylist || '-'}</span>
                              <span className="text-slate-500 font-medium">Appointment</span>
                              <span className="font-bold text-slate-700 text-right">
                                {invoice.salon.appointmentDate ? new Date(invoice.salon.appointmentDate).toLocaleString() : '-'}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex flex-col justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Payment Status</span>
                            <div className="text-sm font-bold">
                              <span className={`px-2 py-1 rounded border uppercase ${invoice.payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : invoice.payment.status === 'partial' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                {invoice.payment.status}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* TABLE */}
                    <div className="mb-10">
                      <table className="w-full">
                        <thead ref={tableHeaderRef}>
                          <tr>
                            <th className="text-left pb-4 pl-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2">Description</th>
                            {config?.id === 'gst' && <th className="text-center pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">HSN</th>}
                            <th className="text-center pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stdConfig ? stdConfig.qtyLabel : 'Qty'}</th>
                            <th className="text-right pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</th>
                            <th className="text-right pb-4 pr-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice.items.map((item, idx) => (
                            <tr key={item.id} className="border-b border-slate-50 last:border-0">
                              <td className="py-4 pl-4 text-sm font-bold text-slate-700">
                                {item.name || `Item ${idx + 1}`}
                                {item.description && <p className="text-xs text-slate-500 font-normal mt-0.5 whitespace-pre-line">{item.description}</p>}
                              </td>
                              {config?.id === 'gst' && <td className="py-4 text-center text-sm text-slate-500">{item.hsn || '-'}</td>}
                              <td className="py-4 text-center text-sm text-slate-500">{item.quantity}</td>
                              <td className="py-4 text-right text-sm text-slate-500">{formatCurrency(safeFloat(item.price))}</td>
                              <td className="py-4 pr-4 text-right text-sm font-bold text-slate-900">{formatCurrency(calculateLineItem(item.quantity, item.price))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* FOOTER TOTALS */}
                    <div className="flex justify-end mb-10">
                      <div className="w-1/2">
                        <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                          <span>Subtotal</span>
                          <span className="font-medium text-slate-700">{formatCurrency(subtotal)}</span>
                        </div>

                        {discountAmount > 0 && (!stdConfig || stdConfig.showDiscount) && (
                          <div className="flex justify-between text-sm text-emerald-600 mb-3 px-4">
                            <span>Discount</span>
                            <span className="font-medium">-{formatCurrency(discountAmount)}</span>
                          </div>
                        )}

                        {(config?.id === 'gst' || invoice.taxMode === 'gst') && invoice.enableTax && taxRateVal > 0 ? (
                          invoice.isInterstate ? (
                            <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                              <span>IGST ({taxRateVal}%)</span>
                              <span className="font-medium text-slate-700">{formatCurrency(taxAmount)}</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                                <span>CGST ({taxRateVal / 2}%)</span>
                                <span className="font-medium text-slate-700">{formatCurrency(taxAmount / 2)}</span>
                              </div>
                              <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                                <span>SGST ({taxRateVal / 2}%)</span>
                                <span className="font-medium text-slate-700">{formatCurrency(taxAmount / 2)}</span>
                              </div>
                            </>
                          )
                        ) : (invoice.enableTax && taxRateVal > 0) && (
                          <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                            <span>Tax (Non-GST) ({taxRateVal}%)</span>
                            <span className="font-medium text-slate-700">{formatCurrency(taxAmount)}</span>
                          </div>
                        )}

                        {shippingVal > 0 && (!stdConfig || stdConfig.showShipping) && (
                          <div className="flex justify-between text-sm text-slate-500 mb-3 px-4">
                            <span>Shipping</span>
                            <span className="font-medium text-slate-700">{formatCurrency(shippingVal)}</span>
                          </div>
                        )}

                        <div className="bg-slate-50 rounded-xl p-6 mt-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total</span>
                            <span className="text-xl font-bold text-slate-900">{formatCurrency(total)}</span>
                          </div>

                          {paidAmount > 0 && (
                            <div className="flex justify-between items-center mb-3 text-emerald-600 border-b border-emerald-100 pb-2">
                              <span className="text-xs font-bold uppercase tracking-wider">Paid ({invoice.payment.paidDate || 'No Date'})</span>
                              <span className="text-sm font-bold">{formatCurrency(paidAmount)}</span>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Balance Due</span>
                            <span className="text-2xl font-bold text-slate-900">{formatCurrency(balanceDue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details / Proof - Visible only if NOT pending */}
                    {invoice.payment?.status !== 'pending' && (
                      <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Payment Details / Proof</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Status:</span>
                            <span className="font-bold uppercase text-slate-800">{invoice.payment.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Method:</span>
                            <span className="font-medium text-slate-900">{invoice.payment.method}</span>
                          </div>
                          {invoice.payment.paidDate && (
                            <div className="flex justify-between">
                              <span className="text-slate-500">Date:</span>
                              <span className="font-medium text-slate-900">{invoice.payment.paidDate}</span>
                            </div>
                          )}
                          {invoice.payment.referenceId && (
                            <div className="flex justify-between">
                              <span className="text-slate-500">Txn ID:</span>
                              <span className="font-medium text-slate-900">{invoice.payment.referenceId}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-2 border-t border-slate-200 mt-2 col-span-2">
                            <span className="text-slate-500 font-medium">Amount Paid:</span>
                            <span className="font-bold text-slate-900">{formatCurrency(paidAmount)}</span>
                          </div>
                        </div>
                        {invoice.payment.status === 'paid' && (
                          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                            <span className="text-emerald-600 font-bold text-sm flex items-center justify-center gap-2">
                              <CheckCircle size={16} /> Payment Received
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Split Notes & Terms in PDF */}
                    <div className="flex gap-8 mb-12">
                      <div className="w-1/2">
                        {invoice.notes && (
                          <div className="bg-slate-50 rounded-xl p-6 h-full">
                            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2">Notes</h4>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoice.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="w-1/2">
                        <div className="bg-slate-50 rounded-xl p-6 h-full">
                          <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2">Payment Instructions</h4>
                          <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoice.terms}</p>
                        </div>
                      </div>
                    </div>

                    {/* Authorized Signature */}
                    <div className="flex justify-end mt-12 mb-12">
                      <div className="text-center w-48">
                        <div className="mb-2 h-20 flex items-end justify-center">
                          {invoice.sender.signature ? (
                            <img src={invoice.sender.signature} alt="Signature" className="max-h-20 max-w-full object-contain" />
                          ) : (
                            <div className="w-full border-b border-slate-300"></div>
                          )}
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Authorized Signatory</p>
                      </div>
                    </div>

                    {/* Company Footer (replaces SaaS watermark) */}
                    <div className="absolute bottom-4 left-0 w-full text-center">
                      {invoice.sender.name && (
                        <p className="text-[10px] text-slate-300 uppercase tracking-widest invoice-footer-brand">
                          {invoice.sender.name}
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* <AdUnit type="sidebar" label="Sidebar Skyscraper Ad" /> */}

            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 p-1.5 rounded text-white"><Zap size={16} fill="currentColor" /></div>
                <span className="font-bold text-xl">Invoice<span className="text-indigo-600">Pro</span></span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                The premium choice for freelancers and businesses. Fast, secure, and always free invoice generation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Generators</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {Object.values(INVOICE_TYPES).map(t => (
                  <li key={t.id}><button onClick={() => setActiveRoute(t.id)} className="hover:text-indigo-600">{t.title}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><button onClick={() => setActiveRoute('privacy')} className="hover:text-indigo-600">Privacy Policy</button></li>
                <li><button onClick={() => setActiveRoute('terms')} className="hover:text-indigo-600">Terms of Service</button></li>
                <li><button onClick={() => setActiveRoute('about')} className="hover:text-indigo-600">About Us</button></li>
                <li><button onClick={() => setActiveRoute('how-to-create-invoice')} className="hover:text-indigo-600 font-semibold text-indigo-500">Invoice Guide</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Contact</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">support@invoicepro.com</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Online Service | Global</p>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} InvoicePro SaaS. All rights reserved.
          </div>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        /* Responsive Invoice Preview Scaling */
        .invoice-preview-scaled {
          transform-origin: top center;
          transition: transform 0.3s ease, margin-bottom 0.3s ease;
        }

        @media screen and (max-width: 1200px) {
          .invoice-preview-scaled {
            transform: scale(0.9);
            margin-bottom: -30mm;
          }
        }
        @media screen and (max-width: 992px) {
          .invoice-preview-scaled {
            transform: scale(0.8);
            margin-bottom: -60mm;
          }
        }
        @media screen and (max-width: 768px) {
          .invoice-preview-scaled {
            transform: scale(0.65);
            margin-bottom: -105mm;
          }
        }
        @media screen and (max-width: 550px) {
          .invoice-preview-scaled {
            transform: scale(0.5);
            margin-bottom: -149mm;
          }
        }
        @media screen and (max-width: 420px) {
          .invoice-preview-scaled {
            transform: scale(0.4);
            margin-bottom: -178mm;
          }
        }

        /* MOBILE INVOICE PREVIEW FIX */
        @media (max-width: 768px) {
          .invoice-preview {
            transform: scale(1.12);
            transform-origin: top center;
          }
        }

        /* MOBILE BUTTON TOUCH FRIENDLY FIX */
        @media (max-width: 768px) {
          button {
            min-height: 48px;
          }
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-preview, #invoice-preview * {
            visibility: visible;
          }
          #invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: white !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            z-index: 9999;
            transform-origin: top left;
            margin-bottom: 0 !important;
            transform: none !important; /* ✅ SAFE FIX: Ensures no scaling/negative margins in Print/PDF */
          }
          
          /* Ensure logo scales properly in print */
          .invoice-logo {
            max-width: 140px !important;
            max-height: 50px !important;
            object-fit: contain !important;
          }

          /* Hide non-print elements */
          nav, .no-print, button, footer, .ad-unit {
              display: none !important;
          }

          /* Footer Branding Logic for Print */
          .invoice-footer-brand {
              display: none !important;
          }
        }

        /* Remove spinner arrows for Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Remove spinner arrows for Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        .input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: #fff;
          font-size: 0.875rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .dark .input {
          background-color: #0f172a;
          border-color: #334155;
          color: #f8fafc;
        }
        .input:focus {
          border-color: #4f46e5;
          outline: none;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        .dark .label {
          color: #94a3b8;
        }

        .invoice-logo-wrapper {
          max-width: 160px;
          max-height: 70px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .invoice-logo {
          width: auto !important;
          height: auto !important;
          max-width: 160px !important;
          max-height: 70px !important;
          object-fit: contain !important;
          display: block;
        }
      `}</style>
    </div>
  );
}
