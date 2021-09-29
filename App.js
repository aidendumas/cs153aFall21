import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const headerFontSize = 40;

const StackNav = () => {
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
              fontSize: headerFontSize,
              letterSpacing: 2,
            },
          }}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'About',
            headerStyle: {
              backgroundColor: 'snow',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Bodoni 72',
              fontSize: headerFontSize,
              letterSpacing: 2,
            },
          }}
        />

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


          <Text style={styles.textStyle}>
            Home Screen
          </Text>



          <TouchableOpacity onPress={() => navigation.navigate('About', { name: 'About' })}>
            <Text style={styles.textStyle}>
              About
            </Text>
          </TouchableOpacity>


        </View>

      </View>

  );
};
const AboutScreen = ({ navigation, route }) => {
  return (
    <Text style={styles.textStyle}>
      La Galerie (The Gallery) is an app-in-construction that aims to allow users to create and customize their own art galleries through
      making their own directories and filling them with images and information from the web
    </Text>
  );
};

export default function App() {
  return (
    <StackNav/>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Bodoni 72',
    letterSpacing: 2,
    fontSize: 20,
  },
});
