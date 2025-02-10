import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ModalTypes } from '../types/types';
import Animated, {
  Easing,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface HeaderProps {
  toggleModal: () => void;
  numberOfRounds: number;
  setModalType: (type: ModalTypes) => void;
}

const Header = ({ toggleModal, setModalType, numberOfRounds }: HeaderProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.01, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease }),
      ),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    color: '#dfbf6c',
  }));

  const renderText = () => {
    if (numberOfRounds < 1) {
      return 'No More Questions Left, Guess Now';
    }
    return `Questions Left: ${numberOfRounds}`;
  };

  return (
    <View style={styles.headerContainer}>
      <Animated.Text
        style={[styles.headerText, numberOfRounds < 1 && animatedStyle]}>
        {renderText()}
      </Animated.Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleModal();

          setModalType(ModalTypes.Menu);
        }}>
        <View style={styles.btn}>
          <Icon name={'menu'} size={20} color={'#f0f9ff'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  btn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#f0f9ff',
    justifyContent: 'center',
    backgroundColor: '#3f3f46',
  },
  headerText: {
    fontSize: 20,
    color: '#f0f9ff',
    fontWeight: 'bold',
  },
});

export default Header;
