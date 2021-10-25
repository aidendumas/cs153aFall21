import { StatusBar } from 'expo-status-bar';
import  React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const headerFontSize = 40;
const defaultURL = 'https://upload.wikimedia.org/wikipedia/commons/6/65/George_Washington_Lambert_-_Egg_and_cauliflower_still_life.jpg';

const StackNav = () => {





  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Gallery',
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

        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
          options={{
            title: 'Preferences',
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

const HomeScreen = ({ navigation, route }) => {

  const [imageURL, setImageURL] = useState(defaultURL);





  useEffect(() => {
    if (route.params?.imageURL) {
      setImageURL(route.params.imageURL)

    }
  }, [route.params?.imageURL]);

  return (

      <View style={styles.homeStyle}>

        <View style={{flex:1, backgroundColor: 'snow', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{height: "100%", width: "100%", resizeMode: 'contain', }}
            source={imageURL}
          />
        </View>

        <View style={{flex: 1, backgroundColor: 'snow', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>


        <TouchableOpacity onPress={() => navigation.navigate('Preferences', { name: 'Preferences', paramKey: imageURL })}>
          <Text style={styles.textStyle}>
            Preferences
          </Text>
        </TouchableOpacity>



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
      Gallery is an app-in-construction that aims to allow users to create and customize their own art galleries through
      making their own directories and filling them with images and information from the web
    </Text>
  );
};

const PreferencesScreen = ({ navigation, route }) => {

  const [imageURL, setImageURL] = useState(route.params.paramKey)
  return (
    <View>

      <Text style={styles.textStyle}>
        Home Screen URL
      </Text>

      <View style={{backgroundColor: 'cornsilk'}}>
      <TextInput
        style = {styles.textStyle}
        defaultValue = {imageURL}
        onChangeText={text => {setImageURL(text)}}
      />
      </View>

      <Text>{' '}</Text>
      <TouchableOpacity onPress={() => navigation.navigate({ name: 'Home', params: { imageURL: imageURL }, merge: true,})}>
        <Text style={styles.textStyle}>
          Done
        </Text>
      </TouchableOpacity>


    </View>
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
  homeStyle: {
    flex: 1,
    flexDirection: 'column',
  }
});
