// 项目列表表格配置

let columns = [
  {label: '检查分项', prop: 'name'},
  {label: '检查部位', prop: 'address'},
  {label: '检查人员', prop: 'unitName'},
  {label: '检查时间', prop: 'contactPerson'},
  {label: '复核人', prop: 'contactPhoneNumber'},
  {label: '复核状态', prop: 'typeName'},
  {label: '复核理由', prop: 'buildUseName'},
  {label: '操作', render: () => {
      return [
        {type : 'button-text', prop : 'edit', value : '编辑', style : 'color : blue'},
          {type: 'button-text', prop: 'delete', value: '删除', style:'color: red'}
      ];
  }},
  {label: '操作时间', prop: 'startDate', filter: 'yyyy-MM-dd'},
  {label: '总工期', prop: 'totalDuration'}

];
export default columns;