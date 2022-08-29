import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RadioButton } from "react-native-paper";
import { ref, set } from "firebase/database";
import Icon from "react-native-vector-icons/Feather";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../../firebase-config";

const SignUp = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [securePasswordShow, setSecurePasswordShow] = useState(true);

  const [nameInput, setNameInput] = useState("");
  const [email, setEmail] = useState("");
  const [sehir, setSehir] = useState("");
  const [yas, setYas] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const [cinsiyet, setCinsiyet] = useState("");

  useEffect(() => {
    if (
      nameInput.length > 4 &&
      email.length > 9 &&
      sehir.length > 2 &&
      yas > 17 &&
      password.length > 5 &&
      (cinsiyet == "Erkek" || cinsiyet == "Kadın")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nameInput, email, password, sehir, yas, cinsiyet]);

  const signUp = async () => {
    setIsLoading(true);
    var userID = "";

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: nameInput,
          photoURL:
            cinsiyet == "Kadın"
              ? "https://i.ibb.co/27QxHX2/female.png"
              : "https://i.ibb.co/dL6cvCB/male.png",
        });

        var extra_data = {
          yas: yas,
          cinsiyet: cinsiyet,
          sehir: sehir,
        };

        const reference = ref(database, "users/" + user.uid + "/info");
        set(reference, extra_data);

        setIsLoading(false);
        signInWithEmailAndPassword(auth, email, password);
        setIsLoading(false);
        navigation.navigate("Tabs");

        Toast.show({
          type: "error",
          text1: "Kayıt başarılı!",
          text2: "",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message.match("email")
            ? "Lütfen geçerli bir email adresi giriniz!"
            : null,

          text2: "",
        });
        setIsLoading(false);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              style={styles.headerLeftIcon}
              color="black"
              size={25}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Text style={styles.headerMiddleText}> Kayıt Ol </Text>
        </View>
        <View style={styles.headerMiddleRight}></View>

        <Toast />
      </SafeAreaView>

      <SafeAreaView style={styles.pageContent}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require("../../assets/biletinLogo.png")}
        />

        <View style={styles.inputFrame}>
          <View style={styles.frameCentered}>
            <TextInput
              outlineColor="#efefef"
              left={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  size={20}
                  color="gray"
                  name="account"
                />
              }
              placeholderTextColor={"#2f3030"}
              label="Ad ve Soyad"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setNameInput}
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <TextInput
              secureTextEntry={securePasswordShow}
              right={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  onPressIn={() => setSecurePasswordShow(false)}
                  onPressOut={() => setSecurePasswordShow(true)}
                  name="eye"
                />
              }
              outlineColor="#efefef"
              placeholderTextColor={"#2f3030"}
              label="Şifre"
              keyboardType="default"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <TextInput
              left={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  size={20}
                  color="gray"
                  name="email"
                />
              }
              outlineColor="#efefef"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
              placeholderTextColor={"#2f3030"}
              keyboardType="email-address"
              label="Email"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.rowInputFrame}>
            <View style={styles.rowInputFrameWidth}>
              <View style={styles.rowInputWidth}>
                <View style={styles.frameCentered}>
                  <TextInput
                    outlineColor="#efefef"
                    placeholderTextColor={"#2f3030"}
                    label="Şehir"
                    style={styles.input}
                    mode="outlined"
                    onChangeText={setSehir}
                  />
                </View>
              </View>
            </View>

            <View style={styles.rowInputFrameWidth}>
              <View style={styles.rowInputWidth}>
                <View style={styles.frameCentered}>
                  <TextInput
                    outlineColor="#efefef"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholderTextColor={"#2f3030"}
                    label="Yaş"
                    style={styles.input}
                    mode="outlined"
                    onChangeText={setYas}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <Text style={styles.text}>Cinsiyetiniz</Text>
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.genderFrame}>
            <RadioButton.Group
              onValueChange={(cinsiyet) => setCinsiyet(cinsiyet)}
              value={cinsiyet}
            >
              <RadioButton.Item
                labelStyle={styles.genderText}
                label="Erkek"
                value="Erkek"
              />
              <RadioButton.Item
                labelStyle={styles.genderText}
                color="pink"
                label="Kadın"
                value="Kadın"
              />
            </RadioButton.Group>
          </View>
        </View>

        <Button
          disabled={buttonDisabled}
          style={styles.button}
          onPress={() => signUp()}
          loading={isLoading}
          mode="outlined"
        >
          {" "}
          KAYIT OL{" "}
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
  },
  headerLeft: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerLeftIcon: {
    paddingBottom: 15,
  },
  headerMiddle: {
    width: "70%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerMiddleText: {
    paddingBottom: 17,
    color: "black",
    fontSize: 17,
    fontFamily: "Roboto-Regular",
  },
  headerMiddleRight: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  pageContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoImage: {
    width: "60%",
    height: 50,
    marginBottom: 30,
  },
  inputFrame: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  frameCentered: {
    width: "85%",
  },
  textInputIcon: {
    marginTop: 14,
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
  },
  rowInputFrame: {
    width: "92%",
    flexDirection: "row",
    justifyContent: "center",
  },
  rowInputFrameWidth: {
    width: "50%",
  },
  rowInputWidth: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rowInputFrameCentered: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 3,
    fontSize: 14.5,
    fontFamily: "Roboto-Regular",
    color: "#757575",
  },
  genderFrame: {
    borderRadius: 5,
    width: "85%",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  genderText: {
    color: "#757575",
  },
  button: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    height: 50,
  },
});

export default SignUp;
