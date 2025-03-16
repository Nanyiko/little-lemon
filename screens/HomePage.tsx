import { View, Text, Image, StyleSheet, Pressable, FlatList, ScrollView } from "react-native";
import { Avatar, TextInput } from 'react-native-paper';
import LittleLemonHeader from "@/components/LittleLemonHeader";
import { useFonts } from 'expo-font';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";

function HomePage({ navigation, firstName, lastName }: { navigation: any, firstName: string, lastName: string }) {
    const [data, setData] = useState([]);

    const getInitials = () => {
        if (firstName !== "" && lastName !== "") {
            return firstName[0] + lastName[0];
        } else {
            return "U";
        }
    };

    const [fontsLoaded] = useFonts({
        'MarkaziText': require('@/assets/fonts/MarkaziText-Regular.ttf'),
        'Karla': require('@/assets/fonts/Karla-Regular.ttf')
    });

    useEffect(() => {
        const fetchData = async () => {
            const uri = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
            try {
                const response = await fetch(uri);
                const data = await response.json();
                setData(data.menu);
            } catch (e) {
                console.error("Couldn't fetch data. ", e);
            }
        };

        fetchData();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    const Item = ({ name, price, description, image }: ItemProps) => {
        let imageSource
        if (image == "bruschetta.jpg"){
            imageSource = require('@/assets/images/bruschetta.jpg')
        }
        else if (image == "greekSalad.jpg"){
            imageSource = require('@/assets/images/greekSalad.jpg')
        }
        else if (image == "grilledFish.jpg"){
            imageSource = require('@/assets/images/grilledFish.jpg')
        }
        else if (image == "pasta.jpg"){
            imageSource = require('@/assets/images/pasta.jpg')
        }
        else if (image == "lemonDessert.jpg"){
            imageSource = require('@/assets/images/lemonDessert.jpg')
        }

        return (
            <View style={menuStyles.itemContainer}>
                <View style={menuStyles.descriptionContainer}>
                    <Text style={menuStyles.itemName}>{name}</Text>
                    <Text style={menuStyles.itemDescription}>{description}</Text>
                    <Text style={menuStyles.itemPrice}>${price}</Text>
                </View>
                <Image source={imageSource} style={menuStyles.itemImage} />
            </View>
        );
    };

    const Separator = () => {
        return <View style={menuStyles.seperator}></View>;
    }

    interface ItemProps {
        name: string;
        price: string;
        description: string;
        image: string;
    }

    function renderItem({ item }: { item: ItemProps }) {
        return <Item name={item.name} price={item.price} description={item.description} image={item.image} />;
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <View style={headerStyles.header}>
                    <LittleLemonHeader />
                    <Pressable onPress={() => navigation.navigate("Profile")}>
                        <Avatar.Text size={40} label={getInitials()} style={headerStyles.profileImage} />
                    </Pressable>
                </View>
                <ScrollView>
                <View style={heroStyles.heroSectionContainer}>
                    <View style={heroStyles.headingContainer}>
                        <Text style={heroStyles.heading}>Little Lemon</Text>
                        <Text style={heroStyles.subHeading}>Chicago</Text>
                        <Text style={heroStyles.regularText}>We are a family owned Mediterranean restaurant. focused on traditional recipes served with a modern twist</Text>
                    </View>
                    <Image source={require("@/assets/images/Hero-image.png")} style={heroStyles.heroImage} />
                </View>
                <View style={heroStyles.searchContainer}>
                    <View style={heroStyles.searchbar}>
                        <Ionicons name="search" size={30} color={"#495E57"} style={heroStyles.buttonIcon} />
                        <TextInput
                            style={heroStyles.input}
                            cursorColor="#333333"
                            outlineColor="transparent"
                            activeOutlineColor="transparent"
                        />
                    </View>
                </View>
                <View style={orderStyles.container}>
                    <Text style={orderStyles.heading}>Order for Delivery</Text>
                    <View style={orderStyles.pillContainer}>
                        <Pressable style={orderStyles.pill}>
                            <Text style={orderStyles.pillText}>Starters</Text>
                        </Pressable>

                        <Pressable style={orderStyles.pill}>
                            <Text style={orderStyles.pillText}>Mains</Text>
                        </Pressable>

                        <Pressable style={orderStyles.pill}>
                            <Text style={orderStyles.pillText}>Deserts</Text>
                        </Pressable>

                        <Pressable style={orderStyles.pill}>
                            <Text style={orderStyles.pillText}>Sides</Text>
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={Separator}
                />
                </ScrollView>
            </View>
        </>
    );
}

export default HomePage;

const headerStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileImage: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: "#495E57",
    }
});

const heroStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEFEE"
    },
    heroSectionContainer: {
        backgroundColor: "#495E57",
        flexDirection: "row",
        padding: 10,
    },
    heading: {
        fontSize: 40,
        color: "#F4CE14",
        fontFamily: "MarkaziText",
    },
    subHeading: {
        fontSize: 30,
        color: "#EDEFEE",
        fontFamily: "MarkaziText",
        marginBottom: 20,
    },
    regularText: {
        fontFamily: "Karla",
        fontSize: 16,
        color: "#EDEFEE"
    },
    headingContainer: {
        width: 215,
        height: 205
    },
    heroImage: {
        height: 155,
        width: 155,
        borderRadius: 15,
        margin: 20,
    },
    searchContainer: {
        backgroundColor: "#495E57",
        padding: 10
    },
    searchbar: {
        backgroundColor: "#EDEFEE",
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: "row",
    },
    input: {
        flex: 1,
        backgroundColor: "#EDEFEE",
    },
    buttonIcon: {
        textAlign: "center",
        color: "#495E57",
        justifyContent: "center",
        alignContent: "center",
        margin: 20,
    },
})

const orderStyles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    heading: {
        fontFamily: "Karla",
        fontSize: 25,
        color: "#333333",
        margin: 10,
    },
    pillContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    pill: {
        borderRadius: 10,
        backgroundColor: "#EDEFEE"
    },
    pillText: {
        fontFamily: "Karla",
        padding: 10,
        color: "#333333",
        fontSize: 20
    }
})

const menuStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        margin: 20,
    },
    descriptionContainer: {
        flex: 1
    },
    itemName: {
        fontFamily: "Karla",
        fontSize: 20,
        color: "#333333",
        marginBottom: 20
    },
    itemDescription: {
        fontSize: 15,
        color: "#D9D9D9",
        fontFamily: "Karla",
        marginBottom: 10
    },
    itemPrice: {
        fontFamily: "Karla",
        color: "#333333",
        fontSize: 20
    },
    itemImage: {
        resizeMode: "cover",
        height: 100,
        width: 100,
        borderRadius: 10,
        marginTop: 15
    },
    seperator: {
        borderWidth: .4,
        borderColor: "#EDEFEE"
    }
})