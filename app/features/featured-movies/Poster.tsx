import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Movie = {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  rating: number;
};

type PosterProps = {
  movie: Movie;
  onPress: () => void;
  style?: object;
};

export function Poster({ movie, onPress, style }: PosterProps): JSX.Element {
  const ratingColor = getRatingColor(movie.rating);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.posterContent}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.director}>{movie.director}</Text>
        <Text style={styles.year}>{movie.releaseYear}</Text>
        <View style={styles.genresContainer}>
          {movie.genres.slice(0, 2).map((genre, index) => (
            <Text key={index} style={styles.genre}>
              {genre}
            </Text>
          ))}
        </View>
      </View>
      <View style={[styles.ratingContainer, { backgroundColor: ratingColor }]}>
        <Text style={styles.rating}>{(movie.rating / 10).toFixed(1)}</Text>
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
  director: {
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
