import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { colors } from '../styles';
import { CustomContent } from '~/app/components/home/CustomContent';

const DrawerLayout = () => (
  <>
    <Drawer
      drawerContent={CustomContent}
      screenOptions={{
        headerShown: false,
        drawerContentStyle: { backgroundColor: 'red' },
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: 'white',
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTintColor: colors.primary,
          headerTitle: 'Home',
          drawerLabel: ' Home',
          drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
    </Drawer>
  </>
);

export default DrawerLayout;
