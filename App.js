import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, } from 'react-native';
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
          options={{
            title: 'La Galerie',
            headerStyle: {
              backgroundColor: 'snow',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Bodoni 72',
              fontSize: 40,
              letterSpacing: 2,
            },
          }}
        />

        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (

      <View style={{flex: 1, flexDirection: 'column', }}>

        <View style={{flex:1, backgroundColor: 'snow', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{height:600, width:472, }}
            source={'https://upload.wikimedia.org/wikipedia/commons/6/65/George_Washington_Lambert_-_Egg_and_cauliflower_still_life.jpg'}
          />
        </View>

        <View style={{flex: 1, backgroundColor: 'snow', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
        <Text>
          home screen
        </Text>

        <Button style={styles.buttonStyle}
          title="Go to profile"
          onPress={() =>
            navigation.navigate('Profile', { name: 'profile', greeting:'Hi!' })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />
        </View>

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
  textStyle: {
    fontFamily: 'Bodoni 72',
    letterSpacing: 2,
    fontSize: 20,
  },
});
