import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { faker } from '@faker-js/faker';
import nicecolors from 'nice-color-palettes';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../constants';
import { List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const DURATION = 400;

faker.seed(1);
const colors = [...nicecolors[1].slice(1, nicecolors[1].length), ...nicecolors[55].slice(0, 3)];

const data = [
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/a05-min-vzUddACO-large.png',
	},
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Aiaiai_TMA2_Hardcase-hOsUaKQx-large.png',
	},
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Frame%202%20(1)-XnaXoC2--large.png',
	},
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/a05-min-vzUddACO-large.png',
	},
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Aiaiai_TMA2_Hardcase-hOsUaKQx-large.png',
	},
	{
		image: 'https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/Frame%202%20(1)-XnaXoC2--large.png',
	},
];

const detailsIcon = [
	{
		color: '#9fd7f1',
		icon: 'access-point',
	},
	{
		color: '#f3b000',
		icon: 'trophy',
	},
	{
		color: '#f2988f',
		icon: 'account-edit',
	},
];

const finalData = data.map((item, index) => ({
	...item,
	key: faker.random.numeric(3),
	color: colors[index % colors.length],
	name: faker.name.firstName(),
	jobTitle: faker.name.jobTitle(),
	categories: [...Array(3).keys()].map(() => {
		return {
			key: faker.random.numeric(3),
			title: faker.name.jobType(),
			subcats: [...Array(3).keys()].map(() => faker.name.jobType()),
		};
	}),
}));

const SPACING = 10;
const ITEM_HEIGHT = 150;
function ScreenTransition() {
	const navigator = useNavigation();
	return (
		<View>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{ padding: SPACING }}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								navigator.navigate('StoreDetails', { item });
							}}>
							<View
								style={{
									flex: 1,
									paddingBottom: SPACING,
									marginBottom: SPACING,
									height: ITEM_HEIGHT,
								}}>
								<View
									style={[
										StyleSheet.absoluteFillObject,
										{
											backgroundColor: item.color,
											borderRadius: 16,
											padding: 2 * SPACING,
										},
									]}>
									<Text style={styles.name}>{item.name}</Text>
									<Text style={styles.jobTitle}>{item.jobTitle}</Text>
									<Image source={{ uri: item.image }} style={styles.image} />
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>

			<View style={styles.bg} />
		</View>
	);
}

export function StoreDetails() {
	const {
		params: { item: item },
	} = useRoute();

	return (
		<View
			style={[
				StyleSheet.absoluteFillObject,
				{
					backgroundColor: item.color,
					padding: 2 * SPACING,
					height: ITEM_HEIGHT * 1.35,
				},
			]}>
			<Text style={styles.name}>{item.name}</Text>
			<Text style={styles.jobTitle}>{item.jobTitle}</Text>
			<Image source={{ uri: item.image }} style={styles.image} />
			<View style={styles.itemBg}>
				<ScrollView>
					<View style={styles.iconContainer}>
						{detailsIcon.map((detail, index) => {
							return (
								<Animatable.View
									style={{
										backgroundColor: detail.color,
										height: 70,
										width: 70,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 35,
									}}
									key={index}>
									<List.Icon
										icon={detail.icon}
										color="white"
										style={{ height: 30, width: 35 }}
									/>
								</Animatable.View>
							);
						})}
					</View>
					<View style={{ marginLeft: SPACING }}>
						{item.categories.map((category, index) => {
							return (
								<Animatable.View
									animation="fadeInUp"
									delay={DURATION * 2 + index * 200}
									key={`${category.key}_${index}`}>
									<Text
										style={{
											fontSize: 18,
											fontWeight: '700',
											marginBottom: SPACING,
										}}>
										{category.title}
									</Text>
									{category.subcats.map((subCat, i) => {
										return (
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
												}}
												key={i}>
												<View
													style={{
														height: 8,
														width: 8,
														backgroundColor: 'gold',
														borderRadius: 4,
														marginRight: SPACING / 2,
													}}
												/>
												<Text
													style={{
														fontSize: 14,
														opacity: 0.8,
														marginBottom: SPACING / 2,
													}}>
													{subCat}
												</Text>
											</View>
										);
									})}
								</Animatable.View>
							);
						})}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 150,
		width: 150,
		resizeMode: 'contain',
		position: 'absolute',
		right: SPACING,
		bottom: 0,
	},
	name: {
		fontWeight: '700',
		fontSize: 18,
	},
	jobTitle: {
		fontSize: 11,
		opacity: 0.7,
	},
	bg: {
		position: 'absolute',
		width: screenWidth,
		height: screenHeight,
		transform: [{ translateY: screenHeight }],
	},
	itemBg: {
		position: 'absolute',
		width: screenWidth,
		height: screenHeight,
		borderRadius: 32,
		backgroundColor: 'white',
		padding: SPACING,
		paddingTop: SPACING + 32,
		transform: [{ translateY: screenHeight / 4.6 }],
	},
	iconContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		marginBottom: 4 * SPACING,
	},
});

export default ScreenTransition;
