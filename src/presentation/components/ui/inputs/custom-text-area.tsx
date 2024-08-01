import React from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {globalStyles, neutralColors} from '../../../theme/styles';
import {useUIStore} from '../../../../store';
import {CText} from '../custom-text';

interface Props {
  label: string;
  value: string;
  handleValue: (value: string) => void;
  numberOfLine: number;
  style?: StyleProp<ViewStyle>;
}

export const CTextArea = ({label, style, value, numberOfLine, handleValue}: Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <View style={[style, {flex: 1}]}>
      <CText style={{marginBottom: 5}}>{label}</CText>
      <TextInput
        numberOfLines={numberOfLine}
        value={value}
        onChangeText={handleValue}
        style={[
          globalStyles.primaryTextInput,
          {
            backgroundColor: isDarkMode
              ? neutralColors.textInputBackgroundDark
              : neutralColors.textInputBackgroundDark,
          },
        ]}
      />
    </View>
  );
};
