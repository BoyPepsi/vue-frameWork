// **************************项目质量***************************

// ****************************一、质量日检*******************
// 质量日检列表 daily_quality_inspection
const dailyQualityInspection = {
  path: '/cao/dailyQualityInspection',
  meta: { title: '质量日检' },
  component: () => {return import('@/views/+project_quality/daily_quality_inspection/list.vue');}
};

const projectQuality = [dailyQualityInspection];

export default projectQuality;

