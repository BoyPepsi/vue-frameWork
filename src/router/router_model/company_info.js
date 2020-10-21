// ====================================企业信息=================================

const User = {
  path: '/userList',
  meta: { title: '用户管理' },
  component: () => {
    return import('@/views/+company_info/user/user_list.vue');
  }
};
const Organization = {
  path: '/gzy/organization',
  meta: { title: '组织架构' },
  component: () => {
    return import('@/views/+company_info/organization/organization.vue');
  }
};
const JobList = {
  path: '/gzy/jobList',
  meta: { title: '组织架构' },
  component: () => {
    return import('@/views/+company_info/job/job_list.vue');
  }
};

const CompanyInfo = [Organization, User, JobList];

export default CompanyInfo;
