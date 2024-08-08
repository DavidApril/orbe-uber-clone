import {Button, Text} from '@ui-kitten/components';
import {ROLE_LIST_WITH_DESCRIPTIONS} from '../../../../interfaces';
import {CustomIcon, CViewAlpha} from '../../../components';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../../../config/i18n/i18n';
import {View} from 'react-native';

interface Props {
  roles: typeof ROLE_LIST_WITH_DESCRIPTIONS;
  setRole: React.Dispatch<
    React.SetStateAction<'CLIENTE' | 'DRIVER' | 'DELIVERY' | null>
  >;
}

export const SelectRoleAccount = ({roles, setRole}: Props) => {
  const {t} = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <View
        style={{
          flexDirection: 'column',
          gap: 20,
        }}>
        {roles.map(role => (
          <CViewAlpha
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
            <CViewAlpha
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
            </CViewAlpha>
            <Text>{role.description}</Text>

            <CViewAlpha style={{justifyContent: 'center'}}>
              <Button
                onPress={() => setRole(role.name)}
                status="primary"
                appearance="ghost">
                Seleccionar
              </Button>
            </CViewAlpha>
          </CViewAlpha>
        ))}
      </View>
    </I18nextProvider>
  );
};
