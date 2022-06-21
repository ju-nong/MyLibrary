import * as React from "react";

import HomePage from "./homePages/Home";
import BarcodePage from "./homePages/Barcode";
import BookSearchPage from "./homePages/BookSearch";
import DetailPage from "./homePages/DetailBook";
import LibraryPage from "./homePages/Library";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BarcodePage"
                component={BarcodePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookSearchPage"
                component={BookSearchPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetailPage"
                component={DetailPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LibraryPage"
                component={LibraryPage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
