import React from 'react';
import {View} from 'react-native';
import {Typewriter} from './type-writter';

export const ChatIsWritting = () => {
  return (
    <View
      style={{
        backgroundColor: '#ccc',
        width: '15%',
        borderRadius: 50,
        padding: 5,
      }}>
      <Typewriter
        style={{
          width: 'auto',
          fontSize: 15,
          justifyContent: 'center',
          textAlign: 'center',
          textAlignVertical: 'center',
          alignItems: 'center',
          color: 'white'
        }}
        delay={100}
        text="..."
      />
    </View>
  );
};
