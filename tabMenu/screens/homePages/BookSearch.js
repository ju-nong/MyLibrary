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
    Image,
    TouchableOpacity,
} from "react-native";
import fetch from "node-fetch";

export default function BookSearch({ navigation }) {
    setTimeout(() => {
        console.log(1);
    });
    console.log(2);

    function searching(keyword, start) {
        const KEY = "ttbyoung5148630009002";
        let queryType = "keyword"; // 제목+저자, title(제목)
        let maxResults = 5; // 한 페이지에 보여줄 개수
        let output = "JS"; // xml, js

        const response = fetch(
            `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${KEY}&Query=${keyword}&QueryType=${queryType}&MaxResults=${maxResults}&SearchTarget=Book&output=${output}&Version=20131101&start=${start}`
        );
        return response.then((data) => data.json());
    }

    async function search(keyword, start = 1) {
        // console.log("search", start);
        let searchLst;
        try {
            searchLst = await searching(keyword, start);
            searchLst = searchLst.item;
            if (start == 1) {
                onBookList([...searchLst]);
            } else {
                onBookList([...bookList, ...searchLst]);
            }
        } catch (error) {
            console.log("error 발생", error);
        }
    }

    // 제목, 저자, 스크롤 확인
    const [title, onChangeTitle] = useState("");
    const [author, onChangeAuthor] = useState("");
    const [scrollEnd, onScrollEnd] = useState(false);

    // page, bookList
    const [page, onPage] = useState(1);
    const [bookList, onBookList] = useState([]);

    function loadding() {
        onPage(page + 1);
        search(title + author, page);
        setTimeout(() => {
            onScrollEnd(false);
        }, 1500);
    }

    function getBookInfo(ItemId) {
        const KEY = "ttbyoung5148630009002";
        let output = "JS"; // xml, js

        const response = fetch(
            `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${KEY}&itemIdType=ISBN13&ItemId=${ItemId}&output=${output}&Version=20131101&OptResult=previewImgList,categoryIdList`
        );
        return response.then((data) => data.json());
    }

    function insertBook(refUserNo, isbn, imgPath, title, author, page) {
        const response = fetch(
            `http://192.168.0.103:8084/insertBook?refUserNo=${refUserNo}&isbn=${isbn}&imgPath=${imgPath}&title=${title}&author=${author}&page=${page}`
        );
        return response.then((data) => data.json());
    }

    function insertTag(book, categoryIdList) {
        const { bookNo, refUserNo } = book;
        const response = fetch(
            `http://192.168.0.103:8084/insertTag?bookNo=${bookNo}&refTagNo1=${categoryIdList[0].categoryId}&refTagNo2=${categoryIdList[1].categoryId}&refTagNo3=${categoryIdList[2].categoryId}&refUserNo=${refUserNo}`
        );
        return response.then((data) => data);
    }

    async function addBook(isbn) {
        let text;
        try {
            text = await getBookInfo(isbn);
            text = text.item[0];

            const insertB = await insertBook(
                1,
                text.isbn13,
                text.subInfo.previewImgList[0],
                text.title,
                text.author.split(" (지은이)")[0],
                text.subInfo.itemPage
            );

            const insertT = await insertTag(insertB[0], text.categoryIdList);
            //console.log(insertT);
            navigation.navigate("DetailPage", {
                bookNo: insertB[0].bookNo,
            });
        } catch (error) {
            alert(error);
        }
    }

    const BookList = () => {
        return (
            <View>
                {bookList.map((books, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => {
                            addBook(books["isbn13"]);
                        }}
                    >
                        <View style={styles.imgContain}>
                            <Image
                                source={{
                                    uri: books["cover"],
                                }}
                                style={styles.img}
                            />
                        </View>
                        <View style={styles.textContain}>
                            <Text
                                style={styles.title}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {books["title"]}
                            </Text>
                            <Text
                                style={styles.author}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {books["author"]}
                            </Text>
                            <Text
                                style={styles.description}
                                numberOfLines={4}
                                ellipsizeMode="tail"
                            >
                                {books["description"]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

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

        card: {
            backgroundColor: "white",
            width: "100%",
            maxHeight: 180,
            marginBottom: 20,
            padding: 10,
            flex: 1,
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 10,
        },

        imgContain: {
            flexGrow: 1,
        },

        img: {
            width: 85,
            height: 109,
        },

        textContain: {
            flexGrow: 2,
            paddingLeft: 10,
            flexShrink: 1,
        },

        title: {
            fontWeight: "bold",
            fontSize: 16,
        },

        author: {
            fontSize: 12,
            color: "#AAAAAA",
            paddingTop: 5,
            paddingBottom: 10,
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
                    search(title + author);
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
                        const evt = e.nativeEvent;
                        const allH = Math.floor(
                            evt.contentSize.height
                            // 전체 높이
                        );
                        const layH = Math.floor(
                            evt.layoutMeasurement.height
                            // 현재 레이아웃의 높이
                        );
                        const scrY = Math.floor(
                            evt.contentOffset.y
                            // 현재 스크롤 값
                        );
                        const interval = 2; // 간격

                        const result = allH - layH - interval;
                        // console.log(`allH - layH - interval = ${result}`);
                        // console.log(
                        //     `스크롤 값 : ${scrY}\nㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n`
                        // );

                        if (result <= scrY) {
                            if (!scrollEnd) {
                                //console.log("@@@스크롤 끝@@@");
                                onScrollEnd(true);
                                loadding();
                            }
                        }
                    }}
                >
                    <BookList></BookList>
                    {scrollEnd && (
                        <ActivityIndicator size="large" color="#999999" />
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
