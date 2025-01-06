import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../../../utils/Constants';
import colors from '../../../../config/colors/Colors';

type TopSelling = {
  _id: string;
  title: string;
  description: string,
  price: string,
  size: string[],
  availableQuantity: number,
  availableColors: string[],
  categoryId: string,
  image: string
};

type TopSellingProps = {
  products: TopSelling[];
  onTopSellingClicked: (topSelling: TopSelling) => void;
};

export const TopSellingView: React.FC<TopSellingProps> = ({ products, onTopSellingClicked }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.topSellingItem}
            onPress={() => onTopSellingClicked(item)}>
            <FastImage
              style={styles.topSellingImage}
              source={{ uri: getImageUrl(item.image) }}
              resizeMode="cover"
            />
            <Text style={styles.topSellingTitle}>{item.title}</Text>
            <Text style={styles.newArrivalPrice}>{item.price}</Text>
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
  topSellingItem: {
    marginRight: 4,
  },
  topSellingImage: {
    width: 150,
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 8
  },
  topSellingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.light.textColor,
    textAlign: 'left',
    marginHorizontal: 8
  },
  newArrivalPrice: {
    fontSize: 14,
    color: colors.light.textColor,
    textAlign: 'left',
    marginHorizontal: 8
  },
});
