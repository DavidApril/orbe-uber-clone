import React from 'react';
import {Pressable, PressableProps, StyleProp, Text, ViewProps} from 'react-native';
import {globalStyles, neutralColors} from '../../../theme/styles';
import {Spinner} from '@ui-kitten/components';

interface Props {
  onPress: (params: any | never) => void;
  label: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<PressableProps>;
}

export const CButton = ({
  onPress,
  label,
  isLoading = false,
  disabled = false,
  style,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        !disabled
          ? globalStyles.primaryButton
          : globalStyles.primaryButtonDisable,
        globalStyles.boxShadow,
        {
          paddingHorizontal: 30,
          paddingVertical: 10,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      {isLoading ? (
        <Spinner status="basic" />
      ) : (
        <Text style={{color: neutralColors.background}}>{label}</Text>
      )}
    </Pressable>
  );
};
