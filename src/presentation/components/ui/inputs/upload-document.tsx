import React from 'react';
import {CViewAlpha} from '../custom-view-alpha';
import {globalDimensions} from '../../../theme/styles';
import {CTextHeader} from '../custom-text-header';
import {CText} from '../custom-text';
import {View} from 'react-native';
import {CButton} from '../buttons/button';
import { CameraAdapter } from '../../../../config/adapters';

interface Props {
  documentName: string;
  description?: string;
}

export const UploadDocumentInput = ({documentName, description}: Props) => {

  return (
    <CViewAlpha
      style={{
        height: 'auto',
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: globalDimensions.cardBorderRadius,
        padding: 30,
      }}>
      <CTextHeader
        style={{
          fontSize: 30,
          fontWeight: '300',
        }}>
        {documentName}
        <CText style={{fontSize: 15, fontWeight: 'bold'}}> {description}</CText>
      </CTextHeader>
      <View style={{marginHorizontal: 60, marginVertical: 30}}>
        <CButton label="Subir documento" onPress={() => {}} />
      </View>
    </CViewAlpha>
  );
};
