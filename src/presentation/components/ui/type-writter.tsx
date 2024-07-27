import {useEffect, useState} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

export const Typewriter = ({
  text,
  delay,
  style,
}: {
  text: string;
  delay: number;
  style?: StyleProp<TextStyle>;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <Text style={style}>{currentText}</Text>;
};
