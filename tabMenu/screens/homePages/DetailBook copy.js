// // 로딩 완료
// import React, { useState, useEffect, useRef } from "react";
// import {
//     View,
//     StyleSheet,
//     Button,
//     Text,
//     SafeAreaView,
//     ActivityIndicator,
//     Image,
//     TouchableOpacity,
// } from "react-native";
// import fetch from "node-fetch";
// import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// import moment from "moment";

// export default function DetailBook({ navigation, route }) {
//     function dif(begDate, endDate) {
//         const korH = 9 * 60 * 60 * 1000;
//         const fmStr = "YYYY-MM-DD";
//         const reading = endDate == null;

//         const begUTC = moment(begDate);
//         const begKTC = moment(begUTC.valueOf() + korH);

//         const endUTC = reading ? moment() : moment(endDate);
//         const endKTC = moment(endUTC.valueOf() + korH);

//         const day = endKTC.diff(begKTC, "days");

//         if (reading) {
//             return (
//                 <View>
//                     <Text>{begKTC.format(fmStr)}</Text>
//                     <Text>{day}일째</Text>
//                 </View>
//             );
//         } else {
//             return (
//                 <View>
//                     <Text>{begKTC.format(fmStr)}</Text>
//                     <Text>{endKTC.format(fmStr)}</Text>
//                     <Text>{day}일만에 다 읽었어요</Text>
//                 </View>
//             );
//         }
//     }

//     function getBook(bNo) {
//         const response = fetch(
//             `http://192.168.0.103:8084/detailBook?bookNo=${bNo}`
//         );
//         return response.then((data) => data.json());
//     }

//     async function showBook(bNo) {
//         try {
//             const re = await getBook(bNo);
//             setBook(re[0]);
//         } catch (error) {
//             console.log("error 발생", error);
//         }
//     }
//     const bookNo = route.params.bookNo;
//     const [book, setBook] = React.useState();
//     const [loading, setLoading] = React.useState(false);

//     //showBook(bookNo);

//     // const Loadding = () => {
//     //     console.log(2);
//     //     return (
//     //         <View style={[styles.container, styles.horizontal]}>
//     //             <ActivityIndicator size="large" color="#999999" />
//     //         </View>
//     //     );
//     // };

//     const Detail = () => {
//         console.log(1);
//         return (
//             <View>
//                 <View>
//                     <View>
//                         <TouchableOpacity
//                             onPress={() => {
//                                 console.log(book["imgPath"]);
//                             }}
//                         >
//                             <MaterialIcons
//                                 name="arrow-back-ios"
//                                 size={34}
//                                 color={"black"}
//                             ></MaterialIcons>
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                         <TouchableOpacity>
//                             <FontAwesome5
//                                 name="trash-alt"
//                                 size={34}
//                                 color={"black"}
//                             ></FontAwesome5>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View>
//                     <View>
//                         <Image
//                             source={{ uri: book["imgPath"] }}
//                             style={styles.img}
//                         />
//                     </View>
//                     <Text>{book["title"]}</Text>
//                     <Text>{book["author"]}</Text>
//                     <Text>
//                         {book["readPage"]} / {book["page"]}
//                     </Text>
//                     {dif(book["begDate"], book["endDate"])}
//                 </View>
//             </View>
//         );
//     };

//     useEffect(() => {
//         showBook(bookNo);
//         setTimeout(() => {
//             setLoading(true);
//         }, 1000);
//     });

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             justifyContent: "center",
//         },
//         horizontal: {
//             flexDirection: "row",
//             justifyContent: "space-around",
//             padding: 10,
//         },
//         img: {
//             width: 85,
//             height: 109,
//         },
//     });

//     // return <View>{!loading ? <Loadding /> : <Detail />}</View>;
//     if (loading) {
//         return (
//             <View>
//                 <Detail></Detail>
//             </View>
//         );
//     } else {
//         return (
//             <View style={[styles.container, styles.horizontal]}>
//                 <ActivityIndicator size="large" color="#999999" />
//             </View>
//         );
//     }
// }

// // 로딩 완료
// import * as React from "react";
// import {
//     View,
//     StyleSheet,
//     Button,
//     Text,
//     SafeAreaView,
//     ActivityIndicator,
//     Image,
//     TouchableOpacity,
// } from "react-native";
// import fetch from "node-fetch";
// import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// import moment from "moment";

// export default function DetailBook({ navigation, route }) {
//     function dif(begDate, endDate) {
//         if (endDate == null) {
//             console.log("눌");
//         }
//         const korH = 9 * 60 * 60 * 1000;
//         const begUTC = moment(begDate);
//         const begKTC = moment(begUTC.valueOf() + korH);

//         const endUTC = moment(endDate);
//         const endKTC = moment(endUTC.valueOf() + korH);

//         const day = endKTC.diff(begKTC, "days");

//         return (
//             <View style={{ fontSize: 20 }}>
//                 <Text>{begKTC.format("YYYY-MM-DD")}</Text>
//                 <Text>{day}일째</Text>
//                 <Text>{endKTC.format("YYYY-MM-DD")}</Text>
//             </View>
//         );
//     }

//     function getBook(bNo) {
//         const response = fetch(
//             `http://192.168.0.103:8084/detailBook?bookNo=${bNo}`
//         );
//         return response.then((data) => data.json());
//     }

//     async function showBook(bNo) {
//         const re = await getBook(bNo);
//         setBook(re[0]);
//     }
//     const bookNo = route.params.bookNo;
//     const [book, setBook] = React.useState();
//     const [loading, setLoading] = React.useState(false);

//     showBook(bookNo);
//     setTimeout(() => {
//         setLoading(true);
//     }, 1000);

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             justifyContent: "center",
//         },
//         horizontal: {
//             flexDirection: "row",
//             justifyContent: "space-around",
//             padding: 10,
//         },
//         img: {
//             width: 85,
//             height: 109,
//         },
//     });

//     if (loading) {
//         return (
//             <View>
//                 <View>
//                     <View>
//                         <TouchableOpacity
//                             onPress={() => {
//                                 console.log(book["imgPath"]);
//                             }}
//                         >
//                             <MaterialIcons
//                                 name="arrow-back-ios"
//                                 size={34}
//                                 color={"black"}
//                             ></MaterialIcons>
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                         <TouchableOpacity>
//                             <FontAwesome5
//                                 name="trash-alt"
//                                 size={34}
//                                 color={"black"}
//                             ></FontAwesome5>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View>
//                     <View>
//                         <Image
//                             source={{ uri: book["imgPath"] }}
//                             style={styles.img}
//                         />
//                     </View>
//                     <Text>{book["title"]}</Text>
//                     <Text>{book["author"]}</Text>
//                     <Text>
//                         {book["readPage"]} / {book["page"]}
//                     </Text>
//                     {dif(book["begDate"], book["endDate"])}
//                 </View>
//                 <Button
//                     title="홈으로"
//                     onPress={() => navigation.navigate("HomePage")}
//                 />
//             </View>
//         );
//     } else {
//         return (
//             <View style={[styles.container, styles.horizontal]}>
//                 <ActivityIndicator size="large" color="#999999" />
//             </View>
//         );
//     }
// }

// // 로딩 프로토타입
// import * as React from "react";
// import { Text, View, Button } from "react-native";
// import fetch from "node-fetch";

// export default function DetailBook({ navigation, route }) {
//     function getBook(bNo) {
//         const response = fetch(
//             `http://192.168.0.103:8084/detailBook?bookNo=${bNo}`
//         );
//         return response.then((data) => data.json());
//     }

//     async function showBook(bNo) {
//         const re = await getBook(bNo);
//         setBook(JSON.stringify(re[0]));
//     }
//     const bookNo = route.params.bookNo;
//     const [book, setBook] = React.useState(
//         `2초 뒤에 ${bookNo}번에 정보를 띄울게요`
//     );
//     const [loading, setLoading] = React.useState(false);

//     setTimeout(() => {
//         showBook(bookNo);
//         setLoading(true);
//     }, 2000);

//     if (loading) {
//         console.log(1);
//         return (
//             <View>
//                 <Text>{book}</Text>
//                 <Button
//                     title="홈으로"
//                     onPress={() => navigation.navigate("HomePage")}
//                 ></Button>
//             </View>
//         );
//     } else {
//         console.log(2);
//         return (
//             <View>
//                 <Text>로딩 중이에요{bookNo}</Text>
//                 <Text>{book}</Text>
//                 <Button
//                     title="홈으로"
//                     onPress={() => navigation.navigate("Home")}
//                 ></Button>
//             </View>
//         );
//     }
// }

// // 원래 detail
// import * as React from "react";
// import { Text, View, Button } from "react-native";
// import fetch from "node-fetch";

// export default function DetailBook({ navigation, route }) {
//     const bookNo = route.params.bookNo;
//     const [book, setBook] = React.useState(
//         `현재 보여줄 책의 번호 ${route.params.bookNo}`
//     );

//     function getBook() {
//         const response = fetch(
//             `http://192.168.0.103:8084/detailBook?bookNo=${bookNo}`
//         );
//         return response.then((data) => data.json());
//     }

//     async function showBook() {
//         const re = await getBook();
//         setBook(JSON.stringify(re[0]));
//     }

//     return (
//         <View>
//             <View>
//                 <Button title="책 보기" onPress={() => showBook()}></Button>
//                 <Button
//                     title="홈으로"
//                     onPress={() => navigation.navigate("Home")}
//                 ></Button>
//                 <Text>{book}</Text>
//             </View>
//         </View>
//     );
// }
