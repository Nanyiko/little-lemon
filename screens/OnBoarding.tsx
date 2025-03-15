import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView
} from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { validateEmail } from '@/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LittleLemonHeader from '@/components/LittleLemonHeader'

function OnBoarding( {navigation, setLoggedIn, setFirstName, setLastName, setEmail, setPhoneNumber, loggedIn}: { navigation: any, setLoggedIn: (value: boolean) => void, setFirstName: (value: string) => void, setLastName: (value: string) => void, setEmail: (value: string) => void, setPhoneNumber: (value: string) => void, loggedIn: boolean } ){
    const [firstName, onChangeFirstName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [phoneNumber, onChangePhoneNumber] = useState("")
    const [active, setActive] = useState(false)

    const contactInformation = JSON.stringify({
        name: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        loggedIn: loggedIn,
    });

    function save(){
        setLoggedIn(true);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        navigation.navigate("Profile")
    }

    useEffect(() => {
        if (firstName !== "" && validateEmail(email)){
            setActive(true)
        }
        else{
            setActive(false)
        }
    }, [firstName, email])

    const loadPreferences = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("contactInformation");
            if (jsonValue) {
                const contactInfo = JSON.parse(jsonValue);
                onChangeFirstName(contactInfo.name ?? "");
                onChangeEmail(contactInfo.email ?? "");
                onChangeLastName(contactInfo.lastName ?? "");
                onChangePhoneNumber(contactInfo.phoneNumber ?? "");
                setLoggedIn(contactInfo.loggedIn ?? false);
            }
        } catch (e) {
            Alert.alert(`Failed to load contact information. ${e}`);
        }
    };
    

    const savePreferences = async () => {
        try {
            await AsyncStorage.setItem("contactInformation", contactInformation);
        } catch (e) {
            Alert.alert(`Failed to load contact information. ${e}`);
        }
    };

    useEffect(() => {
        loadPreferences();
    }, []);

    useEffect(() => {
        if (active) {
            savePreferences();
        }
    }, [contactInformation]);

    useEffect(() => {
        if(loggedIn){
            navigation.navigate("Profile")
        }
    })

    return (
        <>
        <LittleLemonHeader />
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <Text style={styles.regularText}>Let us get to know you</Text>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.regularText}>First Name</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={onChangeFirstName} placeholder='Enter your first name' />
                <Text style={styles.regularText}>Last Name</Text>
                <TextInput style={styles.input} value={lastName} onChangeText={onChangeLastName} placeholder='Enter your last name' />
                <Text style={styles.regularText}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={onChangeEmail} placeholder='Enter your email address' keyboardType='email-address' autoCapitalize='none'/>
                <Text style={styles.regularText}>Phone Number</Text>
                <TextInput style={styles.input} value={phoneNumber} onChangeText={onChangePhoneNumber} placeholder='Enter your phone number' />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable style={active ? styles.activeButton : styles.disabledButton} onPress={active ? save : () => {}}>
                    <Text style={active ? styles.activeButtonText : styles.disabledButtonText}>Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
        </>
    )    
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEFEE"
    },
    regularText: {
        color: "#333333",
        fontSize: 25,
        textAlign: "center"
    },
    formContainer: {
        padding: 20,
        marginVertical: 20
    },
    input: {
        borderWidth: 1,
        backgroundColor: "#EDEFEE",
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        margin: 20
    },
    activeButton: {
        backgroundColor: "#495E57",
        justifyContent: "center",
        borderRadius: 15
    },
    disabledButton: {
        backgroundColor: "#EDEFEE",
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: .2
    },
    activeButtonText: {
        color: "#EDEFEE",
        fontSize: 20,
        padding: 15,
        textAlign: "center"
    },
    disabledButtonText: {
        color: "#333333",
        fontSize: 20,
        padding: 15,
        textAlign: "center"
    }
})