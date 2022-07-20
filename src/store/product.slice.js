import { createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import Product from "../models/Product";
import {insertProduct, getProducts} from "../db";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct:(state,action)=>{
      const newProduct = new Product(action.payload.id.toString(),action.payload.title,action.payload.image);
      state.products.push(newProduct);
    },
    loadProducts:(state,action)=>{
      state.products=action.payload;
    }
  },
});

export const {addProduct,loadProducts} = productSlice.actions;

export const saveProduct = (title,image)=>{

  let result;

  return async (dispatch)=>{
    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    //
    try{
      await FileSystem.moveAsync({
        from:image,
        to:Path,
      });

      result = await insertProduct(title,Path);
      console.log(result);

    }catch(error){
      throw error;
      console.log(error.message);
    }
    dispatch(addProduct({id:result.insertId, title,image:Path}))
  }
}

export const loadListProducts = () => {
  return async (dispatch) => {
    try {
      const result = await getProducts();
      dispatch(loadProducts(result.rows._array));
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export default productSlice.reducer;
