import { Image, View, StyleSheet } from "react-native";

function LittleLemonHeader(){
    return (
        <View style={imageStyle.container}>
            <Image source={require("@/assets/images/Logo.png")} style={imageStyle.image} />
        </View>
    )
}

export default LittleLemonHeader

const imageStyle = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        backgroundColor: "#FFFFFF"
    },
    image: {
        padding: 20,
        height: 50,
        width: 250,
        margin: 20
    }
})