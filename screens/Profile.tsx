import LittleLemonHeader from '@/components/LittleLemonHeader';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, Image, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import { validateEmail } from '@/utils';

function Profile({ firstName, lastName, email, phoneNumber, setFirstName, setLastName, setEmail, setPhoneNumber, setLoggedIn, navigation, loggedIn }: { firstName: string, lastName: string, email: string, phoneNumber: string, setFirstName: (name: string) => void, setLastName: (name: string) => void, setEmail: (email: string) => void, setPhoneNumber: (phone: string) => void, setLoggedIn: (name: boolean) => void, loggedIn: boolean, navigation: any }) {
  const [orderStatus, setOrderStatus] = useState(true)
  const [passwordChanges, setpasswordChanges] = useState(true)
  const [specialOffers, setSpecialOffers] = useState(true)
  const [newsletters, setnewsletters] = useState(true)
  const [active, setActive] = useState(false)
  const [image, setImage] = useState(null);

  useEffect(() => {
    const allFieldsFull = firstName !== "" && validateEmail(email) && phoneNumber.length >= 10 && lastName !== ""
    if (allFieldsFull){
        setActive(true)
    }
    if (!allFieldsFull){
        setActive(false)
    }
  }, [firstName, email, phoneNumber, lastName])

  const notificationPreferences = JSON.stringify({
    orderStatus: orderStatus,
    passwordChanges: passwordChanges,
    specialOffers: specialOffers,
    newsletters: newsletters
  });

  const loadContactInformation = async () => {
    try {
      const contactJsonValue = await AsyncStorage.getItem("contactInformation");
      if (contactJsonValue) {
        const contactInfo = JSON.parse(contactJsonValue);
        setFirstName(contactInfo.name ?? "");
        setLastName(contactInfo.lastName ?? "");
        setEmail(contactInfo.email ?? "");
        setPhoneNumber(contactInfo.phoneNumber ?? "");
        setLoggedIn(contactInfo.loggedIn ?? false);
      }
    } catch (e) {
      console.error("Failed to load contact information.", e )
    }
  };

  useEffect(() => {
    loadContactInformation()
  }, [])

  const loadNotificationPreferences = async ()=> {
    try{
      const notificationJsonValue = await AsyncStorage.getItem("notificationPreferences")
      if (notificationJsonValue != null){
        const notificationPrefs = JSON.parse(notificationJsonValue)
        setOrderStatus(notificationPrefs.orderStatus ?? true);
        setpasswordChanges(notificationPrefs.passwordChanges ?? true);
        setSpecialOffers(notificationPrefs.specialOffers ?? true);
        setnewsletters(notificationPrefs.newsletters ?? true);
      }
    } catch (e) {
      console.error("Failed to load notification prefs.", e)
    }
  }

  const saveCustomerInformation = async () => {
    try {
      await AsyncStorage.setItem("contactInformation", JSON.stringify({ name: firstName, lastName, email, phoneNumber, loggedIn }));
    } catch (e) {
      console.error("Failed to save contact information.", e )
    }
  };

  const saveNotificationPreferences = async () => {
    try {
      await AsyncStorage.setItem("notificationPreferences", notificationPreferences);
    } catch (e) {
      console.error("Failed to save notification prefs.", e)
    }
  };

  useEffect(() => {
    loadNotificationPreferences()
  }, [])

  const getInitials = () => {
    if (firstName != "" && lastName != ""){
      return firstName[0] + lastName[0]
    }
    else{
      return "U"
    }
  }

  async function consoleLog(){
    const contactJsonValue = await AsyncStorage.getItem("contactInformation");
    if (contactJsonValue) {
      const contactInfo = JSON.parse(contactJsonValue);
      console.log(contactInfo)
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: "#FFFFFF"}}>
        <View style={headerStyles.header}>
            <Pressable style={headerStyles.button} onPress={() => navigation.navigate("HomePage")}>
                <Ionicons name='arrow-back' style={headerStyles.buttonIcon}size={25}/>
            </Pressable>
            <LittleLemonHeader />
            <Avatar.Text size={40} label={getInitials()} style={headerStyles.profileImage} />
        </View>
        <ScrollView style={bodyStyles.container}>
            <View style={bodyStyles.personalInformation}>
                <Text style={bodyStyles.boldText}>Personal Information</Text>
                <Text style={[bodyStyles.regularText, {color: "#8A8989"}]}>Avatar</Text>
                <View style={bodyStyles.profileImageContainer}>
                <Avatar.Text size={75} label={getInitials()} style={bodyStyles.profileImage} />
                    <Pressable style={bodyStyles.changeButton}>
                        <Text style={bodyStyles.changeButtonText}>Change</Text>
                    </Pressable>
                    <Pressable style={bodyStyles.removeButton}>
                        <Text style={bodyStyles.removeButtonText}>Remove</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={bodyStyles.regularText}>First Name</Text>
                    <TextInput value={firstName} onChangeText={setFirstName} style={bodyStyles.input}/>
                    
                    <Text style={bodyStyles.regularText}>Last Name</Text>
                    <TextInput value={lastName} onChangeText={setLastName} style={bodyStyles.input} placeholder='Enter your last name'/>
                    
                    <Text style={bodyStyles.regularText}>Email Address</Text>
                    <TextInput value={email} onChangeText={setEmail} style={bodyStyles.input} keyboardType='email-address'/>
                    
                    <Text style={bodyStyles.regularText}>Phone Number</Text>
                    <TextInput value={phoneNumber} onChangeText={setPhoneNumber} style={bodyStyles.input} placeholder='Enter your phone number' keyboardType='number-pad'/>
                </View>
            </View>
            <View style={bodyStyles.notificationPreferences}>
                <Text style={bodyStyles.boldText}>Email Notifications</Text>
                <Pressable 
                    style={bodyStyles.checkBox}
                    onPress={() => setOrderStatus(!orderStatus)}
                >
                    <Ionicons name={orderStatus ? "checkbox" : "checkbox-outline"} size={30} style={{textAlign: 'center', justifyContent: "center"}} color={"#495E57"}/>
                    <Text style={bodyStyles.regularText}>Order Status</Text>
                </Pressable>
                
                <Pressable 
                    style={bodyStyles.checkBox}
                    onPress={() => setpasswordChanges(!passwordChanges)}
                >
                    <Ionicons name={passwordChanges ? "checkbox" : "checkbox-outline"} size={30} style={{textAlign: 'center', justifyContent: "center"}} color={"#495E57"}/>
                    <Text style={bodyStyles.regularText}>Password Changes</Text>
                </Pressable>
                
                <Pressable 
                    style={bodyStyles.checkBox}
                    onPress={() => setSpecialOffers(!specialOffers)}
                >
                    <Ionicons name={specialOffers ? "checkbox" : "checkbox-outline"} size={30} style={{textAlign: 'center', justifyContent: "center"}} color={"#495E57"}/>
                    <Text style={bodyStyles.regularText}>Special Offers</Text>
                </Pressable>
                
                <Pressable 
                    style={bodyStyles.checkBox}
                    onPress={() => setnewsletters(!newsletters)}
                >
                    <Ionicons name={newsletters ? "checkbox" : "checkbox-outline"} size={30} style={{textAlign: 'center', justifyContent: "center"}} color={"#495E57"}/>
                    <Text style={bodyStyles.regularText}>Newsletters</Text>
                </Pressable>
                <Pressable style={bodyStyles.logoutButton} onPress={() => {
                    navigation.navigate("OnBoarding")
                    saveCustomerInformation()
                    setLoggedIn(false)
                    
                }}>
                    <Text style={bodyStyles.logoutButtonText}>Logout</Text>
                </Pressable>
                <View style={bodyStyles.buttonContainer}>
                    <Pressable style={bodyStyles.discardButton}>
                        <Text style={bodyStyles.removeButtonText}>Discard Changes</Text>
                    </Pressable>
                    
                    <Pressable
                        style={bodyStyles.saveButton}
                        onPress={active ? () => {
                            saveCustomerInformation();
                            saveNotificationPreferences()
                            Alert.alert("Changes Saved!");
                            consoleLog()
                        }:
                        () => {
                            if (firstName == ""){
                                Alert.alert("First name cannot be empty")
                            }
                            else if (lastName == ""){
                                Alert.alert("Last name cannot be empty")
                            }
                            else if (!validateEmail(email)){
                                Alert.alert("Enter a valid email address")
                            }
                            else if (phoneNumber.length < 10){
                                Alert.alert("Enter a valid phone number");
                                return
                            }
                            else{
                                Alert.alert("Bro how did you even do that")
                            }
                        }
                    }
                    >
                        <Text style={bodyStyles.changeButtonText}>Save Changes</Text>
                    </Pressable>

                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Profile;

const headerStyles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#333333',
    },
    header: {
        flexDirection: "row",
        marginHorizontal: 75,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#495E57",
        justifyContent: "center",
        borderRadius: 25,
        width: 50,
        height: 50,
        alignContent: "center",
        margin: 10,
    },
    buttonIcon: {
        color: "#FFFFFF",
        textAlign: "center"
    },
    profileImage: {
        borderRadius: 25,
        width: 50,
        height: 50,
        margin: 10,
        backgroundColor: "#495E57"
    }
});

const bodyStyles = StyleSheet.create({
    container: {
        borderWidth: .4,
        borderRadius: 15,
        flex: 1,
        margin: 10,
        backgroundColor: "#FFFFFF"
    },
    boldText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    regularText: {
        color: "#333333",
        fontSize: 15,
        padding: 10,
    },
    personalInformation: {
        margin: 20
    },
    profileImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 62.5,
        backgroundColor: "#495E57"
    },
    changeButton: {
        backgroundColor: "#495E57",
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        height: 50
    },
    changeButtonText: {
        color: "#EDEFEE",
        fontSize: 20,
        padding: 10,
        textAlign: "center"
    },
    removeButton: {
        backgroundColor: "#EDEFEE",
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#495E57",
        height: 50
    },
    removeButtonText: {
        color: "#495E57",
        fontSize: 20,
        padding: 10,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#333333",
        backgroundColor: "#EDEFEE",
        padding: 10,
        marginBottom: 25,
        color: "#333333"
    },
    notificationPreferences: {
        margin: 20
    },
    checkBox: {
        marginVertical: 10,
        flexDirection: "row"
    },
    logoutButton: {
        backgroundColor: "#F4CE14",
        justifyContent: "center",
        borderRadius: 15
    },
    logoutButtonText: {
        textAlign: "center",
        color: "#333333",
        padding: 15,
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    discardButton: {
        backgroundColor: "#EDEFEE",
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#495E57",
        height: 50,
        flex: 1,
        marginRight: 10
    },
    discardButtonText: {
        color: "#495E57",
        fontSize: 20,
        padding: 10
    },
    saveButton: {
        backgroundColor: "#495E57",
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        height: 50,
        flex: 1,
        marginLeft: 10
    }
});
