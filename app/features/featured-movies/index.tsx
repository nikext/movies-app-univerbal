import React, { useEffect, useState } from 'react';
import { Poster } from './Poster';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { getFeaturedMoviesQuery } from '@/infrastructure/repositories/movie';

type Props = {
  style?: object;
};

type Movie = {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  posterUrl?: string;
};

export function FeaturedMovies({ style }: Props): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      const featuredMovies = await getFeaturedMoviesQuery(
        new AbortController().signal,
      );
      setMovies(featuredMovies);
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Featured Movies</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      >
        {movies.map((movie) => (
          <Poster
            key={movie.id}
            movie={movie}
            onPress={() => {}} // Implement navigation to movie details if needed
            style={styles.poster}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
    color: '#34495e',
  },
  list: {
    paddingLeft: 16,
  },
  poster: {
    marginRight: 16,
    width: width * 0.4,
    height: width * 0.6,
  },
});
