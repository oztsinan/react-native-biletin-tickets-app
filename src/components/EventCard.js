import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigate, useNavigation } from "@react-navigation/native";
import date from "../functions/date";

const EventCard = ({
  eventID,
  eventCover,
  eventDate,
  eventTitle,
  eventVideo,
  eventLocation,
  eventRules,
  eventPrices,
  page,
}) => {
  const navigation = useNavigation();

  const eventCardClick = () => {
    navigation.navigate("EventViewPage", {
      eventID: eventID,
      eventCover: eventCover,
      eventDate: eventDate,
      eventTitle: eventTitle,
      eventVideo: eventVideo,
      eventLocation: eventLocation,
      eventRules: eventRules,
      eventPrices: eventPrices,
      clickPage: page,
    });
  };

  useEffect(() => {}, []);

  return (
    <TouchableOpacity onPress={eventCardClick} style={styles.cardMain}>
      <View style={styles.cardCenter}>
        <Image
          resizeMode="cover"
          style={styles.coverImage}
          source={{ uri: eventCover }}
        />

        <View style={styles.cardBottomShadow}>
          <Image
            style={styles.cardShadowImage}
            source={require("../assets/cards/cardShadow.png")}
          />
        </View>
        <View style={styles.cardInfoFrame}>
          <Text numberOfLines={1} style={styles.eventTitleText}>
            {" "}
            {eventTitle}{" "}
          </Text>
          <Text numberOfLines={1} style={styles.eventDateText}>
            {" "}
            {date(eventDate)} , {eventLocation.locationName}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardCenter: {
    shadowColor: "purple",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    borderRadius: 20,
    marginBottom: 30,
    width: 300,
    height: 220,
    backgroundColor: "gray",
    borderRadius: 20,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  cardBottomShadow: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cardShadowImage: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  cardInfoFrame: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  eventTitleText: {
    fontFamily: "Anton-Regular",
    fontSize: 23,
    color: "white",
  },
  eventDateText: {
    width: "90%",
    fontFamily: "Gilroy-Light",
    color: "white",
  },
});

export default EventCard;
