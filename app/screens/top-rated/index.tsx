import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { topRatedMovies$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { Movie } from 'domain/movie';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';
import { MovieCard } from '@/ui/movie-card';
import { TVSeriesCard } from '@/ui/tv-series-card';

export default function TopRatedScreen() {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);

  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      setTvSeries(res.filter((series) => series.rating >= 75));
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') {
    return <Loader />;
  }

  if (topRatedMoviesLoadable.state === 'hasError') {
    return (
      <Text style={styles.errorText}>
        {JSON.stringify(topRatedMoviesLoadable.error)}
      </Text>
    );
  }

  if (topRatedMoviesLoadable.state === 'hasData') {
    const filteredMovies = topRatedMoviesLoadable.data.filter(
      (movie: Movie) => movie.rating >= 75,
    );
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Top Rated Movies</Text>
              <FlatList
                data={filteredMovies}
                renderItem={({ item }: { item: Movie }) => (
                  <MovieCard movie={item} />
                )}
                keyExtractor={(item: Movie) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.list}
              />
              <Text style={styles.title}>Top Rated TV Series</Text>
            </>
          }
          data={tvSeries}
          renderItem={({ item }: { item: TVSeries }) => (
            <TVSeriesCard tvSeries={item} />
          )}
          keyExtractor={(item: TVSeries) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
  },
  list: {
    marginBottom: 24,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
