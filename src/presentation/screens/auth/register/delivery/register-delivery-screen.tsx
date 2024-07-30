import {RegisterDeliveryForm} from './register-delivery-form';
import {useAuthStore} from '../../../../../store';
import {SectionDisplayEditDataDelivery} from './section-display-edit-data-delivery';
import {SectionCamera} from '../section-camera';

export const RegisterDeliveryScreen = () => {
  const {registerForm, image_url} = useAuthStore();
  return (
    <>
      {!registerForm && <RegisterDeliveryForm />}
      {!image_url && registerForm && <SectionCamera />}
      {registerForm && image_url && <SectionDisplayEditDataDelivery />}
    </>
  );
};
