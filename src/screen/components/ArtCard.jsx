import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {Paintbucket} from 'iconsax-react-native';

const colors = {
  white: (o = 1) => `rgba(255, 255, 255, ${o})`,
  black: (o = 1) => `rgba(0, 0, 0, ${o})`,
  grey: (o = 1) => `rgba(180, 180, 180, ${o})`,
};

const fontType = {
  'Pjs-SemiBold': 'Poppins-SemiBold',
};

export default function ArtCard({title, artist, image}) {
  return (
    <ImageBackground
      source={{uri: image}}
      style={styles.artCard}
      imageStyle={{borderRadius: 15}}>
      <View style={styles.artInfo}>
        <Text style={styles.artTitle}>{title}</Text>
        <Text style={styles.artArtist}>{artist}</Text>
      </View>
      <Paintbucket color={colors.white()} size={24} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  artCard: {
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
  },
  artInfo: {
    backgroundColor: colors.black(0.6),
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  artTitle: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 16,
  },
  artArtist: {color: colors.grey(0.8), fontSize: 12},
});
