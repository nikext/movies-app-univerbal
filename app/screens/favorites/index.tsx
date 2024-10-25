import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieScreen from '@/screens/movie';
import TvSeriesScreen from '@/screens/tv-series';

const FavoritesStack = createNativeStackNavigator();

const initialRouteName = 'favorites-root';

export default function FavoritesScreen(): ReactNode {
  return (
    <FavoritesStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <FavoritesStack.Screen
        name={initialRouteName}
        component={FavoritesHomeScreen}
      />
      <FavoritesStack.Screen name="favorites-movies" component={MovieScreen} />
      <FavoritesStack.Screen
        name="favorites-tv-series"
        component={TvSeriesScreen}
      />
    </FavoritesStack.Navigator>
  );
}

function FavoritesHomeScreen(): ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {/* Add your favorites list or navigation buttons here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
