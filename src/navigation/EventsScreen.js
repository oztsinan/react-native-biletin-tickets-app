import { createNativeStackNavigator } from "@react-navigation/native-stack"
import EventMainPage from "../screens/Events/EventMainPage"
import KoltukSecimi from '../screens/Events/KoltukSecimi'
import EventViewPage from '../screens/Events/EventViewPage'
import ShopCardView from "../screens/Events/ShopCardView"
import AfterBuyPage from "../screens/Events/AfterBuyPage"



const StackNavigation = () => {


    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen name="EventMainPage" component={EventMainPage} />
            <Stack.Screen name="EventViewPage" component={EventViewPage} />
            <Stack.Screen name="KoltukSecimi" component={KoltukSecimi} />
            <Stack.Screen name="ShopCardView" component={ShopCardView} />
            <Stack.Screen name="AfterBuyPage" component={AfterBuyPage} />

        </Stack.Navigator>
    )
}

export default StackNavigation