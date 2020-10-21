<template>
  <div id="headers">
    <div class="brand">监理综合信息管理平台</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <!-- <span @click="checked" class="pro-name">{{proName}}</span> -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="user-avator">
          <img src="~@/assets/images/3.jpg" />
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="padding:5px" divided command="editPassword">修改密码</el-dropdown-item>
            <el-dropdown-item style="padding:5px" divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="showModel" width="30%" :before-close="handleClose" :append-to-body="true"
      center>
      <el-form :model="form" :rules="rule" ref="form" label-width="100px">
        <el-form-item label="名称:" prop="name">
          <el-input maxlength="30" v-model="form.name" style="width:76%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="phone">
          <el-input maxlength="20" v-model.number="form.phone" style="width:76%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" style="width:76%"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
          <el-input v-model="form.checkPass" type="password" style="width:76%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitButton" size="mini">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'heads',
  data() {
    return {
      fullscreen: false,
      showModel: false,
      form: {
        name: '',
        phone: '',
        password: '',
        checkPass: ''
      },
      rule: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    username() {
      let username = this.$store.state.userInfo.name;
      return username ? username : this.name;
    }
  },
  methods: {
    // 修改密码
    submitButton() {
      console.log(5);
    },

    // 关闭模态框
    handleClose() {
      this.showModel = false;
    },

    // 下拉框事件
    handleCommand(command) {
      console.log(command);
      let userInfo = this.$store.state.userInfo;
      if (command === 'editPassword') {
        this.showModel = true;
        console.log(userInfo);
        this.form.name = userInfo.name;
        this.form.phone = userInfo.phone;
      }

    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_components/scss_header/header.scss"></style>