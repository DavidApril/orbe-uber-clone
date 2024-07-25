import {Icon, useTheme} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  width?: number;
  height?: number;
  fill?: string;
}

export const CustomIcon = ({
  name,
  color,
  white = false,
  height = 23,
  width = 23,
  fill,
}: Props) => {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  return (
    <Icon
      style={{
        width: width,
        height: height,
      }}
      fill={fill ?? color}
      name={name}
    />
  );
};
