import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import date from "../functions/date";

const HomeTicket = ({ data }) => {
  const [maxTicket, setMaxTicket] = useState(0);
  const [minTicket, setMinTicket] = useState(0);
  const navigation = useNavigation();

  const eventCardClick = () => {
    navigation.navigate("EventViewPage", {
      eventID: data.eventID,
      eventCover: data.eventCover,
      eventDate: data.eventDate,
      eventTitle: data.eventTitle,
      eventVideo: data.eventVideo,
      eventLocation: data.eventLocation,
      eventRules: data.eventRules,
      eventPrices: data.eventPrices,
      clickPage: "Home",
    });
  };

  useEffect(() => {
    var dataArray = [];

    data.eventPrices.map((item) => dataArray.push(item.price));

    var min = dataArray[0];
    var max = dataArray[0];
    for (let i in dataArray) {
      if (min > dataArray[i]) min = dataArray[i];

      if (max < dataArray[i]) max = dataArray[i];
    }

    setMaxTicket(max);
    setMinTicket(min);
  }, []);

  return (
    <TouchableOpacity onPress={eventCardClick}>
      <View style={styles.mainFrame}>
        <View style={styles.eventCoverFrame}>
          <Image
            resizeMode="cover"
            style={styles.eventCoverImage}
            source={{ uri: data.eventCover }}
          />
        </View>
        <Image
          style={styles.ticketImage}
          resizeMode="contain"
          source={require("../assets/tickets/homeTicket.png")}
        />

        {/*  EVENT INFO */}
        <View style={styles.eventInfoFrame}>
          <Text numberOfLines={1} style={styles.eventTitleText}>
            {data.eventTitle}{" "}
          </Text>
          <Text numberOfLines={1} style={styles.eventDateAndClock}>
            {date(data.eventDate)} | {data.eventClock}{" "}
          </Text>
          <Text numberOfLines={1} style={styles.eventLocationNameText}>
            {data.eventLocation.locationName}{" "}
          </Text>
          <Text style={styles.eventAvgPriceText}>
            En Uygun Bilet : {minTicket}₺{" "}
          </Text>
        </View>

        {/*  BARCODE  */}
        <View style={styles.barcodeFrame}>
          <Image
            resizeMode="contain"
            style={styles.barcodeImage}
            source={require("../assets/tickets/barcode.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    marginRight: 20,
  },
  eventCoverFrame: {
    width: 310,
    height: 128,
    position: "absolute",
  },
  eventCoverImage: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  ticketImage: {
    tintColor: "#272262",
    width: 310,
    height: 130,
    opacity: 0.7,
  },
  eventInfoFrame: {
    width: 310,
    marginLeft: 20,
    marginTop: 10,
    height: 128,
    position: "absolute",
  },
  eventTitleText: {
    color: "#ed2a77",
    fontFamily: "Teko-Medium",
    fontSize: 25,
    width: 220,
  },
  eventDateAndClock: {
    marginTop: -8,
    color: "white",
    fontFamily: "Teko-Light",
    fontSize: 21,
    width: 220,
  },
  eventLocationNameText: {
    marginTop: -4,
    color: "#0de1f6",
    fontFamily: "Teko-Light",
    fontSize: 19,
    width: 220,
  },
  eventAvgPriceText: {
    marginTop: 0,
    color: "white",
    fontFamily: "Teko-Light",
    fontSize: 18,
  },
  barcodeFrame: {
    width: 310,
    alignItems: "flex-end",
    marginLeft: 10,
    marginTop: 10,
    height: 128,
    position: "absolute",
  },
  barcodeImage: {
    marginRight: 10,
    transform: [{ rotate: "90deg" }],
    width: 100,
    height: 100,
    tintColor: "white",
  },
});

export default HomeTicket;
