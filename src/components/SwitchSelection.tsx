import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface SwitchSelectionProps {
  numberOfRounds: number;
  setNumberOfRounds: (value: number) => void;
  selectionButtons: { label: string; value: number }[];
}

const SwitchSelection = ({
  numberOfRounds,
  selectionButtons,
  setNumberOfRounds,
}: SwitchSelectionProps) => {
  return (
    <View style={styles.switcherSection}>
      {selectionButtons.map((button, index) => {
        const buttonColor = {
          backgroundColor:
            button.value === numberOfRounds ? '#18181b' : 'transparent',
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={[
              styles.options,
              buttonColor,
              { width: 292 / selectionButtons.length },
            ]}
            onPress={() => setNumberOfRounds(button.value)}>
            <Text style={button.value === numberOfRounds && styles.text}>
              {button.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  switcherSection: {
    width: 300,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#dfbf6c',
    backgroundColor: '#dfbf6c',
    justifyContent: 'center',
  },
  options: {
    height: 42,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfbf6c',
  },
  text: {
    color: 'white',
  },
});

export default SwitchSelection;
