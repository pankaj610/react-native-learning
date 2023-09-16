import React from 'react';
import { Button, Text, View, ImageBackground } from 'react-native';
import { useAppStore } from '../../store/appStore';
import IMAGES from '../../constants/Images';
import tw from '../../utils.js/tw';

const Login: React.FC<{}> = () => {
	const { login } = useAppStore();

	return (
		<ImageBackground source={{
			uri: IMAGES.background,
		}} style={tw`w-full h-full`}>
			<View>
				<Text>Google Login</Text>
				<Button color={'green'} title="Google Login" onPress={login} />
			</View>
		</ImageBackground>
	);
};



export default Login;
