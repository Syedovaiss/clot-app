import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../../../utils/Constants';
import colors from '../../../../config/colors/Colors';

export type NewArrival = {
  _id: string;
  title: string;
  description: string,
  price: string,
  size:string[],
  availableQuantity: number,
  availableColors: string[],
  categoryId: string,
  image: string
};

type NewArrivalsProps = {
  products: NewArrival[];
  onNewArrivalClicked: (category: NewArrival) => void;
};

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products, onNewArrivalClicked }) => { 
  return (  
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.newArrivalItem}
            onPress={() => onNewArrivalClicked(item)}>
            <FastImage
              style={styles.newArrivalImage}
              source={{ uri: getImageUrl(item.image) }}  
              resizeMode="cover"  
            />
            <Text style={styles.newArrivalTitle}>{item.title}</Text>
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
  newArrivalItem: {
    marginRight: 4,
  },
  newArrivalImage: {
    width: 150,
    height: 220, 
    borderRadius: 12,
    marginBottom: 10, 
    marginHorizontal: 8,
  },
  newArrivalTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.light.textColor, 
    textAlign: 'left', 
    marginHorizontal: 8
  },
  newArrivalPrice: {
    fontSize: 14,
    color: colors.light.textColor,
    textAlign:'left',
    marginHorizontal: 8
  },
});
