import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { deleteArtwork } from '../api/artworks'; // 🔗 Tambahkan ini

const colors = {
  white: (o = 1) => `rgba(255, 255, 255, ${o})`,
  black: (o = 1) => `rgba(0, 0, 0, ${o})`,
  red: (o = 1) => `rgba(255, 0, 0, ${o})`,
  orange: (o = 1) => `rgba(255, 165, 0, ${o})`,
};

export default function DetailScreen({ route, navigation }) {
  const { art } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin menghapus karya ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteArtwork(art.id);
              Alert.alert('Sukses', 'Karya berhasil dihapus');
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert('Gagal', 'Terjadi kesalahan saat menghapus');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('Form', { art }); // ➡️ Kirim data ke Form untuk diedit
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: art.image }} style={styles.image} />
      <Text style={styles.title}>{art.title}</Text>
      <Text style={styles.artist}>By {art.artist}</Text>

      <View style={styles.buttonRow}>
        <Pressable onPress={handleEdit} style={[styles.button, { backgroundColor: colors.orange() }]}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable onPress={handleDelete} style={[styles.button, { backgroundColor: colors.red() }]}>
          <Text style={styles.buttonText}>Hapus</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Kembali</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black(),
    alignItems: 'center',
    padding: 16,
  },
  image: { width: '100%', height: 300, borderRadius: 15 },
  title: {
    color: colors.white(),
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  artist: { color: colors.white(0.7), fontSize: 18, marginTop: 8 },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: { color: colors.white(), fontSize: 16 },
  backButton: { marginTop: 24 },
  backText: { color: colors.white(), fontSize: 16 },
});