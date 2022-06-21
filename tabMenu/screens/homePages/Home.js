import * as React from "react";
import { Text, View, Button } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import ChoiceScanType from "./ChoiceScanType";

export default function Home({ navigation }) {
    return (
        <ActionSheetProvider>
            <View>
                <ChoiceScanType navigation={navigation} />
                <Button
                    title="책 목록"
                    onPress={() => navigation.navigate("LibraryPage")}
                ></Button>
                {/* <Button
                    title="책 보기 샘플"
                    onPress={() =>
                        navigation.navigate("DetailPage", {
                            bookNo: "52",
                        })
                    }
                ></Button> */}
            </View>
        </ActionSheetProvider>
    );
}

// //원본;
// import * as React from "react";
// import { Text, View, Button } from "react-native";

// export default function Home({ navigation }) {
//     return (
//         <View>
//             <View>
//                 <Button
//                     title="책 추가"
//                     onPress={() => navigation.navigate("Barcode")}
//                 ></Button>
//                 <Button
//                     title="책 보기 샘플"
//                     onPress={() =>
//                         navigation.navigate("Detail", {
//                             bookNo: "52",
//                         })
//                     }
//                 ></Button>
//             </View>
//         </View>
//     );
// }
