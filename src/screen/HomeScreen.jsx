import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Warna dan font yang digunakan
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

// Data artwork statis
const artworks = [
  {
    id: 1,
    title: 'Sunset in Bali',
    artist: 'Agung Rai',
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: 'Wayang Kulit',
    artist: 'Slamet Raharjo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Dalang_cilik_di_Pasar_Malam_Semawis%2C_Semarang.jpg/800px-Dalang_cilik_di_Pasar_Malam_Semawis%2C_Semarang.jpg',
  },
  {
    id: 3,
    title: 'Batik Abstract',
    artist: 'Yuniarti',
    image:
      'https://produkumkm.jemberkab.go.id/assets-new/uploads/produk/1688355752-batik-lukis-abstrak-kontemporer-bg7-1.jpg',
  },
  {
    id: 4,
    title: 'Sculpture of Dewata',
    artist: 'Nyoman Nuarta',
    image:
      'https://assets.wikiwand.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Devata_and_Apsaras_Prambanan_01.jpg/1100px-Devata_and_Apsaras_Prambanan_01.jpg&w=828&q=70',
  },
];

export default function HomeScreen({navigation}) {
  const [searchText, setSearchText] = useState('');

  const filteredArtworks = artworks.filter(art =>
    art.title.toLowerCase().includes(searchText.toLowerCase()),
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
        onPress={() => navigation.navigate('Form')}>
        <Text style={styles.addButtonText}>+ Tambah Data</Text>
      </Pressable>

      <ScrollView style={styles.artList}>
        {filteredArtworks.map(art => (
          <Pressable
            key={art.id}
            onPress={() => navigation.navigate('Detail', {art})}>
            <ArtCard title={art.title} artist={art.artist} image={art.image} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function ArtCard({title, artist, image}) {
  return (
    <View style={artCardStyles.card}>
      <Image source={{uri: image}} style={artCardStyles.image} />
      <View style={artCardStyles.textContainer}>
        <Text style={artCardStyles.title}>{title}</Text>
        <Text style={artCardStyles.artist}>{artist}</Text>
      </View>
    </View>
  );
}

// Style utama
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.darkGrey()},
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
  input: {flex: 1, paddingHorizontal: 16, height: 40, color: colors.white()},
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
  artList: {paddingHorizontal: 24, marginTop: 16},
});

// Style ArtCard
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
