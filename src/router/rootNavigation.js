import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../components/Home";
import { restoreToken } from "../actions/appActions";
import Login from "../components/Login";
import DrawerNavigation from "./drawerNavigation";
import Registration from "../components/Registration";
import { enableScreens } from "react-native-screens";
import { Snackbar } from "react-native-paper";

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
            <Stack.Screen component={Registration} name="DevoteeRegistration" />
          </>
        ) : (
          <Stack.Screen component={Login} name="Login"></Stack.Screen>
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
