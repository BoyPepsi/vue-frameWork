<template>
  <div id="organization">
    <div>
      <el-button
        type="primary"
        :disabled="parentNodeId == 0"
        @click="addbroNode"
        >添加同级节点</el-button
      >
      <el-button type="primary" @click="addChildNode">添加子节点</el-button>
      <el-button
        type="warning"
        :disabled="parentNodeId == 0"
        @click="removeNode"
        >删除节点</el-button
      >
    </div>

    <vo-basic
      v-if="showVoBasic"
      :data="chartData"
      :createNode="createNode"
    ></vo-basic>
  </div>
</template>

<script>
import { VoBasic } from 'vue-orgchart';

import {
  organizationTree,
  organizationSave,
  organizationDelete
} from '@/api/config_function/corporate_manage/organization';
import { judgeErroCode } from '@/http/errorCode.js';
export default {
  components: {
    VoBasic
  },
  data() {
    return {
      token: '',
      userid: '',

      chartData: {},
      nodeList: [],
      selectNodeId: '',
      parentNodeId: '1',

      showVoBasic: false
    };
  },
  created() {
    let userInfo = this.$store.state.userInfo;

    this.token = userInfo.token;
    this.userid = userInfo.id;

    this.getTreeData();
  },
  mounted() {
    console.log(this.$refs.refname);
  },
  methods: {
    async getTreeData() {
      let param = {
        code: '01',
        token: this.token,
        userid: this.userid
      };
      try {
        let res = await organizationTree(param);
        if (res.status === '0') {
          this.showVoBasic = true;
          this.chartData = res.data.list[0];
        } else {
          judgeErroCode(res.data.status, res.data.message);
        }
      } catch (error) {
        this.$message({ type: 'error', message: error });
      }
    },
    createNode(node) {
      this.nodeList.push(node);
      node.addEventListener('click', () => {
        this.nodeList.forEach((item) => {
          item.classList.remove('select-node');
        });
        node.classList.add('select-node');

        this.selectNodeId = node.id;
        this.parentNodeId = node.getAttribute('data-parent');
      });
    },
    addbroNode() {
      if (this.parentNodeId.length !== 0) {
        this.$prompt('请输入同级节点名称', '节点新增', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '同级节点名称不能为空'
        }).then(({ value }) => {
          let param = {
            token: this.token,
            userid: this.userid,

            name: value,
            pid: this.parentNodeId
          };

          organizationSave(param).then((res) => {
            if (res.status === '0') {
              this.showVoBasic = false;
              this.$message({ type: 'success', message: res.message });
              this.getTreeData();
            } else {
              judgeErroCode(res.status, res.message);
            }
          });
        });
      } else {
        this.$message({
          type: 'error',
          message: '请先选择节点'
        });
      }
    },
    addChildNode() {
      if (this.selectNodeId.length !== 0) {
        this.$prompt('请输入子节点名称', '节点新增', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '子节点名称不能为空'
        }).then(({ value }) => {
          let param = {
            token: this.token,
            userid: this.userid,

            name: value,
            pid: this.selectNodeId
          };

          organizationSave(param).then((res) => {
            if (res.status === '0') {
              this.showVoBasic = false;
              this.$message({ type: 'success', message: res.message });
              this.getTreeData();
            } else {
              judgeErroCode(res.status, res.message);
            }
          });
        });
      } else {
        this.$message({
          type: 'error',
          message: '请先选择节点'
        });
      }
    },
    removeNode() {
      if (this.selectNodeId.length !== 0) {
        this.$confirm('确认删除当前选择节点', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            token: this.token,
            userid: this.userid,

            id: this.selectNodeId
          };

          organizationDelete(param).then((res) => {
            if (res.status === '0') {
              this.showVoBasic = false;
              this.$message({ type: 'success', message: res.message });
              this.getTreeData();
            } else {
              judgeErroCode(res.status, res.message);
            }
          });
        });
      } else {
        this.$message({
          type: 'error',
          message: '请先选择节点'
        });
      }
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/scss/scss_company_info/organization.scss"
></style>
