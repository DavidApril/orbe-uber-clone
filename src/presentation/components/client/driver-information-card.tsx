import {Button, Layout, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';

export const DriverInformationCard = () => {
  return (
    <Layout style={{marginHorizontal: 30}}>
      <Layout style={{flexDirection: 'column', gap: 10}}>
        <Button status="danger" appearance="ghost">
          Cancelar búsqueda
        </Button>

        <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>

        <Layout
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
          }}>
          <Layout
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            {/* <Image/> */}
          </Layout>

          <Layout style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Nombre conductor
            </Text>
            <Text>Rating </Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>(4.8)</Text>
          </Layout>
        </Layout>

        <Layout
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
          }}>
          <Layout>
            <Text>Arrive in</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              2 min
            </Text>
          </Layout>

          <Layout>
            <Text>Distancia</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              5.8 km
            </Text>
          </Layout>

          <Layout>
            <Text>Tiempo</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              8.200$
            </Text>
          </Layout>
        </Layout>

        <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>
        {/* Información de contacto */}
        <Layout
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Detalle de contácto
          </Text>

          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Layout style={{flexDirection: 'row', gap: 10}}>
              <Button
                status="success"
                style={{width: 40, height: 40, borderRadius: 50}}>
                <CustomIcon white name="phone-outline" />
              </Button>
              <Button
                status="success"
                style={{width: 40, height: 40, borderRadius: 50}}>
                <CustomIcon white name="message-circle-outline" />
              </Button>
            </Layout>

            <Button style={{borderRadius: 60, paddingHorizontal: 50}}>
              Ver perfil
            </Button>
          </Layout>
          <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>

          {/* Create request  */}
          <Layout
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <Button status="danger" style={{borderRadius: 50}}>
              Eliminar conductor
            </Button>
            <Button status="success" style={{flex: 1, borderRadius: 50}}>
              Hacer petición
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
