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
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />

      <Tab.Navigator
        initialRouteName={appRouteNames.root}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'tab-home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'tab-top-rated') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'tab-favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else {
              iconName = 'help-outline'; // Default icon
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="tab-home"
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="tab-top-rated"
          component={TopRatedScreen}
          options={{ tabBarLabel: 'Top Rated' }}
        />
        <Tab.Screen
          name="tab-favorites"
          component={FavoritesScreen}
          options={{ tabBarLabel: 'Favorites' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
