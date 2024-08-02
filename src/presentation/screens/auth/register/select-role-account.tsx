import {Button, Layout, Text} from '@ui-kitten/components';
import {
  CLIENT,
  DELIVERY,
  DRIVER,
  ROLE_LIST_WITH_DESCRIPTIONS,
} from '../../../../interfaces';
import {CustomIcon} from '../../../components';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../config/i18n/i18n';

interface Props {
  roles: typeof ROLE_LIST_WITH_DESCRIPTIONS;
  setRole: React.Dispatch<
    React.SetStateAction<'CLIENTE' | 'DRIVER' | 'DELIVERY' | null>
  >;
}

export const SelectRoleAccount = ({roles, setRole}: Props) => {
  const {t} = useTranslation()
  return (
    <I18nextProvider i18n={i18n}>
      <Layout
      style={{
        flexDirection: 'column',
        gap: 20,
      }}>
      {roles.map(role => (
        <Layout
          key={role.name}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 3,

            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 10,
          }}>
          <Layout
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <CustomIcon name={role.iconName} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                flexDirection: 'row',
                gap: 10,
              }}>
              {role.name
                .toLocaleLowerCase()
                .replace(/^\w/, c => c.toUpperCase())}
            </Text>
          </Layout>
          <Text>{role.description}</Text>

          <Layout style={{justifyContent: 'center'}}>
            <Button
              onPress={() => setRole(role.name)}
              status="primary"
              appearance="ghost">
              Seleccionar
            </Button>
          </Layout>
        </Layout>
      ))}
    </Layout>
    </I18nextProvider>
  );
};
