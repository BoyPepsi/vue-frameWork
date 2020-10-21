<template>
  <div class="breadCrumbBox">
    <el-breadcrumb separator="/">
      <!-- 添加动画 -->
       <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) of list" :key="item.path">
          <span v-if="index == list.length - 1">{{ item.meta.title }}</span>
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      list: []
    };
  },
  watch: {
    // 当路由发生改变时执行
    $route() {
      this.getBreadcrumb();
    }
  },
  // 首次执行
  created() {
    this.getBreadcrumb();
  },
  methods: {
    /**
     * 获取面包屑导航
     * params:none
     * create by YuXiong
     * date:2020-10-9
     */
    getBreadcrumb() {
      // matched 包含当前路由的所有嵌套路径片段的路由记录<Array>
      let matched = this.$route.matched.filter(item => {return item.meta && item.meta.title;});
      this.list = matched;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadCrumbBox {
  background: #fff;
  .el-breadcrumb {
    padding-left: 0px;
    line-height: 3;
  }
}
</style>