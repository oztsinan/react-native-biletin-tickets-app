import { useNavigation } from "@react-navigation/native"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth, database } from "../../firebase-config"
import { useDispatch, useSelector } from "react-redux"
import { onValue, ref } from "firebase/database";
import { SetEvents, SetUserFavorites } from '../redux/action'
import { View } from "react-native"



const AuthControl = () => {

    const navigator = useNavigation()
    const dispatch = useDispatch()
    const { ReduxState } = useSelector(state => state)



    useEffect(() => {



        auth.onAuthStateChanged(user => {
            user ? navigator.navigate('Tabs') : navigator.navigate('Login')
        })



    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        </View>
    )
}
export default AuthControl

