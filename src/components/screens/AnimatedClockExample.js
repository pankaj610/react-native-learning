import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';

const { width } = Dimensions.get('screen');
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;

function AnimatedClockExample() {
	const index = useRef(new Animated.Value(30)).current;
	const tick = useRef(new Animated.Value(0)).current;
	const scales = useRef([...Array(6).keys()].map(() => new Animated.Value(0))).current;
	const timerRef = useRef();
	const timer = useRef(0);

	useEffect(() => {
		const current = dayjs();
		const diff = current.endOf('day').diff(current, 'seconds');
		const oneDay = 24 * 60 * 60;
		timer.current = oneDay - diff;
		tick.setValue(timer.current);
		index.setValue(timer.current - 30);
		_animate();
		timerRef.current = setInterval(() => {
			timer.current += 1;
			tick.setValue(timer.current);
		}, TICK_INTERVAL);

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	const _animate = () => {
		const scaleStaggerAnimations = scales.map((animated, index) => {
			return Animated.spring(animated, {
				toValue: 1,
				tension: 18,
				friction: 3,
				useNativeDriver: true,
			});
		});
		Animated.parallel([
			Animated.stagger(TICK_INTERVAL / scales.length, scaleStaggerAnimations),
			Animated.timing(index, {
				toValue: tick,
				duration: TICK_INTERVAL / 2,
				useNativeDriver: true,
			}),
		]).start();
	};

	const [
		smallQuadranScale,
		mediumQuadranScale,
		bigQuadranScale,
		secondsScale,
		minutesScale,
		hoursScale,
	] = scales;

	const interpolated = {
		inputRange: [0, 360],
		outputRange: ['0deg', '360deg'],
	};

	const secondDegress = Animated.multiply(index, 6);
	const transformSeconds = {
		transform: [
			{
				rotate: secondDegress.interpolate(interpolated),
			},
			{
				scale: secondsScale,
			},
		],
	};

	const minuteDegrees = Animated.divide(secondDegress, new Animated.Value(60));
	const transformMinutes = {
		transform: [
			{ rotate: minuteDegrees.interpolate(interpolated) },
			{
				scale: minutesScale,
			},
		],
	};

	const hourDegrees = Animated.divide(minuteDegrees, new Animated.Value(12));
	const transformHours = {
		transform: [
			{ rotate: hourDegrees.interpolate(interpolated) },
			{
				scale: hoursScale,
			},
		],
	};

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.bigQuadran,
					{ transform: [{ scale: bigQuadranScale }] },
				]}></Animated.View>
			<Animated.View
				style={[
					styles.mediumQuadran,
					{ transform: [{ scale: mediumQuadranScale }] },
				]}></Animated.View>
			<Animated.View
				style={[
					styles.smallQuadran,
					{ transform: [{ scale: smallQuadranScale }] },
				]}></Animated.View>
			<Animated.View style={[styles.mover, transformHours]}>
				<View style={[styles.hours]}></View>
			</Animated.View>
			<Animated.View style={[styles.mover, transformMinutes]}>
				<View style={[styles.minutes]}></View>
			</Animated.View>
			<Animated.View style={[styles.mover, transformSeconds]}>
				<View style={[styles.seconds]}></View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bigQuadran: {
		width: SIZE * 0.8,
		height: SIZE * 0.8,
		borderRadius: SIZE * 0.4,
		backgroundColor: 'rgba(200, 200, 200, 0.2)',
		position: 'absolute',
	},
	mediumQuadran: {
		width: SIZE * 0.5,
		height: SIZE * 0.5,
		borderRadius: SIZE * 0.25,
		backgroundColor: 'rgba(200, 200, 200, 0.4)',
		position: 'absolute',
	},
	smallQuadran: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: 'rgba(227, 71, 134, 1)',
		position: 'absolute',
	},
	mover: {
		position: 'absolute',
		width: SIZE,
		height: SIZE,
		borderRadius: SIZE / 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	hours: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		height: '35%',
		marginTop: '15%',
		width: 4,
		borderRadius: 4,
	},
	minutes: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		height: '45%',
		marginTop: '5%',
		width: 3,
		borderRadius: 4,
	},
	seconds: {
		position: 'absolute',
		backgroundColor: 'rgba(227, 71, 134, 1)',
		height: '50%',
		width: 2,
		borderRadius: 2,
	},
});

export default AnimatedClockExample;
