import { React } from "react";

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';


// Navigation ----------
import { NavigationContainer } from '@react-navigation/native'; // installed package
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // installed package

// Import Screen ----------
import { WelcomeScreen, SignupScreen, SigninScreen, HomeScreen, UserWelcomeScreen, TrainerWelcomeScreen, UserSignupScreen, UserSignupProfScreen, UserSigninScreen } from "./src/screens"
import { SignoutButton } from './components/SignoutButton'

// Create stack navigator ----------
const Stack = createNativeStackNavigator()

// Firebase config ---------- // installed package
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'

const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const db = getFirestore( FBapp )  // initialize Firestore

export default function App() {

  const [ user, setUser ] = useState()

  // State to set data
  const [appData, setAppData] = useState()

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if(user) {
      setUser( user )
      // when auth get data ---------
      if(!appData) {
        getData(`user/${user.uid}/profile`)
      }
    }
    else {
      setUser( null )
      // Alert.alert(
      //   "This email is already used.",
      //   [
      //     { text: "OK", onPress: () => console.log("OK Pressed") }
      //   ]
      // )
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

  // Sign Out -----------
  const signout = () => {
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
          headerTitle: "Create an account",
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
          }} component={UserSigninScreen}>
        </Stack.Screen>
        
        <Stack.Screen name="HomeScreen" options={{
          headerTitle: "Search Trainer",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
          { ( props ) => <HomeScreen {...props} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerWelcomeScreen" options={{
          headerTitle: "Trainer Login",
          headerTitleAlign: "center",
          }} component={TrainerWelcomeScreen}>
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
