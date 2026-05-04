/**
 * Main App Component
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import store from '@redux/store';
import AppNavigator from '@/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate some loading time for resources
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Load any fonts or other resources here
        // await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
