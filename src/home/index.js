import React, { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, Text, View } from "react-native";
import Consts from "../Consts";
import ChatScreen from "../chat";

let scrollToIndexFailed = false;
let isScrolling = false;

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

let _listMessages = [];

const HomeScreen = ({}) => {
  const listRooms = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [focusingIndex, setFocusingIndex] = useState(0);
  const [listMsgs, setListMsgs] = useState([]);

  const refListView = useRef();

  const maxCount = 1000;

  useEffect(() => {
    addMessages();
    return () => {
      _listMessages = [];
    }
  }, []);

  useEffect(() => {
    _listMessages = [...listMsgs];
    if (_listMessages.length > maxCount) {
      _listMessages = _listMessages.splice(0, maxCount / 2);
    }
    console.log('list message', listMsgs.length);
  }, [listMsgs]);

  const addMessages = () => {
    let newMsgs = [];
    for (let i = 0; i < 500; i++) {
      newMsgs.push('Dummy message ' + (_listMessages.length + i).toString());
    }
    const tmp = [..._listMessages, ...newMsgs];
    setListMsgs(tmp);
    setTimeout(addMessages, 3000);
  };

  const renderItem = ({ item, index }) => {
    if (index === focusingIndex) {
      return (
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          height: Consts.windowHeight,
          width: Consts.windowWidth,
        }}>
          <ChatScreen messages={listMsgs} />
        </View>
      );
    }
    return (
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        height: Consts.windowHeight,
        width: Consts.windowWidth,
      }}>
        <Text>{item}</Text>
      </View>
    );
  };

  const onViewableItemsChanged = async ({ viewableItems }) => {
    Keyboard.dismiss();
    if (viewableItems.length === 0 || viewableItems.length > 1 || scrollToIndexFailed) {
      console.log("[Stream] scrolling failed:", viewableItems.map(val => val.item));
      return;
    }

    const index = listRooms.findIndex(val => val === viewableItems[0].item);
    if (index) {
      setFocusingIndex(index);
    }
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return (
    <View style={{
      backgroundColor: "yellow",
      height: Consts.windowHeight,
      width: Consts.windowWidth,
    }}>
      <FlatList
        style={{
          // flex: 1,
          height: Consts.windowHeight,
          width: Consts.windowWidth,
        }}
        data={listRooms}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={Consts.windowHeight}
        keyboardShouldPersistTaps={"always"}
        disableIntervalMomentum={true}
        decelerationRate={"fast"}
        nestedScrollEnabled={true}
        scrollsToTop={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onScrollBeginDrag={e => {
          isScrolling = true;
        }}
        onMomentumScrollBegin={e => {
          isScrolling = true;
        }}
        onMomentumScrollEnd={(e) => {
          if (Consts.showStreamLog) {
            console.log("[Stream] onMomentumScrollEnd:", e.nativeEvent.contentOffset.y,
              e.nativeEvent.layoutMeasurement.height);
          }

          isScrolling = false;
          const offset = e.nativeEvent.contentOffset.y;
          const height = e.nativeEvent.layoutMeasurement.height;
          const index = Math.round(offset / height);
          if (index < listRooms.length) {
            onViewableItemsChanged({ viewableItems: [{ item: listRooms[index] }] }).then();
          }
        }}
        onScrollEndDrag={e => {
          isScrolling = false;
        }}
        onScrollToIndexFailed={async info => {
          scrollToIndexFailed = true;
          if (Consts.showStreamLog) {
            console.log("[Stream] onScrollToIndexFailed:", info);
          }

          await delay(100);
          scrollToIndexFailed = false;
          if (Consts.showStreamLog) {
            console.log("[Stream] onScrollToIndexFailed scroll manually");
          }
          if (info.highestMeasuredFrameIndex <= info.index) {
            if (Consts.showStreamLog) {
              console.log("[Stream] need to scroll to offset");
            }
            refListView.current?.scrollToOffset(
              { offset: info.averageItemLength * info.index, animated: false });
          }
          setTimeout(() => {
            refListView.current?.scrollToIndex(
              { index: info.index, animated: false });
          }, 100);
        }}
        ref={refListView}
      />
    </View>
  );
};

export default HomeScreen;
