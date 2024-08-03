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
      <CText style={{marginBottom: 5}}>{label}</CText>
      <TextInput
        {...props}
        value={value}
        onChangeText={handleValue}
        style={[
          globalStyles.primaryTextInput,
          {
            backgroundColor: isDarkMode
              ? neutralColors.textInputBackgroundDark
              : neutralColors.textInputBackgroundDark,
          },
          style,
        ]}
      />
    </View>
  );
};
