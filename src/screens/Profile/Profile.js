import { onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import { auth, database } from "../../../firebase-config";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SetUser, SetUserTickets } from "../../redux/action";
import { onValue, ref } from "firebase/database";

const Profile = () => {
  const { ReduxState } = useSelector((state) => state);

  const grayColor = "#727987";
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserTickets = (userID) => {
    var userTickets = [];
    onValue(ref(database, "users/" + userID + "/tickets"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let result = { ...data };
      for (let key in result) {
        userTickets.push(result[key]);
      }
      dispatch(SetUserTickets(userTickets));
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(SetUser(user)) && getUserTickets(user.uid) : null;
    });
  }, []);

  const ProfilePhotoChangedButton = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      auth.onAuthStateChanged((user) => {
        updateProfile(user, {
          photoURL: result.uri,
        });
      });
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <View style={styles.mainFrame}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.headerFrame}>
        <View style={styles.headerFrame_left}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon style={{ paddingBottom: 15 }} color="black" size={25} name="chevron-left" />
                    </TouchableOpacity> */}
        </View>
        <View style={styles.headerFrame_middle}>
          <Text style={styles.headerText}> Profilim </Text>
        </View>
        <View style={styles.headerFrame_right}>
          {/* <Icon style={{ paddingBottom: 15 }} color="black" size={25} name="chevron-right" />*/}
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.profileContentFrame}>
        <View style={styles.profileContentFrame_ProfileFrame}>
          <View style={styles.profileContentFrame_avatarView}>
            <Avatar.Image
              source={{ uri: ReduxState.user.photoURL }}
              style={styles.avatarImage}
              size={100}
            />
          </View>

          <View style={styles.profileContentFrame_userInfos}>
            <Text style={styles.userNameText}>
              {ReduxState.user.displayName}
            </Text>
            <Text style={styles.userEmailText}>{ReduxState.user.email}</Text>
          </View>
        </View>

        <View style={styles.menuTextFrame}>
          <Text style={styles.menuText}>Hesabım</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileEdit")}
            style={styles.menuButtonTouchFrame}
          >
            <View style={styles.menuButtonFrame}>
              <View style={styles.menuButtonTextFrame}>
                <View
                  style={[
                    styles.menuButtonView,
                    { backgroundColor: "#59bd7d" },
                  ]}
                >
                  <Icon color={"white"} size={20} name="edit" />
                </View>
                <Text style={styles.menuButtonText}>Profilimi Düzenle</Text>
              </View>

              <View style={styles.menuButtonArrowFrame}>
                <Text>
                  <Icon size={20} name="chevron-right" />
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserTickets")}
            style={styles.menuButtonTouchFrame}
          >
            <View style={styles.menuButtonFrame}>
              <View style={styles.menuButtonTextFrame}>
                <View
                  style={[styles.menuButtonView, { backgroundColor: "orange" }]}
                >
                  <Image
                    style={styles.ticketIconImage}
                    source={require("../../assets/icons/ticketIcon.jpeg")}
                  />
                </View>
                <Text style={styles.menuButtonText}>Biletlerim</Text>
              </View>

              <View style={styles.menuButtonArrowFrame}>
                <Text>
                  <Icon size={20} name="chevron-right" />
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserFavorites")}
            style={[styles.menuButtonTouchFrame, { paddingBottom: 15 }]}
          >
            <View style={styles.menuButtonFrame}>
              <View style={styles.menuButtonTextFrame}>
                <View
                  style={[
                    styles.menuButtonView,
                    {
                      backgroundColor: "#FF4A4A",
                    },
                  ]}
                >
                  <Icon color={"white"} size={20} name="heart" />
                </View>
                <Text style={styles.menuButtonText}>Favorilerim</Text>
              </View>

              <View style={styles.menuButtonArrowFrame}>
                <Text>
                  <Icon size={20} name="chevron-right" />
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "white",
  },
  headerFrame: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeee",
  },
  headerFrame_left: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerFrame_middle: {
    width: "70%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerText: {
    paddingBottom: 17,
    color: "black",
    fontSize: 17,
    fontFamily: "Roboto-Regular",
  },
  headerFrame_right: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  profileContentFrame: {
    marginTop: 30,
  },
  profileContentFrame_ProfileFrame: {
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
  profileContentFrame_avatarView: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
    alignItems: "center",
  },
  avatarImage: {
    backgroundColor: "#e0e0e0",
  },
  profileContentFrame_userInfos: {
    justifyContent: "center",
    width: "60%",
    height: "100%",
  },
  userNameText: {
    fontSize: 23,
    fontFamily: "Roboto-Regular",
    letterSpacing: 0,
    marginBottom: 5,
  },
  userEmailText: {
    color: "#727987",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    letterSpacing: 0,
  },
  menuTextFrame: {
    marginLeft: 35,
    marginTop: 40,
  },
  menuText: {
    color: "#727987",
    marginBottom: 20,
    fontFamily: "Roboto-Light",
  },
  menuButtonFrame: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  menuButtonTextFrame: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  menuButtonView: {
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 53,

    borderRadius: "50%",
  },
  menuButtonText: {
    marginLeft: 15,
    fontSize: 17,
  },
  menuButtonArrowFrame: {
    width: "15%",
  },
  ticketIconImage: {
    tintColor: "white",
    width: "75%",
    height: "75%",
  },
  menuButtonTouchFrame: {
    marginBottom: 20,
  },
  logoutText: {
    color: "#ff6e3f",
    marginBottom: 20,
    fontFamily: "Roboto-Medium",
    fontSize: 18,
  },
});

export default Profile;
