import React from 'react';
import {Pressable, View} from 'react-native';
import {CustomIcon} from './custom-icon';
import {stateColors} from '../../theme/styles';
import {Spinner} from '@ui-kitten/components';

interface Props {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  onPress: () => void;
}

export const ActiveServicesButton = ({
  isActive,
  setIsActive,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={{
        position: 'absolute',
        zIndex: 999999,
        top: 120,
        left: 30,
        borderRadius: 20,
        right: 30,
        bottom: 120,
        opacity: !isActive ? 0.8 : 0.4,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        setIsActive(!isActive);
        onPress();
      }}>
      <View style={{transform: [{scale: !isActive ? 4 : 2}]}}>
        {!isActive ? (
          <CustomIcon fill={stateColors.error} name="power" />
        ) : (
          <Spinner />
        )}
      </View>
    </Pressable>
  );
};
