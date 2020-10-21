// 标段列表表格配置
export let bidformColumns = [
    { type: 'input', prop: 'name', label: '标段名称', placeholder: '标段名称', rule: 'must', span: 12, disabled: false },
    { type: 'input', prop: 'buildArea', label: '建筑面积(㎡)', placeholder: '建筑面积', rule: 'number', span: 12, disabled: false },
    { type: 'input', prop: 'contactPerson', label: '联系人', placeholder: '联系人', rule: 'must', span: 12, disabled: false },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', placeholder: '联系电话', rule: 'phone', config: {
            maxlength: 11
        }, span: 12, disabled: false
    }
];

export let unitformColumns = [
    { type: 'input', prop: 'unitName', label: '监理单位', options: '1', class: 'no-down', span: 8 },
    { type: 'input', prop: ' contactPerson', label: '联系人', span: 8 },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', rule: 'empty,phone', config: {
            maxlength: 11
        }, span: 8
    },
    { type: 'input', prop: 'unitName', label: '勘察单位', options: '2', class: 'no-down', span: 8 },
    { type: 'input', prop: ' contactPerson', label: '联系人', span: 8 },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', rule: 'empty,phone', config: {
            maxlength: 11
        }, span: 8
    },
    { type: 'input', prop: 'unitName', label: '设计单位', options: '3', class: 'no-down', span: 8 },
    { type: 'input', prop: ' contactPerson', label: '联系人', span: 8 },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', rule: 'empty,phone', config: {
            maxlength: 11
        }, span: 8
    },
    { type: 'input', prop: 'unitName', label: '总承包单位', options: '4', class: 'no-down', span: 8 },
    { type: 'input', prop: ' contactPerson', label: '联系人', span: 8 },
    {
        type: 'input', prop: 'contactPhoneNumber', label: '联系电话', rule: 'empty,phone', config: {
            maxlength: 11
        }, span: 8
    }
];