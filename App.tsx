import React, { useState, useEffect } from 'react';
import SplashScreen from './src/app/features/splash/SplashScreen';
import { ThemeProvider } from './src/config/theme/ThemeProvider';
import { AuthProvider } from './src/config/auth/AuthProvider';
import { Cloth } from './src/app/features/main/Cloth.app';
import { CartProvider } from './src/config/cart_state/CartDataProvider';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <SplashScreen />;
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Cloth />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
