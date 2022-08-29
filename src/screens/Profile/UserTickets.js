import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database, auth } from "../../../firebase-config";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import UserTicket from "../../components/UserTicket";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const UserTickets = () => {
  const { ReduxState } = useSelector((state) => state);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View style={{ backgroundColor: "white" }}>
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
          <Text style={styles.headerBarText}> Biletlerim </Text>
        </View>
        <View style={styles.headerBarRight}>
          {/* <Icon style={{ paddingBottom: 15 }} color="black" size={25} name="chevron-right" />*/}
        </View>
      </SafeAreaView>

      {ReduxState.userTickets.length > 0 ? (
        <View style={styles.ticketListFrame}>
          <FlatList
            contentContainerStyle={styles.flatListFrame}
            data={ReduxState.userTickets}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "BigTicketView",

                    {
                      ticketID: item.ticketID,
                      koltukNumaralari: item.koltukNumaralari,
                      kategori: item.eventCategory,
                      eventID: item.eventID,
                      eventTitle: item.eventTitle,
                      eventDate: item.eventDate,
                      eventCover: item.eventCover,
                    }
                  )
                }
                key={index}
              >
                <UserTicket onPre data={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <SafeAreaView style={styles.fullScreenFrame}>
          <Text style={styles.fullScreenText}> Biletiniz Bulunmamaktadır.</Text>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
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
  listFrame: {
    width: "100%",
    alignItems: "center",
    transform: [{ scale: 1.25 }],
  },
  flatListFrame: {
    paddingTop: 0,
    paddingBottom: 220,
  },
  fullScreenFrame: {
    width: "100%",
    zIndex: -1,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  fullScreenText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#727987",
  },
  ticketListFrame: {
    height: "100%",
  },
});

export default UserTickets;
