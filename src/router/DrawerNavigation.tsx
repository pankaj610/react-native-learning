import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import BottomNavigation from './BottomTab';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
	const navigation = useNavigation();

	const signOut = () => {

		// await GoogleSignin.signOut();
		signOut();
	}

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerType: 'slide',
			}}
			drawerContent={(props) => {
				return (
					<DrawerContentScrollView {...props}>
						<DrawerItemList {...props} />
						<DrawerItem label="Logout" onPress={() => signOut()} />
					</DrawerContentScrollView>
				);
			}}>
			<Drawer.Screen
				component={BottomNavigation}
				name="ISKCON Calling Management"
				options={() => ({
					headerRight: (props) => (
						<IonIcons
							name="add-outline"
							size={30}
							style={{ marginRight: 12 }}
							onPress={() =>
								navigation.navigate({ key: 'DevoteeRegistration' })
							}
						/>
					),
					// header: ({ navigation, route, options }) => {
					//   const title = getHeaderTitle(options, route.name);

					//   return (
					//     <MyHeader
					//       title={title}
					//       style={options.headerStyle}
					//       navigation={navigation}
					//     />
					//   );
					// },
					swipeEnabled: true,
				})}
			/>
		</Drawer.Navigator>
	);

}


export default DrawerNavigation;
