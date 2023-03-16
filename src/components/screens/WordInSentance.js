import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const TextAnimator = ({ content, style, textStyle }) => {
	const animationRefs = useRef({});
	const textArr = useMemo(() => content.trim().split(' '), [content]);

	textArr.forEach((_, i) => {
		animationRefs.current[i] = new Animated.Value(0);
	});

	useEffect(() => {
		animate();
	}, []);

	const animate = (toValue = 1) => {
		const animations = textArr.map((_, i) => {
			return Animated.timing(animationRefs.current[i], {
				toValue: toValue,
				duration: 500,
				useNativeDriver: true,
			});
		});
		Animated.stagger(100, animations).start(() => {
			setTimeout(() => animate(toValue === 1 ? 0 : 1), 1000);
		});
	};

	const textWrapper = useMemo(
		() => ({
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
			padding: 10,
		}),
		[]
	);

	return (
		<View style={[style, textWrapper]}>
			{textArr.map((word, index) => {
				return (
					<Animated.Text
						key={`${word}_${index}`}
						style={[textStyle, { opacity: animationRefs.current[index] }]}>
						{word}
						{`${index < textArr.length ? ' ' : ''}`}
					</Animated.Text>
				);
			})}
		</View>
	);
};

function WordInSentance() {
	return (
		<View style={styles.container}>
			<TextAnimator
				content="For the things we have to learn before we can do them, we learn by doing them. REACT NATIVE ❤️"
				textStyle={styles.textStyle}
				style={styles.containerStyle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold',
		fontFamily: 'Menlo',
		marginBottom: 14,
	},
	containerStyle: {},
});

export default WordInSentance;
