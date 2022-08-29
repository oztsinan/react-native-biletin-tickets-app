import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import date from "../../functions/date";

const AfterBuyPage = () => {
  const route = useRoute();
  const color = "rgba(87,0,227,0.7)";
  const { ReduxState } = useSelector((state) => state);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={styles.mainFrame}>
        <View style={styles.bigEventTitleFrame}>
          <Text numberOfLines={1} style={styles.bigEventTitleText}>
            {" "}
            {route.params.eventTitle}{" "}
          </Text>
        </View>

        <View style={styles.eventCoverFrame}>
          <View style={styles.eventCoverFrameCentered}>
            <Image
              style={styles.eventCoverImage}
              resizeMode="cover"
              source={{ uri: route.params.eventCover }}
            />
          </View>
        </View>
        <Image
          style={styles.ticketImage}
          resizeMode="cover"
          source={require("../../assets/tickets/tickets.png")}
        />
        <View style={styles.eventInfoFrame}>
          <Text numberOfLines={1} style={styles.eventTitleText}>
            {" "}
            {route.params.eventTitle}{" "}
          </Text>
          <Text style={styles.eventDateText}>
            {" "}
            {date(route.params.eventDate)}{" "}
          </Text>
          <Image
            style={styles.QRCodeImage}
            source={{
              uri:
                "https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=" +
                route.params.ticketID,
            }}
          />
          <View style={styles.seatsFrame}>
            {route.params.koltukNumaralari.map((item, index) => (
              <View key={index} style={styles.seatsFrameView}>
                <Image
                  style={styles.seatImage}
                  source={require("../../assets/saloon/koltuk.png")}
                />
                <Text style={styles.seatNoText}> {item} </Text>
              </View>
            ))}
          </View>
          <Text style={styles.userDisplayText}>
            {" "}
            {ReduxState.user.displayName}{" "}
          </Text>
          <Text style={styles.userEmailText}> {ReduxState.user.email} </Text>
          <Text style={styles.ticketIDText}> {route.params.ticketID} </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.buttonFrame}>
        <Button
          onPress={() => navigation.navigate("EventMainPage")}
          mode="contained"
          color="orange"
        >
          {" "}
          ETKİNLİKLERE GİT{" "}
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  bigEventTitleFrame: {
    position: "absolute",
    top: Dimensions.get("window").height / 3.5,
  },
  bigEventTitleText: {
    textAlign: "center",
    width: 1300,
    color: "orange",
    fontFamily: "Teko-Medium",
    fontSize: 200,
  },
  eventCoverFrame: {
    position: "absolute",
    width: 250,
    height: 465,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  eventCoverFrameCentered: {
    width: "93%",
    marginTop: Dimensions.get("window").width / 17,
    height: 350,
    alignItems: "center",
  },
  eventCoverImage: {
    borderRadius: 35,
    width: "100%",
    marginLeft: 10,
    height: "100%",
  },
  ticketImage: {
    width: 250,
    height: 465,
  },
  eventInfoFrame: {
    position: "absolute",
    width: "93%",
    marginTop: Dimensions.get("window").width / 17,
    height: 350,
    alignItems: "center",
  },
  eventTitleText: {
    width: 200,
    textAlign: "center",
    marginTop: -20,
    marginLeft: 10,
    color: "orange",
    fontFamily: "Teko-Medium",
    fontSize: 35,
  },
  eventDateText: {
    marginTop: -10,
    marginLeft: 10,
    color: "white",
    fontFamily: "Teko-Medium",
    fontSize: 25,
  },
  QRCodeImage: {
    marginTop: 10,
    width: 90,
    height: 90,
  },
  seatsFrame: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  seatsFrameView: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  seatImage: {
    tintColor: "orange",
    position: "absolute",
    width: 20,
    height: 20,
  },
  seatNoText: {
    fontSize: 16,
    fontFamily: "Teko-Regular",
  },
  userDisplayText: {
    marginTop: 2,
    color: "white",
    fontFamily: "Teko-Light",
    fontSize: 35,
  },
  userEmailText: {
    marginTop: -10,
    color: "white",
    fontFamily: "Teko-Light",
    fontSize: 17,
  },
  ticketIDText: {
    marginTop: 2,
    marginLeft: 10,
    color: "white",
    fontFamily: "Teko-Light",
    fontSize: 17,
  },
  buttonFrame: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "100%",
  },
});

export default AfterBuyPage;
