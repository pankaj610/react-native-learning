import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import posed from 'react-native-pose';

const { height, width } = Dimensions.get('screen');

const GridItem = posed.View({
	RIGHT: { rotate: '45deg' },
	LEFT: { rotate: '-45deg' },
});
const ANIMATION_INTERVAL = 2000;

const RATIO = height / width;
const ITEMS_PER_ROW = 10;
const SIZE = width / ITEMS_PER_ROW;
const ROWS = Math.round((RATIO * height) / SIZE);
const TOTAL_ITEMS = ITEMS_PER_ROW * ROWS;

const POSITIONS = ['LEFT', 'RIGHT'];

const getRandomPosition = (arr = POSITIONS) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

const Grid = ({ items }) => {
	return items.map(({ key, position } = {}) => {
		return (
			<GridItem key={key} pose={position} style={styles.gridItem}>
				<View style={styles.gridItemDiagonal}></View>
			</GridItem>
		);
	});
};

function PseudoMaze() {
	const [position, setPosition] = useState('RIGHT');
	const [gridItems, setGridItems] = useState([]);
	const animationInterval = useRef();

	const constructGrid = () => {
		const gridItems = [...Array(TOTAL_ITEMS).keys()].map((index) => ({
			key: index,
			position: getRandomPosition(),
		}));
		return gridItems;
	};
	useEffect(() => {
		animationInterval.current = setInterval(() => {
			setGridItems(constructGrid());
		}, ANIMATION_INTERVAL);

		return () => {
			clearInterval(animationInterval.current);
		};
	}, []);

	return (
		<View style={styles.container}>
			<Grid items={gridItems} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: 'gold',
	},
	gridItemDiagonal: {
		width: 3,
		height: Math.sqrt(2) * SIZE,
		backgroundColor: '#333',
	},
	gridItem: {
		backgroundColor: 'gold',
		borderColor: '#333',
		width: SIZE,
		height: SIZE,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PseudoMaze;
