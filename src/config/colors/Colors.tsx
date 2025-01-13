
import { useTheme } from "../theme/ThemeProvider";

const colors = {
  light: {
    backgroundColor: '#FFFFFF',
    buttonColor: '#8E6CEF',
    textColor: '#000000',
    splashBackground: '#8E6CEF',
    fieldBackground: '#F4F4F4',
    placeholderColor: '#27272780',
    buttonTextColor: '#FFFFFF',
    tabBarInActiveColor: '#27272780',
    tabBarActiveColor: '#8E6CEF',
    white: '#FFFFFF',
    bottomTabBackgroundColor: '#FFFFFF',
    red: "#FA3636",
    productCardBackground:"rgba(0, 0, 0, 0.5)"

  },
  dark: {
    backgroundColor: '#000000',
    buttonColor: '6D3FF0',
    textColor: '#FFFFFF',
    splashBackground: '#8E6CEF',
    fieldBackground: '#F4F4F4',
    placeholderColor: '#272727',
    buttonTextColor: '#FFFFFF',
    tabBarInActiveColor: '#27272780',
    tabBarActiveColor: '#8E6CEF',
    white: '#FFFFFF',
    bottomTabBackgroundColor: '#FFFFFF',
    red: "#FA3636",
    productCardBackground:"rgba(0, 0, 0, 0.5)"
  },
};
export const useColors = () => {
  const theme = useTheme();
  return theme.theme === 'dark' ? colors.dark : colors.light;
};

export default colors;