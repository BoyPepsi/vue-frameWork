<template>
  <div id="loginPage">
    <div class="login-class">
      <div class="login-title">欢迎登录</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" placeholder="请输入手机号:">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm"
            auto-complete="new-password">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-checkbox class="remeberme-box" v-model="ruleForm.rememberMe">是否记住密码</el-checkbox>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/config_function/login';
export default {
  phone: 'login',
  data() {
    return {
      ruleForm: {
        phone: '',
        password: '',
        rememberMe: false // 是否记住密码
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号:', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      flag: true
    };
  },
  mounted() {
    if (this.flag) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
      });
    }
  },
  destroyed() {
    this.flag = false;
  },
  created() {
    if (localStorage.getItem('loginInfo')) {
      this.ruleForm.phone = JSON.parse(localStorage.getItem('loginInfo')).phone;
      this.ruleForm.password = JSON.parse(
        localStorage.getItem('loginInfo')
      ).password;
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid === true) {
          login(this.ruleForm).then(res => {
            if (res.status === '0') {
              console.log(res);
              res.data.sysAdmin.token = res.data.token;
              let localStorageLoginParams = {
                phone: this.ruleForm.phone,
                password: ''
              };
              if (this.ruleForm.rememberMe === true) {
                localStorageLoginParams.password = this.ruleForm.password;
              } else {
                localStorageLoginParams.password = '';
              }
              let menuList = this.getMenuArray(res.data.menuList);
              let permsArr = [];
              if (res.data.permsList.length > 0) {
                res.data.permsList.forEach((item) => {
                  permsArr.push(item.perms);
                });
              }
              this.$store.commit('SAVE_USERINFO', res.data.sysAdmin);
              this.$store.commit('RECEIVE_MENU_LIST', menuList);
              this.$store.commit('LOGIN_INFO', localStorageLoginParams);
              this.$store.commit('PERMS_LIST', permsArr);
              this.$router.push('/home');
            } else {
              this.$message({ type: 'warning', message: res.message });
            }
          });
        } else {
          this.$message({ type: 'error', message: '请输入账号或密码!' });
        }
      });
    },
    getMenuArray(tree) {
      if (!tree) return false;
      for (let i in tree) {
        if (tree[i].type > 2) {
          delete tree[i];
        }
        if (tree[i] && tree[i].children && tree[i].children.length > 0) {
          this.getMenuArray(tree[i].children);
        }
      }
      return tree;
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_login/login.scss"></style>