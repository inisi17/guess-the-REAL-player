import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './../Button';

interface MenuContentProps {
  onClose: () => void;
  navigateBack: () => void;
  handleRestart: () => void;
}

const MenuContent = ({
  onClose,
  navigateBack,
  handleRestart,
}: MenuContentProps) => {
  const buttons = [
    {
      name: 'restart',
      icon: 'refresh',
      label: 'Restart Game',
      onPress: handleRestart,
    },
    {
      name: 'leave',
      icon: 'logout',
      label: 'Leave Game',
      onPress: navigateBack,
    },
    {
      icon: 'reply',
      name: 'Resume',
      label: 'Resume Game',
      onPress: onClose,
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <View key={index}>
          <Button
            buttonWidth={250}
            icon={button.icon}
            label={button.label}
            onPress={button.onPress}
            buttonStyles={styles.marginVertical}
          />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  marginVertical: { marginVertical: 10 },
});

export default MenuContent;
