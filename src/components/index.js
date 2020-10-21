// ===================  全部的component 在此 注册  挂载全局 ===================
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import Heads from '@/components/heads/Heads';
import Pagination from '@/components/pagination/pagination'; // 分页组件
export default (Vue) => {
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('Heads', Heads);
  Vue.component('Pagination', Pagination);
};
