# Dr. [Name] Clinic Website

A modern, responsive React Single Page Application (SPA) for Dr. [Name]'s medical clinic in Kabul, Afghanistan.

## Features

- **Modern Design**: Clean, professional layout with warm accent colors
- **Responsive**: Mobile-first design that works on all devices
- **Contact Form**: Integrated form handling with Formspree
- **Interactive Map**: Google Maps integration for clinic location
- **SEO Optimized**: Built for search engine visibility
- **Fast Loading**: Optimized for performance and user experience

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **GitHub Pages** - Free hosting and deployment

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/doctor-website-spa.git
cd doctor-website-spa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

### 1. Update Doctor Information

Edit `src/data/siteContent.json` to update:
- Doctor's name and credentials
- Clinic address and hours
- Contact information
- Services offered

### 2. Add Doctor's Photo

1. Place the doctor's photo in `public/images/`
2. Update the `imageUrl` in `siteContent.json`
3. Recommended size: 400x400px or larger

### 3. Update Map Coordinates

1. Get the exact coordinates of the clinic location
2. Update the `coords` object in `siteContent.json`:
```json
"coords": {
  "lat": YOUR_LATITUDE,
  "lng": YOUR_LONGITUDE
}
```

### 4. Configure Contact Form

1. Create a Formspree account at [formspree.io](https://formspree.io)
2. Create a new form and get the endpoint URL
3. Create a `.env` file in the root directory:
```env
REACT_APP_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### 5. Update Contact Information

Replace placeholder contact information in `siteContent.json`:
- Phone number
- Email address
- Social media links (optional)

## Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click Save

3. **Automatic Deployment**:
   - The GitHub Actions workflow will automatically build and deploy on every push to main
   - Your site will be available at `https://yourusername.github.io/doctor-website-spa`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting provider

## Project Structure

```
doctor-website-spa/
├── public/                 # Static files
│   ├── images/            # Doctor photos and images
│   └── index.html         # Main HTML file
├── src/
│   ├── components/        # React components
│   │   ├── Hero.jsx      # Hero section
│   │   ├── About.jsx     # About section
│   │   ├── Services.jsx  # Services section
│   │   ├── ClinicInfo.jsx # Location and hours
│   │   ├── ContactForm.jsx # Contact form
│   │   └── Footer.jsx    # Footer
│   ├── data/
│   │   └── siteContent.json # Site content and configuration
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── .github/workflows/    # CI/CD configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Customization Guide

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary: `#005E7A` (Dark Blue)
- Accent: `#E08D3C` (Warm Orange)

### Styling
- Uses Tailwind CSS for styling
- Mobile-first responsive design
- Custom components with consistent design language

### Content Management
All content is managed through `src/data/siteContent.json`:
- Easy to update without touching code
- Structured data format
- Supports multiple languages (can be extended)

## Troubleshooting

### Common Issues

1. **Form not working**: Check your Formspree endpoint in `.env`
2. **Images not loading**: Ensure images are in `public/images/`
3. **Build errors**: Check Node.js version (requires 16+)

### Performance Optimization

- Images are optimized for web
- CSS is minified in production
- JavaScript is bundled and optimized

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the GitHub repository issues
3. Contact the development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Dr. [Name]'s medical practice**
