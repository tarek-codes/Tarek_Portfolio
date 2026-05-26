# Deployment Guide

Complete guide to deploy your portfolio to Vercel and other platforms.

## Quick Deploy to Vercel (Recommended)

### Method 1: One-Click Deploy

1. Click the "Deploy with Vercel" button in the README
2. Sign in to Vercel with GitHub
3. Import the repository
4. Add environment variables:
   - `OPENROUTER_API_KEY` - Required for AI chatbot
   - `GITHUB_TOKEN` - Optional for higher GitHub API rate limits
5. Click Deploy
6. Wait 2-3 minutes for build completion
7. Your portfolio is live! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
bun add -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts to link project
# Add environment variables when prompted
```

### Method 3: GitHub Integration (Auto-Deploy)

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables:

   ```plain
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   GITHUB_TOKEN=your_github_token_here (optional)
   ```

6. Click Deploy
7. Every push to main branch auto-deploys! 🚀

## Environment Variables Setup

### Required Variables

#### OPENROUTER_API_KEY

- **Purpose**: Powers the AI chatbot with Claude 3.5 Sonnet
- **How to get**:
  1. Visit [openrouter.ai](https://openrouter.ai)
  2. Sign up for free account
  3. Go to API Keys section
  4. Create new key
  5. Copy and save it securely
- **Cost**: Pay-as-you-go ($0.003 per request average)

### Optional Variables

#### GITHUB_TOKEN

- **Purpose**: Increases GitHub API rate limits from 60 to 5,000 requests/hour
- **How to get**:
  1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
  2. Click "Generate new token (classic)"
  3. Give it a name (e.g., "Portfolio GitHub Token")
  4. Select scopes: `public_repo` (read-only)
  5. Generate and copy the token
 - **Benefit**: Prevents rate limiting for GitHub/LeetCode data fetching

## Post-Deployment Configuration

### 1. Test All Features

After deployment, verify:

- ✅ Homepage loads correctly
- ✅ Dark/Light theme toggle works
- ✅ All navigation links work
- ✅ AI Chatbot responds (test with "Tell me about Sharif")
 - ✅ LeetCode stats load correctly
- ✅ Contact form submits successfully
- ✅ Projects section displays correctly
- ✅ Mobile responsive design works

### 2. Custom Domain Setup (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning (automatic)
6. Update `metadataBase` in `app/layout.tsx`:

   ```typescript
   metadataBase: new URL('https://yourname.com'),
   ```

### 3. Analytics Setup (Optional)

#### Vercel Analytics

```bash
bun add @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// In return statement
<body>
  {children}
  <Analytics />
</body>
```

#### Vercel Speed Insights

```bash
bun add @vercel/speed-insights
```

Add to `app/layout.tsx`:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

// In return statement
<body>
  {children}
  <SpeedInsights />
</body>
```

### 4. Environment Management

Update environment variables in Vercel:

1. Go to project Settings > Environment Variables
2. Add/Edit variables for Production, Preview, Development
3. Redeploy to apply changes

## Alternative Deployment Platforms

### Netlify

1. Install Netlify CLI:

   ```bash
   bun add -g netlify-cli
   ```

2. Build the project:

   ```bash
   bun run build
   ```

3. Deploy:

   ```bash
   netlify deploy --prod
   ```

4. Add environment variables in Netlify dashboard

### Self-Hosted (VPS/Cloud)

Requirements:

- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

```bash
# Clone repository
git clone https://github.com/SharifdotG/portfolio-dotg.git
cd portfolio-dotg

# Install dependencies
bun install

# Create .env.local
echo "OPENROUTER_API_KEY=your_key_here" > .env.local

# Build for production
bun run build

# Install PM2
bun add -g pm2

# Start with PM2
pm2 start bun --name "portfolio" -- run start

# Save PM2 config
pm2 save
pm2 startup

# Configure Nginx reverse proxy to port 3000
```

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors during build

**Solution**:

```bash
# Run type checking locally
bun run build

# Fix reported errors
# Ensure all imports are correct
```

### Chatbot Not Responding

**Issue**: AI chatbot returns errors or doesn't load

**Solution**:

1. Verify `OPENROUTER_API_KEY` is set correctly in Vercel
2. Check OpenRouter account has credits
3. View Vercel function logs for errors
4. Test API route directly: `https://yoursite.vercel.app/api/chat`

### LeetCode Data Not Loading

**Issue**: LeetCode stats do not appear or show fallback values

**Solution**:

1. Verify `leetcodeHandle` in `lib/constants.ts` is correct
2. Check browser console for network/CORS errors
3. LeetCode API may be rate-limited; wait and retry or add caching/proxy

### Environment Variables Not Working

**Issue**: Variables not accessible in production

**Solution**:

1. Ensure variables are added in Vercel dashboard
2. Redeploy project after adding variables
3. Check variable names match exactly (case-sensitive)
4. For client-side variables, prefix with `NEXT_PUBLIC_`

## Performance Optimization

### Image Optimization

Ensure all images in `/public/projects/` are:

- Optimized (use Next.js Image component)
- Compressed (use tools like ImageOptim, TinyPNG)
- Properly sized (max 1920px width)

### Bundle Size

Check bundle size:

```bash
bun run build
```

Review output for large chunks and consider:

- Dynamic imports for heavy components
- Tree-shaking unused code
- Removing unused dependencies

### Caching Strategy

Vercel automatically handles:

- Static asset caching (1 year)
- Serverless function caching
- Edge caching for static pages

## Monitoring & Maintenance

### Regular Updates

```bash
# Check outdated packages
bun outdated

# Update dependencies
bun update

# Test after updates
bun run build
bun run dev
```

### Backup Strategy

1. Keep GitHub repository updated
2. Export Vercel environment variables regularly
3. Document custom domain configurations
4. Save deployment settings

## Support

If you encounter issues:

1. Check [Next.js Documentation](https://nextjs.org/docs)
2. Review [Vercel Documentation](https://vercel.com/docs)
3. Search [GitHub Issues](https://github.com/SharifdotG/portfolio-dotg/issues)
4. Contact: <sharifmdyousuf007@gmail.com>

## Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] All features tested in preview deployment
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup (optional)
- [ ] Social media meta tags working
- [ ] Mobile responsive design verified
- [ ] Contact form tested
- [ ] AI chatbot responding correctly
 - [ ] LeetCode data loading
- [ ] Theme toggle working
- [ ] All links and navigation working

## Success! 🎉

Your portfolio is now live and ready to showcase your work to the world!

Update regularly with new projects and achievements to keep it fresh.
