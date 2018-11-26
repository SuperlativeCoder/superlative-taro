import wepy from 'wepy';
/**
 * @export
 * @param {string} setting 设置
 * @returns {boolean} 是否有相关权限
 */

export default async (setting) => {
  const res = await wepy.getSetting();
  const settings = res.authSetting;
  const settingsKey = Object.keys(settings);

  for (let i = 0; i < settingsKey.length; i += 1) {
    const settingsReg = new RegExp(setting, 'i');
    if (settingsReg.test(settingsKey[i])) {
      return settings[settingsKey[i]];
    }
  }
  throw Error(`not authorized ${setting}`);
};
