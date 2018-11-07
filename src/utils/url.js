function checkUrl(urlString) {
  const reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  let isUrl = true;
  try {
    if (!reg.test(urlString)) {
      throw new Error('传入的地址有误，请检查一下');
    }
  } catch (err) {
    console.log(err);
    isUrl = false;
  }
  return isUrl;
}

function getURLParamsObject(url) {
  let search;
  if (url && url.match(/\?/ig).length === 1 && checkUrl(url)) {
    search = url.split('?')[1];
  } else {
    search = location.search.substr(1);
  }
  return search.split('&').reduce((result, paramStr) => {
    const nextResult = result;
    if (paramStr) {
      const paramObject = paramStr.split('=');
      nextResult[paramObject[0]] = paramObject[1];
    }
    return nextResult;
  }, {});
}

function addHideTopBarParam(url) {
  const param = 'hideTopBar=1';

  if (!checkUrl(url)) {
    return null;
  }

  const urlAndHash = url.split('#');
  let currentUrl = urlAndHash[0];

  if (/\?/g.test(currentUrl)) {
    currentUrl += `&${param}`;
  } else {
    currentUrl += `?${param}`;
  }
  return urlAndHash.length > 1 ? `${currentUrl}#${urlAndHash[1]}` : currentUrl;
}

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 参数对象
 * @returns {string} - 拼接成的字符串参数
 */
function encodeSearchParams(obj) {
  const params = [];

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (typeof value === 'undefined') {
      value = '';
    }
    params.push([key, encodeURIComponent(value)].join('='));
  });

  return params.join('&');
}

export default {
  getURLParamsObject,
  addHideTopBarParam,
  encodeSearchParams,
};
