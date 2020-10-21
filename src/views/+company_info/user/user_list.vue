<template>
  <div id="user-list">
    <el-row>
      <el-input
        class="seach-input"
        clearable
        v-model="search.name"
        placeholder="用户名称"
      ></el-input>
      <el-input
        class="seach-input"
        clearable
        v-model="search.phone"
        placeholder="手机号"
      ></el-input>
      <el-input
        class="seach-input"
        clearable
        v-model="search.orign"
        placeholder="所属组织"
      ></el-input>
      <el-button type="primary" size="medium" icon="el-icon-search"
        >搜索</el-button
      >
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="showDialog('add')"
        >添加</el-button
      >
      <el-button type="danger" size="medium" icon="el-icon-delete"
        >删除</el-button
      >
    </el-row>

    <div class="table">
      <fd-table
        :columns="columns"
        @event="tableEvent"
        :data="tableData"
        :config="config"
      />
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      width="36%"
      center
    >
      <el-form :model="dialogForm" :rules="rules" ref="form" :inline="true">
        <el-form-item label="用户名" label-width="90px" prop="name">
          <el-input type="text" v-model="dialogForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="90px" prop="phone">
          <el-input
            type="text"
            v-model="dialogForm.phone"
            clearable
            maxlength="11"
            :disabled="dialogTitle === '编辑用户'"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          label-width="90px"
          prop="password"
          v-if="dialogTitle === '添加用户'"
        >
          <el-input
            type="password"
            v-model="dialogForm.password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          label-width="90px"
          prop="passwordComfirm"
          v-if="dialogTitle === '添加用户'"
        >
          <el-input
            type="password"
            v-model="dialogForm.passwordComfirm"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位" label-width="90px" prop="jobId">
          <el-select v-model="dialogForm.jobId">
            <el-option
              v-for="item in jobList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在职状态" label-width="90px" prop="status">
          <el-select v-model="dialogForm.status">
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="项目权限" label-width="90px" prop="projectIds">
            <el-select v-model="dialogForm.projectIds" style="width:245%">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  adminList,
  adminSave,
  adminDetail,
  adminUpdate,
  adminFindJob,
  adminFindProject
} from '@/api/config_function/corporate_manage/user_manage.js';
import { judgeErroCode } from '@/http/errorCode.js';
import columns from '@/helps/table_user_list';
export default {
  data() {
    return {
      token: '',
      userid: '',
      search: {
        name: '',
        phone: '',
        orign: ''
      },
      tableData: [],
      columns: columns,
      config: {
        selection: true
      },
      checkedList: [],

      dialogTitle: '',
      centerDialogVisible: false,
      dialogForm: {
        name: '',
        phone: '',
        password: '',
        passwordComfirm: '',
        divisionId: '',
        branchId: '',
        groupId: '',
        jobId: '',
        status: '',
        projectIds: []
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        passwordComfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        divisionId: [
          { required: true, message: '请选择所属事业部', trigger: 'change' }
        ],
        jobId: [{ required: true, message: '请选择岗位', trigger: 'change' }],
        status: [
          { required: true, message: '请选择在职状态', trigger: 'change' }
        ],
        projectIds: [
          { required: true, message: '请选择项目权限', trigger: 'change' }
        ]
      },

      jobList: [],
      projectList: []
    };
  },
  created() {
    let userInfo = this.$store.state.userInfo;
    this.token = userInfo.token;
    this.userid = userInfo.id;

    this.getTableList();
    this.getJobList();
    this.getProjects();
  },
  methods: {
    // 获取表格数据
    async getTableList() {
      let params = {
        pageNum: 1,
        pageSize: 100,
        token: this.token,
        userid: this.userid
      };
      let res = await adminList(params);
      if (res.status === '0') {
        this.tableData = res.data.list;
      } else {
        judgeErroCode(res.status, res.message);
        this.tableData = [];
      }
    },

    // 获取项目列表
    async getProjects() {
      let params = {
        pageNum: 1,
        pageSize: 10000,
        token: this.token,
        userid: this.userid
      };
      let res = await adminFindProject(params);
      this.projectList = res.data.list;
    },

    // 获取所有的岗位列表
    async getJobList() {
      let params = {
        pageNum: 1,
        pageSize: 10000,
        token: this.token,
        userid: this.userid
      };
      let res = await adminFindJob(params);
      if (res.status === '0') {
        this.jobList = res.data.list;
      } else {
        judgeErroCode(res.status, res.message);
        this.$message({ type: 'warning', message: res.message });
      }
    },

    // 点击添加/编辑
    async showDialog(action, id) {
      this.centerDialogVisible = true;
      if (action === 'add') {
        this.dialogForm = {
          name: '',
          phone: '',
          password: '',
          passwordComfirm: '',
          divisionId: '',
          branchId: '',
          groupId: '',
          jobId: '',
          status: '',
          projectIds: []
        };
        this.dialogTitle = '添加用户';
      } else if (action === 'edit') {
        this.dialogTitle = '编辑用户';
        let param = {
          token: this.token,
          userid: this.userid,

          id: id
        };

        let res = await adminDetail(param);
        res.data.projectIds = res.data.projectIdsList[0];
        this.dialogForm = this.$formMap(res.data, this.dialogForm);
        this.dialogForm.id = id;
        console.log(this.dialogForm);
      }
    },

    // 确认按钮
    editSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid === true) {
          let param = {
            ...this.dialogForm,
            token: this.token,
            userid: this.userid
          };
          if (this.dialogTitle === '添加用户') {
            if (this.dialogForm.passwordComfirm === this.dialogForm.password) {
              this.userAddFun(param);
            } else {
              this.$message({ type: 'warning', message: '两次密码输入不同' });
            }
          } else if (this.dialogTitle === '编辑用户') {
            this.userEditFun(param);
          }
        } else {
          this.$message({ type: 'warning', message: '请输入必填项' });
        }
      });
    },

    // 保存
    userAddFun(param) {
      adminSave(param).then((res) => {
        if (res.status === '0') {
          this.getTableList();
          this.centerDialogVisible = false;
          this.$message({ type: 'success', message: '保存成功' });
        } else {
          judgeErroCode(res.status, res.message);
          this.$message({ type: 'warning', message: res.message });
        }
      });
    },

    /**
     * 编辑弹窗确认
     * params:none
     * create by gzy
     * date:2020-10-12
     */
    userEditFun(param) {
      adminUpdate(param).then((res) => {
        if (res.status === '0') {
          this.getTableList();
          this.centerDialogVisible = false;
          this.$message({ type: 'success', message: '编辑成功' });
        } else {
          judgeErroCode(res.status, res.message);
          this.$message({ type: 'warning', message: res.message });
        }
      });
    },

    /**
     * 表格操作事件
     * params:none
     * create by gzy
     * date:2020-10-12
     */
    tableEvent(params) {
      // 表示全选
      if (params.prop === '$selection') {
        if (params.row.length > 0) {
          let ids = Array.from(params.row, ({ id }) => {
            return id;
          });
          this.checkedList = ids;
        } else {
          this.checkedList = [];
        }
      } else if (params.prop === 'delete') {
        // 删除
      } else if (params.prop === 'edit') {
        // 编辑
        this.showDialog('edit', params.row.id);
      }
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_company_info/user_list.scss"></style>
