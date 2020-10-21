import WebApi from '../config_url';
import { httpPost } from '@/http';

let commonFun = function createPostFunction(url) {
   if (Object.keys(WebApi).length > 0) {
    for (let key in WebApi) {
      if (url === key) {
        return (params) => {
          return httpPost(WebApi[key], params);
        };
      }
    }
   } else {
     return null;
   }
};

export default commonFun;


