import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { database } from "../../firebase-config";
import { set, ref, push, remove, onValue, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { SetUserFavorites } from "../redux/action";
import { useNavigation } from "@react-navigation/native";

var likeKey = [];

export const HomeCard = ({ page, data, yonSecim }) => {
  const [icon, setIcon] = useState(false);
  const { ReduxState } = useSelector((state) => state);
  const [currentKey, setCurrentKey] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addFavorites = () => {
    const reference = ref(
      database,
      "users/" + ReduxState.user.uid + "/favorites"
    );
    push(reference, {
      eventID: data.eventID,
      eventCover: data.eventCover,
      eventDate: data.eventDate,
      eventTitle: data.eventTitle,
      eventVideo: data.eventVideo,
      eventLocation: data.eventLocation,
      eventRules: data.eventRules,
      eventPrices: data.eventPrices,
    }).then((response) => {
      key = response.key;
    });
  };

  const removeFavorites = async (key) => {
    const sil = ref(
      database,
      "users/" + ReduxState.user.uid + "/favorites/" + key
    );
    remove(sil);
  };

  const getUserFavorites = () => {
    onValue(
      ref(database, "users/" + ReduxState.user.uid + "/favorites"),
      (querySnapShot) => {
        let data1 = querySnapShot.val() || {};
        let result = { ...data1 };

        for (let key in result) {
          if (result[key].eventID == data.eventID) {
            likeKey = key;
            setIcon(true);
          }
        }
      }
    );
  };

  const clickLike = () => {
    getUserFavorites();

    if (icon) {
      removeFavorites(likeKey);
      setIcon(false);
    } else {
      addFavorites();
    }
  };

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
      clickPage: page,
    });
  };

  useEffect(() => {
    getUserFavorites();
  }, []);

  return (
    <TouchableOpacity onPress={eventCardClick}>
      <View
        style={[
          styles.mainCard,
          {
            marginBottom: yonSecim == "dikey" ? 25 : 0,
            marginRight: yonSecim == "dikey" ? 0 : 20,
          },
        ]}
      >
        <View style={styles.cardInfosFrame}>
          <Image
            resizeMode="cover"
            source={{ uri: data.eventCover }}
            style={styles.eventCoverImage}
          />
          <View style={styles.eventDateFrame}>
            <Text style={styles.eventDateText}>
              {data.eventDate.substr(8, 4)}{" "}
            </Text>
            <Text style={styles.eventMonthsDateText}>
              {data.eventDate.substr(5, 2)}{" "}
            </Text>
            <Text style={styles.eventYearDateText}>
              {data.eventDate.substr(0, 4)}{" "}
            </Text>
          </View>
          <View style={styles.eventTitleFrame}>
            <Text numberOfLines={1} style={styles.eventTitleText}>
              {data.eventTitle}
            </Text>
          </View>
          <View style={styles.heartIconFrame}>
            <TouchableOpacity onPress={clickLike}>
              <Icon
                size={18}
                style={styles.heartIcon}
                name={icon ? "heart" : "heart-outline"}
                color="#ff5357"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardBottomLocationFrame}>
          <Text numberOfLines={1} style={styles.cardBottomLocationText}>
            {data.eventLocation.locationName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    width: 170,
  },
  cardInfosFrame: {
    width: 170,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  eventCoverImage: {
    width: "100%",
    height: "100%",
  },
  eventDateFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eventDateText: {
    color: "white",
    fontSize: 20,
    fontFamily: "MonumentExtended-Ultrabold",
  },
  eventMonthsDateText: {
    color: "white",
    fontSize: 20,
    fontFamily: "MonumentExtended-Regular",
  },
  eventYearDateText: {
    color: "white",
    fontSize: 10,
    fontFamily: "MonumentExtended-Regular",
  },
  eventTitleFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  eventTitleText: {
    marginBottom: 20,
    color: "white",
    fontSize: 18,
    fontFamily: "MonumentExtended-Regular",
  },
  heartIconFrame: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  heartIcon: {
    marginRight: 10,
    marginTop: 10,
  },
  cardBottomLocationFrame: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBottomLocationText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    color: "gray",
    fontFamily: "Roboto-Light",
  },
});
