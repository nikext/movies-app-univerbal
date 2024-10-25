import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TVSeries } from 'domain/tv-series';

interface TVSeriesCardProps {
  tvSeries: TVSeries;
}

export function TVSeriesCard({ tvSeries }: TVSeriesCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.poster}>
        <Text style={styles.posterText} numberOfLines={3}>
          {tvSeries.title}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {tvSeries.title}
        </Text>
        <Text style={styles.rating}>{tvSeries.rating.toFixed(1)}/100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterText: {
    textAlign: 'center',
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
});
