# PRD — csinorcal.church

## Phase 1 — Core Member App
- [ ] Home page with church news/announcements
- [ ] Newsletter archive
- [ ] Member directory with family detail pages
- [ ] Calendar of events
- [ ] Contributions page
- [ ] Login / authentication

## Phase 2 — Extended Features
- [x] Photos section — main nav tab showing Google photo albums from JSON config
- [ ] Ingester tool — Playwright-based script to scrape Google Photos albums and generate photos.json
- [ ] Login / authentication
- [ ] Custom news and images on the home page — driven by a config/data file rather than hardcoded mock data
- [ ] Calendar sourced from a JSON config (current year's events), showing only upcoming events — past events silently filtered out
- [ ] "About Us" and similar static pages driven by their own JSON config files — no hardcoded text

## Phase 3 — Member Accounts
- [ ] Login for any member or their children
- [ ] Member directory — visible after login, showing all members/families
- [ ] Full calendar driven by a JSON config file
- [ ] All church organizations/ministries data loaded from JSON config
- [ ] Facebook, Instagram, and X (Twitter) social media integration
- [ ] Finance/contributions tab with live data from church CRM
- [ ] Release preparedness — PWA manifest, icons, deployment pipeline, production build verification
