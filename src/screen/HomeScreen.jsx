import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getArtworks } from '../api/artworks';
import { useIsFocused } from '@react-navigation/native';

const colors = {
  black: (o = 1) => `rgba(0, 0, 0, ${o})`,
  white: (o = 1) => `rgba(255, 255, 255, ${o})`,
  grey: (o = 1) => `rgba(180, 180, 180, ${o})`,
  darkGrey: (o = 1) => `rgba(30, 30, 30, ${o})`,
  accent: (o = 1) => `rgba(255, 165, 0, ${o})`,
};

const fontType = {
  'Pjs-ExtraBold': 'Poppins-ExtraBold',
  'Pjs-SemiBold': 'Poppins-SemiBold',
};

export default function HomeScreen({ navigation }) {
  const [artworks, setArtworks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const data = await getArtworks();
      setArtworks(data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchArtworks();
    }
  }, [isFocused]);

  const filteredArtworks = artworks.filter((art) =>
    art.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ArtSpace</Text>
        <Icon name="image" color={colors.black()} size={24} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Artwork"
          placeholderTextColor={colors.grey(0.6)}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Pressable style={styles.searchButton}>
          <Icon name="search" size={20} color={colors.white()} />
        </Pressable>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.addButtonText}>+ Tambah Data</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator
          color={colors.accent()}
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={styles.artList}>
          {filteredArtworks.map((art) => (
            <Pressable
              key={art.id}
              onPress={() => navigation.navigate('Detail', { art })}
            >
              <ArtCard title={art.title} artist={art.artist} image={art.image} />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function ArtCard({ title, artist, image }) {
  return (
    <View style={artCardStyles.card}>
      <Image source={{ uri: image }} style={artCardStyles.image} />
      <View style={artCardStyles.textContainer}>
        <Text style={artCardStyles.title}>{title}</Text>
        <Text style={artCardStyles.artist}>{artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkGrey() },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  searchContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: colors.grey(0.2),
    borderRadius: 10,
    marginTop: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    height: 40,
    color: colors.white(),
  },
  searchButton: {
    backgroundColor: colors.accent(),
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  addButton: {
    backgroundColor: colors.accent(),
    padding: 12,
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 16,
  },
  artList: { paddingHorizontal: 24, marginTop: 16 },
});

const artCardStyles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: colors.black(0.8),
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  artist: {
    color: colors.grey(),
    fontSize: 14,
    marginTop: 4,
  },
});