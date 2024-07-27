import React from 'react';
import {View} from 'react-native';
import {Typewriter} from './type-writter';

export const ChatIsWritting = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: 40,
        height: 20,
        borderRadius: 50,
      }}>
      <Typewriter
        style={{
          width: 'auto',
          // padding: 5,
          fontSize: 15,
          justifyContent: 'center',
          textAlign: 'center',
          textAlignVertical: 'center',
          alignItems: 'center',
        }}
        delay={100}
        text="..."
      />
    </View>
  );
};
