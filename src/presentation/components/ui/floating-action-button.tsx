import {Button, Layout} from '@ui-kitten/components';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {CustomIcon} from './custom-icon';
import {globalColors} from '../../theme/styles';
import {useUIStore} from '../../../store';

interface Props {
  iconName: string;
  style?: StyleProp<ViewStyle & TextStyle>;
  label?: string;
  white?: boolean;
  disabled?: boolean;
  fill?: string;
  color?: string;
  onPress: () => void;
}

export const FAB = ({
  iconName,
  onPress,
  white,
  style,
  label,
  disabled,
  fill,
}: Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <Button
      style={[
        {
          zIndex: 1,
          position: 'absolute',
          borderRadius: 100,
          height: 30,
          width: 30,
          justifyContent: 'center',
          backgroundColor: isDarkMode ? globalColors.primaryColors.primary : '',
          alignItems: 'center',
          shadowOpacity: 0.3,
          shadowOffset: {
            height: 0.27,
            width: 4.5,
          },
          elevation: 5,
        },
        ,
        style,
      ]}
      disabled={disabled}
      appearance="ghost"
      accessoryLeft={<CustomIcon fill={fill} white={white} name={iconName} />}
      onPress={onPress}>
      {label}
    </Button>
  );
};
