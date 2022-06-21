import * as React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { View, Button, Text } from "react-native";

export default function ChoiceScanType({ navigation }) {
    const { showActionSheetWithOptions } = useActionSheet();

    const openSheet = () => {
        const options = ["바코드로 추가", "검색으로 추가", "취소"];
        const destructiveButtonIndex = 2; // 빨간색 index
        const cancelButtonIndex = 2; // 취소 index

        showActionSheetWithOptions(
            {
                options, // 버튼 구성
                cancelButtonIndex, // 취소
                destructiveButtonIndex, // 빨간색
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    navigation.navigate("BarcodePage"); // 바코드 스캔 페이지로
                } else if (buttonIndex == 1) {
                    navigation.navigate("BookSearchPage"); // 검색 페이지로
                } else {
                    console.log("취소되었습니다");
                }

                //console.log("클릭된 버튼의 index는", buttonIndex);
            }
        );
    };

    return (
        <View>
            <Button title="책 추가" onPress={() => openSheet()}></Button>
        </View>
    );
}
