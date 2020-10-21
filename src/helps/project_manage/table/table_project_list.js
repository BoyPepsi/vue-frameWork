// 项目列表表格配置

let columns = [
  {label: '项目名称', prop: 'name'},
  {label: '项目地址', prop: 'address'},
  {label: '建设单位', prop: 'unitName'},
  {label: '负责人', prop: 'contactPerson'},
  {label: '联系电话', prop: 'contactPhoneNumber'},
  {label: '项目类型', prop: 'typeName'},
  {label: '建筑用途', prop: 'buildUseName'},
  {label: '建筑面积(m²)', prop: 'buildArea'},
  {label: '开工日期', prop: 'startDate', filter: 'yyyy-MM-dd'},
  {label: '总工期', prop: 'totalDuration'},
  {label: '操作', render: () => {
    return [
        {type: 'button-text', prop: 'edit', value: '编辑', style:'color: $blue'},
        {type: 'button-text', prop: 'delete', value: '删除', style:'color: red'}
    ];
}}
];
export default columns;