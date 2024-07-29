import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { globalColors } from '../../theme/styles';
import { OpenDrawerMenu } from '../../components';
import { useUIStore } from '../../../store';

export const FavoritesScreen = () => {
  const {isDarkMode} = useUIStore();

  const {width, height} = useWindowDimensions()
  return (
    <Layout style={{
      justifyContent: 'center', 
      backgroundColor: isDarkMode
        ? globalColors.neutralColors.backgroundDark
        : globalColors.neutralColors.background, 
      alignItems: 'center', 
      height: height
    }}>
      <OpenDrawerMenu />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: globalColors.primaryColors.primary }}>Aqui estaran tus favoritos</Text>
    </Layout>
  );
};
