import { createAPIUrl } from '@/utils';
import { Movie } from 'domain/movie';

// const apiUrl = createAPIUrl();
const apiUrl = 'http://localhost:3003';

export async function findMoviesMatchingQuery(
  signal: AbortSignal,
  params: Partial<Movie>,
): Promise<Movie[]> {
  const url = new URL('/movies', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url, { signal });
  if (!request.ok) return [];

  const json = (await request.json()) as Movie[];
  return json;
}

export async function getMovieByIdQuery(
  signal: AbortSignal,
  movieId: Movie['id'],
): Promise<Movie | undefined> {
  const url = new URL(`/movies/${movieId}`, apiUrl);

  const request = await fetch(url, { signal });
  if (!request.ok) return;

  return (await request.json()) as Movie;
}

export async function getFeaturedMoviesQuery(
  signal: AbortSignal,
): Promise<Movie[]> {
  try {
    const url = new URL('/movies', apiUrl);
    const request = await fetch(url, { signal });
    if (!request.ok) return [];

    const json = await request.json();
    return json as Movie[];
  } catch (err) {
    console.error('Error fetching featured movies:', err);
    return [];
  }
}

export async function getTopRatedMoviesQuery(): Promise<Movie[]> {
  try {
    const url = new URL('/movies', apiUrl);
    url.searchParams.set('rating_gte', '75');
    const request = await fetch(url);
    if (!request.ok) return [];

    const json = (await request.json()) as Movie[];
    return json;
  } catch (err) {
    console.error('Error fetching top rated movies:', err);
    return [];
  }
}
