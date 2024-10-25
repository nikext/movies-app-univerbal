import React, {
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { findMoviesMatchingQuery } from '../../infrastructure/repositories/movie';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';

// Define your RootStackParamList
type RootStackParamList = {
  DetailScreen: { item: Movie };
  // Add other screens here
};

// Define the Movie type based on the data structure
type Movie = {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  rating: number;
};

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await findMoviesMatchingQuery(
          new AbortController().signal,
          {},
        );
        setMovies(allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    fetchMovies();
  }, []);

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearchTerm(text);
    }, 300),
    [],
  );

  const handleSearch = (text: string) => {
    setInputValue(text);
    debouncedSearch(text);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }, [debouncedSearchTerm, movies]);

  const handleSuggestionPress = (item: Movie) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderSuggestions = () => {
    if (inputValue && filteredMovies.length === 0) {
      return <Text style={searchStyles.noResultsText}>No results found</Text>;
    }
    return filteredMovies.map((movie) => (
      <TouchableOpacity
        key={movie.id}
        style={searchStyles.suggestionEntry}
        onPress={() => handleSuggestionPress(movie)}
      >
        <Text style={{ color: '#34495e', fontSize: 16 }}>{movie.title}</Text>
        <Text style={{ color: '#7f8c8d', fontSize: 14, marginTop: 4 }}>
          {movie.releaseYear} • {movie.director}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={[searchStyles.container, style]}>
      <SafeAreaView>
        <View style={searchStyles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#7f8c8d"
            style={searchStyles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={searchStyles.input}
            placeholder="Search movies..."
            placeholderTextColor="#7f8c8d"
            onChangeText={handleSearch}
            value={inputValue}
          />
          {inputValue !== '' && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              style={searchStyles.clearButton}
            >
              <Icon name="close-circle" size={20} color="#7f8c8d" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {inputValue !== '' && (
        <View style={searchStyles.suggestionsWrapper}>
          <View style={searchStyles.suggestions}>{renderSuggestions()}</View>
        </View>
      )}
    </View>
  );
}

const { height } = Dimensions.get('window');

const searchStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#34495e',
  },
  clearButton: {
    padding: 5,
  },
  suggestionsWrapper: {
    position: 'absolute',
    top: 66, // Adjust this value based on your layout
    left: 16,
    right: 16,
    maxHeight: height - 100, // Adjust this value to control max height
    zIndex: 1001,
  },
  suggestions: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: '100%',
  },
  suggestionEntry: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  noResultsText: {
    padding: 16,
    fontStyle: 'italic',
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
