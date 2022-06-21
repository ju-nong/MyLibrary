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

export default function searchList(props) {
    return (
        <View>
            <Text>{props.count}</Text>
        </View>
    );
}
