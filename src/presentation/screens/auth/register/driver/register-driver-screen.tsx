import {useAuthStore} from '../../../../../store';
import { SectionDisplayEditData } from '../section-display-edit-data';
import {RegisterDriverForm} from './register-driver-form';
import {SectionCamera} from './section-camera';

export const RegisterDriverScreen = () => {
  const {registerForm, image_url} = useAuthStore();

  return (
    <>
      {!registerForm && <RegisterDriverForm />}
      {!image_url && registerForm && <SectionCamera />}
      {registerForm && image_url && <SectionDisplayEditData />}
    </>
  );
};
