import React, { useState } from "react";
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
} from "react-native";
import fetch from "node-fetch";

export default function Home({ navigation }) {
    function searching(keyword, start = 1) {
        const KEY = "ttbyoung5148630009002";
        let queryType = "keyword"; // 제목+저자, title(제목)
        let maxResults = 5; // 한 페이지에 보여줄 개수
        let output = "JS"; // xml, js

        const response = fetch(
            `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${KEY}&Query=${keyword}&QueryType=${queryType}&MaxResults=${maxResults}&SearchTarget=Book&output=${output}&Version=20131101&start=${start}`
        );
        return response.then((data) => data.json());
    }

    async function show(keyword) {
        let text;
        try {
            text = await searching(keyword);
            text = text.item;
            // console.log(text.length);
            // console.log(text);
            onPrintResult(JSON.stringify(text));
        } catch (error) {
            console.log("error 발생", error);
        }
    }

    const [title, onChangeTitle] = useState("");
    const [author, onChangeAuthor] = useState("");
    const [result, onPrintResult] = useState("");

    let count = 0;
    let [nowScroll, onNowScroll] = useState(false);

    function scrolling() {
        setTimeout(() => {
            onNowScroll(false);
        }, 1500);
    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        container: {
            paddingTop: StatusBar.currentHeight,
            flex: 1,
        },
        scrollView: {
            paddingHorizontal: 20,
            flexGrow: 1,
            height: "100%",
        },
        text: {
            fontSize: 22,
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="제목을 입력해주세요."
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAuthor}
                value={author}
                placeholder="저자를 입력해주세요."
            />
            <Button
                title="검색"
                onPress={() => {
                    show(title + author);
                }}
            ></Button>
            <Button
                title="홈으로"
                onPress={() => navigation.navigate("HomePage")}
            ></Button>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    onScroll={(e) => {
                        const allH = Math.floor(
                            e.nativeEvent.contentSize.height
                        );
                        const nowViewH = Math.floor(
                            e.nativeEvent.layoutMeasurement.height
                        );
                        const contentH = Math.round(
                            e.nativeEvent.contentOffset.y
                        );
                        const term = 2;

                        if (allH - nowViewH - term <= contentH) {
                            if (!nowScroll) {
                                onNowScroll(true);
                                count += 1;
                                console.log("끝이에요", count);
                                scrolling();
                            }
                        }
                    }}
                >
                    <Text style={styles.text}>{result}</Text>
                    {}
                    {}
                    {nowScroll && (
                        <ActivityIndicator size="large" color="#999999" />
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
