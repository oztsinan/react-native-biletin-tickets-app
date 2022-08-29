import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AuthControl from "../screens/AuthControl"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"
import Tabs from './TabsNavigation'

import { database, auth } from '../../firebase-config'
import { useEffect } from "react"
import { SetUser, SetUserTickets } from '../redux/action'

const StackNavigation = () => {

    const Stack = createNativeStackNavigator()



    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="AuthControl" component={AuthControl} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
    )
}

export default StackNavigation