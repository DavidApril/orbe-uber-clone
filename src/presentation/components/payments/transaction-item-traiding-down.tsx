import {CViewAlpha} from '../ui/custom-view-alpha';
import {View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {globalColors} from '../../theme/styles';
import {CText} from '../ui/custom-text';
import {CTextHeader} from '../ui/custom-text-header';

export const TransactionItemTraidingDown = () => {
  return (
    <CViewAlpha
      style={{
        borderRadius: 3,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}>
      <View
        style={{
          gap: 20,
          flexDirection: 'row',
        }}>
        <CustomIcon
          fill={globalColors.stateColors.error}
          height={17}
          name="trending-down-outline"
        />
        <CTextHeader style={{fontWeight: 'bold'}}>Transaction 01</CTextHeader>
      </View>
      <CText>01</CText>
    </CViewAlpha>
  );
};
