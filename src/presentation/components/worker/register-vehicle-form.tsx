import {Formik} from 'formik';
import {View} from 'react-native';
import {globalDimensions} from '../../theme/styles';

import {CViewAlpha, CTextArea, CTextHeader, CInput} from '../../components';

export const RegisterVehicleForm = () => {
  const initialValues = {
    licensePlate: '',
    model: '',
    brand: '',
    description: '',
  };
  const onSubmit = async () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({values, handleChange}) => (
        <CViewAlpha
          style={{
            margin: 30,
            padding: 30,
            borderRadius: globalDimensions.cardBorderRadius,
          }}>
          <CTextHeader style={{fontSize: 15, marginBottom: 15}}>
            Información básica
          </CTextHeader>

          <View style={{flexDirection: 'column', gap: 15}}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <CInput
                value={values.licensePlate}
                handleValue={handleChange('licensePlate')}
                label="Matrícula"
              />
              <CInput
                value={values.model}
                handleValue={handleChange('model')}
                label="Modelo del vehículo"
              />
            </View>

            <CInput
              value={values.brand}
              handleValue={handleChange('brand')}
              label="Marca del vehículo"
            />
            <CInput
              value={values.brand}
              handleValue={handleChange('brand')}
              label="Marca del vehículo"
            />

            <CTextArea
              numberOfLine={6}
              value={values.description}
              handleValue={handleChange('description')}
              label="Descripción del vehículo"
            />
          </View>
        </CViewAlpha>
      )}
    </Formik>
  );
};
