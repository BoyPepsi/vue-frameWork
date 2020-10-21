// 此处添加动态路由
import CompanyInfo from '@/router/router_model/company_info.js'; // 企业信息
import ProjectManagement from '@/router/router_model/project_manage.js'; // 项目管理
import projectQuality from '@/router/router_model/project_quality.js'; // 项目质量
// 导出该角色拥有的全部路由信息 用于动态加载
export const roleMap = [
  ...CompanyInfo,
  ...ProjectManagement,
  ...projectQuality
];

const routes = [
  // 去掉name属性，当路由有children子集的时候，要去掉name属性，不然会有警告
  {
    path: '/',
    meta: { title: '登 录-监理检查系统' },
    name:'login',
    component: () => {return import('@/views/+login');}
  },
  {
    path: '/home',
    name:'home',
    meta: { title: '首页' },
    component: () => {return import('@/views/+home');},
    children: [
      ...roleMap
    ]
  }
];
export default routes;