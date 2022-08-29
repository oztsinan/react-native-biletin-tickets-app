import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screens/Home/Home'
import EventViewPage from '../screens/Events/EventViewPage'


const StackNavigation = () => {


    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EventViewPage" component={EventViewPage} />
        </Stack.Navigator>
    )
}

export default StackNavigation