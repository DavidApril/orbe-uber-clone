import React from 'react';
import {View} from 'react-native';
import {CTextHeader} from './custom-text-header';
import {CText} from './custom-text';

interface Props {
  title: string;
  description?: string;
}

export const TextHeaderScreen = ({title, description}: Props) => {
  return (
    <View style={{paddingTop: 130, paddingLeft: 30}}>
      <CTextHeader style={{fontSize: 50, fontWeight: '100'}}>
        {title}
      </CTextHeader>
      <CText style={{fontWeight: '400'}}>{description}</CText>
    </View>
  );
};
