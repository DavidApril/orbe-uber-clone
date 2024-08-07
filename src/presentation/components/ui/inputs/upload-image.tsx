import React from 'react';
import {CViewAlpha} from '../custom-view-alpha';
import {globalDimensions} from '../../../theme/styles';
import {CTextHeader} from '../custom-text-header';
import {CText} from '../custom-text';
import {View} from 'react-native';
import {CButton} from '../buttons/button';
import {CameraAdapter} from '../../../../config/adapters';

interface Props {
  documentName: string;
  description?: string;
  setImageUrl: (image_url: string) => void;
}

export const UploadImageInput = ({
  documentName,
  description,
  setImageUrl,
}: Props) => {
  
  const handleUploadPhoto = async () => {
    const picture = await CameraAdapter.getPictureFromLibrary();
    setImageUrl(picture[0]);
  };

  const handleTakePhoto = async () => {
    const picture = await CameraAdapter.takePicture();
    setImageUrl(picture[0]);
  };

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
          fontWeight: '200',
        }}>
      {documentName}
      </CTextHeader>
      <CText style={{fontSize: 15, fontWeight: 'bold'}}> {description}</CText>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginVertical: 15,
        }}>
        <CButton label="Subir imagen" onPress={handleUploadPhoto} />
        <CButton label="Tomar imagen" onPress={handleTakePhoto} />
      </View>
    </CViewAlpha>
  );
};
