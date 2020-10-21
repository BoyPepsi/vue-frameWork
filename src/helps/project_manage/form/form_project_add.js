// 项目列表表格配置
let formColumns = [
    { type: 'input', prop: 'name', label: '项目名称', placeholder: '项目名称', rule: 'must' },
    { type: 'input', prop: 'address', label: '项目地址', placeholder: '项目地址' },
    { type: 'select', prop: 'type', label: '项目类型', options: { 1: '住宅建筑', 2: '商业建筑', 3: '公共建筑' } },
    { type: 'select', prop: 'buildUse', label: '项目用途' },
    {
        type: 'select', prop: 'orgId', label: '所属事业部', options({ resolve }) {
            resolve();
        }
    },
    { type: 'input', prop: 'buildArea', label: '建筑面积(㎡)', placeholder: '建筑面积', rule: 'empty,number' },
    { type: 'date', prop: 'startDate', label: '开工日期' },
    { type: 'input', prop: 'totalDuration', label: '总工期(天)', placeholder: '总工期', rule: 'empty,number' },
    { type: 'input', prop: 'unitName', label: '建设单位', placeholder: '建设单位' },
    { type: 'input', prop: 'contactPerson', label: '联系人', placeholder: '联系人' },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', placeholder: '联系电话', rule: 'empty,phone', config: {
            maxlength: 11
        }
    }
    /*   [
          { type: 'button-primary', prop: '$submit', value: '保存并继续', class: 'bottom' },
          // { type: 'button', prop: '$reset', value: '重置' },
          { type: 'button', prop: 'calcel', value: '取消', class: 'bottom' },
          { type: 'formitem' }
      ] */
];
export default formColumns;