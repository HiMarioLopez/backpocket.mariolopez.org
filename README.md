# Backpocket

This is my own version of the now dead [Pocket](https://getpocket.com/farewell) service. Only I can store things in my backpocket - all can peruse, though. Uses a modified Next.js image gallery that fetches images from Unsplash API.

## Getting started

1. Get an Unsplash API key from [Unsplash Developers](https://unsplash.com/developers)

2. Create a `.env.local` file and add your API key:

```bash
UNSPLASH_ACCESS_KEY=your_access_key_here
```

3. Install dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm run dev
```

## Caching

The app caches Unsplash images for 24 hours to avoid hitting API rate limits. The cache is stored locally in `.unsplash-cache.json`.

### Clearing the Cache

To force fresh images from Unsplash:

```bash
# Option 1: Delete the cache file
rm .unsplash-cache.json

# Option 2: Use the utility function (if you add it to a script)
node -e "require('./utils/unsplashCache').clearUnsplashCache()"
```

The cache will automatically refresh after 24 hours or when you rebuild the app.

---
Made with ❤️ while wearing a pair of pants with pockets 👖
