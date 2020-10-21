// ====================================项目信息管理=================================
const ProjectList = {
  path: '/yu/projectList',
  meta: { title: '项目列表' },
  component: () => {return import('@/views/+project_manage/project_list/project_list.vue');}
};

const ProjectAddOne = {
  path: '/yu/projectAddOne',
  meta: { title: '项目添加步骤一' },
  component: () => {return import('@/views/+project_manage/project_list/project_add_one.vue');}
};

const ProjectAddTwo = {
  path: '/yu/projectAddTwo',
  meta: { title: '项目添加步骤二' },
  component: () => {return import('@/views/+project_manage/project_list/project_add_two.vue');}
};

const ProjectManagement = [ProjectList, ProjectAddOne, ProjectAddTwo];

export default ProjectManagement;
