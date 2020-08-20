import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import Homepage from '../screens/Homepage'
import AddTodo from '../screens/AddTodo'
import Logout from '../components/Logout'

const Tab = createBottomTabNavigator()

const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: { backgroundColor: 'white' },
}

export default () => {

    return (
        <Tab.Navigator
            initialRouteName="homepage"
            activeColor="#fff"
            tabBarOptions={customTabBarStyle}
            shifting="false">
            <Tab.Screen
                name="homepage"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" type="font-awesome" color={color} size={26} />
                    )
                }}
                component={Homepage}
            />
            <Tab.Screen
                name="AddTodo"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0, // space from bottombar
                                height: 68,
                                width: 68,
                                borderRadius: 68,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Icon name="add-circle" solid color="purple" size={68} />
                        </View>
                    )
                }}
                component={AddTodo}
            />

            <Tab.Screen
                name="logout"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="sign-out" type="font-awesome" color={color} size={26} />
                    )
                }}
                component={Logout}
            />
        </Tab.Navigator>
    )
}