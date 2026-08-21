# HomeUpkeep

Personalized home maintenance planning for US, UK, and European homes. Free to use.

## Features

- Market switch: United States, United Kingdom, Europe
- Home profiles saved in the browser
- Monthly and full-year maintenance plans
- Plain-English task cards
- Progress tracking
- Local notifications/reminders
- Maintenance records
- Home health score and tracked costs
- Appliance and warranty library
- Service provider directory
- CSV export (plans, records, warranties, providers)
- ICS calendar reminders
- Print / PDF with portrait layout

## Run locally

Open `public/index.html` in a browser. No server or build step is required.

## Files

- `index.html` - page structure
- `styles.css` - layout, responsive styles, print layout
- `data.js` - task data
- `app.js` - plan generation, records, export, reminders, market logic

## Production notes

This version stores data locally in the browser. Subscriptions are not enabled yet. Production needs accounts, backend sync, email reminders, and payments.
