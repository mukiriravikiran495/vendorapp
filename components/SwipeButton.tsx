import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width - 40;
const THUMB_WIDTH = 60;

interface Props {
  onSuccess: () => void;
}

export default function SwipeButton({ onSuccess }: Props) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = Math.min(Math.max(0, event.translationX), BUTTON_WIDTH - THUMB_WIDTH);
    },
    onEnd: () => {
      if (translateX.value > BUTTON_WIDTH - THUMB_WIDTH - 10) {
        runOnJS(onSuccess)();
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Text style={styles.label}>Slide to Confirm</Text>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.thumb, animatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: BUTTON_WIDTH,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
  },
  thumb: {
    width: THUMB_WIDTH,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0C4087',
  },
});
