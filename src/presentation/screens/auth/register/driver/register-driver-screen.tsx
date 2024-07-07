import {useDriverStore} from '../../../../../store';
import {SectionForm} from './section-form';
import {SectionCamera} from './section-camera';
import {SectionDisplayEditData} from './section-display-edit-data';

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
      {driverRegisterForm === null && <SectionForm />}
      {driverRegisterForm?.image === '' && <SectionCamera />}
      {isValidForm && <SectionDisplayEditData />}
    </>
  );
};
