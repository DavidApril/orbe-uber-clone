import {Button, Layout} from '@ui-kitten/components';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {CustomIcon} from './custom-icon';

interface Props {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  label?: string;
  white?: boolean
  disabled?: boolean;
  onPress: () => void;
}

export const FAB = ({iconName, onPress, white, style, label, disabled}: Props) => {
  return (
    <Button
      style={[styles.btn, style]}
      disabled={disabled}
      appearance="ghost"
      accessoryLeft={<CustomIcon white={white} name={iconName} />}
      onPress={onPress}>
        {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
    elevation: 5,
  },
});
