import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import date from "../functions/date";

const UserTicket = ({ data }) => {
  return (
    <View style={styles.mainFrame}>
      <Image
        style={styles.eventCoverImage}
        resizeMode="cover"
        source={{ uri: data.eventCover }}
      />

      <View style={styles.overlayColor}></View>
      <Image
        resizeMode="contain"
        style={styles.ticketImage}
        source={require("../assets/tickets/yatay.png")}
      />

      <View style={styles.eventInfosFrame}>
        <Text numberOfLines={1} style={styles.eventTitleText}>
          {" "}
          {data.eventTitle}{" "}
        </Text>
        <Text style={styles.eventDateText}> {date(data.eventDate)} </Text>
        <Text style={styles.eventCategoryText}> {data.kategori} </Text>
        <View style={styles.seatsShowView}>
          {data.koltukNumaralari.map((item, index) => (
            <View key={index} style={styles.seatFrame}>
              <Image
                style={styles.seatImage}
                source={require("../assets/saloon/koltuk.png")}
              />
              <Text style={styles.seatNoText}> {item} </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.QRCodeFrame}>
        <Image
          style={styles.QRCodeImage}
          source={{
            uri:
              "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" +
              data.ticketID,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    width: "100%",
    alignItems: "center",
    marginBottom: 0,
  },
  eventCoverImage: {
    position: "absolute",
    width: Dimensions.get("window").width / 1.7,
    height: 150,
    left: Dimensions.get("window").width / 9,
    top: Dimensions.get("window").width / 17,
    borderRadius: Dimensions.get("window").width / 30,
  },
  overlayColor: {
    borderRadius: 10,
    position: "absolute",
    left: Dimensions.get("window").width / 9,
    width: Dimensions.get("window").width / 1.73,
    height: 150,
    marginTop: Dimensions.get("window").width / 18,
    backgroundColor: "rgba(87,0,227,0.7)",
  },
  ticketImage: {
    width: "80%",
    height: 200,
  },
  eventInfosFrame: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    left: 43,
    width: 225,
    height: 153,
    marginTop: 14,
  },
  eventTitleText: {
    fontFamily: "Teko-Medium",
    fontSize: 30,
    color: "orange",
  },
  eventDateText: {
    marginBottom: 5,
    fontFamily: "Teko-Medium",
    fontSize: 20,
    color: "orange",
    marginTop: -10,
  },
  eventCategoryText: {
    fontFamily: "Teko-Medium",
    fontSize: 20,
    color: "orange",
    marginTop: -10,
  },
  seatsShowView: {
    flexDirection: "row",
  },
  seatFrame: {
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
  QRCodeFrame: {
    position: "absolute",
    width: "100%",
    top: Dimensions.get("window").width / 5.5,
    left: Dimensions.get("window").width / 1.37,
  },
  QRCodeImage: {
    width: 46,
    height: 46,
  },
});

export default UserTicket;
