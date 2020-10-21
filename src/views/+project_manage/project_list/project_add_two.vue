<template>
  <div class="project-add-two">
    <el-row>
      <el-col :span=14 class="choice-tab">
        <span :class="{ 'active': activeIndex == 1 }" @click="changIndex(1)">标段</span>
        <span :class="{ 'active': activeIndex == 2 }" @click="changIndex(2)">地下室</span>
        <span :class="{ 'active': activeIndex == 3 }" @click="changIndex(3)">楼栋</span>
      </el-col>
      <el-col :span=6>
        <!-- <el-select>
          <el-option>aaa</el-option>
        </el-select> -->
        asda
      </el-col>
      <el-col :span=4 class="button-actions">
        <el-button type="primary" @click="openConfirm">添加</el-button>
        <el-button>导入模板</el-button>
      </el-col>
    </el-row>
    <!-- ========================= 表格=========================== -->
    <el-row class="table">
      <fd-table :columns="tableColumns" :data="bidTableList" />
    </el-row>
    <!-- ================== 弹窗信息=========================== -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%" :center="true">
      <div class="confirm-title">
        <h3>标段信息：</h3>
        <div>
          <el-checkbox v-model="isNeedBid" @change="neddBidChange">不划分标段</el-checkbox>
        </div>
      </div>
      <div class="form">
        <fd-form :data.sync="bidFormData" :config="config" :columns='bidformColumns' ref="bidForm" />
      </div>
      <div class="confirm-title">
        <h3>参建单位</h3>
        <div>
          <el-button type="primary" @click="addUnit">添加单位</el-button>
          <el-button type="warning">复制信息</el-button>
        </div>
      </div>
      <div class="form">
        <fd-form :data.sync="unitFormData" :config="config" :columns='unitformColumns' ref="unitform" />
      </div>
      <div class="for-form">
        <el-row v-for="item in addUnitist" :key="item.id" :gutter=40 class="unit-form-item">
          <el-col :span="4">
            <el-select v-model="item.unitType ">
              <el-option v-for="(ele,index) in unitList" :key="index" :label="ele.name" :value="ele.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="item.unitName" placeholder="单位名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="联系人" v-model="item.contactPerson">
              <template slot="prepend">联系人</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="联系电话" type="tel" v-model="item.contactPhoneNumber" maxlength="11">
              <template slot="prepend">联系电话</template>
            </el-input>
          </el-col>
          <el-col :span="2" class="delete-item"><i class="el-icon-circle-close" @click="deleteUnitItem(item.id)"></i>
          </el-col>
        </el-row>
      </div>
      <el-row class="confirm-button-actions">
        <el-button type="primary">确定</el-button>
        <el-button type="warning">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { bidInfoList } from '@/api/config_function/project_manage/project_manage.js';
import { judgeErroCode } from '@/http/errorCode.js';
import tableColumns from '@/helps/project_manage/table/table_bid_list.js';
import { bidformColumns, unitformColumns } from '@/helps/project_manage/form/form_bid_add.js';
export default {
  phone: 'projectAdd',
  data() {
    return {
      projectId: '',
      activeIndex: 1,
      dialogTitle: '添加标段',
      dialogVisible: false,
      tableColumns: tableColumns,
      bidformColumns: bidformColumns,
      unitformColumns: unitformColumns,
      config: {
        labelPosition: 'right'
      },
      bidFormData: {
        name: '',
        buildArea: '',
        contactPerson: '',
        contactPhoneNumber: ''
      },
      unitList: [{
        value: '5',
        name: '分包单位'
      },
      {
        value: '6',
        name: '第三方单位'
      }],
      isNeedBid: false,
      addUnitist: [],
      unitFormData: {},
      bidTableList: []
    };
  },
  created() {
    if (this.$route.query.projectId) {
      this.projectId = this.$route.query.projectId;
      this.getbidTableList();
    }
  },
  methods: {
    /**
     * 获取标段列表
     * params：none
     * create by YuXiong
     * date:2020-10-13
     */
    async getbidTableList() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        projectId: this.projectId
      };
      let res = await bidInfoList(params);
      if (res.status === '0') {
        this.bidTableList = res.data.list;
      } else {
        judgeErroCode(res.status, res.message);
      }
    },
    /**
     * 切换标段地下室
     * params：none
     * create by YuXiong
     * date:2020-10-13
     */
    changIndex(index) {
      this.activeIndex = index;
    },
    /**
     * 点击添加
     * params：none
     * create by YuXiong
     * date:2020-10-13
     */
    openConfirm() {
      this.dialogVisible = true;
    },
    /**
     * 切换是否划分标段
     * params：none
     * create by YuXiong
     * date:2020-10-13
     */
    neddBidChange() {
      this.bidformColumns.forEach(item => {
        item.disabled = this.isNeedBid;
      });
      if (this.isNeedBid === true) {
        this.bidFormData = {
          name: '',
          buildArea: '',
          contactPerson: '',
          contactPhoneNumber: ''
        };
      }
    },
    /**
     * 点击添加单位
     * params：none
     * create by YuXiong
     * date:2020-10-14
     */
    addUnit() {
      let unitArr = [{
        id: new Date().getTime(),
        unitType: '',
        unitName: '',
        contactPerson: '',
        contactPhoneNumber: ''
      }];
      this.addUnitist = [...unitArr, ... this.addUnitist];
    },
    /**
    * 点击删除单个单位按钮
    * params：none
    * create by YuXiong
    * date:2020-10-14
    */
    deleteUnitItem(currentId) {
      this.addUnitist = this.addUnitist.filter(item => {return item.id !== currentId;});
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_project_manage/project_add_two.scss"></style>