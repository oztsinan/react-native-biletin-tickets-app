import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SetSelectSeats, SetShopCard, SetShopCardPrice } from "../redux/action";
import { auth, database } from "../../firebase-config";
import { ref, set, push, remove, onValue, get } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

var lastShopCard = [];
var sonShopCardiGetir = [];

const ShowSeat = ({ number, status, veri }) => {
  const route = useRoute();
  const [seatColor, setSeatColor] = useState("#7c7aa2");
  const [currentKey, setCurrentKey] = useState("");

  const eventID = route.params.eventID;
  const eventCover = route.params.eventCover;
  const eventTitle = route.params.eventTitle;
  const eventDate = route.params.eventDate;
  const [clickSeat, setClickSeat] = useState(false);
  const dispatch = useDispatch();
  const { ReduxState } = useSelector((state) => state);

  const removeSeat = async (key) => {
    const sil = ref(
      database,
      "users/" + ReduxState.user.uid + "/shopCard/" + key
    );
    remove(sil);
  };

  const addSeat = async () => {
    var details1 = [];
    veri.map((item) => (details1 = item));

    const reference = ref(
      database,
      "users/" + ReduxState.user.uid + "/shopCard"
    );
    push(reference, {
      kategori: details1.name,
      fiyat: details1.price,
      koltukNumarasi: number,
      eventID: eventID,
      eventTitle: eventTitle,
      eventDate: eventDate,
      eventCover: eventCover,
    }).then((response) => {
      setCurrentKey(response.key);
    });
  };

  const getShopCard = () => {
    onValue(
      ref(database, "users/" + ReduxState.user.uid + "/shopCard"),
      (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let result = { ...data };
        var gelenVeri = [];
        for (let key in result) {
          gelenVeri.push({
            key: key,
            data: result[key],
          });
        }
        dispatch(SetShopCard(gelenVeri));
      }
    );

    return ReduxState.shopCard;
  };

  const getCategoryIndex = () => {
    onValue(
      ref(database, "events/" + 0 + "/eventPrices/0"),
      (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let result = { ...data };
      }
    );
  };

  const clickControl = () => {
    getCategoryIndex();

    if (status == "bos") {
      var count = 0;
      var koltukNumaralari = [];
      ReduxState.shopCard.map((item, index) => (count = index + 1));

      ReduxState.shopCard.map((item) =>
        koltukNumaralari.push(item.data.koltukNumarasi)
      );

      if (count > 4) {
        if (koltukNumaralari.includes(number)) {
          setClickSeat(!clickSeat);
        } else {
          Alert.alert(
            "Bilet Limiti",
            "Bir kişi en fazla 5 adet bilet alabilir!",
            [{ text: "Tamam" }]
          );
        }
      } else {
        setClickSeat(!clickSeat);
      }
    } else {
      Alert.alert("Koltuk Dolu", "Seçmek istediğiniz koltuk satın alınmıştır", [
        { text: "Diğer koltuklara göz at" },
      ]);
    }
  };

  useEffect(() => {
    if (clickSeat) {
      if (status == "bos") {
        setSeatColor("#d87534");
        addSeat();
      }
    } else {
      setSeatColor("#7c7aa2");

      removeSeat(currentKey);
    }

    getShopCard();
  }, [clickSeat]);

  return (
    <TouchableNativeFeedback onPress={clickControl}>
      <View>
        <View style={styles.numberTextFrame}>
          <Text
            style={[
              styles.numberText,
              {
                color: status == "dolu" ? "black" : "white",
              },
            ]}
          >
            {number}
          </Text>
        </View>
        <Image
          style={[
            styles.seatImage,
            {
              tintColor: status == "dolu" ? "#2c2948" : seatColor,
            },
          ]}
          source={require("../assets/saloon/koltuk.png")}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  numberTextFrame: {
    position: "absolute",
    width: 37,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  numberText: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
  },
  seatImage: {
    margin: 2,
  },
});

export default ShowSeat;
