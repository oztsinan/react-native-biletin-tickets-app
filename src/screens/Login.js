import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Login = () => {
  const [securePasswordShow, setSecurePasswordShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = async () => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        navigation.navigate("Tabs");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message.match("email")
            ? "Lütfen geçerli bir email adresi giriniz!"
            : null || error.message.match("user-not-found")
            ? "Bu email adresine kayıtlı kullanıcı bulunamadı!"
            : null || error.message.match("wrong-password")
            ? "Yanlış parola!"
            : null || email.length < 7
            ? "Email adresinizi giriniz!"
            : "Şifrenizi giriniz!",

          text2: "",
        });
      });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainFrame}>
      <Toast />
      <View style={styles.mainFrameCentered}>
        <View style={styles.logo}>
          <Image
            style={{ width: "60%", height: 50 }}
            resizeMode="contain"
            source={require("../../assets/biletinLogo.png")}
          />
        </View>

        <TextInput
          autoCapitalize="none"
          placeholderTextColor={"#2f3030"}
          mode="outlined"
          label="Email"
          style={styles.input}
          onChangeText={setEmail}
          outlineColor="#efefef"
        />
        <TextInput
          secureTextEntry={securePasswordShow}
          placeholderTextColor={"#2f3030"}
          right={
            <TextInput.Icon
              onPressIn={() => setSecurePasswordShow(false)}
              onPressOut={() => setSecurePasswordShow(true)}
              name="eye"
            />
          }
          autoCapitalize="none"
          outlineColor="#efefef"
          mode="outlined"
          label="Şifre"
          style={styles.input}
          onChangeText={setPassword}
        />

        <Button onPress={() => login()} loading={isLoading} mode="outlined">
          {" "}
          GİRİŞ YAP{" "}
        </Button>

        <View style={styles.bottomTextFrame}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.bottomText}> Kayıt olmadınız mı? </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  mainFrameCentered: {
    width: "80%",
  },
  logo: {
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  bottomTextFrame: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontFamily: "Roboto-Light",
    letterSpacing: 0.3,
  },
});

export default Login;
