import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeaturedMovies } from '@/features/featured-movies';
import { MovieDetails } from '@/features/movie-details'; // Make sure to create and import this component
import { Movie } from '@/features/featured-movies';

// Update the RootStackParamList to include all your screens
export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movie: Movie };
  // Add other screens here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FeaturedMovies} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
