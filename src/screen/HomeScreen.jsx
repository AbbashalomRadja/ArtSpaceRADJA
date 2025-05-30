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
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
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
    setLoading(true);
    try {
      const snapshot = await firestore().collection('artworks').get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArtworks(data);
    } catch (error) {
      console.error('Error fetching artworks from Firestore:', error);
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ArtSpace</Text>
        <Icon name="image" color={colors.accent()} size={28} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Icon name="search" size={20} color={colors.grey(0.7)} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artwork..."
          placeholderTextColor={colors.grey(0.7)}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Artwork List or Loader */}
      {loading ? (
        <ActivityIndicator
          color={colors.accent()}
          size="large"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.artList}>
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art) => (
              <Pressable
                key={art.id}
                style={({ pressed }) => [artCardStyles.card, pressed && { opacity: 0.7 }]}
                onPress={() => navigation.navigate('Detail', { art })}
              >
                <ArtCard title={art.title} artist={art.artist} image={art.image} />
              </Pressable>
            ))
          ) : (
            <Text style={styles.noDataText}>Tidak ada data ditemukan.</Text>
          )}
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Form')}
      >
        <Icon name="plus" size={28} color={colors.white()} />
      </TouchableOpacity>
    </View>
  );
}

function ArtCard({ title, artist, image }) {
  return (
    <View style={artCardStyles.cardInner}>
      <Image source={{ uri: image }} style={artCardStyles.image} />
      <View style={artCardStyles.textContainer}>
        <Text style={artCardStyles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <Text style={artCardStyles.artist} numberOfLines={1} ellipsizeMode="tail">{artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGrey(),
    paddingTop: Platform.OS === 'android' ? 25 : 50,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    justifyContent: 'space-between',
    backgroundColor: colors.black(0.9),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.accent(),
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.black(0.7),
    marginHorizontal: 24,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    paddingVertical: 4,
  },
  artList: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100, // beri ruang bawah untuk tombol floating
  },
  noDataText: {
    color: colors.grey(0.7),
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: colors.accent(),
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent(),
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});

const artCardStyles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 15,
    backgroundColor: colors.black(0.85),
    overflow: 'hidden',
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 6,
  },
  cardInner: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    color: colors.white(),
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  artist: {
    color: colors.grey(),
    fontSize: 14,
    marginTop: 6,
  },
});
