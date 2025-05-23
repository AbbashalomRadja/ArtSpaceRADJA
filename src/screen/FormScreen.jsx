import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function FormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    console.log({ title, artist, image });
    // Di sini nanti bisa ditambah logic simpan ke state global atau backend
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Karya</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Nama Seniman</Text>
      <TextInput style={styles.input} value={artist} onChangeText={setArtist} />

      <Text style={styles.label}>URL Gambar</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />

      <Button title="Simpan" onPress={handleSubmit} />
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
