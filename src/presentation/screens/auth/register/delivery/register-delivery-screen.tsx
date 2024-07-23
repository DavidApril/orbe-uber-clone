import {RegisterDeliveryForm} from './register-client-form';
import {useAuthStore} from '../../../../../store';
import {SectionCamera} from '../driver/section-camera';
import {SectionDisplayEditData} from '../driver/section-display-edit-data';

export const RegisterDeliveryScreen = () => {
  const {registerForm, image_url} = useAuthStore();
  return (
    <>
      {!registerForm && <RegisterDeliveryForm />}
      {!image_url && registerForm && <SectionCamera />}
      {registerForm && image_url && <SectionDisplayEditData />}
    </>
  );
};
