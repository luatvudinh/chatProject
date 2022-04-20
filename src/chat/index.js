import React, { useRef, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

let autoScrollMsg = true;
let isDragging = false;

const ChatScreen = ({ messages }) => {
  const [chatViewHeight, setChatViewHeight] = useState(200);
  const [chatViewWidth, setChatViewWidth] = useState(200);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  const scrollRef = useRef();

  const checkAutoScrollMessage = ({
    layoutMeasurement, contentOffset, contentSize,
  }) => {
    if (!isDragging) {
      return;
    }
    autoScrollMsg = layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 20;
    if (autoScrollMsg) {
      setShowScrollToBottomButton(false);
    }
  };

  const scrollToBottomChatButton = () => {
    return showScrollToBottomButton ? <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setShowScrollToBottomButton(false);
        autoScrollMsg = true;
        scrollRef.current.scrollToEnd({ animated: true });
      }}
      style={[
        styles.scrollToBottomButton, { bottom: 5 }]}>
      <Text style={styles.scrollToBottomText}>{"New"}</Text>
    </TouchableOpacity> : <></>;
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{
        marginLeft: 5,
        backgroundColor: "#B7B7B7",
        borderRadius: 5,
        paddingHorizontal: 8,
      }}>
        <Text style={{ marginVertical: 5 }}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={{
      position: "absolute",
      left: 0, bottom: 100, height: 200, width: 200, backgroundColor: "green",
    }}>
      <ScrollView
        howsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        ref={scrollRef}
        onScroll={({ nativeEvent }) => {
          checkAutoScrollMessage(nativeEvent);
        }}
        onScrollBeginDrag={() => {
          isDragging = true;
        }}
        onScrollEndDrag={() => {
          isDragging = false;
        }}
        onMomentumScrollBegin={() => {
          isDragging = true;
        }}
        onMomentumScrollEnd={() => {
          isDragging = false;
        }}
        scrollEventThrottle={400}
        onContentSizeChange={() => {
          if (autoScrollMsg) {
            scrollRef.current.scrollToEnd({ animated: true });
          } else {
            setShowScrollToBottomButton(true);
          }
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={[
          styles.scrollView,
          { height: chatViewHeight, width: chatViewWidth }]}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: chatViewWidth,
        }}>
          <FlatList data={messages}
                    ItemSeparatorComponent={(props) => <View style={{ height: 5 }} />}
                    keyExtractor={((item, index) => index.toString())}
                    renderItem={renderItem} />
        </View>
      </ScrollView>
      {scrollToBottomChatButton()}
    </View>
  );
};

export default ChatScreen;
