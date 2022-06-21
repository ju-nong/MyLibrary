import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import fetch from "node-fetch";

export default function BarcodePage({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        addBook(data);
    };

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

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {/* {scanned &&
                navigation.navigate("DetailPage", {
                    bookNo: "empty",
                })} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
