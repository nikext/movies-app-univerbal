import { createAPIUrl } from '@/utils';

// const apiUrl = createAPIUrl();
const apiUrl = 'http://localhost:3003';

// Define an interface that matches the structure used in other files
export interface TVSeries {
  id: string;
  title: string;
  creator: string;
  firstAirDate: number;
  genres: string[];
  rating: number;
  posterUrl: string;
}

export async function findTvSeriesMatchingQuery(
  params: Record<string, string | number>,
): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTvSeriesByIdQuery(
  id: string,
): Promise<TVSeries | undefined> {
  const url = new URL(`/tv-series/${id}`, apiUrl);

  const request = await fetch(url);
  if (!request.ok) return undefined;

  return await request.json();
}

export async function getFeaturedTvSeriesQuery(): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);
  console.log(url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const request = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!request.ok) throw new Error('Network response was not ok');

    const allSeries: TVSeries[] = await request.json();

    // Shuffle the array and return the first 15 items
    return shuffleArray(allSeries).slice(0, 15);
  } catch (error) {
    console.error('Error fetching featured TV series:', error);
    return [];
  }
}

export async function getTopRatedTvSeriesQuery(): Promise<TVSeries[]> {
  // TODO: implement on backend side
  const url = new URL('/tv-series', apiUrl);
  const request = await fetch(url);
  if (!request.ok) return [];

  const json: TVSeries[] = await request.json();

  // top rated has to have a rating above 75%
  return json.filter((it) => it.rating > 75);
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
