import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Profile from "../screens/Profile/Profile"
import UserTickets from "../screens/Profile/UserTickets"
import BigTicketView from '../screens/Profile/BigTicketView'
import ProfileEdit from "../screens/Profile/ProfileEdit"
import UserFavorites from "../screens/Profile/UserFavorites"
import EventViewPage from '../screens/Events/EventViewPage'

const StackNavigation = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UserTickets" component={UserTickets} />
            <Stack.Screen name="BigTicketView" component={BigTicketView} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            <Stack.Screen name="UserFavorites" component={UserFavorites} />
            <Stack.Screen name="EventViewPage" component={EventViewPage} />



        </Stack.Navigator>
    )
}

export default StackNavigation