import React, { useNavigation, useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { SetCurrentScreen } from "../../../src/redux/action";
import { database, auth } from "../../../firebase-config";
import { set, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { SetShopCard } from "../../redux/action";
import Loading from "../../components/Loading";
import YoutubePlayer from "react-native-youtube-iframe";
import date from "../../functions/date";

const EventViewPage = () => {
  const dispatch = useDispatch();

  const [soundControl, setSoundControl] = useState(true);
  const [videoShow, setVideoShow] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [playVideo, setPlayVideo] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const eventID = route.params.eventID;
  const eventTitle = route.params.eventTitle;
  const eventVideo = route.params.eventVideo;
  const eventDate = route.params.eventDate;
  const eventCover = route.params.eventCover;
  const eventLocation = route.params.eventLocation;
  const eventRules = route.params.eventRules;
  const eventPrices = route.params.eventPrices;
  const [eventMapRegion, setmapRegion] = useState({
    latitude: route.params.eventLocation.latitude,
    longitude: route.params.eventLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    locationName: route.params.eventLocation.locationName,
  });

  return (
    <View style={styles.mainFrame}>
      <StatusBar style="light" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalXiconFrame}>
              <Icon
                onPress={() => {
                  setModalVisible(false);
                  setVideoShow(0);
                }}
                size={20}
                name="x"
              />
            </View>
            <Text style={styles.categoryText}> Kategori Seçiniz </Text>
            {eventPrices
              ? eventPrices.map((item, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      setSoundControl(true);
                      setModalVisible(false);

                      navigation.navigate("KoltukSecimi", {
                        eventID: eventID,
                        eventTitle: eventTitle,
                        eventVideo: eventVideo,
                        eventDate: eventDate,
                        eventCover: eventCover,
                        eventLocation: eventLocation,
                        eventRules: eventRules,
                        eventPrices: eventPrices,
                        clickCategory: item.name,
                      });
                    }}
                  >
                    <Text style={styles.categoryListText}>{item.name}</Text>
                  </Button>
                ))
              : null}
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.headerTopFrame}>
        <View style={styles.headerLeftFrame}>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.params.clickPage)}
          >
            <Icon
              style={styles.headerLeftIcon}
              color="white"
              size={25}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddleFrame}>
          {/*   <Text style={{ paddingBottom: 17, color: 'black', fontSize: 17, fontFamily: 'Roboto-Regular' }}> Profilim </Text> */}
        </View>
        <View style={styles.headerRightFrame}>
          <TouchableOpacity
            onPress={() => {
              setSoundControl(!soundControl);
              setShowVideo(!showVideo);
              setPlayVideo(!playVideo);
            }}
          >
            <Icon
              style={styles.headerRightVideoIcon}
              color="white"
              size={25}
              name="film"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView
        style={[
          styles.headerTopSoundFrame,
          {
            display: !showVideo ? "none" : "",
          },
        ]}
      >
        <View style={styles.headerLeftFrame}></View>
        <View style={styles.headerMiddleFrame}>
          {/*   <Text style={{ paddingBottom: 17, color: 'black', fontSize: 17, fontFamily: 'Roboto-Regular' }}> Profilim </Text> */}
        </View>
        <View style={styles.headerRightFrame}>
          <TouchableOpacity onPress={() => setSoundControl(!soundControl)}>
            <Icon
              style={styles.headerRightSoundIcon}
              color="white"
              size={25}
              name={soundControl ? "volume-x" : "volume-2"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.eventCoverFrame}>
        <Image
          style={styles.eventCoverImage}
          resizeMode="cover"
          source={{ uri: eventCover }}
        />
      </View>

      <View style={styles.eventCoverHeight}></View>

      <View
        style={[styles.eventVideoFrame, { display: showVideo ? "" : "none" }]}
      >
        <View pointerEvents="none" style={styles.eventVideoView}>
          <YoutubePlayer
            width={"100%"}
            height={"100%"}
            play={playVideo}
            mute={soundControl}
            videoId={route.params.eventVideo}
            initialPlayerParams={{
              loop: true,
              controls: false,
            }}
          />
        </View>
      </View>

      <View style={styles.eventInfoFrame}>
        <View style={styles.eventInfoView}>
          <Text style={styles.eventTitleText}> {eventTitle} </Text>
          <Text style={styles.eventDateText}>
            {" "}
            <Icon name="calendar" size={20} /> {date(eventDate)}
          </Text>
          <Text style={styles.eventLocationNameText}>
            {" "}
            <Icon name="map-pin" size={20} /> {eventLocation.locationName}
          </Text>

          <ScrollView style={styles.scroolViewFrame}>
            <View style={styles.eventDetailsInfoFrame}>
              <View style={styles.eventDetailsInfoView}>
                <Text style={styles.eventRulesText}>Etkinlik Kuralları</Text>
                {eventRules
                  ? eventRules.map((item, index) => (
                      <Text key={index} style={styles.eventRulesListText}>
                        {" "}
                        - {item.rules}{" "}
                      </Text>
                    ))
                  : null}
              </View>

              <View>
                <MapView region={eventMapRegion} style={styles.mapView}>
                  <Marker
                    coordinate={eventMapRegion}
                    title={eventMapRegion.locationName}
                  />
                </MapView>
              </View>

              <View style={styles.priceListFrame}>
                <Text style={styles.mainPriceText}>Bilet Fiyatları</Text>
                {eventPrices
                  ? eventPrices.map((item, index) => (
                      <Text key={index} style={styles.priceListText}>
                        {" "}
                        - {item.name} = {item.price}₺{" "}
                      </Text>
                    ))
                  : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomButtonFrame}>
        <Button
          onPress={() => {
            setModalVisible(true);
            setVideoShow(40);
          }}
          style={styles.bottomButton}
          mode="contained"
        >
          {" "}
          Satın Al{" "}
        </Button>
      </View>

      <BlurView
        intensity={videoShow}
        tint="dark"
        style={[
          styles.blurView,
          {
            zIndex: modalVisible ? 0 : -1,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 180,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "60%",
    padding: 25,
  },
  mainFrame: {
    flex: 1,
  },
  modalXiconFrame: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  categoryText: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: "Gilroy-Light",
  },
  categoryListText: {
    fontFamily: "Gilroy-ExtraBold",
    marginBottom: 10,
  },
  headerTopFrame: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
  },
  headerLeftFrame: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerLeftIcon: {
    paddingBottom: 15,
  },
  headerMiddleFrame: {
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
  headerRightVideoIcon: {
    paddingBottom: 20,
  },
  headerTopSoundFrame: {
    position: "absolute",
    zIndex: 1,
    top: 40,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8.5,
  },
  headerRightSoundIcon: {
    paddingBottom: 15,
  },
  eventCoverFrame: {
    width: "100%",
    height: 330,
    position: "absolute",
  },
  eventCoverImage: {
    width: "100%",
    height: "100%",
  },
  eventCoverHeight: {
    flex: 0.7,
  },
  eventVideoFrame: {
    position: "absolute",
    width: "100%",
    height: 280,
  },
  eventVideoView: {
    transform: [{ scale: 1.4 }],
    left: -150,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 700,
    height: 600,
  },
  eventInfoFrame: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 50,
    shadowOpacity: 1,
    marginTop: -40,
    flex: 1,
    backgroundColor: "white",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
  },
  eventInfoView: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  eventTitleText: {
    color: "black",
    fontSize: 40,
    fontFamily: "Teko-Medium",
  },
  eventDateText: {
    fontSize: 25,
    fontFamily: "Teko-Light",
  },
  eventLocationNameText: {
    fontSize: 25,
    fontFamily: "Teko-Light",
  },
  scroolViewFrame: {
    width: "100%",
  },
  eventDetailsInfoFrame: {
    paddingBottom: 210,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eventDetailsInfoView: {
    width: "85%",
    marginTop: 20,
    marginBottom: 20,
  },
  eventRulesText: {
    marginBottom: 10,
    fontFamily: "Gilroy-Light",
    fontSize: 15,
  },
  eventRulesListText: {
    fontFamily: "Gilroy-Light",
    marginBottom: 5,
  },
  mapView: {
    width: Dimensions.get("window").width,
    height: 150,
    borderRadius: 30,
  },
  priceListFrame: {
    width: "85%",
    marginTop: 20,
    marginBottom: 20,
  },
  mainPriceText: {
    marginBottom: 10,
    fontFamily: "Gilroy-Light",
    fontSize: 15,
  },
  priceListText: {
    fontFamily: "Gilroy-Light",
    marginBottom: 5,
  },
  bottomButtonFrame: {
    zIndex: 2,
    bottom: 20,
    position: "absolute",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
  },
  blurView: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default EventViewPage;
