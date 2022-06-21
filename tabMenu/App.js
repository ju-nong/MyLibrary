import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import RemindScreen from "./screens/RemindScreen";
import TourScreen from "./screens/TourScreen";
import MyScreen from "./screens/MyScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: "홈",
                        tabBarLabel: "홈",
                        tabBarIcon: ({ focused }) => {
                            const color = focused ? "skyblue" : "gray";
                            return (
                                <FontAwesome5
                                    name="home"
                                    size={24}
                                    color={color}
                                ></FontAwesome5>
                            );
                        },
                        tabBarActiveTintColor: "skyblue",
                        tabBarInactiveTintColor: "gray",
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name="RemindScreen"
                    component={RemindScreen}
                    options={{
                        title: "기억하기",
                        tabBarLabel: "기억하기",
                        tabBarIcon: ({ focused }) => {
                            const color = focused ? "skyblue" : "gray";
                            return (
                                <FontAwesome5
                                    name="edit"
                                    size={24}
                                    color={color}
                                ></FontAwesome5>
                            );
                        },
                        tabBarActiveTintColor: "skyblue",
                        tabBarInactiveTintColor: "gray",
                    }}
                />
                <Tab.Screen
                    name="TourScreen"
                    component={TourScreen}
                    options={{
                        title: "둘러보기",
                        tabBarLabel: "둘러보기",
                        tabBarIcon: ({ focused }) => {
                            const color = focused ? "skyblue" : "gray";
                            return (
                                <FontAwesome5
                                    name="list"
                                    size={24}
                                    color={color}
                                ></FontAwesome5>
                            );
                        },
                        tabBarActiveTintColor: "skyblue",
                        tabBarInactiveTintColor: "gray",
                    }}
                />
                <Tab.Screen
                    name="MyScreen"
                    component={MyScreen}
                    options={{
                        title: "내 정보",
                        tabBarLabel: "내 정보",
                        tabBarIcon: ({ focused }) => {
                            const color = focused ? "skyblue" : "gray";
                            return (
                                <FontAwesome5
                                    name="user-edit"
                                    size={24}
                                    color={color}
                                ></FontAwesome5>
                            );
                        },
                        tabBarActiveTintColor: "skyblue",
                        tabBarInactiveTintColor: "gray",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
