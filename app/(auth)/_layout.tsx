import { MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { colors } from "../styles";
import { CustomContent } from "~/app/components/home/CustomContent";

const DrawerLayout = () => (
  <>
    <Drawer
      drawerContent={CustomContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.primary,
        },
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: {height:0},
          headerTintColor: colors.primary,
          headerTitle: "Home",
          drawerLabel: "Get Appointment",
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  </>
);

export default DrawerLayout;
