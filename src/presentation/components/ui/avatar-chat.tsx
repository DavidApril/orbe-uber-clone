import {Layout} from '@ui-kitten/components';
import React from 'react';
import {Image} from 'react-native';
import {globalColors} from '../../theme/styles';

interface Props {
  src: string;
  height: number;
}

export const AvatarChat = ({src, height = 50}: Props) => {
  return (
    <Layout
      style={{
        height,
        width: height,
        borderRadius: 100,
        margin: 5,
        justifyContent: 'center',
        borderWidth: 2,
        alignItems: 'center',
        borderColor: globalColors.border,
      }}>
      <Image height={height} width={height} source={{uri: src}} />
    </Layout>
  );
};
