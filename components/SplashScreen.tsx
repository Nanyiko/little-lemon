import { View, Image, StyleSheet } from "react-native";

function SplashScreen(){
    return (
        <View style={imageStyle.container}>
            <Image style={imageStyle.image} source={require("@/assets/images/Logo.png")}/>
        </View>
    )
}

const imageStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    image: {
        height: 45,
        width: 200
    }
})

export default SplashScreen