import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeNavigation from "../navigation/HomeNavigation"
import EventsScreen from './EventsScreen'
import Profile from '../screens/Profile/Profile'
import { useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/Feather'
import ProfileNavigation from './ProfileNavigation'
import { Dimensions } from 'react-native'

const TabsNavgation = () => {

    const { ReduxState } = useSelector(state => state)


    const Tabs = createBottomTabNavigator()




    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Dimensions.get("window").height / 9
                }

            }}
        >
            <Tabs.Screen name="HomeNavigation" component={HomeNavigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon color={focused ? 'rgb(87,0,227)' : 'black'} size={25} name="home" />
                    }
                }} />
            <Tabs.Screen name="Events" component={EventsScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon color={focused ? 'rgb(87,0,227)' : 'black'} size={25} name="calendar" />
                    }
                }} />
            <Tabs.Screen name="ProfileNavigation" component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon color={focused ? 'rgb(87,0,227)' : 'black'} size={25} name="user" />
                    }
                }}
            />
        </Tabs.Navigator>
    )
}

export default TabsNavgation