import {useDriverStore} from '../../../../../store';
import {RegisterDriverForm} from './register-driver-form';
import {SectionCamera} from './section-camera';
import {SectionDisplayEditData} from '../section-display-edit-data';

export const RegisterDriverScreen = () => {
  const driverRegisterForm = useDriverStore(state => state.driverRegisterForm);

  const isValidForm =
    driverRegisterForm?.confirmPassword !== '' &&
    driverRegisterForm?.email !== '' &&
    driverRegisterForm?.firstName !== '' &&
    driverRegisterForm?.lastName !== '' &&
    driverRegisterForm?.identification !== '' &&
    driverRegisterForm?.image !== '' &&
    driverRegisterForm?.password !== '' &&
    driverRegisterForm?.phone !== '' &&
    driverRegisterForm !== null;

  return (
    <>
      {driverRegisterForm === null && <RegisterDriverForm />}
      {driverRegisterForm?.image === '' && <SectionCamera />}
      {isValidForm && <SectionDisplayEditData />}
    </>
  );
};
