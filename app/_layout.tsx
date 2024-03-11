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
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  tokenCache.getToken("token").then((res) => {
    if (res) {
      setToken(res);
      setLoggedIn(true);
    } else {
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
      console.log("No token found");
    }
  });

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Arial: require("../assets/fonts/Arial-Regular.ttf"),
    ArialB: require("../assets/fonts/Arial-Bold.ttf"),
    ArialL: require("../assets/fonts/Arial-Light.ttf"),
  });

  const InitialLayout = () => {
    useEffect(() => {
      if (loggedIn) {
        console.log("Local Token: ", token);
        console.log("Authenticated! Going to Home Page");
        router.replace("/(auth)/(tabs)/(home)");
      } else {
        console.log("Going to Login");
        router.replace("/Login");
      }
    }, [token]);

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
