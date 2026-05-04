/**
 * Navigation Configuration
 */

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '@utils/helpers';

// Screens
import HomeScreen from '@screens/HomeScreen';
import AnalysisScreen from '@screens/AnalysisScreen';
import HistoryScreen from '@screens/HistoryScreen';
import CommentsScreen from '@screens/CommentsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.surface,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{
        title: 'Instagram Sentiment Analysis',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Analysis"
      component={AnalysisScreen}
      options={{
        title: 'Analysis Results',
      }}
    />
    <Stack.Screen
      name="Comments"
      component={CommentsScreen}
      options={{
        title: 'All Comments',
      }}
    />
  </Stack.Navigator>
);

const HistoryStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.surface,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen
      name="HistoryMain"
      component={HistoryScreen}
      options={{
        title: 'Analysis History',
      }}
    />
    <Stack.Screen
      name="HistoryAnalysis"
      component={AnalysisScreen}
      options={{
        title: 'Analysis Results',
      }}
    />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            title: 'Analyze',
            tabBarLabel: 'Analyze',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📱</Text>,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryStackNavigator}
          options={{
            title: 'History',
            tabBarLabel: 'History',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
