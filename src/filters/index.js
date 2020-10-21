// ===================  全部的过滤器 在此 注册  挂载全局 ===================
// 共用过滤器

const publicFilters = {
transformDate(timestmp) {
    if (!timestmp || timestmp.length === 0) {
      return '';
    }
    let time = new Date(Number(timestmp));
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let date = time.getDate();
    date = date >= 10 ? date : '0' + date;
    return year + '-' + month + '-' + date;
  }
};

export default publicFilters;
