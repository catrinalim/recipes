import { Pressable, StyleSheet, ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';

type Props = {
  id?: number;          // 👈 will be used for navigation
  title: string;
  image: string;
  match?: number;
};

export function Card({ id = 1, title, image, match }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.pressed, // 👈 feedback
      ]}
      onPress={() => router.push(`/recipes/${id}`)}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Match badge */}
        {match !== undefined && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>
              {match}%
            </ThemedText>
          </View>
        )}

        {/* Title */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            {title}
          </ThemedText>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 180,
    height: 140,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 12,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 4,
  },

  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageRadius: {
    borderRadius: 18,
  },

  textContainer: {
    padding: 12,
  },

  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});