const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const { width: WIDTH } = Dimensions.get('window')

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  input: {
    marginTop: 10,
    padding: 5,
    width: WIDTH - 55,
    height: 40,
    borderRadius: 25,
    fontSize: 16,
    marginHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'white',
    paddingLeft: 45
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    left: 37
  },
  btnShowPass: {
    position: 'absolute',
    top: 14,
    right: 37
  }

};
