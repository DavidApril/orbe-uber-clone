import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {globalDimensions, stateColors} from '../../theme/styles';
import {CustomIcon} from './custom-icon';
import {useWorkerStore} from '../../../store';
import {RaceService} from '../../../services';
import {Spinner} from '@ui-kitten/components';

export const AcceptCancelButtons = () => {
  const {setCurrentRaceAccepted, currentRequest, raceData} = useWorkerStore();
  const [isAcceptingRequest, setIsAcceptingRequest] = useState<boolean>(false);
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
        disabled={isAcceptingRequest}
        onPress={async () => {
          setIsAcceptingRequest(true);
          await RaceService.acceptOrder(
            currentRequest!.id_client,
            currentRequest!.id_client,
            currentRequest!.id,
            raceData!.distance * 850 + 4600,
          );
          setCurrentRaceAccepted(true);
          setIsAcceptingRequest(false);
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          opacity: 0.5,
          borderRadius: globalDimensions.cardBorderRadius,
          alignItems: 'center',
          backgroundColor: stateColors.success,
        }}>
        {isAcceptingRequest ? (
          <Spinner status="basic" />
        ) : (
          <CustomIcon name="checkmark-outline" />
        )}
      </Pressable>
    </View>
  );
};
