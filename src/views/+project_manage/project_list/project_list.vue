<template>
  <div class="project-list">
    <!-- ================搜索条件=================== -->
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input v-model="search.projectName" placeholder="项目名称"></el-input>
      </el-col>
      <el-col :span="5">
        <el-select v-model="search.projectType" placeholder="项目类型" style="width:100%">
          <el-option v-for="item in projectTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-input v-model="search.organization" placeholder="所属组织"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="searchTable">查询</el-button>
      </el-col>
      <el-col :span="4" class="right-button">
        <el-button @click="addProject">添加项目</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
      </el-col>
    </el-row>

    <!-- ================表格数据=================== -->
    <el-row class="table-list">
      <fd-table :columns="columns" @event="tableEvent" :data="tableList" :config="config" />
    </el-row>
    <el-row>
      <pagination :currentPage="currentPage" :total="total" :limit="limit" :small="true"
        @handleCurrentChange="handleCurrentChange" />
    </el-row>
  </div>
</template>

<script>
import { projectInfoList, projectDelete } from '@/api/config_function/project_manage/project_manage.js';
import { judgeErroCode } from '@/http/errorCode.js';
import columns from '@/helps/project_manage/table/table_project_list.js';
export default {
  phone: 'login',
  data() {
    return {
      search: {
        projectName: '',
        projectType: '',
        organization: ''
      },
      projectTypeList: this.commonData.projectTypeList,
      currentPage: 1,
      limit: 10,
      total: 0,
      columns: columns,
      config: {
        selection: true,
        showTip: true
      },
      tableList: [],
      checkedList: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    /**
     * 获取表格数据
     * params:none
     * create by YuXiong
     * date:2020-10-9
     */
    async getTableList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.limit,
        type: this.search.projectType,
        name: this.search.projectName,
        orgName: this.search.organization
      };
      let res = await projectInfoList(params);
      if (res.status === '0') {
        if (res.data.list.length > 0) {
          res.data.list.forEach(item => {
            item.startDate = Number(item.startDate);
          });
        }
        this.tableList = res.data.list;
        this.total = res.data.total;
      } else {
        judgeErroCode(res.status, res.message);
        this.tableList = [];
      }
    },
    /**
     * 点击查询
     * params:none
     * create by YuXiong
     * date:2020-10-9
     */
    searchTable() {
      this.pageNum = 1;
      this.getTableList();
    },
    /**
     * 点击重置
     * params:none
     * create by YuXiong
     * date:2020-10-9
     */
    reset() {
      this.search = {
        projectName: '',
        projectType: '',
        organization: ''
      };
    },
    /**
    * 表格操作事件
    * params:none
    * create by YuXiong
    * date:2020-10-10
    */
    tableEvent(params) {
      // 表示全选
      if (params.prop === '$selection') {
        if (params.row.length > 0) {
          let ids = Array.from(params.row, ({ id }) => {return id;});
          this.checkedList = ids;
        } else {
          this.checkedList = [];
        }
      } else if (params.prop === 'delete') {
        // 单条删除
        this.deleteFun(params.row.id);
      }
    },

    /**
     * 分页点击事件,分页点击的时候，初始化搜索选项
     * params:val
     * create by YuXiong
     * date:2020-10-10
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableList();
    },
    /**
     * 删除调用的方法
     * params:val
     * create by YuXiong
     * date:2020-10-10
     */
    async deleteFun(ids) {
      this.$alertMsgBox('确认删除?', '')
        .then(() => {
          let params = {
            id: ''
          };
          if (Array.isArray(ids) === true) {
            params.id = ids.join(',');
          } else {
            params.id = ids;
          }
          projectDelete(params).then(res => {
            if (res.status === '0') {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.currentPage = 1;
              this.getTableList();
            } else {
              judgeErroCode(res.status, res.message);
            }
          });
        })
        .catch(() => {
          console.log('取消删除');
        });

    },
    /**
    * 点击添加
    * params:val
    * create by YuXiong
    * date:2020-10-10
    */
    addProject() {
      this.$router.push({
        path: '/yu/projectAddOne'
      });
    },

    /**
     * 点击批量删除
     * params:val
     * create by YuXiong
     * date:2020-10-10
     */
    batchDelete() {
      if (this.checkedList.length === 0) {
        this.$message({
          message: '至少选择一条信息',
          type: 'warning'
        });
      } else {
        this.deleteFun(this.checkedList);
      }
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_project_manage/project_list.scss"></style>