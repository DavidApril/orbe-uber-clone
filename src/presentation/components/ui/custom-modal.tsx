import {PropsWithChildren} from 'react';
import {Modal, StyleProp, View, ViewStyle} from 'react-native';
import {useUIStore} from '../../../store';

interface Props {
  style?: StyleProp<ViewStyle>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CModal = ({
  children,
  style,
  isOpen,
  setIsOpen,
}: PropsWithChildren & Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={[style, {}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {children}
      </View>
    </Modal>
  );
};
