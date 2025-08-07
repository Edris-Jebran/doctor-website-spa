# Deployment Guide

This guide will walk you through deploying the doctor's website to GitHub Pages.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Git**: Install Git on your computer
3. **Node.js**: Version 16 or higher

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository: `doctor-website-spa`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push Code to GitHub

In your terminal, navigate to the project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: Doctor website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/doctor-website-spa.git

# Push to GitHub
git push -u origin main
```

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

## Step 4: Set Up Formspree (Optional)

If you want the contact form to work:

1. Go to [Formspree.io](https://formspree.io) and create an account
2. Create a new form
3. Copy the form endpoint URL
4. Create a `.env` file in your project root:
   ```
   REACT_APP_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
5. Commit and push the changes

## Step 5: Customize Content

Before deploying, update the content in `src/data/siteContent.json`:

1. **Doctor's Name**: Replace `[Name]` with the actual doctor's name
2. **Contact Information**: Update phone and email
3. **Address**: Verify the clinic address
4. **Map Coordinates**: Get exact coordinates from Google Maps
5. **Services**: Update the list of medical services offered

## Step 6: Add Doctor's Photo

1. Place the doctor's photo in `public/images/`
2. Name it `doctor-hero.jpg` or update the `imageUrl` in `siteContent.json`
3. Recommended size: 400x400px or larger

## Step 7: Test Locally

Before deploying, test the website locally:

```bash
npm start
```

Visit `http://localhost:3000` to see your website.

## Step 8: Deploy

The GitHub Actions workflow will automatically deploy your site when you push to the main branch.

Your website will be available at:
`https://YOUR_USERNAME.github.io/doctor-website-spa`

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are installed
   ```bash
   npm install
   ```

2. **Form Not Working**: Verify your Formspree endpoint in `.env`

3. **Images Not Loading**: Ensure images are in `public/images/`

4. **GitHub Pages Not Updating**: 
   - Check the Actions tab in your repository
   - Ensure the gh-pages branch was created

### Manual Deployment

If automatic deployment fails:

1. Build the project:
   ```bash
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Next Steps

1. **Custom Domain**: You can add a custom domain in GitHub Pages settings
2. **Analytics**: Add Google Analytics for visitor tracking
3. **SEO**: Optimize meta tags and descriptions
4. **Performance**: Monitor and optimize loading speeds

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all environment variables are set
3. Ensure the repository is public
4. Contact the development team

---

**Your website should now be live!** 🎉
