import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'
import LoginForm from './screens/LoginForm'
import TabBar from './components/TabBar'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Details from './screens/Details';

const Stack = createStackNavigator();
console.disableYellowBox = true
export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator headerMode={false}>
              <Stack.Screen name="login" component={LoginForm} />
              <Stack.Screen name="detail" component={Details} />
              <Stack.Screen name="tabbar" component={TabBar} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    </ApolloProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('MyApp', () => App)