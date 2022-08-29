import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { SetShopCard, SetUserTickets } from "../../redux/action";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { auth, database } from "../../../firebase-config";
import { ref, set, update, remove, push, onValue } from "firebase/database";
import date from "../../functions/date";

const ShopCardView = () => {
  const { ReduxState } = useSelector((state) => state);
  const [shopCard_eventCover, setShopCard_eventCover] = useState("");
  const [shopCard_eventDate, setShopCard_eventDate] = useState("");
  const [shopCard_eventCategory, setShopCard_eventCategory] = useState("");
  const [shopCard_eventTitle, setShopCard_eventTitle] = useState("");
  const [shopCard_eventID, setShopCard_eventID] = useState("");
  const navigation = useNavigation();

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

  const dispatch = useDispatch();

  const buySeats = async (koltukNumarasi) => {
    var eventID = shopCard_eventID - 1;

    const reference = ref(
      database,
      "events/" +
        eventID +
        "/eventPrices/" +
        getCategoryIndex() +
        "/doluKoltuklar"
    );
    push(reference, {
      koltukNo: koltukNumarasi,
      userID: ReduxState.user.uid,
      userName: ReduxState.user.displayName,
      userEmail: ReduxState.user.email,
    }).then((response) => {});
  };

  const getCategoryIndex = () => {
    var eventID = shopCard_eventID - 1;

    var gelenVeri = [];
    onValue(
      ref(database, "events/" + eventID + "/eventPrices/"),
      (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let result = { ...data };
        gelenVeri = result;
      }
    );

    var findIndex = 0;

    for (let i in gelenVeri) {
      if (gelenVeri[i].name == shopCard_eventCategory) {
        findIndex = i;
      }
    }

    return findIndex;
  };

  function barkodOlustur() {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 30;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  }

  useEffect(() => {
    dispatch(
      SetShopCard(
        ReduxState.shopCard.sort(
          (a, b) => a.data.koltukNumarasi - b.data.koltukNumarasi
        )
      )
    );

    ReduxState.shopCard.map(
      (item) =>
        setShopCard_eventCover(item.data.eventCover) ||
        setShopCard_eventDate(item.data.eventDate) ||
        setShopCard_eventCategory(item.data.kategori) ||
        setShopCard_eventTitle(item.data.eventTitle) ||
        setShopCard_eventID(parseInt(item.data.eventID))
    );
  }, [ReduxState.shopCard]);

  const siparisiOnayla = () => {
    var koltukNumaralari = [];

    ReduxState.shopCard.map((item) => buySeats(item.data.koltukNumarasi));

    ReduxState.shopCard.map((item) =>
      koltukNumaralari.push(item.data.koltukNumarasi)
    );

    var ticketID = barkodOlustur();

    const reference = ref(
      database,
      "users/" + ReduxState.user.uid + "/tickets"
    );
    push(reference, {
      ticketID: ticketID,
      koltukNumaralari: koltukNumaralari,
      kategori: shopCard_eventCategory,
      eventID: shopCard_eventID,
      eventTitle: shopCard_eventTitle,
      eventDate: shopCard_eventDate,
      eventCover: shopCard_eventCover,
    })
      .then((response) => {
        navigation.navigate(
          "AfterBuyPage",

          {
            ticketID: ticketID,
            koltukNumaralari: koltukNumaralari,
            kategori: shopCard_eventCategory,
            eventID: shopCard_eventID,
            eventTitle: shopCard_eventTitle,
            eventDate: shopCard_eventDate,
            eventCover: shopCard_eventCover,
          }
        );
        getUserTickets(ReduxState.user.uid);
      })
      .catch((error) => {});
  };

  return shopCard_eventCover ? (
    <>
      <SafeAreaView style={styles.headerTopFrame}>
        <View style={styles.headerTopView}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            color="black"
            name="arrow-left"
            size={25}
          />
        </View>
        <View style={styles.headerRightFrame}></View>
      </SafeAreaView>

      <SafeAreaView style={styles.eventInfosFrame}>
        <View style={styles.eventBigTitleFrame}>
          <Text numberOfLines={1} style={styles.eventBigTitleText}>
            {" "}
            {shopCard_eventTitle}{" "}
          </Text>
        </View>

        <Image
          style={styles.eventCoverImage}
          source={{ uri: shopCard_eventCover }}
        />

        <View style={styles.eventDetailsFrame}>
          <Text style={styles.eventTitleText}> {shopCard_eventTitle} </Text>
          <Text style={styles.eventDateText}>{date(shopCard_eventDate)}</Text>
          <Text style={styles.eventCategoryText}>{shopCard_eventCategory}</Text>
        </View>
        <View style={styles.selectSeatsFrame}>
          {ReduxState.shopCard.map((item, index) => (
            <View key={index} style={styles.selectSeatsView}>
              <Image
                style={styles.seatImage}
                source={require("../../assets/saloon/koltuk.png")}
              />
              <View style={styles.seatsNoView}>
                <Text style={styles.seatsNoText}>
                  {" "}
                  {item.data.koltukNumarasi}{" "}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.button}>
          <Button onPress={siparisiOnayla} style={{}} mode="contained">
            {" "}
            Siparişi Onayla{" "}
          </Button>
        </View>
      </SafeAreaView>
    </>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  headerTopFrame: {
    position: "absolute",
    zIndex: 1,
    margin: 20,
    flexDirection: "row",
  },
  headerTopView: {
    width: "50%",
    alignItems: "flex-start",
  },
  headerRightFrame: {
    width: "50%",
    alignItems: "flex-end",
  },
  eventInfosFrame: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  eventBigTitleFrame: {
    width: 1000,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  eventBigTitleText: {
    fontFamily: "Teko-Light",
    fontSize: 200,
  },
  eventCoverImage: {
    borderRadius: 20,
    marginTop: 60,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  eventDetailsFrame: {
    justifyContent: "center",
    alignItems: "center",
  },
  eventTitleText: {
    fontFamily: "Teko-Light",
    fontSize: 50,
    marginBottom: -10,
  },
  eventDateText: {
    fontFamily: "Teko-Regular",
    fontSize: 30,
    marginBottom: 0,
  },
  eventCategoryText: {
    fontFamily: "Teko-Light",
    fontSize: 25,
    marginBottom: 20,
  },
  selectSeatsFrame: {
    flexDirection: "row",
    marginBottom: 40,
    width: "100%",
    justifyContent: "center",
  },
  selectSeatsView: {
    marginRight: 10,
  },
  seatImage: {
    tintColor: "rgb(87,0,227)",
  },
  seatsNoView: {
    position: "absolute",
    width: 33,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  seatsNoText: {
    color: "white",
    position: "absolute",
  },
  button: {
    bottom: 20,
    position: "absolute",
  },
});

export default ShopCardView;
