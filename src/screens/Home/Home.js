import react, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { StatusBar } from "expo-status-bar";

import {
  SetUser,
  SetUserTickets,
  SetEvents,
  SetUserFavorites,
} from "../../redux/action";
import Icon from "react-native-vector-icons/Feather";
import { HomeCard } from "../../components/HomeCard";
import HomeTicket from "../../components/HomeTicket";
import * as Location from "expo-location";
import Loading from "../../components/Loading";
import EventCard from "../../components/EventCard";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { ReduxState } = useSelector((state) => state);
  const [bottomList, setBottomList] = useState([]);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const [mainLoading, setMainLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const getUserTickets = (userID) => {
    var userTickets = [];
    onValue(ref(database, "users/" + userID + "/tickets"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let result = { ...data };
      for (let key in result) {
        userTickets.push(result[key]);
      }
      dispatch(SetUserTickets(userTickets));
      setLoading1(true);
    });
  };

  const getEvents = () => {
    const reference = ref(database, "events");
    onValue(reference, (snapshot) => {
      var data = snapshot.val().sort(function (a, b) {
        return a.eventDate.localeCompare(b.eventDate);
      });

      dispatch(SetEvents(data));
      setLoading2(true);
    });
  };

  const getUserInfo = () => {
    auth.onAuthStateChanged((user) => {
      user ? dispatch(SetUser(user)) && getUserTickets(user.uid) : null;
    });
  };

  const getFavorites = () => {
    var gelenVeri = [];
    onValue(
      ref(database, "users/" + "Xd3ZJlaEQrauctgGXjbkKMWpY9J3" + "/favorites"),
      (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let result = { ...data };
        for (let key in result) {
          gelenVeri.push({
            key: key,
            data: result[key],
          });
        }

        dispatch(SetUserFavorites(gelenVeri));
        setLoading4(true);
      }
    );
  };

  useEffect(() => {
    if (loading1 == true && loading2 == true && loading4 == true)
      setMainLoading(true);
  }, [loading1, loading2, loading4]);

  useEffect(() => {
    getEvents();
    getUserInfo();
    getFavorites();

    const reference = ref(database, "events");
    onValue(reference, (snapshot) => {
      var data = snapshot.val().sort(function (a, b) {
        return a.eventDate.localeCompare(b.eventDate);
      });

      setBottomList(data);
    });
  }, []);

  const searchEvent = (data, aranan) => {
    var array = [];

    var nameAranan = aranan.toUpperCase();

    var first_ch =
      aranan.substr(0, 1) == "i" ? "İ" : aranan.substr(0, 1).toUpperCase();
    var cont = aranan.substr(1, aranan.length).toLowerCase();
    var locationAranan = first_ch + cont;

    for (let i in data) {
      if (
        data[i].eventTitle.match(nameAranan) ||
        data[i].eventLocation.locationName.match(locationAranan)
      ) {
        array.push(data[i]);
      }
    }

    return array;
  };

  return mainLoading ? (
    <SafeAreaView style={styles.mainFrame}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.headerTopFrame}>
          <View style={styles.headerTopFrameLeft}>
            <Text style={styles.welcomeText}>Hoşgeldin!</Text>
            <Text numberOfLines={1} style={styles.userNameText}>
              {ReduxState.user.displayName}
            </Text>
          </View>

          <View style={styles.headerTopFrameMiddle}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../../assets/biletinLogo.png")}
            />
          </View>
        </View>

        <View style={styles.headerTopFrameRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileNavigation")}
          >
            <Avatar.Image
              source={{ uri: ReduxState.user.photoURL }}
              style={styles.avatarImage}
              size={50}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchFrame}>
        <View style={styles.searchView}>
          <TextInput
            onChangeText={setSearchInput}
            outlineColor="#efefef"
            placeholderTextColor={"#a3a3a3"}
            style={styles.searchInput}
            autoComplete="none"
            autoCapitalize="none"
            autoFocus="none"
            left={
              <TextInput.Icon name={() => <Icon name="search" size={18} />} />
            }
            mode="outlined"
            placeholder="Müzik,Tiyatro...."
          />
        </View>
      </View>

      <ScrollView style={{ display: searchInput.length > 1 ? "none" : "" }}>
        <View style={styles.popularEventsFrame}>
          <View style={styles.popularEventsFrame_left}>
            <Text style={styles.popularEventsText}>Popüler Etkinlikler</Text>
          </View>
          <View style={styles.popularEventsFrame_right}>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
              <Text style={styles.seeMoreText}>Tümünü göster</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.populerEventsListFrame}>
          <FlatList
            onScroll={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30 }}
            horizontal={true}
            data={ReduxState.events.sort(function (a, b) {
              return b.eventDate.localeCompare(a.eventDate);
            })}
            renderItem={({ item }) =>
              item.eventFeatured ? (
                <HomeCard page="Home" yonSecim="yatay" data={item} />
              ) : null
            }
          />
        </View>

        <View style={styles.popularEventsFrame}>
          <View style={styles.popularEventsFrame_left}>
            <Text style={styles.popularEventsText}>
              Etkinliklere Biletin Hazır 👇🏻 🎫 🎸
            </Text>
          </View>
          <View style={styles.popularEventsFrame_right}>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
              <Text style={styles.seeMoreText}>Tümünü göster</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.eventsListTicketView}>
          <FlatList
            onScroll={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30 }}
            horizontal={true}
            data={bottomList}
            renderItem={({ item }) => <HomeTicket data={item} />}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.searchResultsFrame,
          {
            display: searchInput.length > 1 ? "" : "none",
          },
        ]}
      >
        <FlatList
          onScroll={false}
          contentContainerStyle={styles.searchResultFlatList}
          data={searchEvent(ReduxState.events, searchInput)}
          renderItem={({ item }) => (
            <EventCard
              eventID={item.eventID}
              eventCover={item.eventCover}
              eventDate={item.eventDate}
              eventTitle={item.eventTitle}
              eventLocation={item.eventLocation}
              eventRules={item.eventRules}
              eventPrices={item.eventPrices}
              eventVideo={item.eventVideo}
            />
          )}
        />
      </View>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerTopFrame: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerTopFrameLeft: {
    width: "60%",
    marginRight: -30,
    justifyContent: "center",
    marginLeft: 30,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: "Roboto-Medium",
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 18,
    fontFamily: "Roboto-Light",
  },
  headerTopFrameMiddle: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
  },
  logoImage: {
    width: "100%",
    height: 20,
  },
  headerTopFrameRight: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  avatarImage: {
    marginRight: 30,
    backgroundColor: "#e0e0e0",
  },
  searchFrame: {
    width: "100%",
    alignItems: "center",
  },
  searchView: {
    width: "85%",
  },
  searchInput: {
    fontSize: 14,
    backgroundColor: "white",
  },
  popularEventsFrame: {
    flexDirection: "row",
    width: "100%",
    margin: 30,
  },
  popularEventsFrame_left: {
    width: "60%",
    height: "100%",
  },
  popularEventsText: {
    fontFamily: "Roboto-Medium",
  },
  popularEventsFrame_right: {
    width: "40%",
    height: "100%",
  },
  seeMoreText: {
    color: "#4256a1",
    fontFamily: "Roboto-Regular",
  },
  populerEventsListFrame: {
    flexDirection: "row",
    width: "100%",
  },
  eventsListTicketView: {
    flexDirection: "row",
    width: "100%",
    margin: 0,
    paddingBottom: 50,
  },
  searchResultsFrame: {
    width: "100%",
    alignItems: "center",
  },
  searchResultFlatList: {
    paddingTop: 40,
    paddingBottom: 180,
  },
});

export default Home;
