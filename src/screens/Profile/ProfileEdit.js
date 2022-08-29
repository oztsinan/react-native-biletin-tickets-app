import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database, auth } from "../../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Avatar, RadioButton } from "react-native-paper";
import * as React from "react";
import { onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import { SetUser } from "../../redux/action";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ProfileEdit = () => {
  const { ReduxState } = useSelector((state) => state);
  const navigation = useNavigation();
  const grayColor = "#727987";

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [photoURL, setPhotoURL] = useState(ReduxState.user.photoURL);

  const [infoSehir, setInfoSehir] = useState("");
  const [infoYas, setInfoYas] = useState("");
  const [infoCinsiyet, setInfoCinsiyet] = useState("");

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputSehir, setInputSehir] = useState(infoSehir);
  const [inputYas, setInputYas] = useState(infoYas);
  const [inputCinsiyet, setInputCinsiyet] = useState(infoCinsiyet);

  const dispatch = useDispatch();

  useEffect(() => {
    var userDetails = [];
    const reference = ref(database, "users/" + ReduxState.user.uid + "/info");
    onValue(reference, (snapshot) => {
      var data = snapshot.val();
      userDetails = data;
      setInfoCinsiyet(data.cinsiyet);
      setInfoYas(data.yas);
      setInfoSehir(data.sehir);
    });
  }, []);

  const guncelle = () => {
    var name = inputName;
    var email = inputEmail;
    var sehir = inputSehir;
    var yas = inputYas;
    var cinsiyet = infoCinsiyet;

    var extra_data = {
      yas: yas.length < 1 ? infoYas : inputYas,
      cinsiyet: cinsiyet,
      sehir: sehir.length < 2 ? infoSehir : inputSehir,
    };

    auth.onAuthStateChanged((user) => {
      updateProfile(user, {
        displayName: name.length < 2 ? ReduxState.user.displayName : name,
        email: email,
        photoURL: photoURL,
      })
        .then(() => {
          const reference = ref(
            database,
            "users/" + ReduxState.user.uid + "/info"
          );
          set(reference, extra_data);
          dispatch(SetUser(user));
          Toast.show({
            type: "success",
            text1: "Profil Güncellendi!",
            text2: "",
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: error.message,
            text2: "",
          });
        });
    });
  };

  const ProfilePhotoChangedButton = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoURL(result.uri);

      var apiKey = "01749b0ed5027884f7ea756572a934cb";
    }
  };

  useEffect(() => {
    if (infoSehir != inputSehir) {
      setButtonDisabled(false);
    }
  }, [inputEmail, inputName, inputSehir, inputYas]);

  return (
    <View style={styles.mainFrame}>
      <SafeAreaView style={styles.headerBar}>
        <View style={styles.headerBarLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Icon
              style={{ paddingBottom: 15 }}
              color="black"
              size={25}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBarMiddle}>
          <Text style={styles.headerBarText}> Profilimi Düzenle </Text>
        </View>
        <View style={styles.headerBarRight}>
          {/* <Icon style={{ paddingBottom: 15 }} color="black" size={25} name="chevron-right" />*/}
        </View>
      </SafeAreaView>

      <ScrollView>
        <SafeAreaView style={styles.pageContentFrame}>
          <View style={styles.headerUserInfo}>
            <View style={styles.headerUserInfo_avatarFrame}>
              <Avatar.Image
                style={styles.headerUserInfo_avatar}
                source={{ uri: photoURL }}
                size={100}
              />
              <TouchableNativeFeedback
                onPress={() => ProfilePhotoChangedButton()}
              >
                <Avatar.Icon
                  size={35}
                  style={styles.headerUserInfo_profileChangeAvatar}
                  icon="camera"
                />
              </TouchableNativeFeedback>
            </View>

            <View style={styles.headerUserInfo_texts}>
              <Text style={styles.headerUserInfo_nameText}>
                {ReduxState.user.displayName}
              </Text>
              <Text style={styles.headerUserInfo_emailText}>
                {ReduxState.user.email}
              </Text>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 100 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Ad ve Soyad</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                outlineColor="#efefef"
                placeholderTextColor={"#2f3030"}
                placeholder={ReduxState.user.displayName}
                style={styles.input}
                mode="outlined"
                onChangeText={setInputName}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Email</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                outlineColor="#efefef"
                placeholderTextColor={"#2f3030"}
                placeholder={ReduxState.user.email}
                style={styles.input}
                mode="outlined"
                onChangeText={setInputEmail}
                value={ReduxState.user.email}
              />
            </View>
          </View>

          <View style={styles.editTextFrame}>
            <View style={styles.editRowInputFrame}>
              <View style={styles.editRowInputFrameCentered}>
                <View style={styles.editRowInputView}>
                  <View style={styles.frameCentered}>
                    <Text style={styles.inputText}>Şehir</Text>
                  </View>
                </View>

                <View style={styles.editInputFrame}>
                  <View style={styles.frameCentered}>
                    <TextInput
                      outlineColor="#efefef"
                      placeholderTextColor={"#2f3030"}
                      placeholder={infoSehir}
                      style={styles.input}
                      mode="outlined"
                      onChangeText={setInputSehir}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.editRowWidth}>
                <View style={styles.editRowInputView}>
                  <View style={styles.frameCentered}>
                    <Text style={styles.inputText}>Yaş</Text>
                  </View>
                </View>

                <View style={styles.editInputFrame}>
                  <View style={styles.frameCentered}>
                    <TextInput
                      outlineColor="#efefef"
                      keyboardType="numeric"
                      maxLength={2}
                      placeholderTextColor={"#2f3030"}
                      placeholder={infoYas}
                      onChangeText={setInputYas}
                      style={styles.input}
                      mode="outlined"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Cinsiyetiniz</Text>
            </View>
          </View>

          <View style={styles.genderInputFrame}>
            <View style={styles.genderInputView}>
              <RadioButton.Group
                onValueChange={(infoCinsiyet) => setInfoCinsiyet(infoCinsiyet)}
                value={infoCinsiyet}
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
        </SafeAreaView>
      </ScrollView>

      <View style={styles.buttonFrame}>
        <View style={styles.buttonView}>
          <Button onPress={guncelle} mode="contained">
            Güncelle
          </Button>
        </View>
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeee",
  },
  headerBarLeft: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerBarMiddle: {
    width: "70%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerBarText: {
    paddingBottom: 17,
    color: "black",
    fontSize: 17,
    fontFamily: "Roboto-Regular",
  },
  headerBarRight: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  pageContentFrame: {
    backgroundColor: "white",
    marginTop: 30,
  },
  headerUserInfo: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerUserInfo_avatarFrame: {
    justifyContent: "center",
    marginTop: 100,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  headerUserInfo_avatar: {
    backgroundColor: "#e0e0e0",
  },
  headerUserInfo_profileChangeAvatar: {
    top: 80,
    position: "absolute",
  },
  headerUserInfo_texts: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  headerUserInfo_nameText: {
    fontSize: 23,
    fontFamily: "Roboto-Regular",
    letterSpacing: 0,
    marginBottom: 5,
  },
  headerUserInfo_emailText: {
    color: "#727987",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    letterSpacing: 0,
  },
  editTextFrame: {
    width: "100%",
    alignItems: "center",
  },
  frameCentered: {
    width: "85%",
  },
  inputText: {
    marginLeft: 3,
    fontSize: 14.5,
    fontFamily: "Roboto-Regular",
    color: "#2f3030",
  },
  editInputFrame: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    height: 50,
  },
  editRowInputFrame: {
    width: "92%",
    flexDirection: "row",
    justifyContent: "center",
  },
  editRowInputFrameCentered: {
    width: "50%",
  },
  editRowInputView: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  editRowWidth: {
    width: "50%",
  },
  genderInputFrame: {
    marginTop: 10,
    paddingBottom: 100,
    width: "100%",
    alignItems: "center",
  },
  genderInputView: {
    borderRadius: 5,
    width: "85%",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  genderText: {
    color: "#2f3030",
  },
  buttonFrame: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonView: {
    width: "60%",
  },
});

export default ProfileEdit;
