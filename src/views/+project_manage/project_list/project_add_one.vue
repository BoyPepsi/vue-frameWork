<template>
  <div class="project-add">
    <div class="form">
      <fd-form @submit="formSubmit" :data.sync="formData" :config="config" @event="formEvent" :columns='formColumns'
        ref="form" />
    </div>
    <div class="fix-bottom">
      <el-button type="primary" @click="addProject">保存进行下一步</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import { findDivision, projectAddInfo, maintablePageDetail } from '@/api/config_function/project_manage/project_manage.js';
import { judgeErroCode } from '@/http/errorCode.js';
import formColumns from '@/helps/project_manage/form/form_project_add.js';
export default {
  phone: 'projectAdd',
  data() {
    return {
      formColumns: [],
      config: {
        labelPosition: 'left'
      },
      formData: {
        name: '',
        address: '',
        type: '1',
        buildUse: '',
        orgId: '',
        buildArea: '',
        startDate: '',
        totalDuration: '',
        unitName: '',
        contactPerson: '',
        contactPhoneNumber: ''
      }
    };
  },
  created() {
    formColumns[3].options = { 1: '住宅', 2: '商业' };
    this.formColumns = formColumns;
    // this.getOrigizationList();
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let params = {
        tableId: '259098505857990656',
        token: '743807875',
        userid: '297134004631502848'
      };
      let res = await maintablePageDetail(params);
      console.log(res);
    },
    /**
   * 点击提交
   * params:none
   * create by YuXiong
   * date:2020-10-13
   */
    async addProject() {
      if (this.$refs.form.valid() === true) {
        this.formSubmit();
      }
    },
    /**
     * 表单提交的方法
     * params:none
     * create by YuXiong
     * date:2020-10-13
     */
    async formSubmit() {
      if (this.formData.startDate) {
        this.formData.startDate = this.formData.startDate.getTime();
      }
      let res = await projectAddInfo(this.formData);
      if (res.status === '0') {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$router.push({
          path: '/yu/projectAddTwo',
          query: {
            projectId: res.data
          }
        });
      } else {
        judgeErroCode(res.status, res.message);
      }
    },
    /**
     * 获取组织架构
     * params：none
     * create by YuXiong
     * date:2020-10-13
     */
    async getOrigizationList() {
      this.formColumns[4].options = [];
      let params = {};
      let res = await findDivision(params);
      if (res.status === '0') {
        if (res.data.list.length > 0) {
          res.data.list.forEach(item => {
            let obj = {};
            obj.label = item.name;
            obj.value = item.id;
            this.formColumns[4].options.push(obj);
          });
        }
      } else {
        judgeErroCode(res.status, res.message);
      }
    },
    formEvent(params) {
      if (params.prop === 'projectType') {
        /*  this.formData.projectUse = '';
         this.formData.projectCaree = '';
         this.getOrigizationList(); */
      } else if (params.prop === '$reset') {
        this.formColumns[4].options = [];
      }
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_project_manage/project_add_one.scss"></style>