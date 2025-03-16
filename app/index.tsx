import { useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoarding from '@/screens/OnBoarding';
import Profile from '@/screens/Profile';
import SplashScreen from '@/components/SplashScreen';
import HomePage from '@/screens/HomePage'

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null means still loading
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("contactInformation");
        if (jsonValue) {
          const contactInfo = JSON.parse(jsonValue);
          setFirstName(contactInfo.name ?? "");
          setLastName(contactInfo.lastName ?? "");
          setEmail(contactInfo.email ?? "");
          setPhoneNumber(contactInfo.phoneNumber ?? "");
          setLoggedIn(contactInfo.loggedIn ?? false);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.error("Failed to load user data", e);
        setLoggedIn(false);
      } finally {
        setIsLoading(false); // Set loading to false after data is loaded
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} translucent={true} barStyle={"dark-content"} />
      <Stack.Navigator initialRouteName={loggedIn ? "HomePage" : "OnBoarding"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding">
            {props => <OnBoarding {...props} setLoggedIn={setLoggedIn} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhoneNumber={setPhoneNumber} loggedIn={loggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {props => <Profile {...props} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} setLoggedIn={setLoggedIn} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhoneNumber={setPhoneNumber} loggedIn={loggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="HomePage">
            {props => <HomePage {...props} firstName={firstName} lastName={lastName} loggedIn={loggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
    </>
  );
}
