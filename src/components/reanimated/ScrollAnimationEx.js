import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { scrollTo, useAnimatedRef, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const ScrollExampleComponent = () => {
	const aref = useAnimatedRef();
	const scroll = useSharedValue(0);

	useDerivedValue(() => {
		scrollTo(aref, 0, scroll.value * 100, true);
	});

	const items = Array.from(Array(10).keys());

	return (
		<View>
			<Button
				title="scroll down"
				onPress={() => {
					scroll.value = scroll.value + 1;
					if (scroll.value >= 10) scroll.value = 0;
				}}
			/>
			<View style={{ width: 120, height: 200, backgroundColor: 'green' }}>
				<ScrollView ref={aref} style={{ backgroundColor: 'orange', width: 120 }}>
					{items.map((_, i) => (
						<View
							key={i}
							style={{
								backgroundColor: 'white',
								width: 100,
								height: 100,
								margin: 10,
							}}
						/>
					))}
				</ScrollView>
			</View>
		</View>
	);
};
export default ScrollExampleComponent;
