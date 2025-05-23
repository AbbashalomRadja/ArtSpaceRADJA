import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const colors = {
  white: (o = 1) => `rgba(255, 255, 255, ${o})`,
  black: (o = 1) => `rgba(0, 0, 0, ${o})`,
};

export default function DetailScreen({route, navigation}) {
  const {art} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: art.image}} style={styles.image} />
      <Text style={styles.title}>{art.title}</Text>
      <Text style={styles.artist}>By {art.artist}</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black(),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {width: '100%', height: 300, borderRadius: 15},
  title: {
    color: colors.white(),
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  artist: {color: colors.white(0.7), fontSize: 18, marginTop: 8},
  backButton: {marginTop: 20, padding: 10},
  backText: {color: colors.white(), fontSize: 16},
});
