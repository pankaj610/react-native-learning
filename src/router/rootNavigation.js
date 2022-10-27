import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { restoreToken } from '../actions/appActions';
import Login from '../components/Login';
import DrawerNavigation from './drawerNavigation';
import { enableScreens } from 'react-native-screens';
import { Snackbar } from 'react-native-paper';
import ReactQuery from '../components/react-query/ReactQuery';
import InfiniteQuery from '../components/react-query/InfiniteQuery';
import MutationQuery from '../components/react-query/MutationQuery';

enableScreens();
const Stack = createNativeStackNavigator();

class RootNavigation extends Component {
	render() {
		const { isSignedIn } = this.props;
		return (
			<Stack.Navigator>
				{isSignedIn ? (
					<>
						<Stack.Screen
							component={DrawerNavigation}
							name="DrawerStack"
							options={{ headerShown: false }}
						/>
					</>
				) : (
					<>
						<Stack.Screen component={MutationQuery} name="MutationQuery" />
						<Stack.Screen component={InfiniteQuery} name="InfiniteQuery" />
						<Stack.Screen component={ReactQuery} name="ReactQuery" />
						<Stack.Screen component={Login} name="Login" />
					</>
				)}
			</Stack.Navigator>
		);
	}
}

const mapDispatchToProps = {
	restoreToken,
};

const mapStateToProps = (state) => ({
	token: state.appReducer.token,
	isSignedIn: state.appReducer.isSignedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
