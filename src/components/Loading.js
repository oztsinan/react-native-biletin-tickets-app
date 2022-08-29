import { View, Image, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.gifFrame}>
        <Image
          style={styles.loadingImage}
          source={require("../assets/loading.gif")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  gifFrame: {
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  loadingImage: {
    width: "100%",
    height: 200,
  },
});

export default Loading;
