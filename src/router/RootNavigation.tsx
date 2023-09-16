import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../components/screens/Login';
import DrawerNavigation from './DrawerNavigation';
import { enableScreens } from 'react-native-screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAppStore } from '../store/appStore';
enableScreens();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ROUTES = {
	PUBLIC: {

		LOGIN: {
			name: 'Login',
			component: Login,
		}
	},
	PRIVATE: {
		DRAWER: {
			name: 'DrawerStack',
			component: DrawerNavigation,
		}
	}
}

const RootNavigation = () => {
	const { isLoggedIn } = useAppStore();
	const DRAWER_ROUTE = ROUTES.PRIVATE.DRAWER;
	const PUBLIC_ROUTES = ROUTES.PUBLIC;

	return isLoggedIn ? (
		<Drawer.Navigator>
			<Drawer.Screen component={DRAWER_ROUTE.component} name={DRAWER_ROUTE.name} />
		</Drawer.Navigator>
	) : (
		<Stack.Navigator>
			<Stack.Screen
				component={PUBLIC_ROUTES.LOGIN.component}
				name={PUBLIC_ROUTES.LOGIN.name}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default RootNavigation;
