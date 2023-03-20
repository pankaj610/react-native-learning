import React, { useRef } from 'react';
import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');
 
const AnimatedCarousel = ({ productList }) => {
	const _scrollX = useRef(new Animated.Value(0));

	const renderItem = (item, i) => {
		console.log(i);
		const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
 
		const imageScale = _scrollX.current.interpolate({
			inputRange,
			outputRange: [0.4, 1, 0.4],
		});
		const imageOpacity = _scrollX.current.interpolate({
			inputRange,
			outputRange: [0.2, 1, 0.2],
		});

		return (
			<View
				key={`${i}_${item.id}`}
				style={[carouselStyles.container, carouselStyles.scrollItem]}>
				<Image
					source={{
						uri: item.logo,
					}}
					style={[carouselStyles.logoImg]}
				/>
				<Animated.Image
					source={{ uri: item.image }}
					style={[
						carouselStyles.image,
						{
							transform: [{ scale: imageScale }],
							opacity: imageOpacity,
						},
					]}
				/>
				<Animated.View style={[carouselStyles.metaContainer, { opacity: imageOpacity }]}>
					<Text style={[carouselStyles.font, carouselStyles.title]}>{item.title}</Text>
					<Text style={[carouselStyles.font, carouselStyles.subtitle]}>
						{item.subtitle}
					</Text>
					<Text style={[carouselStyles.font, carouselStyles.description]}>
						{item.description}
					</Text>
					<Text style={[carouselStyles.font, carouselStyles.price]}>{item.price}</Text>
				</Animated.View>
				{renderRadialGradient(item.bg, inputRange)}
			</View>
		);
	};

	const renderRadialGradient = (color, inputRange) => {
		const radialRotate = _scrollX.current.interpolate({
			inputRange,
			outputRange: ['-15deg', '0deg', '15deg'],
		});
		const translate = _scrollX.current.interpolate({
			inputRange,
			outputRange: [width, 0, -width],
		});
		const opacity = _scrollX.current.interpolate({
			inputRange,
			outputRange: [0.5, 1, 0.5],
		});

		return (
			<Animated.View
				style={[
					carouselStyles.svgContainer,
					{
						transform: [
							{ rotate: radialRotate },
							{ translateX: translate },
							{ scale: 1.3 },
						],
						opacity: opacity,
					},
				]}>
				<Svg>
					<Defs>
						<RadialGradient
							id="grad"
							cx="50%"
							cy="35%"
							r="60%"
							gradientUnits="userSpaceOnUse">
							<Stop offset="0%" stopColor="#fff" stopOpacity={1} />
							<Stop offset="100%" stopColor={color} stopOpacity={1} />
						</RadialGradient>
					</Defs>
					<Rect
						x="0"
						y="0"
						width={width}
						height={height}
						fill={`url(#grad)`}
						fillOpacity={0.9}
					/>
				</Svg>
			</Animated.View>
		);
	}; 
	return (
		<Animated.ScrollView
			pagingEnabled
			scrollEventThrottle={16}
			horizontal
			contentContainerStyle={carouselStyles.scrollViewContainer}
			onScroll={Animated.event(
				[
					{
						nativeEvent: { contentOffset: { x: _scrollX.current } },
					},
				],
				{
					useNativeDriver: true,
					listener: (event)=> {}
				}
			)}>
			<StatusBar hidden />
			{productList.map(renderItem)}
		</Animated.ScrollView>
	);
};

const carouselStyles = StyleSheet.create({
	scrollItem: {
		height,
		width,
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollViewContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	metaContainer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'transparent',
		padding: 15,
	},
	font: {
		fontFamily: 'Menlo',
		color: '#222',
	},
	title: { fontSize: 36, fontWeight: '900' },
	subtitle: { fontSize: 10, fontWeight: '900' },
	description: { fontSize: 14, marginVertical: 15, textAlign: 'center' },
	price: { fontSize: 42, fontWeight: '400' },
	image: {
		width: width * 0.85,
		height: width * 0.85,
		marginTop: width * 0.4,
		resizeMode: 'contain',
	},
	logoImg: {
		width: width / 7,
		height: width / 7,
		position: 'absolute',
		top: StatusBar.currentHeight * 3,
		resizeMode: 'contain',
	},
	svgContainer: {
		flex: 1,
		top: 0,
		left: 0,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: width,
		height: height,
		zIndex: -1,
	},
});

function AnimatedCarouselExample() {
	return (
		<View style={styles.container}>
			<AnimatedCarousel productList={PRODUCT_LIST} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AnimatedCarouselExample;

const PRODUCT_LIST = [
	{
		id: 's87698ass68',
		title: 'A04 · Hardcase',
		subtitle: 'TMA-2 headphone',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Aiaiai_TMA2_Hardcase-hOsUaKQx-large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			'The A04 hard case is designed to protect your headphones from bumps, dust and scratches',
		price: '💲30',
		bg: '#16cdc1',
	},
	{
		id: 'aa2341234x',
		title: 'USB-C charging cable 1 meter',
		subtitle: 'charging cable',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/a05-min-vzUddACO-large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			'USB-C charging cable 1 meter (3,3ft), for charging the H10 Headband, S10 Speaker Units, H05 Headband, and H06 Headband.',
		price: '💲30',
		bg: '#bbb',
	},
	
	{
		id: '1234x123z12',
		title: 'Maharishi Waistbag',
		subtitle: 'Nylon waistbag',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Frame%202%20(1)-XnaXoC2--large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			" The capsule features the Hyperdub mascot – the 3rd Ear Cat – the bastard child of a Japanese lucky cat and a failed CIA experiment, 'acoustic kitty' in reflective 3M prints and embroidery.",
		price: '💲40',
		bg: '#629bf0',
	},
	{
		id: 's87698aass68',
		title: 'A04 · Hardcase',
		subtitle: 'TMA-2 headphone',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Aiaiai_TMA2_Hardcase-hOsUaKQx-large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			'The A04 hard case is designed to protect your headphones from bumps, dust and scratches',
		price: '💲30',
		bg: '#16cdc1',
	},
	{
		id: 'aa234123a4x',
		title: 'USB-C charging cable 1 meter',
		subtitle: 'charging cable',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/a05-min-vzUddACO-large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			'USB-C charging cable 1 meter (3,3ft), for charging the H10 Headband, S10 Speaker Units, H05 Headband, and H06 Headband.',
		price: '💲30',
		bg: '#bbb',
	},
	
	{
		id: '1234x123z12a',
		title: 'Maharishi Waistbag',
		subtitle: 'Nylon waistbag',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Frame%202%20(1)-XnaXoC2--large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			" The capsule features the Hyperdub mascot – the 3rd Ear Cat – the bastard child of a Japanese lucky cat and a failed CIA experiment, 'acoustic kitty' in reflective 3M prints and embroidery.",
		price: '💲40',
		bg: '#629bf0',
	},
];
