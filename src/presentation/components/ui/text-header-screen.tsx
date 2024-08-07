import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {CTextHeader} from './custom-text-header';
import {CText} from './custom-text';

interface Props {
  title: string;
  description?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

export const TextHeaderScreen = ({title, description, paddingTop = 130, paddingBottom}: Props) => {
  return (
    <View style={{paddingTop: paddingTop, paddingLeft: 30, paddingBottom: paddingBottom}}>
      <CTextHeader style={{fontSize: 50, fontWeight: '100'}}>
        {title}
      </CTextHeader>
      <CText style={{fontWeight: '400'}}>{description}</CText>
    </View>
  );
};
