import {Input, List, ListItem} from '@ui-kitten/components';
import {CustomIcon} from './custom-icon';
import {useEffect, useRef, useState} from 'react';
import {searchApi} from '../../../config/api';
import {useLocationStore} from '../../../store';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {GOOGLE_API_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface Props {
  placeholder?: string;
  setPosition: any;
}

export const SearchPlacesInput = ({placeholder, setPosition}: Props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder ?? ''}
      textInputProps={{placeholderTextColor: 'white'}}
      fetchDetails={true}
      enableHighAccuracyLocation
      debounce={300}
      styles={{
        container: {
          flex: 1,
          width: '100%',
          backgroundColor: 'transparent',
          gap: 20,
        },
        row: {
          // backgroundColor: 'black',
          // padding: 13,
          // height: 44,
          flexDirection: 'row',
          borderRadius: 50,
          width: width * 0.75,
          left: 10,
          right: 10,
        },
        primaryText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
        separator: {
          height: 5,
          backgroundColor: 'transparent',
        },
        textInput: {
          borderRadius: 50,
          backgroundColor: 'black',
          color: 'white',
          paddingHorizontal: 20,
        },
        poweredContainer: {
          display: 'none',
          backgroundColor: 'white',
        },
        listView: {
          backgroundColor: 'transparent',
          zIndex: 9999,
          transform: [{translateY: height * 0}],
        },
      }}
      onPress={(_, details = null) => {
        if (details?.geometry.location) {
          setPosition({
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
          });
          // setInputLocation(details.formatted_address || ''); // Actualiza el texto del input
          // setModalLocation(false); // Cierra el modal al seleccionar un lugar
        }
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'es',
      }}
    />
  );
};
