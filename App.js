import { React } from "react";

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';


// Navigation ----------
import { NavigationContainer } from '@react-navigation/native'; // installed package
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // installed package

// Import Screen ----------
import { 
  WelcomeScreen,
  UserWelcomeScreen, UserSignupScreen, UserSignupProfScreen, UserSigninScreen, UserHomeScreen, UserTrainerDetailsScreen, UserSearchScreen, UserWorkoutListScreen, UserSettingScreen,
  TrainerWelcomeScreen, TrainerSignupScreen, TrainerSignupProfScreen, TrainerSigninScreen, TrainerHomeScreen
} from "./src/screens"

import { SignoutButton } from './components/SignoutButton'
import { DisplayAllButton } from './components/DisplayAllButton'

// Create stack navigator ----------
const Stack = createNativeStackNavigator()

// Firebase config ---------- // installed package
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc, getDatabase, ref, set } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'

const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const db = getFirestore( FBapp )  // initialize Firestore

export default function App() {

  const [ user, setUser ] = useState()

  // State to set data
  const [appData, setAppData] = useState() // for users data

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if(user) {
      setUser( user )

      console.log("here in Auth");
      // when auth get data ---------
      if(!appData) {
        getData(`user/${user.uid}/profile`)
      }

    }
    else {
      setUser( null )
    }
  })

  // Create account: Add email and password into firebase auth ---------
  const register = (email, password) => {
    console.log("register: " + email, password)
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Create account: Add profile date into firebase ---------
  const addData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    console.log(ref.id);
  }

  // Create account: Add profile date into firebase ---------
  const addTrainerData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    // console.log(ref.id);
  }
  const addTrainerDataList = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    // console.log("email: " + data.email, FScollection);
  }

  // User: Sign in ---------
  const signin = ( email, password ) => {

    // console.log("id: " + user.uid)
    console.log("here in singin " + email);

    signInWithEmailAndPassword(authObj, email, password )
      .then(
        (userCredential) => setUser(userCredential.user)
      )
      .catch((error) => {
        console.log(error)
        Alert.alert(
          "Email or password are wrong.",
          "Please try again!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ])
      })
  }

  // Get user data to display ----------
  const getData = ( FScollection ) => {
    const FSquery = query( collection(db, FScollection) )
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      console.log("Start to get data");
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      // console.log(FSdata);
      setAppData( FSdata )  
    })
  }


  // Sign Out -----------
  const signout = () => {
  //   const authObj = getAuth()
  //   authObj.signOut()
    setAppData("")
    signOut( authObj )
    .then( () => {
      // sign out successful
      console.log("sign out...");
    })
    .catch( () => {
      // sign out errors
      console.log("sign out fail...");
    })
  }
  // Sign Out to trainer screen -----------
  const signoutToTrainerScreen = () => {
    signOut( authObj )
    .then( () => {
      // sign out successful
      console.log("sign out...");
      na
    })
    .catch( () => {
      // sign out errors
      console.log("sign out fail...");
    })
  }




  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="WelcomeScreen" options={{
          headerTitle: "Welcome!",
          headerTitleAlign: "center",
          }} component={WelcomeScreen}>
        </Stack.Screen>

        <Stack.Screen name="UserWelcomeScreen" options={{
          headerTitle: "User Login",
          headerTitleAlign: "center",
          }} component={UserWelcomeScreen}>
        </Stack.Screen>

        <Stack.Screen name="UserSignupScreen" options={{
          headerTitle: "Create a user account",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <UserSignupScreen {...props} signup={register} auth={user} /> }
        </Stack.Screen>
        
        <Stack.Screen name="UserSignupProfScreen" options={{
          headerTitle: "Profile",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <UserSignupProfScreen {...props} add={addData} auth={user} data={appData} /> }
        </Stack.Screen>

        <Stack.Screen name="UserSigninScreen" options={{
          headerTitle: "User Signin",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
        { ( props ) => <UserSigninScreen {...props} signin={signin} auth={user} data={appData} signout={signout} /> }
        </Stack.Screen>

        <Stack.Screen name="UserHomeScreen" options={{
          headerTitle: "Search Trainer",
          headerTitleAlign: "center",
          headerRight: ( props ) => <DisplayAllButton/>,
          headerLeft: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
          { ( props ) => <UserHomeScreen {...props} auth={user} data={appData} signoutToTrainerScreen={signoutToTrainerScreen} /> }
        </Stack.Screen>

        <Stack.Screen name="UserTrainerDetailsScreen" options={{
          headerTitle: "Trainer",
          headerTitleAlign: "center",
          }} component={UserTrainerDetailsScreen}>
        </Stack.Screen>

        <Stack.Screen name="UserSearchScreen" options={{
          headerTitle: "Search",
          headerTitleAlign: "center",
          }} component={UserSearchScreen}>
        </Stack.Screen>

        <Stack.Screen name="UserWorkoutListScreen" options={{
          headerTitle: "Your Workout",
          headerTitleAlign: "center",
          }} component={UserWorkoutListScreen}>
        </Stack.Screen>

        <Stack.Screen name="UserSettingScreen" options={{
          headerTitle: "Setting",
          headerTitleAlign: "center",
          }} component={UserSettingScreen}>
        </Stack.Screen>

        {/* ------------------------------------------------------------------------------------------------------------------- */}

        <Stack.Screen name="TrainerWelcomeScreen" options={{
          headerTitle: "Trainer Login",
          headerTitleAlign: "center",
          }} component={TrainerWelcomeScreen}>
        </Stack.Screen>

        <Stack.Screen name="TrainerSignupScreen" options={{
          headerTitle: "Create a trainer account",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerSignupScreen {...props} signup={register} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerSignupProfScreen" options={{
          headerTitle: "Profile",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerSignupProfScreen {...props} add={addTrainerData} addProfList={addTrainerDataList} auth={user} data={appData} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerSigninScreen" options={{
          headerTitle: "Trainer Signin",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerSigninScreen {...props} signin={signin} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerHomeScreen" options={{
          headerTitle: "Trainer Home",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
          { ( props ) => <TrainerHomeScreen {...props} auth={user} /> }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
