import { React } from "react";

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';


// Navigation ----------
import { NavigationContainer } from '@react-navigation/native'; // installed package
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // installed package

// Import Screen ----------
import { WelcomeScreen, SignupScreen, SigninScreen, HomeScreen } from "./src/screens"
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
  return (
    <NavigationContainer>
      <Stack.Navigator name="WelcomeScreen" options={{
          headerTitle: "Welcome!",
          headerTitleAlign: "center",
          }} component={WelcomeScreen}>
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
