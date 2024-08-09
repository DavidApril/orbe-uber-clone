import React from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {globalStyles, neutralColors} from '../../../theme/styles';
import {useUIStore} from '../../../../store';
import {CText} from '../custom-text';

interface Props {
  label?: string;
  value: string;
  handleValue: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  [x: string]: any;
}

export const CInput = ({label, style, value, handleValue, ...props}: Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <View style={[{flex: 1}]}>
      <CText style={{marginBottom: label ? 5 : 0}}>{label}</CText>
      <TextInput
        {...props}
        value={value}
        onChangeText={handleValue}
        placeholderTextColor={
          !isDarkMode ? neutralColors.placeholderColor : 'white'
        }
        style={[
          globalStyles.primaryTextInput,
          {
            fontWeight: '300',
            backgroundColor: isDarkMode
              ? neutralColors.textInputBackgroundDark
              : neutralColors.textInputBackground,
          },
          style,
        ]}
      />
    </View>
  );
};
