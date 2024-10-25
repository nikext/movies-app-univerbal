import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsRouteProp;
};

export function MovieDetails({ route }: Props) {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      {movie.posterUrl && (
        <Image source={{ uri: movie.posterUrl }} style={styles.poster} />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.info}>Director: {movie.director}</Text>
        <Text style={styles.info}>Release Year: {movie.releaseYear}</Text>
        <Text style={styles.info}>Genres: {movie.genres.join(', ')}</Text>
        <Text style={styles.info}>Rating: {movie.rating}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
