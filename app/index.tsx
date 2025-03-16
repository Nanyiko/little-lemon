import { useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoarding from '@/screens/OnBoarding';
import Profile from '@/screens/Profile';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null means still loading
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState("")

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
      }
    };

    loadUserData();
  }, []);

  if (loggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={"#EDEFEE"} translucent={true} barStyle={"dark-content"} />
      <Stack.Navigator initialRouteName={loggedIn ? "Profile" : "OnBoarding"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding">
            {props => <OnBoarding {...props} setLoggedIn={setLoggedIn} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhoneNumber={setPhoneNumber} loggedIn={loggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {props => <Profile {...props} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} setLoggedIn={setLoggedIn} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhoneNumber={setPhoneNumber} loggedIn={loggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
    </>
  );
}
