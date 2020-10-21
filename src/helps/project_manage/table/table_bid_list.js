// 项目列表表格配置
let tableColumns = [
  { label: '标段名称', prop: 'name' },
  { label: '标段建筑面积(㎡)', prop: 'buildArea' },
  { label: '标段联系人', prop: 'contactPerson' },
  { label: '联系电话', prop: 'contactPhoneNumber' },
  {
    label: '操作', render: () => {
      return [
        { type: 'button-text', prop: 'edit', value: '编辑', style: 'color: $blue' },
        { type: 'button-text', prop: 'delete', value: '删除', style: 'color: red' }
      ];
    }
  }
];
export default tableColumns;