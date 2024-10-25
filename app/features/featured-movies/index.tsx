import React, { useEffect, useState } from 'react';
import { Poster } from './Poster';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { getFeaturedMoviesQuery } from '@/infrastructure/repositories/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

type Props = {
  style?: object;
};

export type Movie = {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  posterUrl?: string;
};

// Add this type definition for the navigation prop
// type RootStackParamList = {
//   MovieDetails: { movie: Movie };
//   // Add other screen names and their params here
// };

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function FeaturedMovies({ style }: Props): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      const featuredMovies = await getFeaturedMoviesQuery(
        new AbortController().signal,
      );
      setMovies(featuredMovies);
    };

    fetchFeaturedMovies();
  }, []);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

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
            onPress={() => handleMoviePress(movie)}
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
