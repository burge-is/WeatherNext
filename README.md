## What?
This is a toy app for familiarizing myself with Nextjs.  You provide a USA zip code and the app retrieves the forecast for the given location, if it is a valid US zip.

## Getting Started
This app is using the standard template for Nextjs and uses the default npm scripts:

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

Take note of the required environment variables in the `next.config.js`
```
SERVER_API_URL: process.env.SERVER_API_URL,
OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY
```

## Enjoy!