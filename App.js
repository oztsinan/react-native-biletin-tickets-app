import React, { useEffect } from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";
import { LogBox } from 'react-native';
import 'expo-dev-menu';
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/redux";



LogBox.ignoreAllLogs()

const App = () => {


  const store = createStore(reducers)


  const [fontsLoaded] = useFonts({
    "Anton-Regular": require('./src/assets/fonts/Anton-Regular.ttf'),
    "TacticSans-Bld": require('./src/assets/fonts/TacticSans-Bld.otf'),
    "Gilroy-ExtraBold": require('./src/assets/fonts/Gilroy-ExtraBold.otf'),
    "Gilroy-Light": require('./src/assets/fonts/Gilroy-Light.otf'),
    "Teko-Bold": require('./src/assets/fonts/Teko-Bold.ttf'),
    "Teko-Light": require('./src/assets/fonts/Teko-Light.ttf'),
    "Teko-Medium": require('./src/assets/fonts/Teko-Medium.ttf'),
    "Teko-Regular": require('./src/assets/fonts/Teko-Regular.ttf'),
    "Teko-SemiBold": require('./src/assets/fonts/Teko-SemiBold.ttf'),
    "Roboto-Black": require('./src/assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./src/assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Italic": require('./src/assets/fonts/Roboto-Italic.ttf'),
    "Roboto-Light": require('./src/assets/fonts/Roboto-Light.ttf'),
    "Roboto-Medium": require('./src/assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regular": require('./src/assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Thin": require('./src/assets/fonts/Roboto-Thin.ttf'),
    "MonumentExtended-Regular": require('./src/assets/fonts/MonumentExtended-Regular_0.otf'),
    "MonumentExtended-Ultrabold": require('./src/assets/fonts/MonumentExtended-Ultrabold_0.otf'),
    "Cinematografica-Bold": require('./src/assets/fonts/Cinematografica-Bold-trial.ttf'),
    "Cinematografica-Light": require('./src/assets/fonts/Cinematografica-Light-trial.ttf'),
    "Cinematografica-Regular": require('./src/assets/fonts/Cinematografica-Regular-trial.ttf'),

  })





  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App;