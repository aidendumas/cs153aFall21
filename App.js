import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
      <View style={{ flexDirection: 'row',
                     margin:"25px",
                     border:"thick solid black",
                     padding:'10px',
                     justifyContent: 'space-around', }}>

        <Text> home screen </Text>

        <Button
          title="Go to profile"
          onPress={() =>
            navigation.navigate('Profile', { name: 'profile', greeting:'Hi!' })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />
    </View>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return (
    <Text style={styles.textStyle}>
      profile
    </Text>
  );
};

export default function App() {
  return (
    <MyStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize:60,
    color:'red',

  },
});
