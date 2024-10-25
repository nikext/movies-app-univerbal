import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { z } from 'zod';

import { appRouteNames } from '@/routes';
import FavoritesScreen from '@/screens/favorites';
import HomeScreen from '@/screens/home';
import TopRatedScreen from '@/screens/top-rated';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />

      <Tab.Navigator
        initialRouteName={appRouteNames.root}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === appRouteNames.root) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === appRouteNames.topRated) {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === appRouteNames.favorites) {
              iconName = focused ? 'heart' : 'heart-outline';
            } else {
              iconName = 'help-outline'; // Default icon
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => {
            if (route.name === appRouteNames.root) return 'Home';
            if (route.name === appRouteNames.topRated) return 'Top Rated';
            if (route.name === appRouteNames.favorites) return 'Favorites';
            return '';
          },
        })}
      >
        <Tab.Screen name={appRouteNames.root} component={HomeScreen} />
        <Tab.Screen name={appRouteNames.topRated} component={TopRatedScreen} />
        <Tab.Screen
          name={appRouteNames.favorites}
          component={FavoritesScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
