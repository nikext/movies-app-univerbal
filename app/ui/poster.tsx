import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  style?: [];
};

export function Poster({ movie, onPress, style }: PosterProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${movie.id}/300/450` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.year}>{movie.releaseYear}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#f1c40f" />
          <Text style={styles.rating}>{movie.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#34495e',
  },
  year: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#f1c40f',
    fontWeight: 'bold',
  },
});
