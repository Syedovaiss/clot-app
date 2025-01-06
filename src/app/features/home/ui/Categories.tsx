import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../../../utils/Constants';
import colors from '../../../../config/colors/Colors';

type Category = {
  _id: string;
  title: string;
  image: string; 
};

type CategoriesProps = {
  categories: Category[];
  onCategoryClicked: (category: Category) => void;
};

export const Categories: React.FC<CategoriesProps> = ({ categories, onCategoryClicked }) => { 
  return (  
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onCategoryClicked(item)}>
            <Image
              style={styles.categoryImage}
              source={{ uri: getImageUrl(item.image) }}  
              resizeMode="cover"  
            />
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 4,
  },
  categoryImage: {
    width: 80,
    height: 80, 
    borderRadius: 50,
    marginBottom: 10, 
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.light.textColor, 
    textAlign: 'center', 
  },
});
