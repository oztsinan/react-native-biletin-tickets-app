import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SetShopCard, SetShopCardPrice } from "../redux/action";
import ShopCardView from "../screens/Events/ShopCardView";

const ShopCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { ReduxState } = useSelector((state) => state);
  const [price, setPrice] = useState(0);
  const route = useRoute();
  const eventID = route.params.eventID;
  const eventDate = route.params.eventDate;

  useEffect(() => {
    let fiyat = 0;
    ReduxState.shopCard.map(
      (item) => (fiyat = fiyat + parseFloat(item.data.fiyat))
    );
    dispatch(SetShopCardPrice(fiyat));
  }, [ReduxState.shopCard]);

  const satinAlClick = () => {
    if (ReduxState.shopCardPrice > 0) {
      navigation.navigate("ShopCardView");
    }
  };

  return (
    <View style={styles.mainFrame}>
      <View style={styles.cardLeftFrame}>
        <Text style={styles.eventDateText}>{eventDate}</Text>
        <Text style={styles.secilenKoltuklarText}>Seçilen Koltuklar</Text>
        <View style={{ flexDirection: "row" }}>
          {ReduxState.shopCard.map((item, index) => (
            <Text key={index}>{item.data.koltukNumarasi},</Text>
          ))}
        </View>
      </View>
      <View style={styles.cardRightFrame}>
        <TouchableOpacity onPress={satinAlClick} style={styles.cardRightView}>
          <Text style={styles.buyText}>Satın Al</Text>
          <Text style={styles.priceText}>{ReduxState.shopCardPrice}₺</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 90,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  cardLeftFrame: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eventDateText: {
    fontSize: 13,
    fontWeight: "200",
    marginBottom: 5,
  },
  secilenKoltuklarText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Gilroy-Light",
  },
  cardRightFrame: {
    backgroundColor: "rgb(87,0,227)",
    width: "30%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardRightView: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buyText: {
    fontSize: 30,
    fontFamily: "Teko-Regular",
    color: "white",
    marginTop: 20,
  },
  priceText: {
    color: "white",
    fontSize: 28,
    fontFamily: "Teko-Light",
    marginBottom: 20,
  },
});

export default ShopCard;
