import React from 'react';
import {Pressable, View} from 'react-native';
import {globalDimensions, stateColors} from '../../theme/styles';
import {CustomIcon} from './custom-icon';
import {useDeliveryStore, useDriverStore} from '../../../store';
import {OrderService} from '../../../services';

export const AcceptCancelButtons = () => {
  
  const {setCurrentRaceAccepted, currentRequest} = useDriverStore();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 200,
        bottom: 100,
        width: '100%',
        padding: 30,
        zIndex: 100,
        position: 'absolute',
        gap: 10,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          opacity: 0.5,
          borderRadius: globalDimensions.cardBorderRadius,
          alignItems: 'center',
          backgroundColor: stateColors.error,
        }}>
        <CustomIcon name="close-outline" />
      </View>
      <Pressable
        onPress={async () => {
          // const response = await OrderService.acceptRequest(
          //   currentRequest.id_client,
          //   currentRequest.id_restaurant,
          //   currentRequest.id,
          //   raceData!.distance * 850 + 4600,
          // );
          // if (response) {
          setCurrentRaceAccepted(currentRequest);
          // }
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          opacity: 0.5,
          borderRadius: globalDimensions.cardBorderRadius,
          alignItems: 'center',
          backgroundColor: stateColors.success,
        }}>
        <CustomIcon name="checkmark-outline" />
      </Pressable>
    </View>
  );
};
