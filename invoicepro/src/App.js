import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, Download, Plus, Trash2, Settings, Moon, Sun, 
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
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// --- CONFIGURATION & CONTENT ---

const INVOICE_TYPES = {
  standard: {
    id: 'standard',
    path: '/standard-invoice-generator',
    title: 'Standard Invoice Generator',
    metaTitle: 'Free Standard Invoice Generator | Create Professional Invoices Online',
    metaDesc: 'Create standard business invoices instantly. Free online invoice generator for small businesses, contractors, and freelancers. Download PDF with no signup.',
    keywords: 'standard invoice, free invoice generator, online invoice maker, simple bill generator',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    description: 'The classic invoice format suitable for any business need.',
    fields: ['tax', 'discount', 'shipping'],
    subCategories: ['Standard Invoice', 'Simple Invoice', 'Sales Invoice', 'Service Invoice', 'Retail Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">The Standard Invoice Generator for Everyone</h2>
        <p className="mb-4">Our Standard Invoice Generator is the most versatile tool for creating professional bills instantly. Whether you run a small shop, an online store, or provide general services, this template covers all the essentials.</p>
        <h3 className="text-xl font-bold mb-2">Key Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Universal Format:</strong> Accepted globally for most business transactions.</li>
          <li><strong>Flexible Tax Rates:</strong> Adjustable tax percentages to match your local laws.</li>
          <li><strong>Professional Design:</strong> Clean, crisp layout that looks great printed or emailed.</li>
        </ul>
        <p>Start billing your clients professionally today without signing up or paying for expensive software.</p>
      </>
    )
  },
  gst: {
    id: 'gst',
    path: '/gst-invoice-generator',
    title: 'GST Invoice Generator',
    metaTitle: 'GST Invoice Generator India | Free GST Bill Maker Online',
    metaDesc: 'Generate GST-compliant invoices with CGST, SGST, & IGST calculations automatically. Best free GST billing software for Indian businesses.',
    keywords: 'gst invoice generator, gst bill maker, india gst invoice, online tax invoice',
    icon: <CreditCard className="w-6 h-6" />,
    color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
    description: 'Compliant GST format with CGST, SGST, and IGST breakdowns.',
    fields: ['gstin', 'hsn', 'taxBreakdown'],
    subCategories: ['GST Invoice', 'Tax Invoice', 'Non-GST Invoice', 'VAT Invoice', 'Proforma Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">India's Best Free GST Invoice Maker</h2>
        <p className="mb-4">Strict adherence to GST norms is mandatory for Indian businesses. Our tool takes the complexity out of GST invoicing by automatically calculating and displaying the correct tax components.</p>
        <h3 className="text-xl font-bold mb-2">Why use our GST Tool?</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Automatic Tax Split:</strong> Toggle between Inter-state (IGST) and Intra-state (CGST + SGST).</li>
          <li><strong>HSN/SAC Codes:</strong> Dedicated columns for mandatory HSN codes.</li>
          <li><strong>GSTIN Fields:</strong> Prominent display of Supplier and Buyer GSTINs.</li>
        </ul>
      </>
    )
  },
  freelance: {
    id: 'freelance',
    path: '/freelance-invoice-generator',
    title: 'Freelance Invoice Maker',
    metaTitle: 'Freelance Invoice Maker | Free Billing Tool for Consultants',
    metaDesc: 'Create professional freelance invoices in seconds. Ideal for developers, designers, writers, and consultants. Download PDF invoices for free.',
    keywords: 'freelance invoice, invoice for freelancers, consulting invoice, contractor bill maker',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    description: 'Clean, simple invoices designed for freelancers and contractors.',
    fields: ['discount', 'hourly'],
    subCategories: ['Freelance Invoice', 'Consulting Invoice', 'Web Design Invoice', 'Digital Marketing Invoice', 'Contractor Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Professional Invoices for Freelancers</h2>
        <p className="mb-4">Get paid faster with invoices that look as professional as your work. Designed specifically for developers, writers, designers, and consultants.</p>
        <h3 className="text-xl font-bold mb-2">Freelancer Friendly Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Hourly or Fixed:</strong> Easily switch between hourly rates or project fees.</li>
          <li><strong>Bank Details:</strong> Dedicated section to add your UPI, Bank Transfer, or PayPal details.</li>
          <li><strong>Minimalist Design:</strong> Focuses on the work delivered without clutter.</li>
        </ul>
      </>
    )
  },
  transport: {
    id: 'transport',
    path: '/transport-invoice-generator',
    title: 'Transport & Logistics Invoice',
    metaTitle: 'Transport Invoice Generator | Logistics Bill Format',
    metaDesc: 'Generate transport and logistics invoices with vehicle number, driver details, and route information. Free tool for transporters and fleet owners.',
    keywords: 'transport invoice, logistics bill, lorry receipt, fleet invoice generator',
    icon: <Truck className="w-6 h-6" />,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    description: 'Logistics bill format with Vehicle No, Route, and Driver details.',
    fields: ['vehicle', 'route', 'driver'],
    subCategories: ['Transport Invoice', 'Commercial Invoice', 'Export Invoice', 'Import Invoice', 'Customs Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Transport Bill & Lorry Receipt Generator</h2>
        <p className="mb-4">Logistics and transport businesses have unique invoicing needs. Our template includes all the specific fields required for transport compliance.</p>
        <h3 className="text-xl font-bold mb-2">Transport Specifics</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Vehicle Tracking:</strong> Input Vehicle Number and Driver Name directly on the bill.</li>
          <li><strong>Route Info:</strong> Clearly specify 'From' and 'To' locations.</li>
          <li><strong>Freight Charges:</strong> Breakdown of freight, loading/unloading, and other charges.</li>
        </ul>
      </>
    )
  },
  salon: {
    id: 'salon',
    path: '/salon-invoice-generator',
    title: 'Salon & Spa Invoice',
    metaTitle: 'Salon & Spa Invoice Generator | Beauty Parlour Bill Maker',
    metaDesc: 'Create elegant receipts for salons, spas, and beauty clinics. Manage appointments and stylist details. Free PDF download.',
    keywords: 'salon invoice, spa bill, beauty parlour receipt, stylist invoice',
    icon: <Scissors className="w-6 h-6" />,
    color: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30',
    description: 'Elegant receipts for beauty salons, spas, and stylists.',
    fields: ['stylist', 'appointment', 'tip'],
    subCategories: ['Salon Invoice', 'Hotel Invoice', 'Medical Invoice', 'Repair Invoice'],
    seoContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">Free Salon & Spa Billing Software</h2>
        <p className="mb-4">Elevate your client experience with beautiful digital receipts. Perfect for hair salons, nail studios, and wellness centers.</p>
        <h3 className="text-xl font-bold mb-2">Salon Features</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Stylist Attribution:</strong> Track which staff member performed the service.</li>
          <li><strong>Appointment Details:</strong> Record the date and time of service.</li>
          <li><strong>Tip/Gratuity:</strong> Optional field to record tips received.</li>
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
  enableTax: true,
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
  notes: 'Thank you for your shopping!',
  terms: 'Pay via UPI / Bank Transfer / Cheque\nUPI ID: \nBank: \nAccount No: '
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
    title: 'Beautiful Templates',
    description: 'Clean, modern, and professional designs that impress clients.'
  },
  {
    id: 'security',
    icon: <ShieldCheck />,
    title: '100% Secure',
    description: 'Data stays in your browser. No servers, no tracking, complete privacy.'
  },
  {
    id: 'speed',
    icon: <Zap />,
    title: 'Instant PDF',
    description: 'Generate high-quality A4 PDFs in milliseconds.'
  },
  {
    id: 'global',
    icon: <Globe />,
    title: 'Global Currencies',
    description: 'Support for USD, EUR, INR, GBP and many more.'
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


const AdUnit = ({ type, label }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        if (adRef.current.innerHTML === "") {
           (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      // console.error("AdSense Error:", e);
    }
  }, []);

  const visibilityClass = type === 'sidebar' ? 'hidden lg:flex' : 'flex';

  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 ${visibilityClass} flex-col items-center justify-center text-slate-400 text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 ${type === 'sidebar' ? 'h-[600px] sticky top-24' : 'h-[120px] my-8'} no-print relative`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="uppercase tracking-widest text-xs mb-2">Advertisement</p>
        <p className="text-xs opacity-75 font-normal">{label}</p>
      </div>
      <ins className="adsbygoogle"
         style={{ display: 'block', width: '100%', height: '100%' }}
         data-ad-client="ca-pub-2676342226418259"
         data-ad-slot={type === 'sidebar' ? "1234567891" : "1234567890"}
         data-ad-format="auto"
         data-full-width-responsive="true"
         ref={adRef}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm">{desc}</p>
  </div>
);

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
    <p className="mb-4">Last updated: {new Date().getFullYear()}</p>
    <p className="mb-4">At InvoicePro, we take your privacy seriously. This Privacy Policy explains how we handle your data.</p>
    
    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">1. Data Collection & Storage</h3>
    <p className="mb-4">We respect your data privacy. <strong>We do not store any of your invoice data on our servers.</strong></p>
    <p className="mb-4">All data entered into the invoice generator (including client details, amounts, and business information) is stored locally on your device using your browser's Local Storage technology. This means your data never leaves your computer.</p>

    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">2. Cookies</h3>
    <p className="mb-4">We use local storage cookies solely to remember your preferences (such as Light/Dark mode and your last used invoice number) to improve your user experience.</p>

    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">3. Third-Party Services</h3>
    <p className="mb-4">We use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites.</p>
  </LegalLayout>
);

const TermsOfService = () => (
  <LegalLayout title="Terms of Service">
    <p className="mb-4">By accessing and using InvoicePro, you accept and agree to be bound by the terms and provision of this agreement.</p>

    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">1. Use of Service</h3>
    <p className="mb-4">InvoicePro is a free tool provided for freelancers and small businesses. You agree to use this service only for lawful purposes.</p>

    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">2. Disclaimer of Warranties</h3>
    <p className="mb-4">The service is provided on an "as is" and "as available" basis. We make no warranties regarding the accuracy of calculations for tax purposes. Please consult an accountant for official financial advice.</p>

    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">3. Limitation of Liability</h3>
    <p className="mb-4">In no event shall InvoicePro be liable for any direct, indirect, incidental, or consequential damages arising out of the use of our service.</p>
  </LegalLayout>
);

const AboutUs = () => (
  <LegalLayout title="About Us">
    <p className="mb-4">InvoicePro was built with a simple mission: <strong>To make professional invoicing free and accessible to everyone.</strong></p>
    <p className="mb-4">We understand that freelancers, consultants, and small business owners often struggle with complex accounting software. That's why we created a tool that is:</p>
    <ul className="list-disc pl-5 mb-6 space-y-2">
      <li>Fast and easy to use</li>
      <li>Privacy-focused (No server storage)</li>
      <li>Professional and compliant</li>
      <li>Completely free</li>
    </ul>
    <p className="mb-4">Our team is dedicated to maintaining this tool and ensuring it remains the best free invoice generator on the web.</p>
  </LegalLayout>
);

const ContactUs = () => (
  <LegalLayout title="Contact Us">
    <p className="mb-4">
      We’re here to help. If you have questions about invoice generation, GST compliance,
      or face any issues while using InvoicePro, feel free to reach out.
    </p>

    <ul className="list-disc pl-5 mb-6 space-y-2">
      <li>Technical issues or bugs in the invoice generator</li>
      <li>Questions related to GST invoices or billing formats</li>
      <li>Feature requests or improvement suggestions</li>
      <li>Legal, privacy, or AdSense-related inquiries</li>
    </ul>

    <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 inline-block pr-12">
      <h3 className="font-bold text-lg mb-2">Email Support</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        For support and business-related queries:
      </p>
      <a
        href="mailto:support@invoicepro.com"
        className="text-indigo-600 font-semibold hover:underline"
      >
        support@invoicepro.com
      </a>
    </div>

    <p className="mt-8 text-sm text-slate-500">
      We usually respond within 24–48 business hours.
    </p>

    <p className="mt-6 text-xs text-slate-400 italic">
      InvoicePro is a self-service online tool and does not provide accounting or legal advice.
    </p>
  </LegalLayout>
);

const HowToCreateInvoice = () => (
  <LegalLayout title="How to Create a Professional Invoice Online: The Ultimate Free Guide">
    <p className="text-sm text-slate-500 italic mt-2 mb-6">
      This guide is written to help freelancers & small businesses understand invoicing legally and practically.
    </p>
    <section className="mb-8">
      <p className="mb-4">
        In the fast-paced world of business, getting paid on time is critical. Whether you are a <strong>freelancer</strong>, a <strong>small business owner</strong>, or a service provider, the bridge between your hard work and your payment is a <strong>professional invoice</strong>.
      </p>
      <p className="mb-4">
        Many professionals still rely on outdated methods like handwritten bills, Word documents, or complex Excel spreadsheets. These methods are prone to errors, look unprofessional, and often delay payments. In this comprehensive guide, we will explore <strong>how to create an invoice online</strong> using a <strong>free invoice generator</strong>, understand the nuances of <strong>GST invoices in India</strong>, and learn best practices to ensure your cash flow remains healthy.
      </p>
      <p>
        By the end of this guide, you will know exactly how to generate compliant, professional, and beautiful invoices in seconds—without signing up for expensive software.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">1. What is an Invoice?</h2>
      <p className="mb-4">
        An <strong>invoice</strong> is more than just a request for payment. It is a formal commercial document issued by a seller (you) to a buyer (your client) relating to a sale transaction. It indicates the products, quantities, and agreed prices for products or services the seller had provided the buyer.
      </p>
      <p className="mb-4">
        Legally, an invoice serves as a record of the sale. If you ever face a dispute regarding a payment or scope of work, your invoice serves as primary evidence of the transaction. For businesses registered under tax laws (like GST in India or VAT in Europe), an invoice is a mandatory document for filing taxes and claiming input tax credits.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">2. Why Professional Invoices Matter</h2>
      <p className="mb-4">
        You might wonder, "Can't I just send a WhatsApp message asking for money?" While possible for casual debts, it is disastrous for business. Here is why a <strong>professional invoice format</strong> is non-negotiable:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Builds Trust & Authority:</strong> A well-formatted invoice with your logo and clear details signals that you are a legitimate, established professional.</li>
        <li><strong>Ensures Faster Payments:</strong> Clear payment terms, due dates, and bank details eliminate back-and-forth emails, removing friction from the payment process.</li>
        <li><strong>Legal Protection:</strong> In case of non-payment, a formal invoice acts as a legal contract of the debt owed to you.</li>
        <li><strong>Tax Compliance:</strong> For GST/VAT purposes, governments require specific formats. A compliant invoice saves you from penalties during audits.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">3. Types of Invoices You Need to Know</h2>
      <p className="mb-4">Depending on your industry and location, the format of your bill might change. Our <strong>online invoice maker</strong> supports various specialized formats:</p>
      
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">Standard Invoice</h3>
      <p className="mb-2">The most common format used by retail shops, online sellers, and general businesses. It lists items, prices, taxes, and a total.</p>

      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">GST Invoice (India)</h3>
      <p className="mb-2">Crucial for Indian businesses. A <strong>GST invoice</strong> must break down taxes into CGST (Central Goods and Services Tax) and SGST (State Goods and Services Tax) for intra-state sales, or IGST (Integrated Goods and Services Tax) for inter-state sales. It also requires the GSTIN of both supplier and buyer, along with HSN/SAC codes.</p>

      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">Freelance Invoice</h3>
      <p className="mb-2">Designed for consultants, writers, designers, and developers. A <strong>freelance invoice</strong> often focuses on hourly rates or project milestones and includes specific payment instructions for international or domestic transfers.</p>

      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">Transport Invoice</h3>
      <p className="mb-2">Logistics companies need to document vehicle numbers, driver names, origin, and destination. A standard bill won't suffice here; you need a specialized <strong>transport invoice template</strong>.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">4. Step-by-Step: How to Create an Invoice Online</h2>
      <p className="mb-4">Using <strong>InvoicePro</strong>, creating a bill takes less than 2 minutes. Follow this guide to generate your first <strong>PDF invoice</strong>:</p>

      <ol className="list-decimal pl-5 space-y-4 mb-4">
        <li>
          <strong>Select Your Template:</strong> Choose between Standard, GST, Freelance, or Transport depending on your need.
        </li>
        <li>
          <strong>Add Your Business Branding:</strong> Click on "Logo" to upload your company logo. This watermark instantly makes your document look premium. Enter your business name, address, and contact info.
        </li>
        <li>
          <strong>Enter Client Details:</strong> Fill in the "Bill To" section. If you are making a <strong>GST invoice</strong>, ensure you enter the client's GSTIN correctly to allow them to claim input credit.
        </li>
        <li>
          <strong>Add Line Items:</strong> List your products or services.
          <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 dark:text-slate-400">
             <li><strong>Item Name:</strong> Keep it short (e.g., "Web Design").</li>
             <li><strong>Description:</strong> Add details (e.g., "Homepage + 5 inner pages").</li>
             <li><strong>Qty & Rate:</strong> The <strong>invoice generator</strong> will auto-calculate the amount.</li>
          </ul>
        </li>
        <li>
          <strong>Configure Taxes & Discounts:</strong> Enable tax if applicable. For Indian users, the tool automatically splits taxes into CGST/SGST or IGST based on your settings. Add a discount if you are running a promotion.
        </li>
        <li>
          <strong>Add Payment Details:</strong> Never leave the client guessing. Add your Bank Account Number, IFSC Code, or UPI ID in the "Payment Instructions" box.
        </li>
        <li>
          <strong>Sign & Download:</strong> Upload your digital signature for a legally valid look. Click "Download PDF" to get a high-quality A4 invoice instantly.
        </li>
      </ol>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">5. GST Invoicing Explained (For Indian Businesses)</h2>
      <p className="mb-4">
        The Goods and Services Tax (GST) system in India requires strict adherence to invoicing rules. A valid <strong>GST invoice format</strong> must contain:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>GSTIN:</strong> The 15-digit ID of the supplier and the recipient (if registered).</li>
        <li><strong>HSN / SAC Code:</strong> Harmonized System of Nomenclature (goods) or Service Accounting Code (services).</li>
        <li><strong>Tax Breakup:</strong>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Intra-state (Same State):</strong> Tax is split equally between CGST (Central) and SGST (State).</li>
            <li><strong>Inter-state (Different States):</strong> Tax is charged as a single component called IGST (Integrated).</li>
          </ul>
        </li>
        <li><strong>Invoice Number & Date:</strong> A unique, sequential number for accounting reference.</li>
      </ul>
      <p>
        Our <strong>GST invoice generator</strong> handles this logic automatically. You just enable "Inter-state" if applicable, and the math is done for you.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">6. Common Invoicing Mistakes to Avoid</h2>
      <p className="mb-4">Even experienced business owners make mistakes. Avoid these common pitfalls by using an <strong>online invoice maker</strong> instead of manual Word docs:</p>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Calculation Errors:</strong> Manual math often leads to wrong totals, causing embarrassment and payment delays. Automated tools prevent this.</li>
        <li><strong>Missing Due Date:</strong> If you don't say when you want to be paid, clients will delay. Always set a clear "Due Date".</li>
        <li><strong>Vague Descriptions:</strong> "Consulting Services" is too vague. Use "Consulting for Q3 Marketing Strategy" to avoid disputes.</li>
        <li><strong>Forgot Payment Info:</strong> The client is ready to pay but doesn't know where. Always double-check your bank details on the final PDF.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">7. Why Use an Online Invoice Generator vs Excel?</h2>
      <p className="mb-4">
        For decades, Excel was the go-to. But in 2024, using Excel for invoicing is inefficient. Here is why you should switch to a specialized <strong>invoice template online</strong> tool:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
           <h4 className="font-bold mb-2">Excel / Word</h4>
           <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
             <li>❌ Formatting breaks easily</li>
             <li>❌ Manual math errors</li>
             <li>❌ Difficult to manage on mobile</li>
             <li>❌ Looks generic and outdated</li>
           </ul>
        </div>
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
           <h4 className="font-bold mb-2 text-indigo-700 dark:text-indigo-300">InvoicePro Generator</h4>
           <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
             <li>✅ Perfect A4 PDF layout every time</li>
             <li>✅ Automated calculations</li>
             <li>✅ Mobile-friendly and fast</li>
             <li>✅ Professional, agency-grade look</li>
           </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">8. Privacy & Security: Is it Safe?</h2>
      <p className="mb-4">
        Most online invoice generators require you to sign up, creating a risk of your client data being stored on their servers. 
      </p>
      <p className="mb-4">
        <strong>InvoicePro is different.</strong> We use a <strong>Local-First Architecture</strong>. This means:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>No Server Storage:</strong> Your client list, sales figures, and bank details <strong>never</strong> leave your browser.</li>
        <li><strong>No Signup Required:</strong> You don't need to create an account or share your email to use the tool.</li>
        <li><strong>100% Free:</strong> Generate unlimited invoices without paywalls or watermarks (on business invoices).</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Frequently Asked Questions (FAQs)</h2>
      
      <div className="space-y-4">
        <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
            Is this invoice generator truly free?
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180"/>
          </summary>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Yes, InvoicePro is 100% free. You can generate unlimited invoices, download PDFs, and print them without paying a cent.</p>
        </details>

        <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
            Can I create a GST invoice for India?
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180"/>
          </summary>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Absolutely. Select the "GST Invoice" option from the menu. It supports CGST, SGST, IGST, HSN codes, and GSTIN fields automatically.</p>
        </details>

        <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
            Does the invoice have a watermark?
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180"/>
          </summary>
          <p className="mt-2 text-slate-600 dark:text-slate-400">If you add your own Business Name or Logo, the "Created with InvoicePro" branding is automatically removed from the footer, giving you a completely white-label experience.</p>
        </details>

        <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
            Can I save my invoice data?
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180"/>
          </summary>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Your data is automatically saved in your browser's local storage. If you close the tab and come back, your details will still be there (unless you clear your browser cache).</p>
        </details>
         
        <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
            Is my data private?
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180"/>
          </summary>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Yes. We do not store any data on our servers. Everything happens locally on your device.</p>
        </details>
      </div>
    </section>

    <section className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-center border border-indigo-100 dark:border-indigo-800">
      <h2 className="text-2xl font-bold mb-4">Ready to Create Your Invoice?</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-300">Join thousands of freelancers and businesses who trust InvoicePro for their billing needs. No signup required.</p>
      <button 
        onClick={() => window.scrollTo(0,0)} 
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-105"
      >
        Create Invoice Now
      </button>
    </section>
  </LegalLayout>
);

export default function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [invoice, setInvoice] = useState(DEFAULT_INVOICE);
  const [logo, setLogo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [history, setHistory] = useState([]);
  
  const previewRef = useRef(null);
  const config = activeRoute !== 'home' ? INVOICE_TYPES[activeRoute] : null;

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
      description: 'Create and download professional PDF invoices for free. Secure, fast, and no signup required. Perfect for freelancers and small businesses.',
      keywords: 'free invoice generator, online invoice maker, pdf invoice, billing software',
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
         terms: 'Terms of Service - InvoicePro',
         about: 'About Us - InvoicePro',
         contact: 'Contact Us - InvoicePro',
         'how-to-create-invoice': 'How to Create a Professional Invoice Online | Free Guide'
       };
       const descs = {
         'how-to-create-invoice': 'Learn how to create professional invoices online step by step. Free invoice guide for freelancers, small businesses, GST users, and service providers.'
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

  useEffect(() => {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    
    const saved = localStorage.getItem('premiumInvoiceData');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (!parsed.payment) parsed.payment = { ...DEFAULT_INVOICE.payment };
        if (parsed.terms === undefined) parsed.terms = DEFAULT_INVOICE.terms;
        if (parsed.payment.amount === undefined) parsed.payment.amount = 0;
        if (parsed.sender && parsed.sender.signature === undefined) parsed.sender.signature = '';
        
        if (parsed.notes === 'Thank you for your business!') {
           parsed.notes = 'Thank you for your shopping!';
        }

        if (parsed.items) {
          parsed.items = parsed.items.map(item => ({
             ...item,
             description: item.description || '' 
          }));
        }

        setInvoice(parsed); 
      } catch (e) { console.error("Failed to load invoice data", e); }
    } else {
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
        // Use startsWith to handle extended locale strings like 'en-IN-u-nu-latn'
        const matchedCurrency = CURRENCIES.find(c => userLocale.startsWith(c.locale));
        if (matchedCurrency) {
          detectedCurrency = matchedCurrency.code;
        }
      } catch (e) {
        // Fallback to USD implies no action needed as detectedCurrency init is 'USD'
      }

      setInvoice(prev => ({ ...prev, invoiceNo: nextNo, currency: detectedCurrency }));
    }

    const savedHistory = localStorage.getItem('invoiceHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
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
    } catch (e) {}
  }, [invoice]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (x) => setLogo(x.target.result);
      reader.readAsDataURL(file);
    }
  };

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
    setInvoice(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        status: newStatus,
        amount: newStatus === 'pending' ? 0 : prev.payment.amount,
        referenceId: newStatus === 'pending' ? '' : prev.payment.referenceId,
        paidDate: newStatus === 'paid' 
          ? (prev.payment.paidDate || new Date().toISOString().split('T')[0]) 
          : newStatus === 'partial' 
            ? (prev.payment.paidDate || '') 
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
    if (!invoice.receiver.name) errors.clientName = true;
    if (invoice.items.length === 0) errors.items = true;
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePrint = () => {
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
            img[alt="Logo"] {
              max-height: 60px !important;
              width: auto !important;
              object-fit: contain !important;
              object-position: left !important;
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
    validateInvoice(); 
    saveToHistory();
    if (!window.html2canvas || !window.jspdf) {
      alert("Generating engine is warming up... please click again in 2 seconds.");
      return;
    }
    setLoadingPdf(true);
    const element = previewRef.current;
    
    // Remove shadow for clean capture and ensure fixed dimensions
    const originalShadow = element.style.boxShadow;
    const originalHeight = element.style.height;
    const originalMaxHeight = element.style.maxHeight;
    const originalOverflow = element.style.overflow;
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    const originalMarginBottom = element.style.marginBottom; 

    element.style.boxShadow = 'none';
    element.style.height = '297mm'; 
    element.style.overflow = 'hidden'; 
    element.style.marginBottom = '0';
    
    const targetRatioHeight = element.offsetWidth * 1.4141; 
    
    let scale = 1;
    if (element.scrollHeight > targetRatioHeight) {
       scale = targetRatioHeight / element.scrollHeight;
    }

    element.style.transform = `scale(${scale})`;
    element.style.transformOrigin = 'top left'; 

    try {
      const canvas = await window.html2canvas(element, {
        scale: 3, // High quality
        useCORS: true, 
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
           const preview = clonedDoc.getElementById('invoice-preview');
           if (preview) {
             preview.style.marginBottom = '0';
             const watermark = clonedDoc.createElement('div');
             watermark.style.position = 'absolute';
             watermark.style.top = '50%';
             watermark.style.left = '50%';
             watermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
             watermark.style.opacity = '0.05'; 
             watermark.style.zIndex = '0';
             watermark.style.pointerEvents = 'none';
             watermark.style.textAlign = 'center';
             watermark.style.width = '100%';
             watermark.style.overflow = 'hidden';
              
             if (logo) {
                const img = clonedDoc.createElement('img');
                img.src = logo;
                // Strict proportional scaling for watermark
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.style.maxWidth = '60%';
                img.style.maxHeight = '100px';
                img.style.objectFit = 'contain';
               
                img.style.display = 'block';
                img.style.margin = '0 auto';
                img.style.filter = 'grayscale(100%)';
                watermark.appendChild(img);
             } else if (invoice.sender.name) {
                const text = clonedDoc.createElement('h1');
                text.innerText = invoice.sender.name;
                text.style.fontSize = '80px';
                text.style.fontWeight = 'bold';
                text.style.color = '#334155';
                text.style.textTransform = 'uppercase';
                text.style.whiteSpace = 'nowrap';
                watermark.appendChild(text);
             }
              
             if (watermark.hasChildNodes()) {
                preview.insertBefore(watermark, preview.firstChild);
                preview.style.position = 'relative';
             }
              
             const logoImg = preview.querySelector('img[alt="Logo"]');
             if (logoImg) {
               logoImg.style.maxHeight = '60px';
               logoImg.style.width = 'auto';
               logoImg.style.objectFit = 'contain';
               logoImg.style.objectPosition = 'left';
             }

             const footerBrand = preview.querySelector('.invoice-footer-brand');
             if (footerBrand) {
                 if (logo || invoice.sender.name) {
                     footerBrand.innerText = invoice.sender.name || '';
                 } else {
                     footerBrand.innerText = 'Created with InvoicePro';
                 }
             }
           }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      
      // Single Page Logic
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Scale to fit exactly within A4
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      pdf.save(`${invoice.invoiceNo || 'invoice'}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Error creating PDF. Please try using a simpler logo or check browser console.');
    } finally {
      // Restore styles
      element.style.boxShadow = originalShadow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalOverflow;
      element.style.transform = originalTransform;
      element.style.transformOrigin = originalTransformOrigin;
      element.style.marginBottom = originalMarginBottom;
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
      </div>
    );
  }

  // ... [Keep existing Main UI Render logic] ...
  return (
    // ... [Existing Layout] ...
    // ... [Existing Footer in Main UI] ...
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
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
               Create Professional Invoices <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                 Absolutely Free
               </span>
             </h1>
             <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
               The most powerful invoice generator on the web. No login required. 
               Unlimited PDF downloads. Secure and private.
             </p>
             
             <div className="flex flex-wrap justify-center gap-4 mb-16">
               <button 
                 onClick={() => handleRouteChange('standard')}
                 className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 flex items-center gap-2"
               >
                 Create First Invoice <ArrowRight size={18} />
               </button>
               <button 
                 onClick={() => handleRouteChange('gst')}
                 className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
               >
                 GST Invoice <CreditCard size={18} className="text-emerald-500" />
               </button>
             </div>

             <div className="mt-6 flex justify-center">
               <button
                 onClick={() => handleRouteChange('how-to-create-invoice')}
                 className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
               >
                 📘 Learn how to create professional invoices (Free Guide)
               </button>
             </div>

             <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-4 text-left">
               {Object.values(INVOICE_TYPES).map(type => (
                 <div 
                   key={type.id}
                   onClick={() => handleRouteChange(type.id)}
                   className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
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

          {/* <AdUnit type="banner" label="Homepage Leaderboard" /> */}

          <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Professionals Choose Us?</h2>
                <p className="text-slate-500 dark:text-slate-400">Everything you need to get paid faster, without the headache.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {APP_FEATURES.map((feature) => (
                  <FeatureCard 
                    key={feature.id}
                    icon={feature.icon} 
                    title={feature.title} 
                    desc={feature.description} 
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 container mx-auto px-4 max-w-4xl prose dark:prose-invert">
             <h2>The Ultimate Free Invoice Generator</h2>
             <p>Managing finances is crucial for freelancers, small business owners, and entrepreneurs. Our tool simplifies billing by allowing you to create customized invoices in seconds. Unlike complex accounting software, our solution is lightweight, fast, and completely free.</p>
             <h3>How to create an invoice online?</h3>
             <ol>
               <li>Select the invoice template that matches your business type (Standard, GST, etc).</li>
               <li>Add your business logo and contact details.</li>
               <li>Enter client information and list the services or products provided.</li>
               <li>Download the PDF and email it directly to your client.</li>
             </ol>
             <p>We support various invoice types including compliant GST invoices for Indian businesses, simple freelance bills, and detailed transport receipts.</p>
          </section>

        </div>

      ) : (

        <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
          
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className={`p-2 rounded-lg ${config?.color.split(' ')[1]}`}>
                    {config?.icon}
                </span>
                {config?.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{config?.description}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleRouteChange('home')}
                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                &larr; Back to Home
              </button>
            </div>
          </div>

          {/* <AdUnit type="banner" label="Top Banner Ad" /> */}

          <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            <div className="w-full xl:w-5/12 space-y-6 no-print">
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <Settings className="text-indigo-600" size={20} />
                  <h2 className="font-bold text-lg">Invoice Settings</h2>
                </div>

                <div className="mb-4">
                   <label className="label">Document Type</label>
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
                    <label className="label">Invoice No</label>
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
                  <div>
                    <label className="label">Due Date</label>
                    <input type="date" className="input" value={invoice.dueDate} onChange={(e) => updateRoot('dueDate', e.target.value)} />
                  </div>
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
                    <h3 className="text-xs font-bold uppercase text-orange-600 mb-2 flex items-center gap-2"><Truck size={14}/> Transport Details</h3>
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
                    <h3 className="text-xs font-bold uppercase text-pink-600 mb-2 flex items-center gap-2"><Scissors size={14}/> Service Details</h3>
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
                           <label className="text-xs text-indigo-600 cursor-pointer font-semibold hover:underline flex items-center gap-1">
                             <Plus size={14} /> Logo
                             <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                           </label>
                           <label className="text-xs text-indigo-600 cursor-pointer font-semibold hover:underline flex items-center gap-1">
                             <PenTool size={14} /> Sign
                             <input type="file" className="hidden" onChange={handleSignatureUpload} accept="image/*" />
                           </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <input placeholder="Business Name" className="input" value={invoice.sender.name} onChange={e => updateNested('sender', 'name', e.target.value)} />
                        <input placeholder="Email" className="input" value={invoice.sender.email} onChange={e => updateNested('sender', 'email', e.target.value)} />
                        <textarea placeholder="Address" rows="2" className="input" value={invoice.sender.address} onChange={e => updateNested('sender', 'address', e.target.value)} />
                        {config?.fields.includes('gstin') && (
                           <input placeholder="Your GSTIN" className="input border-emerald-200 focus:border-emerald-500" value={invoice.sender.gstin} onChange={e => updateNested('sender', 'gstin', e.target.value)} />
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
                          onChange={e => { updateNested('receiver', 'name', e.target.value); setValidationErrors(p => ({...p, clientName: false})) }} 
                        />
                        <input placeholder="Email" className="input" value={invoice.receiver.email} onChange={e => updateNested('receiver', 'email', e.target.value)} />
                        <textarea placeholder="Address" rows="2" className="input" value={invoice.receiver.address} onChange={e => updateNested('receiver', 'address', e.target.value)} />
                        {config?.fields.includes('gstin') && (
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
                            placeholder={getDescriptionPlaceholder()}
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
                             placeholder="Qty" 
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
                      Enable Tax
                    </label>
                    <div className={`flex items-center gap-2 transition-opacity ${invoice.enableTax ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                      <label className="text-sm font-medium">Tax Rate (%)</label>
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

                  {/* SHIPPING INPUT */}
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

                  <label className="label">Notes (Optional)</label>
                  <textarea 
                     rows="2" 
                     placeholder="e.g. Thank you for your business!"
                     className="input mb-4" 
                     value={invoice.notes}
                     onChange={(e) => updateRoot('notes', e.target.value)}
                   />

                  <label className="label">Payment Instructions</label>
                  <textarea 
                     rows="4" 
                     placeholder="e.g. Bank Account Details / UPI ID"
                     className="input" 
                     value={invoice.terms}
                     onChange={(e) => updateRoot('terms', e.target.value)}
                   />
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
                  <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
                  <details className="group mb-4">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between">
                      Can I save this invoice? <ChevronDown className="group-open:rotate-180 transition-transform"/>
                    </summary>
                    <p className="mt-2 text-sm text-slate-500">Yes, your data is automatically saved to your browser's local storage so you can come back later.</p>
                  </details>
                  <details className="group mb-4">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between">
                       Is the PDF really free? <ChevronDown className="group-open:rotate-180 transition-transform"/>
                     </summary>
                     <p className="mt-2 text-sm text-slate-500">Yes, generate unlimited PDFs for free. No watermarks on the professional layout.</p>
                  </details>
                </div>
              </div>

            </div>

            <div className="w-full xl:w-7/12 flex flex-col gap-6 sticky top-24">
             
              <div className="hidden xl:flex gap-4">
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

              <div className="overflow-x-auto rounded-lg shadow-2xl bg-slate-500/10 p-4 md:p-8 flex justify-center">
               
                <div 
                  id="invoice-preview"
                  ref={previewRef}
                  className="bg-white text-slate-900 w-full p-[10mm] md:p-[15mm] text-sm leading-normal relative shadow-sm invoice-preview-scaled invoice-preview"
                  style={{ width: '210mm', minHeight: '297mm', overflow: 'visible' }} 
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                     <div className="w-1/2 flex flex-col justify-center">
                       {logo ? (
                         <img src={logo} alt="Logo" className="h-16 object-contain mb-2 object-left" style={{ maxHeight: '60px', objectFit: 'contain', objectPosition: 'left' }} />
                       ) : (
                         <div className="h-4"></div>
                       )}
                       {invoice.sender.name && <h2 className="font-bold text-xl text-slate-900">{invoice.sender.name}</h2>}
                       <p className="whitespace-pre-wrap text-slate-500 text-sm">{invoice.sender.address}</p>
                       <div className="text-slate-500 text-sm space-y-1">
                          {invoice.sender.email && <p>{invoice.sender.email}</p>}
                          {config?.id === 'gst' && invoice.sender.gstin && (
                             <p className="font-semibold text-slate-700">GSTIN: {invoice.sender.gstin}</p>
                          )}
                       </div>
                     </div>
                     <div className="text-right">
                       <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">{invoice.documentTitle || 'INVOICE'}</h1>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-end gap-6">
                           <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Invoice No</span>
                           <span className="font-bold text-slate-700">{invoice.invoiceNo}</span>
                         </div>
                         <div className="flex justify-end gap-6">
                           <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Date</span>
                           <span className="font-bold text-slate-700">{invoice.date}</span>
                         </div>
                         <div className="flex justify-end gap-6">
                           <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Due Date</span>
                           <span className="font-bold text-slate-700">{invoice.dueDate}</span>
                         </div>
                       </div>
                     </div>
                  </div>

                  {/* BILL TO & SPECIFICS */}
                  <div className="flex justify-between items-stretch gap-8 mb-10">
                     <div className="w-1/2 bg-slate-50 rounded-xl p-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Bill To</span>
                        {invoice.receiver.name ? (
                           <>
                              <h3 className="font-bold text-lg text-slate-900 mb-1">{invoice.receiver.name}</h3>
                              <p className="whitespace-pre-wrap text-slate-500 text-sm leading-relaxed">{invoice.receiver.address}</p>
                              <p className="text-slate-500 text-sm mt-1">{invoice.receiver.email}</p>
                              {config?.id === 'gst' && invoice.receiver.gstin && (
                                <p className="font-semibold text-slate-700 text-sm mt-3 pt-3 border-t border-slate-200">GSTIN: {invoice.receiver.gstin}</p>
                              )}
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
                      <thead>
                        <tr>
                          <th className="text-left pb-4 pl-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2">Description</th>
                          {config?.id === 'gst' && <th className="text-center pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">HSN</th>}
                          <th className="text-center pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty</th>
                          <th className="text-right pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</th>
                          <th className="text-right pb-4 pr-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item, idx) => (
                          <tr key={item.id} className="border-b border-slate-50 last:border-0">
                            <td className="py-4 pl-4 text-sm font-bold text-slate-700">
                               {item.name || `Item ${idx+1}`}
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
                       
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-sm text-emerald-600 mb-3 px-4">
                             <span>Discount</span>
                             <span className="font-medium">-{formatCurrency(discountAmount)}</span>
                          </div>
                        )}

                        {config?.id === 'gst' && invoice.enableTax && taxRateVal > 0 ? (
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
                             <span>Tax ({taxRateVal}%)</span>
                             <span className="font-medium text-slate-700">{formatCurrency(taxAmount)}</span>
                          </div>
                        )}

                        {shippingVal > 0 && (
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
                 <div className="bg-indigo-600 p-1.5 rounded text-white"><Zap size={16} fill="currentColor"/></div>
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
          }
          
          /* Ensure logo scales properly in print */
          img[alt="Logo"] {
            max-height: 60px !important;
            width: auto !important;
            object-fit: contain !important;
            object-position: left !important;
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
      `}</style>
    </div>
  );
}
