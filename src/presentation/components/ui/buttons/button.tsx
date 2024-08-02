import React from 'react';
import {Pressable} from 'react-native';
import {globalStyles} from '../../../theme/styles';
import {CTextHeader} from '../custom-text-header';
import {Spinner} from '@ui-kitten/components';

interface Props {
  onPress: (params: any | never) => void;
  label: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const CButton = ({
  onPress,
  label,
  isLoading = false,
  disabled = false,
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
      ]}>
      {isLoading ? (
        <Spinner status="basic" />
      ) : (
        <CTextHeader>{label}</CTextHeader>
      )}
    </Pressable>
  );
};
