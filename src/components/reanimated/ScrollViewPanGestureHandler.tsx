import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
	cancelAnimation,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';
const { height, width } = Dimensions.get('screen');

interface PageProps {
	title: string;
	index: number;
	translateX: Animated.SharedValue<number>;
}

type ContextType = {
	x: number;
};
const PAGE_WIDTH = width;
const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
	const pageOffset = PAGE_WIDTH * index;
	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value + pageOffset }],
		};
	});
	return (
		<Animated.View
			style={[
				styles.page,
				{
					...StyleSheet.absoluteFillObject,
					flex: 1,
					backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
				},
				rStyle,
			]}>
			<Text>{title}</Text>
		</Animated.View>
	);
};
const titles: Array<string> = ['Hello', 'mobile', 'devs', '?'];
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

function ScrollViewPanGestureHandler() {
	const translateX = useSharedValue(0);
	const clampedTranslateX = useDerivedValue(() => {
		return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
	});

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
		onStart: (_, context) => {
			context.x = clampedTranslateX.value;
			cancelAnimation(translateX);
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.x;
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
		},
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={{ flex: 1, flexDirection: 'row' }}>
					{titles.map((title, index) => {
						return (
							<Page
								key={index.toString()}
								translateX={clampedTranslateX}
								title={title}
								index={index}
							/>
						);
					})}
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		flex: 1,
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ScrollViewPanGestureHandler;
