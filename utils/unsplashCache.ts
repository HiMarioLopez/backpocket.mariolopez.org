import fs from "fs";
import path from "path";
import { fetchUnsplashImages, UnsplashImage } from "./unsplash";
import type { ImageProps } from "./types";

const CACHE_FILE = path.join(process.cwd(), ".unsplash-cache.json");
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheData {
  images: UnsplashImage[];
  timestamp: number;
  processedImages: ImageProps[];
}

export async function getCachedUnsplashImages(
  count: number = 20
): Promise<ImageProps[]> {
  try {
    // Check if cache file exists and is recent
    if (fs.existsSync(CACHE_FILE)) {
      const cacheContent = fs.readFileSync(CACHE_FILE, "utf-8");
      const cache: CacheData = JSON.parse(cacheContent);

      // Check if cache is still valid
      const now = Date.now();
      if (
        now - cache.timestamp < CACHE_DURATION &&
        cache.processedImages.length >= count
      ) {
        console.log("Using cached Unsplash images");
        return cache.processedImages.slice(0, count);
      }
    }
  } catch (error) {
    console.log("Cache read error:", error);
  }

  // Fetch new images
  console.log("Fetching fresh images from Unsplash");
  const images = await fetchUnsplashImages(count);

  // Process images into ImageProps format
  const processedImages: ImageProps[] = images.map((image, index) => ({
    id: index,
    height: image.height,
    width: image.width,
    unsplash_id: image.id,
    urls: image.urls,
  }));

  // Save to cache
  try {
    const cacheData: CacheData = {
      images,
      timestamp: Date.now(),
      processedImages,
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log("Cached new Unsplash images");
  } catch (error) {
    console.log("Cache write error:", error);
  }

  return processedImages;
}

export function clearUnsplashCache(): void {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
      console.log("Unsplash cache cleared");
    }
  } catch (error) {
    console.log("Error clearing cache:", error);
  }
}
