// :TEST_CODE
import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Circle } from "react-native-progress";
import fetch from "node-fetch";

export default function Library({ navigation }) {
    function searchMyBooks() {
        const response = fetch(
            `http://192.168.0.103:8084/library?refUserNo=${1}&reading=${reading}`
        );
        return response.then((data) => data.json());
    }

    async function bookAdd() {
        try {
            //setBookList(await searchMyBooks());
            searchMyBooks().then(async (a) => {
                setBookList(a);
            });
        } catch (error) {
            console.log("error 발생", error);
        }
    }

    const [reading, setReading] = React.useState(true);
    const [bookList, setBookList] = React.useState([{ bookNo: 0 }]);
    const [loading, setLoading] = React.useState(false);

    setTimeout(() => {
        setLoading(true);
    }, 500);

    const BookList = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {bookList.map((books, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => {
                            console.log(books["bookNo"], "번 책 상세페이지로");
                            navigation.navigate("DetailPage", {
                                bookNo: books["bookNo"],
                            });
                        }}
                    >
                        <View style={styles.imgContain}>
                            <Image
                                source={{
                                    uri: books["imgPath"],
                                }}
                                style={styles.img}
                            />
                            {reading && <View style={styles.overlay}></View>}
                            {reading && (
                                <View style={{ position: "absolute" }}>
                                    <Circle
                                        showsText={true}
                                        progress={Number(
                                            // ex) 0.75, 0.5
                                            (
                                                books["readPage"] /
                                                books["page"]
                                            ).toFixed(3)
                                        )}
                                        animated={false}
                                        size={100}
                                        borderWidth={0}
                                        unfilledColor="#AAA"
                                        thickness={5}
                                        textStyle={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: "#fff",
                                        }}
                                        style={{
                                            transform: [{ translateY: 50 }],
                                        }}
                                    ></Circle>
                                </View>
                            )}
                            {/* {reading && (
                                        <Text
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                textAlign: "center",
                                                textAlignVertical: "center",
                                                color: "#fff",
                                                position: "absolute",
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {books["readPage"]} /{" "}
                                            {books["page"]}
                                        </Text>
                                    )} */}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    useEffect(() => {
        bookAdd();
    }, [reading]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
        },

        horizontal: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
        },

        view: {
            paddingHorizontal: 20,
            flexGrow: 1,
            height: "100%",
        },

        text: {
            fontSize: 22,
        },

        card: {
            width: "50%",
            maxHeight: 200,
            marginBottom: 20,
            alignItems: "center",
        },

        imgContain: {
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "white",
            width: 156,
            position: "relative",
            overflow: "hidden",
        },

        img: {
            width: "100%",
            height: "100%",
        },

        overlay: {
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.6,
        },
    });

    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
    return (
        <View style={{ flex: 1 }}>
            <RadioButton.Group
                onValueChange={(newValue) => setReading(newValue)}
                value={reading}
            >
                <View>
                    <Text>읽는 중</Text>
                    <RadioButton value={true} color="#2196f3" />
                </View>
                <View>
                    <Text>읽음</Text>
                    <RadioButton value={false} color="#2196f3" />
                </View>
            </RadioButton.Group>

            <SafeAreaView style={styles.container}>
                {loading && (
                    <ScrollView style={styles.view}>
                        <BookList></BookList>
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
}
