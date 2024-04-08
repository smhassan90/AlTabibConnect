import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import config from "../tamagui.config";
import { Provider } from "react-redux";
import store from "~/app/context/store";
import { tokenCache } from "./getToken";

export default function RootLayout() {
  const [TOKEN, setTOKEN] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  tokenCache.getToken("token").then((token) => {
    if (token) {
      setTOKEN(token);
      setLoggedIn(true);
    }
  });

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Arial: require("../assets/fonts/Arial-Regular.ttf"),
    ArialB: require("../assets/fonts/Arial-Bold.ttf"),
    ArialL: require("../assets/fonts/Arial-Light.ttf"),
    ArialXB: require("../assets/fonts/Arial-XBold.ttf"),
  });

  const InitialLayout = () => {
    useEffect(() => {
      if (loggedIn) {
        //console.log("Authenticated! Going to Home Page");
        return router.replace("/(auth)/(tabs)/(home)");
      } else {
        console.log("Going to Login");
        return router.replace("/Login");
      }
    }, [TOKEN, loggedIn]);
    return <Slot />;
  };

  if (!loaded) return null;
  else {
    return (
      <Provider store={store}>
        <TamaguiProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <InitialLayout />
          </GestureHandlerRootView>
        </TamaguiProvider>
      </Provider>
    );
  }
}
