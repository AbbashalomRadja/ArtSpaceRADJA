import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import notifee from '@notifee/react-native';

export default function FormScreen({ route, navigation }) {
  const art = route.params?.art;
  const isEdit = !!art;

  const [title, setTitle] = useState(art?.title || '');
  const [artist, setArtist] = useState(art?.artist || '');
  const [image, setImage] = useState(art?.image || '');
  const [channelId, setChannelId] = useState(null);

  // Request permission dan buat channel saat pertama load
  useEffect(() => {
    async function prepareNotification() {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const settings = await notifee.requestPermission();
        if (!settings.authorizationStatus) {
          Alert.alert('Izin notifikasi ditolak', 'Aplikasi membutuhkan izin notifikasi');
        }
      }
      // Buat channel sekali saja
      const id = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      setChannelId(id);
    }
    prepareNotification();
  }, []);

  // Fungsi untuk menampilkan notifikasi
  async function displayNotification(message) {
    if (!channelId) return; // pastikan channel sudah dibuat

    await notifee.displayNotification({
      title: 'Notifikasi',
      body: message,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // pastikan ada icon ini di project native
      },
    });
  }

  const handleSubmit = async () => {
    if (!title || !artist || !image) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    try {
      if (isEdit) {
        await firestore().collection('artworks').doc(art.id).update({
          title,
          artist,
          image,
        });
        await displayNotification('Karya berhasil diperbarui!');
      } else {
        await firestore().collection('artworks').add({ title, artist, image });
        await displayNotification('Karya berhasil ditambahkan!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Firestore Error:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Karya</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Nama Seniman</Text>
      <TextInput style={styles.input} value={artist} onChangeText={setArtist} />
      <Text style={styles.label}>URL Gambar</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />
      <Button title={isEdit ? 'Perbarui' : 'Simpan'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  label: { color: 'white', marginBottom: 6, fontWeight: 'bold' },
  input: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    color: 'white',
    marginBottom: 16,
  },
});
