import Vue from 'vue';
import Freedomen from 'vue-elementui-freedomen';
Vue.use(Freedomen);

// 全局配置
Freedomen.configs({
  table: {
    border: true,
    selection: false,
    showTip:false,
    stripe:true
  }
});
Freedomen.styles({
  'select': {
      width: '100%'
  },
  'date':{
    width: '100%'
  }
});
