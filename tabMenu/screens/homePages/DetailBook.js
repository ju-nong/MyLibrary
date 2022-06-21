// 로딩 프로토타입
import { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Button,
    Text,
    SafeAreaView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
} from "react-native";
import fetch from "node-fetch";
import {
    MaterialIcons,
    FontAwesome5,
    MaterialCommunityIcons,
    Fontisto,
    Ionicons,
    AntDesign,
} from "@expo/vector-icons";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { ScrollPicker } from "react-native-value-picker";
import MarqueeText from "react-native-marquee";

export default function DetailBook({ navigation, route }) {
    function getTags(bookNo) {}

    function dif(begDate, endDate) {
        const korH = 9 * 60 * 60 * 1000;
        const fmStr = "YYYY-MM-DD";
        const reading = endDate == null;

        const begUTC = moment(begDate);
        const begKTC = moment(begUTC.valueOf() + korH);

        const endUTC = reading ? moment() : moment(endDate);
        const endKTC = moment(endUTC.valueOf() + korH);

        const day = endKTC.diff(begKTC, "days");

        if (reading) {
            return (
                <View>
                    <Text style={styles.date}>{begKTC.format(fmStr)}</Text>
                    <Text style={styles.date}>{day}일째</Text>
                </View>
            );
        } else {
            setRead(false);
            return (
                <View>
                    <Text>{begKTC.format(fmStr)}</Text>
                    <Text>{endKTC.format(fmStr)}</Text>
                    <Text>{day}일만에 다 읽었어요</Text>
                </View>
            );
        }
    }

    function getBook(bNo) {
        const response = fetch(
            `http://192.168.0.103:8084/detailBook?bookNo=${bNo}`
        );
        return response.then((data) => data.json());
    }

    async function showBook(bNo) {
        try {
            const re = await getBook(bNo);
            setBook(re[0]);
            //createList[(re[0]["readPage"], re[0]["page"])];
            const temList = [];
            for (let i = re[0]["readPage"]; i <= re[0]["page"]; i++) {
                let pageElement = {
                    value: i,
                    label: i,
                };
                temList.push(pageElement);
            }
            setPageList(temList);
            setPickedValue(re[0]["readPage"]);
        } catch (error) {
            console.log("error 발생", error);
        }
    }

    function getTags(bookNo, refUserNo) {
        const response = fetch(
            `http://192.168.0.103:8084/selectTags?bookNo=${bookNo}&refUserNo=${refUserNo}`
        );
        return response.then((data) => data.json());
    }

    async function selectTags(bookNo, refUserNo) {
        try {
            const tags = await getTags(bookNo, refUserNo);
            console.log(String(tags[0]));
            //re = re[0];
            // console.log(re[0]["tagName"]);
            //console.log(String(re));

            // return (
            //     <View>
            //         for(let = 0; let < re)
            //     </View>
            // )

            // //createList[(re[0]["readPage"], re[0]["page"])];
            // const temList = [];
            // for (let i = re[0]["readPage"]; i <= re[0]["page"]; i++) {
            //     let pageElement = {
            //         value: i,
            //         label: i,
            //     };
            //     temList.push(pageElement);
            // }
            // setPageList(temList);
            // setPickedValue(re[0]["readPage"]);
        } catch (error) {
            console.log("error 발생", error);
        }
    }

    const bookNo = route.params.bookNo;
    const [book, setBook] = useState();
    const [loading, setLoading] = useState(false);
    const [pageList, setPageList] = useState([]);

    const [pickedValue, setPickedValue] = useState(0);
    const refRBSheet = useRef();
    const [first, setFirst] = useState(0);
    const [read, setRead] = useState(true);
    const [tags, setTags] = useState();

    setTimeout(() => {
        setLoading(true);
    }, 1000);

    useEffect(() => {
        showBook(bookNo);
    }, []);

    useEffect(() => {
        if (first < 2) {
            setFirst(first + 1);
        } else {
            console.log(pickedValue);
            fetch(
                `http://192.168.0.103:8084/pageUpdate?bookNo=${book["bookNo"]}&readPage=${pickedValue}&page=${book["page"]}`
            );
            if (pickedValue == book["page"]) {
                alert("완독을 축하드립니다.");
                navigation.navigate("HomePage");
            }
        }
    }, [pickedValue]);

    const Detail = () => {
        return (
            <View style={{ padding: 10 }}>
                <ScrollView style={styles.wrap}>
                    <View style={styles.menuBar}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={34}
                                color={"black"}
                            ></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                fetch(
                                    `http://192.168.0.103:8084/removeBook?bookNo=${book["bookNo"]}`
                                );
                                alert("책이 삭제되었습니다.");
                                navigation.navigate("HomePage");
                            }}
                        >
                            <FontAwesome5
                                name="trash-alt"
                                size={34}
                                color={"black"}
                            ></FontAwesome5>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <MarqueeText
                            style={styles.title}
                            speed={0.2}
                            marqueeOnStart={true}
                            loop={true}
                            delay={1000}
                        >
                            {book["title"]}
                        </MarqueeText>
                        <View style={styles.info}>
                            <View style={styles.imgViewer}>
                                <Image
                                    source={{ uri: book["imgPath"] }}
                                    style={styles.img}
                                />
                            </View>
                            <View style={styles.textInfo}>
                                <Text style={styles.author}>
                                    {book["author"]}
                                </Text>
                                <Text style={styles.page}>
                                    {pickedValue} / {book["page"]}
                                </Text>
                                {dif(book["begDate"], book["endDate"])}
                                {read && (
                                    <View style={styles.btnCard}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                refRBSheet.current.open();
                                            }}
                                        >
                                            <Ionicons
                                                name="book-outline"
                                                size={34}
                                                color={"black"}
                                            ></Ionicons>
                                        </TouchableOpacity>
                                        <Fontisto
                                            name="minus-a"
                                            size={30}
                                            color={"#bbb"}
                                            style={{
                                                transform: [
                                                    { rotate: "90deg" },
                                                ],
                                            }}
                                        ></Fontisto>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log("메모 작성");
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="note-plus-outline"
                                                size={34}
                                                color={"black"}
                                            ></MaterialCommunityIcons>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.tags}>
                        <AntDesign
                            name="tags"
                            size={34}
                            color={"black"}
                        ></AntDesign>
                        {/* {selectTags(book["bookNo"], book["refUserNo"])} */}
                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>#컴퓨터/IT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>
                                #웹/컴퓨터입문/활용
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>#웹/홈페이지</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>#IT전문서</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.memoCard}>
                        <ScrollView style={styles.view} horizontal={true}>
                            <TouchableOpacity
                                style={styles.memo}
                            ></TouchableOpacity>
                            {/* <TouchableOpacity style={styles.memo}>
                                <Text>하이</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.memo}>
                                <Text>하이</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.memo}>
                                <Text>하이</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.memo}>
                                <Text>하이</Text>
                            </TouchableOpacity> */}
                        </ScrollView>
                    </View>
                </ScrollView>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={300}
                    customStyles={{
                        draggableIcon: {
                            backgroundColor: "#000",
                        },
                        container: {
                            borderRadius: 12,
                        },
                    }}
                >
                    <View style={{ paddingLeft: 34 }}>
                        <ScrollPicker
                            currentValue={pickedValue}
                            extraData={pickedValue}
                            list={pageList}
                            onItemPress={setPickedValue}
                            labelColor="black"
                            separatorColor=""
                            selectedColor="blue"
                        />
                    </View>
                </RBSheet>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
        },
        img: {
            width: 165,
            height: 211,
        },
        menuBar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        title: {
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
        },
        infoCard: {
            backgroundColor: "#2196f3",
            borderRadius: 30,
            marginTop: 20,
            padding: 10,
        },
        imgViewer: {
            borderRadius: 20,
            overflow: "hidden",
            marginRight: 20,
        },
        info: { flexDirection: "row" },
        textInfo: {},
        author: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#EEE",
        },
        page: {
            color: "#555",
            fontWeight: "bold",
            paddingBottom: 20,
            fontSize: 16,
        },
        date: { fontSize: 15 },
        btnCard: {
            marginTop: "auto",
            backgroundColor: "white",
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            padding: 10,
            marginLeft: 30,
        },
        tags: {
            display: "flex",
            flexDirection: "row",
            padding: 20,
            flexWrap: "wrap",
        },
        tag: {
            backgroundColor: "#bbb",
            borderRadius: 10,
            padding: 3,
            margin: 5,
        },
        tagText: {
            color: "white",
        },
        memoCard: {
            paddingBottom: 50,
        },
        view: {
            flexGrow: 1,
            paddingLeft: 20,
        },
        memo: {
            width: 200,
            height: 150,
            backgroundColor: "white",
            borderRadius: 30,
            marginRight: 20,
        },
    });

    if (loading) {
        return <Detail></Detail>;
    } else {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#999999" />
            </View>
        );
    }
}
