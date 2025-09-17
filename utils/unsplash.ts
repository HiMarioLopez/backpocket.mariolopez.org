const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  width: number;
  height: number;
}

export async function fetchUnsplashImages(
  count: number = 10
): Promise<UnsplashImage[]> {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images from Unsplash");
  }

  const data: UnsplashImage[] = await response.json();
  return data;
}
