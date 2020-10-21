import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Element.Dialog.props.closeOnClickModal.default = false; // 修改 el-dialog 默认点击遮照为不关闭
Vue.use(Element);
Vue.prototype.$alertMsgBox = function alert(msg = '确认要删除？', title = '提示', settings = {}) {
  Object.assign(settings, { // 合并对象
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true // 允许确认框内容为html格式
  });
  return this.$confirm(`<p style="font-size:16px;color:#f00">${msg}</p>`, title, settings);
};
