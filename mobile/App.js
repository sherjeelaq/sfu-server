import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Host from './Host';
import Guest from './Guest';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Host" component={Host} />
        <Stack.Screen name="Guest" component={Guest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
