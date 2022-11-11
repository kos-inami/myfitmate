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
  UserWelcomeScreen, UserSignupScreen, UserSignupProfScreen, UserSigninScreen, UserHomeScreen, UserTrainerDetailsScreen, UserSearchScreen, UserWorkoutListScreen, UserWorkoutDetailsScreen, UserSettingScreen, UserProfileScreen, UserAccountScreen, 
  TrainerWelcomeScreen, TrainerSignupScreen, TrainerSignupProfScreen, TrainerSigninScreen, TrainerHomeScreen, TrainerProfileScreen, TrainerAccountScreen
} from "./src/screens"

import { SignoutButton } from './components/SignoutButton'
import { DisplayAllButton } from './components/DisplayAllButton'

// Create stack navigator ----------
const Stack = createNativeStackNavigator()

// Firebase config ---------- // installed package
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc, getDatabase, set, where } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'

const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const db = getFirestore( FBapp )  // initialize Firestore
// const storage = getStorage(FBapp)

export default function App() {

  const [ user, setUser ] = useState()
  const [ trainer, setTrainer ] = useState()

  // State to set data
  const [appData, setAppData] = useState() // for users data
  const [appWorkoutData, setAppWorkoutData] = useState() // for users workout data

  const [appTrainerData, setAppTrainerData] = useState() // for users workout data

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if(user) {
      setUser( user )

      console.log("here in user Auth " + user.uid);
      // when auth get data ---------
      if(!appData) {
        getData(`user/${user.uid}/profile`)
        getWorkoutData(`user/${user.uid}/workout`)
      }

    }
    else {
      setUser( null )
    }
  })
  onAuthStateChanged( authObj, (trainer) => {
    if(trainer) {
      setTrainer( trainer )

      console.log("here in trainer Auth " + trainer.uid);
      // when auth get data ---------
      if(!appTrainerData) {
        console.log("hello");
        getTrainerData(`trainer/${trainer.uid}/profile`)
      }

    }
    else {
      setTrainer( null )
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
  // Get trainer data to display ----------
  const getTrainerData = ( FScollection ) => {
    const FSquery = query( collection(db, FScollection) )
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      console.log("Start to get TRAINER data");
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      console.log(FSdata);
      setAppTrainerData( FSdata )
    })
  }

  // User Workout: Add task data into firebase ---------
  const addWorkoutData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    console.log(ref.id);
  }
  // Get user data to display ----------
  const getWorkoutData = ( FScollection ) => {
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
      setAppWorkoutData( FSdata )  
    })
  }
  // User workout: Delete data of workout into firebase ---------
  const deleteData = async (del) => {
    console.log("deleted:" + del)
    await deleteDoc(doc(db, `user/${user.uid}/workout`, del));
  }

  // User workout:  Update workout data in firebase ---------
  const updateNameData = async (upd, itemId) => {
    console.log("updated:" + upd + " itemId: " + itemId)
    const updateDocRef = doc(db, `user/${user.uid}/workout`, itemId)
    await updateDoc(updateDocRef, {
      "name": upd
    })
  }
  const updateWeightData = async (upd, itemId) => {
    console.log("updated:" + upd + " itemId: " + itemId)
    const updateDocRef = doc(db, `user/${user.uid}/workout`, itemId)
    await updateDoc(updateDocRef, {
      "weight": upd
    })
  }
  const updateRapData = async (upd, itemId) => {
    console.log("updated:" + upd + " itemId: " + itemId)
    const updateDocRef = doc(db, `user/${user.uid}/workout`, itemId)
    await updateDoc(updateDocRef, {
      "rap": upd
    })
  }
  const updateDetailsData = async (upd, itemId) => {
    console.log("updated:" + upd + " itemId: " + itemId)
    const updateDocRef = doc(db, `user/${user.uid}/workout`, itemId)
    await updateDoc(updateDocRef, {
      "details": upd
    })
  }

  // Update user prof date in firebase ---------
  const updateUserProf = async (FScollection, data) => {
    console.log("path:" + FScollection + " itemPhotoURL: " + data.photo)
    console.log(data)
    const updateDocRef = doc(db, FScollection, data.id)
    await updateDoc(updateDocRef, {
      "genderSelected": data.genderSelected, 
      "ageSelected": data.ageSelected, 
      "trainerGenderSelected": data.trainerGenderSelected, 
      "regimeSelected": data.regimeSelected, 
      "goalSelected": data.goalSelected, 
      "details": data.details,
      "photo": data.photo,
    })
  }
  // Update user account date in firebase ---------
  const updateAccount = async (FScollection, data) => {
    console.log("path:" + FScollection + " itemId: " + data.id)
    console.log(data)
    const updateDocRef = doc(db, FScollection, data.id)
    await updateDoc(updateDocRef, {
      "locationSelected": data.locationSelected, 
      "firstName": data.firstName, 
      "lastName": data.lastName, 
      "phone": data.phone,
    })
  }

  // Update trainer prof date in firebase ---------
  const updateTrainerProf = async (FScollection, data) => {
    console.log("Prof -------------------------------------------------------------------------------------------------------------------");
    console.log("Prof path:" + FScollection + " itemId: " + data.id)
    console.log(data)
    const updateDocRef = doc(db, FScollection, data.id)
    await updateDoc(updateDocRef, {
      "gender": data.gender, 
      "age": data.age, 
      "trainGender": data.trainGender, 
      "professional": data.professional, 
      "availableDate": data.availableDate, 
      "details": data.details,
      "photo": data.photo,
    })
  }

  const [trainerListId, setTrainerListId] = useState('')
  const [FSdataForTrainerList, setFSdataForTrainerList] = useState('')
  // Update trainer prof date in firebase ---------
  const updateTrainerProfList = async (FScollectionList, data) => {
    console.log("List path -------------------------------------------------------------------------------------------------------------------");
    console.log("List path:" + FScollectionList + " itemId: " + data.id)

    const updateDocRef = query( collection(db, FScollectionList), where("trainerListId", "==", data.id ))
    const unsubscribe = onSnapshot(updateDocRef, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
          let itemTrainer = {}
          itemTrainer = doc.data()
          itemTrainer.id = doc.id
          FSdata.push( itemTrainer )
      })
      console.log("list ID ========================== " + FSdata[0].id);
      setTrainerListId(FSdata[0].id);

      const updateTrainerDoc = doc(db, FScollectionList, FSdata[0].id)
      updateDoc(updateTrainerDoc, {
        "gender": data.gender, 
        "age": data.age, 
        "trainGender": data.trainGender, 
        "professional": data.professional, 
        "availableDate": data.availableDate, 
        "details": data.details,
        "photo": data.photo,
      })
      
    })
  }

  // Update trainer account date in firebase ---------
  const updateTrainerAccount = async (FScollection, data) => {
    console.log("path:" + FScollection + " itemId: " + data.id)
    console.log(data)
    const updateDocRef = doc(db, FScollection, data.id)
    await updateDoc(updateDocRef, {
      "location": data.location, 
      "firstName": data.firstName, 
      "lastName": data.lastName, 
      "phone": data.phone,
    })
  }
  // Update trainer prof date in firebase ---------
  const updateAccountTrainerList = async (FScollection, data) => {
    console.log("path:" + FScollection + " itemId: " + data.id)
    console.log(data)
    const updateDocRef = query( collection(db, FScollection), where("trainerListId", "==", data.id ))
    const unsubscribe = onSnapshot(updateDocRef, (querySnapshot) => {
      let FSdataTrainer = []
      querySnapshot.forEach((doc) => {
          let itemTrainer = {}
          itemTrainer = doc.data()
          itemTrainer.id = doc.id
          FSdataTrainer.push( itemTrainer )
      })
      console.log("data here ----------");
      console.log(FSdataTrainer[0].id);
      // setTrainerListId(FSdataTrainer[0].id);
  })  
    console.log(trainerListId, data.location, data.firstName, data.lastName, data.phone);
    const updateTrainerDoc = doc(db, FScollection, trainerListId)
    await updateDoc(updateTrainerDoc, {
      "location": data.location, 
      "firstName": data.firstName, 
      "lastName": data.lastName, 
      "phone": data.phone,
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
          headerTitle: "User Login",
          headerTitleAlign: "center",
          }}>
        { ( props ) => <UserSigninScreen {...props} signin={signin} auth={user} data={appData} signout={signout} /> }
        </Stack.Screen>

        <Stack.Screen name="UserHomeScreen" options={{
          headerTitle: "Search Trainer",
          headerTitleAlign: "center",
          headerRight: ( props ) => <DisplayAllButton/>,
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
          }}>
          { ( props ) => <UserWorkoutListScreen {...props} addWorkout={addWorkoutData} auth={user} data={appWorkoutData} /> }
        </Stack.Screen>

        <Stack.Screen name="UserWorkoutDetailsScreen" options={{
          headerTitle: "Workout Details",
          headerTitleAlign: "center",
          }}>
          { (props ) => <UserWorkoutDetailsScreen {...props} del={deleteData} updateName={updateNameData} updateWeight={updateWeightData} updateRap={updateRapData} updateDetails={updateDetailsData}/> }
        </Stack.Screen>

        <Stack.Screen name="UserSettingScreen" options={{
          headerTitle: "Setting",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <UserSettingScreen {...props} auth={user} data={appData} /> }
        </Stack.Screen>

        <Stack.Screen name="UserProfileScreen" options={{
          headerTitle: "Your profile",
          headerTitleAlign: "center",
          }}>
            { ( props ) => <UserProfileScreen {...props} auth={user} data={appData} update={updateUserProf}/> }
        </Stack.Screen>

        <Stack.Screen name="UserAccountScreen" options={{
          headerTitle: "Account details",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
            { ( props ) => <UserAccountScreen {...props} auth={user} data={appData} updateAccount={updateAccount} /> }
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
          { ( props ) => <TrainerSignupScreen {...props} signup={register} auth={trainer} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerSignupProfScreen" options={{
          headerTitle: "Profile",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerSignupProfScreen {...props} auth={trainer} add={addTrainerData} addProfList={addTrainerDataList} data={appTrainerData} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerSigninScreen" options={{
          headerTitle: "Trainer Login",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerSigninScreen {...props} signin={signin} auth={trainer} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerHomeScreen" options={{
          headerTitle: "Trainer Home",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <TrainerHomeScreen {...props} auth={trainer} data={appTrainerData} /> }
        </Stack.Screen>

        <Stack.Screen name="TrainerProfileScreen" options={{
          headerTitle: "Your profile",
          headerTitleAlign: "center",
          }}>
            { ( props ) => <TrainerProfileScreen {...props} auth={trainer} data={appTrainerData} update={updateTrainerProf} updateList={updateTrainerProfList}/> }
        </Stack.Screen>

        <Stack.Screen name="TrainerAccountScreen" options={{
          headerTitle: "Account detail",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
            { ( props ) => <TrainerAccountScreen {...props} auth={trainer} data={appTrainerData} updateAccount={updateTrainerAccount} updateAccountTrainerList={updateAccountTrainerList}/> }
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
