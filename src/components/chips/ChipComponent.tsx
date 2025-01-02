import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors/Colors';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, isSelected && styles.selectedChip]}>
      <Text style={[styles.chipText, isSelected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    width: '40%',
    borderRadius: 30,
    margin: 4,
    justifyContent:'center',
    borderColor:colors.light.placeholderColor
  },
  selectedChip: {
    backgroundColor: '#8E6CEF',
  },
  chipText: {
    fontSize: 14,
    color: '#000000'
  },
  selectedText: {
    color: '#fff', 
  },
});

export default Chip;
