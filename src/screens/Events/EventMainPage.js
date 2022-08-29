import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, StyleSheet, FlatList } from "react-native";
import EventCard from "../../components/EventCard";
import { ref, onValue, set } from "firebase/database";
import { database } from "../../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentScreen, SetEvents } from "../../../src/redux/action";
import { StatusBar } from "expo-status-bar";

const Events = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ReduxState } = useSelector((state) => state);

  const data = [
    {
      eventID: 1,
      eventTitle: "EZHEL",
      eventDate: "2023-02-23",
      eventCover:
        "https://www.rapertuar.com/wp-content/uploads/2022/02/ezhel-1-1-scaled.jpg",
      eventVideo: "FfUmdamEros",
      eventClock: "21:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 50.93841362237236,
        longitude: 6.982951057363988,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Lanxess Arena , Almanya",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 2,
      eventTitle: "CEM ADRİAN",
      eventDate: "2022-11-11",
      eventCover: "https://i.ytimg.com/vi/df_0SE6sfBE/maxresdefault.jpg",
      eventVideo: "Uq7m5xgouV8",
      eventClock: "21:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 39.91155090403291,
        longitude: 32.80312192896307,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Congresium Ankara",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 3,
      eventTitle: "SEFO",
      eventDate: "2022-09-30",
      eventClock: "21:00",
      eventCover:
        "https://cumhuriyet.com.tr/Archive/2022/2/4/1905122/kapak_104556.jpg",
      eventVideo: "JiaWCah7Nfs",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.10797117512355,
        longitude: 28.98732523653619,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Turkcell Vadi , İstanbul",
      },
      eventPrices: [
        {
          name: "Sahne Onu A Blok",
          price: "500",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "Sahne Onu B Blok",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "Sahne Onu C Blok",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "1.Kategori A BLOK",
          price: "350",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "1.Kategori C BLOK",
          price: "350",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori D BLOK",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori E BLOK",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori F BLOK",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 4,
      eventTitle: "EVENGY GRİNKO",
      eventDate: "2022-10-09",
      eventClock: "21:00",
      eventCover:
        "https://www.biletix.com/static/images/live/event/groupimages/0rgevgeny.png",
      eventVideo: "VYCOg-yglNM",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.10797117512355,
        longitude: 28.98732523653619,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Turkcell Vadi , İstanbul",
      },
      eventPrices: [
        {
          name: "Sahne Onu A Blok",
          price: "900",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "Sahne Onu B Blok",
          price: "900",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "Sahne Onu C Blok",
          price: "900",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "1.Kategori A BLOK",
          price: "550",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "1.Kategori C BLOK",
          price: "550",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori D BLOK",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori E BLOK",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori F BLOK",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 5,
      eventTitle: "SILA",
      eventDate: "2022-10-25",
      eventCover:
        "https://i01.sozcucdn.com/wp-content/uploads/2019/10/31/iecrop/sila-2_16_9_1572507040.jpg",
      eventVideo: "mzqPKKG_4sE",
      eventClock: "21:00",
      eventFeatured: false,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.04611344273394,
        longitude: 28.99015574429423,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "İstanbul Harbiye Cemil Topuzlu Açıkhava",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 6,
      eventTitle: "YÜZYÜZEYKEN KONUŞURUZ",
      eventDate: "2022-09-10",
      eventCover: "http://www.turktime.com/haber_resim/yuzyuze454_tepe.jpg",
      eventVideo: "fR2JHaCDrMw",
      eventClock: "21:00",
      eventFeatured: false,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.04611344273394,
        longitude: 28.99015574429423,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "İstanbul Harbiye Cemil Topuzlu Açıkhava",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 7,
      eventTitle: "ATHENA",
      eventDate: "2022-09-09",
      eventCover:
        "https://cumhuriyet.com.tr/Archive/2022/7/25/1961605/kapak_073942.jpg",
      eventVideo: "Z8aqzdARZns",
      eventClock: "21:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.04611344273394,
        longitude: 28.99015574429423,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "İstanbul Harbiye Cemil Topuzlu Açıkhava",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 8,
      eventTitle: "DUMAN",
      eventDate: "2022-10-05",
      eventCover:
        "https://i.discogs.com/xcUf0m2tlylBQYHPNNSX_D_smhaqmuVTZWl180cO5sw/rs:fit/g:sm/q:90/h:478/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY0MjIz/MS0xNDk1Nzg2MDcx/LTc0NTYuanBlZw.jpeg",
      eventVideo: "3bfkyXtuIXk",
      eventClock: "21:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 36.881767074118436,
        longitude: 30.667132393084024,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Antalya Açıkhava Tiyatrosu",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 9,
      eventTitle: "CEZA",
      eventDate: "2022-09-25",
      eventCover:
        "https://www.biletix.com/static/images/live/event/eventimages/0l708s.png",
      eventVideo: "mY--4-vzY6E",
      eventClock: "21:00",
      eventFeatured: false,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 40.99110684475684,
        longitude: 29.01766251285228,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Festival Park Kadıköy",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 10,
      eventTitle: "GÜNEŞ",
      eventDate: "2022-10-26",
      eventCover:
        "https://ippasso.mediatriple.net/event/15082022173852-16042022135730-1080x1920_w_logo.png",
      eventVideo: "L7U1tcDjIHY",
      eventClock: "20:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 40.98943587123528,
        longitude: 29.02348792202982,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Dorock XL Kadıköy , İstanbul",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 11,
      eventTitle: "DOLU KADEHİ TERS TUT",
      eventDate: "2022-09-16",
      eventCover:
        "https://staticws.biletix.com/static/images/live/event/eventimages/0ds29.png",
      eventVideo: "uvLwSpoYMc4",
      eventClock: "16:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 41.127340559170825,
        longitude: 29.024197027010878,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Parkorman , İstanbul",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 12,
      eventTitle: "TEOMAN",
      eventDate: "2022-09-23",
      eventCover:
        "https://ippasso.mediatriple.net/event/16082022121403-teoman-livefromantalya.jpg",
      eventVideo: "Sdw7eaCSzhg",
      eventClock: "16:00",
      eventFeatured: true,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 36.91505072346318,
        longitude: 30.77319174307876,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Agora AVM Antalya",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
    {
      eventID: 13,
      eventTitle: "BEGE",
      eventDate: "2022-09-17",
      eventCover:
        "https://ippasso.mediatriple.net/event/25082022112458-bege.jpg",
      eventVideo: "zUbBsJOYr8A",
      eventClock: "21:00",
      eventFeatured: false,
      eventRules: [
        {
          rules: "Etkinlikte 18 yaş sınırı vardır.",
        },
        {
          rules: "Belirtilen saat kapı açılış saatidir.",
        },
        {
          rules:
            "Sahnede kullanılan LED ekranlar, Lazer showlar Epilepsi hastaları için uygun değildir.",
        },
        {
          rules:
            "Paketi açılmış tütün ve tütün ürünleri kesinlikle konser alanı içine alınmayacaktır.",
        },
      ],
      eventLocation: {
        latitude: 40.991108341290236,
        longitude: 29.017786574763797,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        locationName: "Festival Park Kadıköy , İstanbul",
      },
      eventPrices: [
        {
          name: "1.Kategori",
          price: "600",
          koltuklar: 100,
          doluKoltuklar: [],
        },
        {
          name: "2.Kategori",
          price: "500",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "3.Kategori",
          price: "400",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "4.Kategori",
          price: "300",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "5.Kategori",
          price: "250",
          koltuklar: 50,
          doluKoltuklar: [],
        },
        {
          name: "6.Kategori",
          price: "200",
          koltuklar: 50,
          doluKoltuklar: [],
        },
      ],
    },
  ];

  function setDatabase() {
    const reference = ref(database, "events/");
    set(reference, data);
  }

  useEffect(() => {
    dispatch(SetCurrentScreen("EventMainPage"));
    //setDatabase()
  }, []);

  return (
    <View style={styles.mainFrame}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.eventsTextFrame}>
        <Image
          resizeMode="contain"
          style={styles.eventsTextImage}
          source={require("../../assets/etkinliklerText.png")}
        />
      </SafeAreaView>

      <FlatList
        contentContainerStyle={styles.flatList}
        data={ReduxState.events.sort(function (a, b) {
          return a.eventDate.localeCompare(b.eventDate);
        })}
        renderItem={({ item }) => (
          <EventCard
            eventID={item.eventID}
            eventCover={item.eventCover}
            eventDate={item.eventDate}
            eventTitle={item.eventTitle}
            eventLocation={item.eventLocation}
            eventRules={item.eventRules}
            eventPrices={item.eventPrices}
            eventVideo={item.eventVideo}
            page="EventMainPage"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "white",
  },
  eventsTextFrame: {
    marginTop: 50,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  eventsTextImage: {
    tintColor: "rgb(87,0,227)",
    width: "96%",
    height: 115,
  },
  flatList: {
    paddingTop: 150,
    paddingBottom: 0,
  },
});

export default Events;
