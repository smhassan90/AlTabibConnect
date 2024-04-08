import { FontAwesome, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "~/app/styles";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.yellow,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: "7%",
          paddingTop: 10,
        },
          
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(myApps)"
        options={{
          headerShown: false,
          tabBarLabel: "Appointments",
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="house-medical-circle-exclamation"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(family)"
        options={{
          headerShown: false,
          tabBarLabel: "Family",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="family-restroom" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(followup)"
        options={{
          headerShown: false,
          tabBarLabel: "Follow Up",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="follow-the-signs" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-md" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
