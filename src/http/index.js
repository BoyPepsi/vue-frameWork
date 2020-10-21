/**
 * =====================================================
 *                  axios 基本配置
 * =====================================================
 */
import axios from 'axios';
import { Message} from 'element-ui';
import store from '@/store';
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.30.101:8000'; // 开发环境域名访问
  // axios.defaults.baseURL = 'http://192.168.30.147:8000'; // 开发环境域名访问
  // axios.defaults.baseURL = 'http://supervisor.dev.hfhksoft.com/api/'; // 开发
  // axios.defaults.baseURL = 'http://192.168.30.145:8000'; // 王涛
  // axios.defaults.baseURL = 'http://192.168.30.102:8000/';
} else {
  axios.defaults.baseURL = 'http://api.supervisor.test.hbyrzx.top/supervisor'; // 测试环境 域名访问
}

// 请求超时时间
axios.defaults.timeout = 100000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 是否携带token
    // config.headers.Authorization = token
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 3.响应拦截器
axios.interceptors.response.use(response => {
  // 接收到响应数据并成功后的一些共有的处理，关闭loading等
  return response;
}, error => {

   /** *** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        window.location.href = '/NotFound';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请服务端检查接口地址');
    }
  }
  return Promise.resolve(error.response);
});

export const httpGet = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

export const httpPost = (url, params) => {
  let publicUserInfo = {};
  if (store.state.userInfo) {
    publicUserInfo.token = store.state.userInfo.token || 'asdsad';
    publicUserInfo.userid = store.state.userInfo.id || 'asdasdad';
  } else {
    publicUserInfo.token = '';
    publicUserInfo.userid = '';
  }
  let assionParams = Object.assign(publicUserInfo, params);
  return new Promise((resolve, reject) => {
    axios.post(url, assionParams)
      .then(res => {
        if (res) {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const httpPostFormData = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [function(data) { // 在请求之前对data传参进行格式转换
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
        return formData;
      }],
      url,
      method: 'post',
      data: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};
