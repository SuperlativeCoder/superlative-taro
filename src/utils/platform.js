const systemInfo = wx.getSystemInfoSync();

export const isIphonex = /iPhone X/ig.test(systemInfo.model);
export const isIOS = /ios/ig.test(systemInfo.system);
export const isAndroid = /android/ig.test(systemInfo.system);
export const statusBarHeight = systemInfo.statusBarHeight;
