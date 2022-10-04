import { React } from "react";

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';


// Navigation ----------
import { NavigationContainer } from '@react-navigation/native'; // installed package
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // installed package

// Import Screen ----------
import { WelcomeScreen, SignupScreen, SigninScreen, HomeScreen, UserWelcomeScreen, TrainerWelcomeScreen, UserSignupScreen } from "./src/screens"
import { SignoutButton, BottomPopup } from './components/SignoutButton'

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
    }
  })

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
