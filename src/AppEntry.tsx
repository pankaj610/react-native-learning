import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import RootNavigation from './router/RootNavigation';

import { QueryClientProvider, QueryClient } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '376495499824-5t95jnj5vnj4rgplp0fkvn2707q6b7rb.apps.googleusercontent.com',
//   offlineAccess: true,
// });
const queryClient = new QueryClient();
const AppEntry = () => {

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<PaperProvider>
					<NavigationContainer>
						<RootNavigation></RootNavigation>
					</NavigationContainer>
				</PaperProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);

}

export default AppEntry;
