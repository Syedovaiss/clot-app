import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CircularColorProps {
  hexCode: string; // Hex color code
  size: number;    // Size of the circle (diameter)
}

const CircularColor: React.FC<CircularColorProps> = ({ hexCode, size }) => {
  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: hexCode, width: size, height: size },
      ]}
    >
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 9999,  // Makes it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularColor;
