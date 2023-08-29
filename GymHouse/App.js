import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from './components/UserProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
        {/* Define your screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
