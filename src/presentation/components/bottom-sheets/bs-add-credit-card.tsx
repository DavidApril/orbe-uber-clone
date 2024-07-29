import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Button, CheckBox, Input, Layout, Text} from '@ui-kitten/components';
import {useEffect, useMemo, useRef} from 'react';

interface Props {
  ref: React.RefObject<BottomSheetMethods>;
}

export const BSAddCreditCard = ({ref}: Props) => {
  
  const snapPoints = useMemo(() => ['1%', '75%'], []);
  useEffect(() => {
    ref.current?.forceClose();
  }, []);

  return (
    <BottomSheet enablePanDownToClose={true} ref={ref} snapPoints={snapPoints}>
      <Layout style={{margin: 30}}>
        <Layout style={{flexDirection: 'column', gap: 10}}>
          <Text style={{fontSize: 18}}>Nombre</Text>
          <Input placeholder="Propietario" />
        </Layout>
        <Layout style={{height: 10}}></Layout>

        <Layout style={{flexDirection: 'column', gap: 10}}>
          <Text style={{fontSize: 18}}>Número de tarjeta</Text>
          <Input placeholder="4575 6231 8229 0326" />
        </Layout>

        <Layout style={{height: 10}}></Layout>

        <Layout style={{flexDirection: 'row', gap: 10}}>
          <Layout style={{flexDirection: 'column', gap: 10, flex: 1}}>
            <Text style={{fontSize: 18}}>Fecha</Text>
            <Input placeholder="MM/YY" />
          </Layout>

          <Layout style={{flexDirection: 'column', gap: 10, flex: 1}}>
            <Text style={{fontSize: 18}}>CVC</Text>
            <Input placeholder="123" />
          </Layout>
        </Layout>

        <Layout
          style={{
            margin: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox>
            <Text>Guardar datos para pagos futuros</Text>
          </CheckBox>
        </Layout>

        <Button status="success">Añadir</Button>
      </Layout>
    </BottomSheet>
  );
};
