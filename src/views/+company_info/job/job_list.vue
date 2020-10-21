<template>
  <div id="job-list">
    <div class="search">
      job
    </div>
    <fd-table
      :columns="columns"
      @event="tableEvent"
      :data="tableList"
      :config="config"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss" src="@/scss/scss_company_info/job.scss"></style>
