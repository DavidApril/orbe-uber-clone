import {Input, List, ListItem} from '@ui-kitten/components';
import {CustomIcon} from './custom-icon';
import {useEffect, useRef, useState} from 'react';
import {searchApi} from '../../../config/api';
import {useLocationStore} from '../../../store';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

interface Props {
  placeholder?: string;
  setPlaces: (places: any) => void;
  [x: string]: any;
}

export const SearchPlacesInput = ({placeholder, setPlaces, ...props}: Props) => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const {lastKnownLocation} = useLocationStore();

  const [query, setQuery] = useState<string>('');

  const onQueryChanged = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const places = await searchPlacesByQuery(query);
      setPlaces(places);
    }, 350);
  };

  const searchPlacesByQuery = async (query: string): Promise<any[]> => {
    if (query.length === 0) {
      return [];
    }
    const {data} = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: `${lastKnownLocation?.longitude},${lastKnownLocation?.latitude}`,
      },
    });

    return data.features;
  };

  useEffect(() => {
    if (query.length === 0) setPlaces([]);
  }, [query]);

  return (
    <>
      <Input
        value={query ?? props.value}
        onChange={onQueryChanged}
        onChangeText={setQuery}
        accessoryLeft={<CustomIcon name="pin-outline" />}
        placeholder={placeholder}
        style={{
          marginBottom: 10,
          backgroundColor: 'black',
          paddingVertical: 10,
          borderRadius: 50,
          borderColor: 'transparent',
        }}
      />
    </>
  );
};
