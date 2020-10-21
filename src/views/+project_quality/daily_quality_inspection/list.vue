<template>
  <div id="list">
    <el-row class="search">
      <el-select size="small" v-model="search.name" placeholder="项目名称">
        <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
      </el-select>
      <el-date-picker size="small" v-model="search.date" type="date" placeholder="yyyy/mm/日">
      </el-date-picker>
      <el-select size="small" v-model="search.personnel" placeholder="人员">
        <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
      </el-select>
      <el-input size="small" style="width:200px" placeholder="关键字" v-model="search.word">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="reset">重置</el-button>
    </el-row>
    <el-row>
      <div class="info-div">
        <p class="info-title"><i>检查天数</i></p>
        <el-row class="info-number">
          <div class="one">181</div>
          <div class="two"> / </div>
          <div class="three">182</div>
        </el-row>
      </div>
      <div class="info-div">
        <p class="info-title"><i>检查天数</i></p>
        <el-row class="info-number">
          <div class="one">181</div>
          <div class="two"> / </div>
          <div class="three">182</div>
        </el-row>
      </div>
      <div class="info-div">
        <p class="info-title"><i>检查天数</i></p>
        <el-row class="info-number">
          <div class="one">181</div>
          <div class="two"> / </div>
          <div class="three">182</div>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        name: '',
        date: '',
        personnel: '',
        word: ''
      }
    };
  },
  methods : {
    reset() {
      this.search.name = '';
      this.search.date = '';
      this.search.personnel = '';
      this.search.word = '';
    }
  }
};
</script>

<style scoped lang="scss" src="@/scss/scss_project_quality/scss_daily_quality_inspection/list.scss">
</style>