# Paradise & Co. Properties — WordPress Theme

A premium, responsive real estate theme built for **Paradise & Co. Properties**, Calabar — Cross River State, Nigeria. Green, white and gold branding with a conversion-focused layout.

## What's Included

| Feature | Where |
|---|---|
| Hero + "Invest in Calabar's Future" headline | Home page |
| Property cards (size, price, description, View Details, WhatsApp) | Home + Properties pages |
| ₦500,000 initial deposit highlight banner | Home page |
| Why Invest With Us (4 trust pillars) | Home page |
| Testimonials (editable from dashboard) | Home page |
| FAQ accordion with FAQ schema markup | Home page |
| Property search & filtering (keyword, plot size, budget, status) | Properties page |
| Image gallery + lightbox per property | Property details page |
| Contact page: call/WhatsApp, Instagram, form, Google Map | Contact page |
| Sticky navigation, floating WhatsApp button, footer with socials | Every page |
| SEO: meta descriptions, Open Graph, schema.org structured data | Every page |

## Installation

1. Zip the `paradise-properties` folder (or copy it as-is) into `wp-content/themes/` of a WordPress ≥ 6.0 site.
2. In the dashboard go to **Appearance → Themes** and activate **Paradise & Co. Properties**.
3. On first activation the theme automatically creates:
   - The three advertised plots: **230 SQM – ₦1.3M**, **450 SQM – ₦2.5M**, **900 SQM – ₦5M**
   - Three starter testimonials
   - **About Us** and **Contact** pages with their templates assigned
4. Go to **Settings → Permalinks** and click **Save Changes** once (refreshes rewrite rules for the `/properties/` URLs).

## Managing Properties

- **Add / edit / remove plots:** Dashboard → **Properties**. Each property has fields for plot size (SQM), price (₦), location, status (Available/Sold) and key features, plus a Featured Image and a multi-image **Gallery** picker.
- **Testimonials:** Dashboard → **Testimonials** (title = client name, body = quote, plus a "Role / Purchase" field).
- **Contact details, hero text, WhatsApp number, Instagram, map:** **Appearance → Customize → Paradise Settings**.
- **Menus:** Appearance → Menus (locations: Primary, Footer). Without a menu the theme automatically shows Home / About Us / Properties / Contact.

## Notes

- Properties without a Featured Image automatically use one of the bundled estate illustrations — replace them with real photos for best results.
- The contact form emails the site admin address (Settings → General) via `wp_mail()`. For reliable delivery on shared hosting, add any SMTP plugin.
- No payment gateway is included by design — all purchase conversations happen via WhatsApp/phone.
- Default contact details: **0814 526 2599**, Instagram **@paradise_properties_ng** (changeable in the Customizer).
