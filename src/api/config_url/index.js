import Login from './login';
import projectManage from './project_manage/project_manage';
import corporateManage from './corporate_manage/organization';
import userManageUrl from './corporate_manage/user_manage';

import { Message } from 'element-ui';
let urls = [Login, corporateManage, projectManage, userManageUrl];

function addUrl(data) {
  let urlObj = {};
  if (!data || data.length === 0) return {};
  urls.forEach((item) => {
    Object.keys(item).forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (urlObj.hasOwnProperty(key) === true) {
        Message.error(`url配置${key}项有重复,请仔细检查`);
      } else {
        urlObj[key] = item[key];
      }
    });
  });
  return urlObj;
}
let WebApi = addUrl(urls);
export default WebApi;
