
import { useTheme } from "../theme/ThemeProvider";

const colors = {
    light: {
        backgroundColor:  '#FFFFFF',
        buttonColor:'#8E6CEF',
        textColor:'#000000',
        splashBackground:'#8E6CEF',
        fieldBackground: '#F4F4F4',
        placeholderColor: '#272727',
        buttonTextColor: '#FFFFFF'
    },
    dark: {
        backgroundColor: '#000000',
        buttonColor:'6D3FF0',
        textColor:'#FFFFFF',
        splashBackground:'#8E6CEF',
        fieldBackground: '#F4F4F4',
        placeholderColor: '#272727',
        buttonTextColor: '#FFFFFF'
    },
  };
  export const useColors = () => {
    const theme = useTheme();
    return theme.theme === 'dark' ? colors.dark : colors.light;
  };
  
  export default colors;