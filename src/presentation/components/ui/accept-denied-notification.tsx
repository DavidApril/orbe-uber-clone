import {Button, Layout} from '@ui-kitten/components';

export const AcceptDeniedNotification = () => {
  return (
    <Layout
      style={{
        left: 20,
        right: 20,
        backgroundColor: 'black',
        borderRadius: 30,
        position: 'absolute',
        zIndex: 999,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <Layout></Layout>
      <Layout
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Button appearance="ghost" status="success">
          Aceptar
        </Button>
        <Button appearance="ghost" status="danger">
          Rechazar
        </Button>
      </Layout>
    </Layout>
  );
};
