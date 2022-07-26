import React,{useState} from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from "react-native";
import colors from "../utils/colors";
import {useDispatch} from "react-redux";
import { saveProduct } from "../store/product.slice";
import ImageSelector from "../components/imageSelector";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin:20,
  },
  title: {
    fontSize:18,
    marginBottom:20
  },
  input: {
    borderBottomColor:colors.primary,
    borderBottomWidth:1,
    marginBottom:20,
    padding: 5,
  }
});

const NewProductSreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title,setTitle] = useState("");
  const [image,setImage] = useState("");

  const onHandleTitleChange=(text)=>setTitle(text);

  const onHandleSubmit=()=>{
    dispatch(saveProduct(title,image));
    navigation.navigate("Product");
  }

  const onHandleImageSelect = (imageUrl)=>setImage(imageUrl);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Título</Text>
        <TextInput style={styles.input} placeholder="Nuevo producto" onChangeText={onHandleTitleChange} value={title} />
        <ImageSelector onImage={onHandleImageSelect}/>
        <Button
          title="Grabar Producto"
          color={colors.primary}
          onPress={onHandleSubmit}
          />
      </View>
    </ScrollView>
  );
};

export default NewProductSreen;
