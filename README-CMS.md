# Winners Chapel Wisconsin CMS integration

This frontend keeps editable static page content in `src/content/*.json` files. The Winners NestJS backend updates those files through the GitHub Contents API after an authenticated admin submits a form.

## Runtime

- Public site: Next.js
- Admin: separate Next.js app
- API: NestJS
- MongoDB: dynamic records (admins, sermons, announcements, contact messages)
- Cloudinary: uploaded images
- GitHub: source of truth for static page JSON
- Vercel: deploys the frontend automatically when the GitHub repository changes

The public site keeps styling/components in React/Tailwind. JSON contains content only.
