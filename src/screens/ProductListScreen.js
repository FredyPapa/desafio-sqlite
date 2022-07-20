import React, {useEffect} from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../components/ProductItem";
import {loadListProducts} from "../store/product.slice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer:{
    marginVertical:20,
    alignItems:"center",
    justifyContent:"center",
  }
});

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //
  const products = useSelector((state)=>state.product.products);
  //
  useEffect(()=>{
    dispatch(loadListProducts());
  },[]);
  //
  const onSelectProduct =(id)=>{
    navigation.navigate("ProductDetail",{productId:id});
  }
  const renderItem=({item})=>(
    <ProductItem {...item} description="Descripción del producto" onSelect={onSelectProduct} />
  )

  const ListEmptyComponent=()=>(
    <View style={styles.emptyContainer}>
      <Text>No hay productos registrados</Text>
    </View>
  )

  return (
    <FlatList
      style={styles.container}
      data={products}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default ProductListScreen;
