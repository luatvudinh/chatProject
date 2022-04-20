import Consts from "../Consts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    width: Consts.windowWidth,
    height: Consts.windowHeight,
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  scrollToBottomButton: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 13,
    height: 26,
    marginLeft: 5,
    zIndex: 100,
  },
  scrollToBottomText: {
    color: '#48FFD3',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
