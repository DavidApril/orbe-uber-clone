import React from 'react';
import {
  CView,
  RegisterVehicleForm,
  TextHeaderScreen,
  UploadImageInput,
} from '../../../../components';
import {ScrollView} from 'react-native';

export const RegisterVehiclesDocumentsScreen = () => {
  return (
    <CView style={{flex: 1}}>
      <ScrollView>
        <TextHeaderScreen
          paddingTop={30}
          title="Información del Vehículo"
          description="Ingresa la información relacionada a tu vehículo"
        />

        <RegisterVehicleForm />

        <UploadImageInput
          documentName="Frontal"
          description="foto del vehículo"
        />
        <UploadImageInput
          documentName="Lateral izquierdo"
          description="foto del vehículo"
        />
        <UploadImageInput
          documentName="Lateral derecho"
          description="foto del vehículo"
        />
        <UploadImageInput
          documentName="Posterior"
          description="foto del vehículo"
        />
      </ScrollView>
    </CView>
  );
};
