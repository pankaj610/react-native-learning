/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react'; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import RootNavigation from './router/rootNavigation';
import store from './store';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '376495499824-5t95jnj5vnj4rgplp0fkvn2707q6b7rb.apps.googleusercontent.com',
//   offlineAccess: true,
// });

class AppEntry extends React.Component {
  
  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootNavigation></RootNavigation>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AppEntry;
