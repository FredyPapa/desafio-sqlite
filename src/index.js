import AppNavigator from "./navigation/index";
import { Provider } from "react-redux";
import { store } from "./store";
import {init} from "./db";

init()
  .then(()=>{
    console.log("DB inicializada");
  })
  .catch((err)=>{
    console.log("Error inicializando la BD ",err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
