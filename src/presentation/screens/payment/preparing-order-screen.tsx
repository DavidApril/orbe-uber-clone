import {CTextHeader, CViewAlpha, TextHeaderScreen} from '../../components';

export const PreparingOrderScreen = () => {
  return (
    <CViewAlpha style={{flex: 1}}>
      <TextHeaderScreen
        title="Preparando pedido"
        description="Te informaremos cuando tu pedido esté listo."
      />
    </CViewAlpha>
  );
};
