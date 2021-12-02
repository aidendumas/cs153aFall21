import { StatusBar } from 'expo-status-bar';
import  React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValueProvider, {useValue} from './Components/ValueContext'
import YourGallery from './Components/YourGallery'



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

        <Stack.Screen
          name="Your Gallery"
          component={YourGallery}
          options={{
            title: 'Your Gallery',
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

  const {currentValue, setCurrentValue} = useValue();

  const getGallery = async () => {
    const val = await AsyncStorage.getItem('gallery')
    if (val != null) {
      setCurrentValue({newURL:val})
    }
  };


  useEffect(() => {
    getGallery()
  }, []);


  const [imageURL, setImageURL] = useState(defaultURL);
  const [saved, getSaved] = useState(false)
  const [get, setGet] = useState(false)
  const [start, setStart] = useState(true)



  const saveValues = async () => {
    await AsyncStorage.setItem('custom', imageURL);
  };

const getValues = async () => {
  const val = await AsyncStorage.getItem('custom')
  if (val != null) {
    setImageURL(val)
  }
};

useEffect(() => {
  if (start) {
    getValues()
    setStart(false)
  }
});


useEffect(() => {
  if (saved) {
    saveValues()
    getSaved(false)
  }
});

  useEffect(() => {
    if (route.params?.imageURL) {
      setImageURL(route.params.imageURL)
      getSaved(true)
    }
  }, [route.params?.imageURL]);



  return (

      <View style={styles.homeStyle}>

        <View style={{flex:1, backgroundColor: 'snow', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{height: "100%", width: "100%", resizeMode: 'contain', }}
            source={{uri: imageURL}}
          />
        </View>

        <View style={{flex: 1, backgroundColor: 'snow', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>


        <TouchableOpacity onPress={() => navigation.navigate('Preferences', { name: 'Preferences', paramKey: imageURL })}>
          <Text style={styles.textStyle}>
            Preferences
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Your Gallery', { name: 'YourGallery' })}>
          <Text style={styles.textStyle}>
            Your Gallery
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
      Gallery is an app that aims to allow users to create and customize their own art galleries through
      making their own url directories to not take up local storage
    </Text>
  );
};

const PreferencesScreen = ({ navigation, route, value, label }) => {

  const [imageURL, setImageURL] = useState(route.params.paramKey)
  const [saved, setSaved] = useState(false)
  const [newIm, setNewIm] = useState(0)
  const [clear, setClear] = useState(false)

  const [input, setInput] = useState("")



  const saveGallery = async () => {
    await AsyncStorage.setItem('gallery', currentValue.newURL);
    setSaved(true)
    setNewIm(newIm+1)
  };

  const {currentValue, setCurrentValue} = useValue();

  const updateData = () => {
    saveGallery()
  }

  const add = () => {
    setCurrentValue({newURL:currentValue.newURL + input + " "})
    setInput("")
    updateData()
  }


  let saveView = <View></View>
  if (saved) {
    saveView =
      <View>
        <Text style={styles.textStyle}>
          Saved {newIm} New Images
        </Text>
      </View>
  }

  let clearView = <View></View>
  if (clear) {
    clearView =
      <View>
        <Text style={styles.textStyle}>
          Gallery has Been Emptied
        </Text>
      </View>
  }



  const navPress = () => {
    setSaved(false)
    setNewIm(0)
    navigation.navigate({ name: 'Home', params: { imageURL: imageURL }, merge: true,})
  }

  const clearData = async () => {
    await AsyncStorage.clear()
    setCurrentValue({newURL:""})
    setClear(true)
  }

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
      <TouchableOpacity onPress={() => navPress()}>
        <Text style={styles.textStyle}>
          Done
        </Text>
      </TouchableOpacity>

      <Text>{" "}</Text>

      <Text style={styles.textStyle}>
        Add Image URL for Gallery
      </Text>

      <View style={{backgroundColor: 'cornsilk'}}>
      <TextInput
        style = {styles.textStyle}
        value = {input}
        onChangeText={text => {setInput(text)}}
      />
      </View>

      <Text>{' '}</Text>
      <TouchableOpacity onPress={() => add()}>
        <Text style={styles.textStyle}>
          Done
        </Text>
      </TouchableOpacity>

      <Text>
        {" "}
      </Text>
      {saveView}

      <Text>
        {" "}
      </Text>

      <TouchableOpacity onPress={() => clearData()}>
        <Text style={styles.textStyle}>
          Clear All Data
        </Text>
      </TouchableOpacity>

      <Text>
        {" "}
      </Text>

      {clearView}





    </View>
  );
};

export default function App() {



  const contextData = {newURL: ""}

  return (
    <ValueProvider value={contextData}>
      <StackNav/>
    </ValueProvider>
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
