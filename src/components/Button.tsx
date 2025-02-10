import React from 'react';
import {
  Text,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  icon?: string;
  label: string;
  disabled?: boolean;
  buttonWidth?: number;
  onPress: () => void;
  buttonStyles?: StyleProp<ViewStyle>;
}

const Button = ({
  icon,
  label,
  onPress,
  disabled,
  buttonStyles,
  buttonWidth = 250,
}: ButtonProps) => {
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={[styles.btn, { width: buttonWidth, opacity }, buttonStyles]}>
        {icon && (
          <Icon name={icon} style={styles.icon} size={22} color={'#f0f9ff'} />
        )}
        {label && <Text style={styles.text}>{label}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#f0f9ff',
    justifyContent: 'center',
    backgroundColor: '#3f3f46',
  },
  text: { color: '#f0f9ff' },
  icon: { paddingRight: 10 },
});

export default Button;
