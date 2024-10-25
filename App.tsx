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

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip().optional(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4).optional(),
});

const result = envSchema.safeParse(process.env);
if (result.success) {
  console.info('[app]: ENV', result.data);
} else {
  console.warn('[app]: ENV validation failed', result.error.flatten());
}

// Use default values if environment variables are not set or invalid
const serverIP = result.success
  ? result.data.EXPO_PUBLIC_SERVER_IP
  : '127.0.0.1';
const serverPort = result.success
  ? result.data.EXPO_PUBLIC_SERVER_PORT
  : '3003';

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
