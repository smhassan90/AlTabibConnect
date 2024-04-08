import { StyleSheet,Dimensions } from "react-native";
import { spacingPrim } from "./styles";
const cardWidth = Dimensions.get("screen").width;

const primColor="#0ab99c";
export default primColor;

export const fonts = StyleSheet.create({
  heading: {
    fontFamily: "ArialB",
    fontSize: 32,
  },
  headingSmall:{
    fontFamily: "ArialB",
    fontSize: 22,
  },
  sub: {
    fontFamily: "ArialB",
    fontSize: 20,
  },
  subBold:{
    fontFamily: "ArialB",
    fontSize: 20,
  },
  normal: {
    fontFamily: "ArialB",
    fontSize: 16,
  },
  normalBold: {
    fontFamily: "ArialB",
    fontSize: 16,
  },
});

export const FontColors = StyleSheet.create({
  primaryFont: {
    color: "#0ab99c",
  },
  primaryDark: {
    color: "#0e9680",
  },
  whiteFont: {
    color: "white",
  },
  blackFont: {
    color: "black",
  },
  blue: {
    color: "#00a2ff",
  },
});

export const paddings = StyleSheet.create({
  primaryPad: {
    paddingHorizontal: 15,
  },
});

export const corners = StyleSheet.create({
  rounded: {
    borderRadius: 10,
  },
});

export const containers = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export const gradient = StyleSheet.create({
  linear: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export const themeColors = StyleSheet.create({
  primary: {
    backgroundColor: "#0ab99c",
  },
  primaryDark: {
    backgroundColor: "#6b010139",
  },
  white: {
    backgroundColor: "white",
  },
  black: {
    backgroundColor: "black",
  },
  yellow: {
    backgroundColor: "#ffa600",
  },
  blue: {
    backgroundColor: "#0044ff",
  },
});

export const inputStyles = StyleSheet.create({
  userField: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inpBox: {
    fontFamily: "ArialB",
    borderBottomColor: "#0ab99c",
    borderBottomWidth: 2,
    flex: 1,
    fontSize: 14,
  },
});
export const genderPicker = StyleSheet.create({
  styling: {
    flex: 1,
    borderColor: "#0066a1",
    borderWidth: 0,
    borderRadius: 0,
  },
  containerStyle: {
    height:40,
    flex: 1,
  },
  labelStyle: {
    color:"black",
    fontSize: 15,
    fontFamily: "ArialB",
  },
  dropDownContainerStyle: {
    borderColor: "#0066a1",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
  },
  placeholderStyle: {
    color:"#808080a4",
    fontSize: 15,
    fontFamily: "ArialB",
  },
  listItemLabelStyle: {
    color: "#0066a1",
    fontSize: 15,
    fontFamily: "ArialB",
  },
});

export const dateModal = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#0ab99c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    borderRadius: 10,
    margin: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignItems: "center",
    justifyContent:"center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4E54DA",
  },
  closeButtonText: {
    fontFamily:"Arial",
    color: "white",
    fontSize: 16,
  },
  modalBlurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const form = StyleSheet.create({
  layout: {
    justifyContent: "center",
    backgroundColor: "red",
    width: "100%",
    borderRadius: spacingPrim,
    gap: spacingPrim,
    padding: spacingPrim,
  },
});
export const btns = StyleSheet.create({
  btnPrimary: {
    padding: 10,
    borderRadius: 5,
  },
});
export const RegLog = StyleSheet.create({
  onPressStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export const MenuStyle = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor:"black",
    //width:"100%",
    flex:1,
    paddingVertical: 10,
  },
  doctorInfoContainer: {
    flexDirection: "row",
    gap: 15,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  doctorDetailsContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    //flex: 1,
  },
  clinicContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    //paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  paginationContainer: {
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#0ab99c",
  },
  activeDot: {
    backgroundColor: "#0c6657", 
  },
  bookButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#0ab99c",
  },
});