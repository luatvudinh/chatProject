import {Dimensions, StatusBar} from 'react-native';

// utils
const showApiLog = true;
const showGameLog = true;
const showStreamLog = false;
const showChatLog = false;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -
  (
    ((StatusBar.currentHeight || 0) > 24 &&
      ((StatusBar.currentHeight || 0) !== 30 || Dimensions.get('screen').height -
        Dimensions.get('window').height > 48) &&
      Dimensions.get('screen').height !== Dimensions.get('window').height &&
      StatusBar.currentHeight !== 26.5) ? 0 : StatusBar.currentHeight
  );
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const xmppMessageTypes = {
  CHAT: 1,
  SYSTEM_NOTIFICATIONS: 2,
  FLYING_CHAT: 3,
  GIFT: 4,
  GAME_NOTIFICATIONS: 5,
  LIVE_INVITATION: 6,
  LIVE_JOIN: 7,
  LIVE_PUBLISH: 8,
  MENTION: 9,
  LIVE_STREAMER_LEAVE: 10,
  LIVE_STREAM_SETTING: 11,
  LIVE_JOIN_SPEAKER_REQUEST: 12,
  LEAVE_ROOM: 13,
};

const roomTypes = {
  basic: 'BASIC',
  live4: 'MULTI_SPEAKER_4',
  live6: 'MULTI_SPEAKER_6',
  live9: 'MULTI_SPEAKER_9',
  cinema: 'CINEMA',
};

const roomStatus = {
  streaming: 'STREAMING',
  ended: 'ENDED',
  init: 'INIT',
};

// anonymous
const anonymousAccount = '999999999';
const anonymousPassword = 'AnonymousAccount';

// vip level
const VIP_SILVER = 1;
const VIP_GOLD = 2;
const VIP_PLATIUM = 3;
const VIP_DIAMOND = 4;

const genders = {
  male: 'MALE',
  female: 'FEMALE',
};

// screen
const ScreenIds = {
  Splash: 'Splash',
  Tabs: 'Tabs',
  BoardRating: 'BoardRating',
  BoardRanking: 'BoardRanking',
  Auth: 'Auth',
  PublishStream: 'PublishStream',
  SetupStream: 'SetupStream',
  MainLiveView: 'MainLiveView',
  EndLiveStream: 'EndLiveStream',
  ListGame: 'ListGame',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  Luggage: 'Luggage',
  VIPLevel: 'VIPLevel',
  UserLevelDetail: 'UserLevelDetail',
  Recharge: 'Recharge',
  RechargeHistory: 'RechargeHistory',
  Cashout: 'Cashout',
  CashoutHistory: 'CashoutHistory',
  Settings: 'Settings',
  ChangePassword: 'ChangePassword',
  ChangeAccount: 'ChangeAccount',
  PINCode: 'PINCode',
  ChangePINCode: 'ChangePINCode',
  LinkBank: 'LinkBank',
  Browser: 'Browser',
  Shopping: 'Shopping',
  HomeMainScreen: 'HomeMainScreen',
  Support: 'Support',
  Wallet: 'Wallet',
  WalletHistory: 'WalletHistory',
  VirtualMoney: 'VirtualMoney',
  VirtualMoneyHistory: 'VirtualMoneyHistory',
  AboutUs: 'AboutUs',
  HistoryMoney: 'HistoryMoney',
  RefCode: 'RefCode',
  SystemNotifications: 'SystemNotifications',

  // Auth
  Login: 'Login',
  ForgotPassword: 'ForgotPassword',
  DirectRegister: 'DirectRegister',
  Register: 'Register',
  VerifyOtp: 'VerifyOtp',
  UpdateInfo: 'UpdateInfo',
  PasswordRetrieval: 'PasswordRetrieval',
  VerifyOtpPasswordRetry: 'VerifyOtpPasswordRetry',
  EnterReferenceCode: 'EnterReferenceCode',
};

const nativeCompIds = {
  publisherWebRtc: 'StreamWebRTCView',
  viewerWebRtc: 'ViewerWebRTCView',
  rtmpView: 'StreamingView',
};

const nativeCompEvents = {
  commandCreate: 'create',
  backToViewerFromSpeaker: 'backToViewerFromSpeaker',
  refreshAudioMode: 'refreshAudioMode',
};

export default {
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
  xmppMessageTypes,
  VIP_SILVER,
  VIP_GOLD,
  VIP_PLATIUM,
  VIP_DIAMOND,
  anonymousAccount,
  anonymousPassword,
  showApiLog,
  showGameLog,
  showStreamLog,
  showChatLog,
  ScreenIds,
  genders,
  roomTypes,
  roomStatus,
  nativeCompIds,
  nativeCompEvents,
};
