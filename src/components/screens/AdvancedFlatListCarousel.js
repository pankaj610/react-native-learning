import React, { useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { screenHeight, screenWidth } from '../../constants';

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF', '#DDBEFE'];

const DATA = [
	{
		key: '324t412345',
		title: 'It is too hot',
		description: 'Please feed me something, i am hungry.',
		image: 'https://res.cloudinary.com/dm1o3cvik/image/upload/v1680197554/stomach_4_ldsxgg.png',
	},
	{
		key: '32453245324',
		title: 'I have Gift',
		description: 'Please feed me something, i am hungry.',
		image: 'https://res.cloudinary.com/dm1o3cvik/image/upload/v1680197498/stomach_sdcadv.png',
	},
	{
		key: '23453er4324r',
		title: 'I have Coffe',
		description: 'Please feed me something, i am hungry.',
		image: 'https://res.cloudinary.com/dm1o3cvik/image/upload/v1680197498/stomach_2_lye56y.png',
	},
	{
		key: '32erf43re443',
		title: 'I have Book',
		description: 'Please feed me something, i am hungry.',
		image: 'https://res.cloudinary.com/dm1o3cvik/image/upload/v1680197496/stomach_1_yrp3li.png',
	},
	{
		key: '234re34r334r',
		title: 'I have Apple',
		description: 'Please feed me something, i am hungry.',
		image: 'https://res.cloudinary.com/dm1o3cvik/image/upload/v1680197496/stomach_3_udomej.png',
	},
];

const Square = ({ scrollX }) => {
	const YOLO = Animated.modulo(
		Animated.divide(Animated.modulo(scrollX, screenWidth), new Animated.Value(screenWidth)),
		1
	);
	const rotate = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['35deg', '0deg', '35deg'],
	});
	const translateX = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, -screenHeight, 0],
	});
	return (
		<Animated.View
			style={{
				width: screenHeight,
				height: screenHeight,
				backgroundColor: '#fff',
				borderRadius: 86,
				position: 'absolute',
				top: -screenHeight * 0.65,
				left: -screenHeight * 0.3,
				transform: [{ rotate: rotate }, { translateX }],
			}}
		/>
	);
};

function BackDrop({ scrollX }) {
	const backgroundColor = scrollX.interpolate({
		inputRange: bgs.map((_, i) => i * screenWidth),
		outputRange: bgs.map((bg) => bg),
	});
	return (
		<Animated.View
			style={[StyleSheet.absoluteFillObject, { backgroundColor: backgroundColor }]}
		/>
	);
}

function Indicator({ scrollX }) {
	return (
		<View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
			{DATA.map((_, i) => {
				const scale = scrollX.interpolate({
					inputRange: [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
					outputRange: [0.8, 1.4, 0.8],
					extrapolate: 'clamp',
				});
				const opacity = scrollX.interpolate({
					inputRange: [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
					outputRange: [0.6, 0.9, 0.6],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						key={`indicator-${i}`}
						style={{
							height: 10,
							width: 10,
							borderRadius: 5,
							backgroundColor: '#333',
							margin: 10,
							transform: [{ scale }],
							opacity,
						}}
					/>
				);
			})}
		</View>
	);
}

function AdvancedFlatListCarousel() {
	const scrollX = useRef(new Animated.Value(0)).current;
	return (
		<View style={styles.container}>
			<BackDrop scrollX={scrollX} />
			<Square scrollX={scrollX} />
			<Animated.FlatList
				data={DATA}
				keyExtractor={(item) => item.key}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: false,
				})}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								width: screenWidth,
								alignItems: 'center',
							}}>
							<View
								style={{
									flex: 0.7,
									justifyContent: 'center',
								}}>
								<Image
									source={{ uri: item.image }}
									style={{
										width: screenWidth / 2,
										height: screenWidth / 2,
										resizeMode: 'contain',
									}}
								/>
							</View>
							<View style={{ flex: 0.3, alignItems: 'center' }}>
								<Text
									style={{
										fontWeight: '800',
										fontSize: 24,
										marginBottom: 10,
										color: 'white',
									}}>
									{item.title}
								</Text>
								<Text style={{ fontWeight: '300', color: 'white' }}>
									{item.description}
								</Text>
							</View>
						</View>
					);
				}}
			/>
			<Indicator scrollX={scrollX} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});

export default AdvancedFlatListCarousel;
