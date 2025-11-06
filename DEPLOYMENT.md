# InvestorIQ - Build & Production Notes 🚀

## Build for Production

### Create Production Build

\`\`\`powershell
npm run build
\`\`\`

This will:
1. Type-check all TypeScript files
2. Build optimized bundles
3. Generate static pages where possible
4. Output to `.next/` directory

### Test Production Build Locally

\`\`\`powershell
npm run start
\`\`\`

Visit `http://localhost:3000` to test the production build.

## Important Notes for Production

### ⚠️ Ollama Limitation

**Current setup**: Ollama runs on `localhost:11434`

**Problem**: In production (deployed to Vercel/Netlify), the server won't have access to your local Ollama instance.

**Solutions**:

#### Option 1: Use Cloud AI API (Recommended for Production)
Replace Ollama with a cloud-based API:
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini
- Groq (fast inference)

Update `src/lib/services/ollama.service.ts` to call cloud API instead.

#### Option 2: Deploy Ollama to Cloud
- Deploy Ollama on a dedicated server/VPS
- Update `OLLAMA_API_URL` to point to that server
- Ensure proper authentication and rate limiting

#### Option 3: Hybrid Approach
- Use Ollama for local development
- Use cloud API for production
- Switch based on environment variable

Example:
\`\`\`typescript
const AI_PROVIDER = process.env.AI_PROVIDER || 'ollama';

if (AI_PROVIDER === 'openai') {
  // Use OpenAI API
} else {
  // Use Ollama (local dev)
}
\`\`\`

### Environment Variables for Production

Create `.env.production`:

\`\`\`env
# If using cloud AI
OPENAI_API_KEY=your_openai_key_here
AI_PROVIDER=openai

# Or keep Ollama (if deployed to server)
OLLAMA_API_URL=https://your-ollama-server.com
OLLAMA_MODEL=gpt-oss:120b-cloud
\`\`\`

### Yahoo Finance API

**Good news**: Yahoo Finance works in production! No changes needed.

**Rate limiting**: 
- Free tier has limits
- Consider implementing:
  - Redis cache (instead of in-memory)
  - Database caching
  - Request throttling

### CSS Warnings (Safe to Ignore)

The Tailwind v4 CSS warnings won't affect production:
- Build will succeed
- CSS will work correctly
- No runtime errors

## Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on Vercel
3. Add environment variables
4. Deploy!

**Advantages**:
- Automatic deployments
- Edge network (fast globally)
- Zero config for Next.js
- Free tier available

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Docker (Self-Hosted)

Create `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

Build and run:
\`\`\`bash
docker build -t investoriq .
docker run -p 3000:3000 investoriq
\`\`\`

## Performance Optimization

### Current Optimizations
✅ Image optimization (Next.js Image)
✅ Code splitting (automatic)
✅ CSS purging (Tailwind)
✅ 5-minute caching on stock data

### Additional Recommendations

#### 1. Add Redis Cache
Replace in-memory cache with Redis:

\`\`\`typescript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

async getQuote(symbol: string) {
  const cached = await redis.get(\`quote_\${symbol}\`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from API
  const result = await fetchQuote(symbol);
  
  // Cache for 5 minutes
  await redis.setex(\`quote_\${symbol}\`, 300, JSON.stringify(result));
  
  return result;
}
\`\`\`

#### 2. Add Database
Store historical data and user preferences:
- PostgreSQL (Supabase, Neon)
- MongoDB (Atlas)
- SQLite (local dev)

#### 3. Implement Rate Limiting
Prevent abuse of API endpoints:

\`\`\`typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
\`\`\`

## Security Considerations

### API Routes
- ✅ Already using `force-dynamic` (no static caching)
- Consider adding authentication
- Implement CORS if needed
- Add request validation

### Environment Variables
- Never commit `.env.local` to git
- Use platform-specific secrets management
- Rotate API keys regularly

### User Data
- Current: localStorage only (client-side)
- Production: Consider database for persistence
- Add user authentication if tracking portfolios

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   - Web vitals
   - Page views
   - Performance metrics

2. **Sentry** (Error tracking)
   - Runtime errors
   - API failures
   - User session replay

3. **PostHog** or **Mixpanel** (Product analytics)
   - Feature usage
   - User flows
   - A/B testing

### Implementation

\`\`\`typescript
// Add to layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

## Testing Before Production

### Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm start`)
- [ ] Test all pages work
- [ ] Test dark mode
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Verify API routes work
- [ ] Test with slow network (DevTools throttling)
- [ ] Check lighthouse scores

### Lighthouse Targets

- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

## Cost Estimation (Monthly)

### Free Tier (Current Setup)
- Vercel Hobby: $0
- Yahoo Finance: $0
- Ollama (local): $0
- **Total: $0/month**

### Paid Tier (Recommended for Production)
- Vercel Pro: $20
- OpenAI API (GPT-4): ~$50 (depends on usage)
- Redis Cloud: $10
- Supabase Pro: $25
- **Total: ~$105/month**

### Cost Optimization Tips
- Use GPT-3.5 instead of GPT-4 ($15 vs $50)
- Implement aggressive caching
- Use Groq for faster, cheaper inference
- Set monthly budget limits

## Maintenance

### Regular Tasks

**Weekly**:
- Check error logs
- Review API usage
- Monitor performance

**Monthly**:
- Update dependencies: `npm update`
- Review and optimize cache TTL
- Check for security vulnerabilities: `npm audit`

**Quarterly**:
- Review and optimize database queries
- Analyze user feedback
- Plan new features

## Legal Considerations

### Data Usage

1. **Yahoo Finance**: 
   - Check their Terms of Service
   - Not for commercial redistribution
   - Fine for personal/educational use

2. **Stock Recommendations**:
   - Add disclaimer: "Not financial advice"
   - Include risk warnings
   - Comply with local regulations

### Recommended Disclaimer

Add to footer:

> "InvestorIQ is for informational and educational purposes only. It is not intended as financial advice. Always consult with a qualified financial advisor before making investment decisions."

## Support & Updates

### Stay Updated

- Next.js updates: https://nextjs.org/blog
- Tailwind updates: https://tailwindcss.com/blog
- Security advisories: `npm audit`

### Community

- Next.js Discord: https://discord.gg/nextjs
- GitHub Issues: [Your repo URL]

---

## Quick Deploy Commands

### Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t investoriq .
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key investoriq
\`\`\`

---

**Ready to deploy? Good luck! 🚀**
