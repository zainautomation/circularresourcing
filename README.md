# Circular Resourcing website

Marketing site for [Circular Resourcing](https://circularresourcing.com), specialist recruitment for the energy transition (Solar, BESS, Wind).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lenis smooth scrolling.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

> Don't run `npm run build` while `npm run dev` is running. Both write to `.next/` and will corrupt each other.

## Structure

| Path | What's there |
|---|---|
| `lib/data.ts` | All copy: services, disciplines, jobs, insights, FAQs, testimonials, contact details |
| `lib/images.ts` | Which photo is used on which page/section |
| `app/` | Pages: home, about, services, jobs (+ detail), employers, job-seekers, contact, insights (+ articles), privacy |
| `components/` | UI and interactive pieces (hero video, sector panels, discipline list, cost calculator, job board, role matcher, multi-step forms) |
| `app/api/submit/route.ts` | One endpoint for every form; validates, then logs |
| `public/media/` | Hero video (1080p + mobile) and photography |

## Before launch

1. **Forms:** connect `app/api/submit/route.ts` to email (e.g. Resend) or an ATS/CRM. Right now submissions are only logged.
2. **Jobs:** the 12 roles in `lib/data.ts` are examples. Replace them with a live feed or CMS.
3. **Testimonials:** placeholders. Replace them with real, approved quotes.
4. **Insights articles:** draft copy. Review before publishing.
5. **Privacy notice:** summary only. Review it against the full GDPR notice.

## Image credits

- Hero video and the solar, engineer and team photos come from circularresourcing.com.
- All other photos are from [Pexels](https://www.pexels.com) under the Pexels licence (free for commercial use, no attribution required).
