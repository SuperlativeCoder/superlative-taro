const systemInfo = wx.getSystemInfoSync();

export const isIphonex = /iPhone X/ig.test(systemInfo.model);
export const isIOS = /ios/ig.test(systemInfo.system);
export const isAndroid = /android/ig.test(systemInfo.system);

export const STATUSBAR_HEIGHT = systemInfo.statusBarHeight;
export const ANDROID_NAVHAR_HEIGHT = 48;
export const IOS_NAVBAR_HEIGHT = 44;
