// 项目列表表格配置

let columns = [
  { label: '用户名', prop: 'name' },
  { label: '手机号', prop: 'phone' },
  { label: '岗位', prop: 'jobName' },
  {
    label: '状态',
    prop: 'status',
    filter: {
      '1': '在职',
      '2': '离职'
    }
  },
  { label: '登录时间', prop: 'lastLoginTime', filter: 'yyyy-MM-dd' },
  {
    label: '操作',
    render: () => {
      return [
        {
          type: 'button-text',
          prop: 'edit',
          value: '编辑',
          style: 'color: #409eff'
        },
        {
          type: 'button-text',
          prop: 'delete',
          value: '删除',
          style: 'color: red'
        }
      ];
    }
  }
];
export default columns;
