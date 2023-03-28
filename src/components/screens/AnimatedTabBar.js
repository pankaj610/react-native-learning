import React, { useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../constants';

function AnimatedTabBar() {
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef();
	const onItemPress = React.useCallback((itemIndex) => {
		flatListRef.current?.scrollToOffset({
			offset: itemIndex * screenWidth,
		});
	}, []);
	const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
		return (
			<TouchableOpacity onPress={onItemPress}>
				<View style={{ paddingHorizontal: 4 }} ref={ref}>
					<Text style={{ color: 'black', fontSize: 8.5, fontWeight: '800' }}>
						{item.subtitle}
					</Text>
				</View>
			</TouchableOpacity>
		);
	});
	const Indicator = ({ measures, scrollX }) => {
		const inputRange = PRODUCT_LIST.map((_, i) => i * screenWidth);
		const indicatorWidth = scrollX.interpolate({
			inputRange,
			outputRange: measures.map((measure) => measure.width),
		});
		const translateX = scrollX.interpolate({
			inputRange,
			outputRange: measures.map((measure) => measure.x),
		});
		return (
			<Animated.View
				style={{
					position: 'absolute',
					height: 4,
					width: indicatorWidth,
					left: translateX,
					backgroundColor: 'black',
					bottom: -10,
				}}
			/>
		);
	};
	const Tabs = ({ data, scrollX, onItemPress }) => {
		const containerRef = useRef();
		const scrollBar = useRef();
		const [measures, setMeasures] = useState([]);
		React.useEffect(() => {
			let m = [];
			data.forEach((item) => {
				item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
					m.push({ x, y, height, width });
					if (m.length === data.length) {
						setMeasures(m);
					}
				});
			});
		}, []);
		return (
			<View style={{ position: 'absolute', top: 100, paddingHorizontal: 5 }}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollBar}>
					<View style={{ flex: 1, flexDirection: 'row' }} ref={containerRef}>
						{data.map((item, index) => {
							return (
								<Tab
									key={item.id}
									item={item}
									ref={item.ref}
									onItemPress={() => onItemPress(index)}
								/>
							);
						})}
					</View>
				</ScrollView>
				{measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<Animated.FlatList
				ref={flatListRef}
				data={PRODUCT_LIST.map((el) => {
					el.ref = React.createRef();
					return el;
				})}
				keyExtractor={(e) => e.id}
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
								height: screenHeight,
								backgroundColor: item.bg,
							}}>
							<Image
								source={{ uri: item.image }}
								style={{ flex: 1, resizeMode: 'cover' }}
							/>
						</View>
					);
				}}
			/>
			<Tabs data={PRODUCT_LIST} scrollX={scrollX} onItemPress={onItemPress} />
		</View>
	);
}

export default AnimatedTabBar;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const PRODUCT_LIST = [
	{
		id: 's87698ass68',
		title: 'A04 · Hardcase',
		subtitle: 'Headphone',
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
		subtitle: 'Cable',
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
		subtitle: 'Waistbag',
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
		subtitle: 'Headphone',
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
		subtitle: 'Charging',
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
		subtitle: 'Waist',
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Frame%202%20(1)-XnaXoC2--large.png',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/AIAIAI_company_logo.png',
		description:
			" The capsule features the Hyperdub mascot – the 3rd Ear Cat – the bastard child of a Japanese lucky cat and a failed CIA experiment, 'acoustic kitty' in reflective 3M prints and embroidery.",
		price: '💲40',
		bg: '#629bf0',
	},
];
