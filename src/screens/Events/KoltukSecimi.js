import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { database, auth } from "../../../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import {
  SetSeciliKoltuklar,
  SetShopCard,
  SetShopCardPrice,
} from "../../redux/action";
import { Video, AVPlaybackStatus, AVFoundation } from "expo-av";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ShowSeat from "../../components/ShowSeat";
import ShopCard from "../../components/ShopCard";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import YoutubePlayer from "react-native-youtube-iframe";

const Events = () => {
  const color1 = "white";
  const nullSeatColor = "white";
  const filledSeatColor = "gray";

  const navigation = useNavigation();
  const [soundControl, setSoundControl] = useState(true);
  const { ReduxState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const route = useRoute();
  const eventID = route.params.eventID;
  const clickCategory = route.params.clickCategory;
  const eventCover = route.params.eventCover;
  const eventVideo = route.params.eventVideo;

  const [seciliKoltuklarLocal, setSeciliKoltuklarLocal] = useState(
    ReduxState.seciliKoltuklar
  );

  useEffect(() => {
    var contentID = route.params.eventID - 1;

    var data = [];
    const reference = ref(database, "events/");
    onValue(reference, (snapshot) => {
      data = snapshot.val();
    });

    var selectedEvent = [];
    data.map((item) =>
      item.eventID == eventID ? (selectedEvent = item) : null
    );

    var selectedCategory = [];
    selectedEvent.eventPrices.map((item) => {
      item.name == clickCategory ? (selectedCategory = item) : null;
    });

    var seatToNumber = [];

    for (let i = 1; i <= selectedCategory.koltuklar; i++) {
      seatToNumber.push({
        koltukNo: i,
        dolu: null,
        sahibi: null,
      });
    }

    var tumKoltuklar = seatToNumber;
    var tumKoltuklarNumber = [];

    for (let i in tumKoltuklar) {
      tumKoltuklarNumber.push(tumKoltuklar[i].koltukNo);
    }

    if (selectedCategory.doluKoltuklar) {
      var doluKoltuklarArray = selectedCategory.doluKoltuklar;
      var doluKoltuklarNumber = [];

      for (let key in doluKoltuklarArray) {
        doluKoltuklarNumber.push(doluKoltuklarArray[key].koltukNo);
      }
    }

    var seatsInfos = [];

    for (let i in tumKoltuklarNumber) {
      seatsInfos.push({
        koltukNo: tumKoltuklarNumber[i],
        status: null,
        sahibi: null,
      });
    }

    if (selectedCategory.doluKoltuklar) {
      for (let i in doluKoltuklarNumber) {
        seatsInfos[doluKoltuklarNumber[i] - 1] = {
          koltukNo: doluKoltuklarNumber[i],
          status: "dolu",
          sahibi: null,
        };
      }
    }

    var lastData = [
      {
        seatNumber: selectedCategory.koltuklar,
        seatShow: seatsInfos,
        name: selectedCategory.name,
        price: selectedCategory.price,
        seatFullList: selectedCategory.doluKoltuklar,
      },
    ];

    dispatch(SetSeciliKoltuklar(lastData));
  }, [route]);

  return (
    <View style={styles.mainFrame}>
      <SafeAreaView style={styles.headerTop}>
        <View style={styles.headerTopLeftFrame}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              style={styles.headerTopLeftIcon}
              color="white"
              size={25}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTopMiddleFrame}>
          {/*   <Text style={{ paddingBottom: 17, color: 'black', fontSize: 17, fontFamily: 'Roboto-Regular' }}> Profilim </Text> */}
        </View>
        <View style={styles.headerRightFrame}></View>
      </SafeAreaView>

      <View style={styles.background}></View>

      <View style={styles.backgroundOverlay}></View>

      <ScrollView>
        <SafeAreaView style={styles.eventSeatInfosFrame}>
          <View style={styles.screenView}>
            <Image
              style={styles.screenImage}
              source={require("../../assets/saloon/screen.png")}
            />
          </View>

          {ReduxState.seciliKoltuklar.map((item, index) => (
            <View key={index} style={styles.headerEventsInfo}>
              <Text style={styles.categoryText}> {item.name} </Text>
              <Text style={styles.categoryPriceText}> {item.price}₺ </Text>
            </View>
          ))}

          <View style={styles.seatsFrame}>
            {ReduxState.seciliKoltuklar.map((item) =>
              item.seatShow.map((item, index) => (
                <ShowSeat
                  veri={ReduxState.seciliKoltuklar}
                  key={index}
                  status={item.status ? item.status : "bos"}
                  number={item.koltukNo}
                />
              ))
            )}
          </View>
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView style={styles.shopCardView}>
        <ShopCard />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
  },
  headerTop: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
  },
  headerTopLeftFrame: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerTopLeftIcon: {
    paddingBottom: 15,
  },
  headerTopMiddleFrame: {
    width: "70%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerRightFrame: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    backgroundColor: "#2c2948",
  },
  backgroundOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  eventSeatInfosFrame: {
    height: Dimensions.get("window").height * 1.2,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenView: {
    width: "85%",
    marginTop: 50,
  },
  screenImage: {
    tintColor: "white",
    width: "100%",
    height: 20,
  },
  headerEventsInfo: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontFamily: "Gilroy-Light",
    fontSize: 20,
    marginBottom: 10,
  },
  categoryPriceText: {
    color: "white",
    fontFamily: "Gilroy-Light",
    fontSize: 16,
  },
  seatsFrame: {
    width: "85%",
    justifyContent: "center",
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: 1,
  },
  shopCardView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: 100,
    bottom: 25,
  },
});

export default Events;
