import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getFeaturedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';

interface TvSeries {
  id: string;
  title: string;
  creator: string;
  firstAirDate: number;
  genres: string[];
  rating: number;
  posterUrl: string;
}

type TvSeriesPosterProps = {
  tvSeries: TvSeries;
  onPress: () => void;
  style?: object;
};

export function FeaturedTvSeries() {
  const [featuredTvSeries, setFeaturedTvSeries] = useState<TvSeries[]>([]);

  useEffect(() => {
    const fetchFeaturedTvSeries = async () => {
      const series = await getFeaturedTvSeriesQuery();
      setFeaturedTvSeries(series);
    };
    fetchFeaturedTvSeries();
  }, []);

  const handlePosterPress = (tvSeries: TvSeries) => {
    // Handle poster press (e.g., navigate to details page)
    console.log('TV Series pressed:', tvSeries.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured TV Series</Text>
      <FlatList<TvSeries>
        horizontal
        data={featuredTvSeries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TvSeriesPoster
            tvSeries={item}
            onPress={() => handlePosterPress(item)}
            style={styles.poster}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function TvSeriesPoster({
  tvSeries,
  onPress,
  style,
}: TvSeriesPosterProps): JSX.Element {
  const ratingColor = getRatingColor(tvSeries.rating);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.posterContainer, style]}>
      <View style={styles.posterContent}>
        <Text style={styles.title} numberOfLines={2}>
          {tvSeries.title}
        </Text>
        <Text style={styles.creator}>{tvSeries.creator}</Text>
        <Text style={styles.year}>{tvSeries.firstAirDate}</Text>
        <View style={styles.genresContainer}>
          {tvSeries.genres.slice(0, 2).map((genre, index) => (
            <Text key={index} style={styles.genre}>
              {genre}
            </Text>
          ))}
        </View>
      </View>
      <View style={[styles.ratingContainer, { backgroundColor: ratingColor }]}>
        <Text style={styles.rating}>{(tvSeries.rating / 10).toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const getRatingColor = (rating: number): string => {
  if (rating >= 70) return '#4CAF50';
  if (rating >= 50) return '#FFC107';
  return '#F44336';
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  poster: {
    marginLeft: 16,
  },
  posterContainer: {
    width: 150,
    height: 225,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#34495e',
    padding: 12,
    justifyContent: 'space-between',
  },
  posterContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  creator: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    fontSize: 10,
    color: '#ecf0f1',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    padding: 6,
  },
  rating: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
