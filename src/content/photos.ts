export interface Photo {
  name: string;
  src: string;
  date: string;
  type?: "image" | "video";
  poster?: string;
}

export const photos: Photo[] = [
  // 2025
  { name: "天安门 · 夜景", src: "/images/photos_25/tiananmen.jpg", date: "2025.01" },
  { name: "天坛", src: "/images/photos_25/tiantan.jpg", date: "2025.01" },
  { name: "天坛 · 鸽子", src: "/images/photos_25/gezi.jpg", date: "2025.02" },
  { name: "可爱", src: "/images/photos_25/keai.jpg", date: "2025.03" },
  { name: "宿迁中心", src: "/images/photos_25/suqian.jpg", date: "2025.04" },
  { name: "遛弯", src: "/images/photos_25/liuwan.jpg", date: "2025.05" },
  { name: "培训", src: "/images/photos_25/peixun.jpg", date: "2025.06" },
  { name: "夕阳", src: "/images/photos_25/xiyang.jpg", date: "2025.07" },
  { name: "小手手", src: "/images/photos_25/xiaoshou.jpg", date: "2025.08" },
  { name: "好看的云", src: "/images/photos_25/yun.jpg", date: "2025.09" },
  { name: "可爱睡姿", src: "/images/photos_25/shuizi.jpg", date: "2025.10" },

  // 2024
  { name: "丽江 · 雪山", src: "/images/photos_24/xueshan.jpg", date: "2024.01" },
  { name: "丽江 · 古城", src: "/images/photos_24/lijiang.jpg", date: "2024.01" },
  { name: "丽江 · 山顶", src: "/images/photos_24/lijiangding.jpg", date: "2024.01" },
  { name: "丽江 · 远山", src: "/images/photos_24/lijiangshan.jpg", date: "2024.01" },
  { name: "过年下雪", src: "/images/photos_24/guonianxiaxue.mp4", date: "2024.02", type: "video" },
  { name: "冰山", src: "/images/photos_24/binshan.jpg", date: "2024.02" },
  { name: "彩虹", src: "/images/photos_24/caihong.jpg", date: "2024.03" },
  { name: "天空", src: "/images/photos_24/tiankong.jpg", date: "2024.03" },
  { name: "森林", src: "/images/photos_24/senlin.jpg", date: "2024.04" },
  { name: "山景", src: "/images/photos_24/shanjing.jpg", date: "2024.04" },
  { name: "杉木", src: "/images/photos_24/shanmu.jpg", date: "2024.04" },
  { name: "露营", src: "/images/photos_24/luying.jpg", date: "2024.05" },
  { name: "露营 · 湖边", src: "/images/photos_24/luying01.jpg", date: "2024.05" },
  { name: "湖水", src: "/images/photos_24/hushui.jpg", date: "2024.05" },
  { name: "出差", src: "/images/photos_24/chuchai.jpg", date: "2024.06" },
  { name: "旅游", src: "/images/photos_24/lvyou.jpg", date: "2024.06" },
  { name: "网红打卡点", src: "/images/photos_24/wanghongdaka.jpg", date: "2024.07" },
  { name: "西湖", src: "/images/photos_24/xihu.jpg", date: "2024.07" },
  { name: "世外桃源", src: "/images/photos_24/xiaoyuan.jpg", date: "2024.08" },
  { name: "领证", src: "/images/photos_24/lingzhen.jpg", date: "2024.08" },
  { name: "小宝贝", src: "/images/photos_24/xiaobaobei.jpg", date: "2024.09" },
  { name: "小可爱", src: "/images/photos_24/xiaokeai.jpg", date: "2024.09" },
  { name: "可爱小老虎", src: "/images/photos_24/keaixiaolaohu.jpg", date: "2024.09" },
  { name: "女友", src: "/images/photos_24/nvyou.jpg", date: "2024.10" },
  { name: "合照", src: "/images/photos_24/hezhao.jpg", date: "2024.10" },
  { name: "合照 · 出游", src: "/images/photos_24/hezhao01.jpg", date: "2024.10" },
  { name: "手串", src: "/images/photos_24/shouchuan.jpg", date: "2024.11" },
  { name: "自拍", src: "/images/photos_24/zipai01.jpg", date: "2024.11" },
  { name: "玉龙雪山", src: "/images/photos_24/leng.jpg", date: "2024.12" },
  { name: "睡觉的小手", src: "/images/photos_24/shuijiao.jpg", date: "2024.12" },

  // 2023
  { name: "西湖 · 樱花", src: "/images/photos/xihuyinghua.jpg", date: "2023.04" },

  // 2022
  { name: "解封后的外滩行", src: "/images/photos/yiqingwaitan.jpg", date: "2022.06" },
  { name: "民宿 · 泳池", src: "/images/photos/yongchi.jpg", date: "2022.07" },
  { name: "好看的云", src: "/images/photos/yun.jpg", date: "2022.07" },
  { name: "莫干山 · 夏日漂流", src: "/images/photos/moganshanhaotianqi.jpg", date: "2022.07" },
  { name: "捕捉到的晚霞", src: "/images/photos/wanxia.jpg", date: "2022.07" },
  { name: "梅雨上海", src: "/images/photos/xiayu.jpg", date: "2022.07" },
  { name: "南京 · 明孝陵", src: "/images/photos/mingxiaoling.jpg", date: "2022.08" },
  { name: "重庆", src: "/images/photos/chongqing.jpg", date: "2022.10" },
  { name: "重庆的桥", src: "/images/photos/chongqingqiao.jpg", date: "2022.10" },
  { name: "上海迪士尼", src: "/images/photos/dishini.jpg", date: "2022.10" },
  { name: "莫干山 · 猫", src: "/images/photos/moganshanmao.jpg", date: "2022.10" },
  { name: "恋爱", src: "/images/photos/lianai.jpg", date: "2022.11" },
  { name: "淀山湖露营", src: "/images/photos/luying.jpg", date: "2022.11" },
  { name: "好吃的牛排", src: "/images/photos/meishi.jpg", date: "2022.11" },
  { name: "安吉露营", src: "/images/photos/anjiluying.jpg", date: "2022.12" },
  { name: "篝火", src: "/images/photos/gouhuo.jpg", date: "2022.12" },

  // 2021
  { name: "朴树", src: "/images/photos/pushu.jpg", date: "2021.07" },
  { name: "启东 · 团建 · 玩水", src: "/images/photos/qidong.jpg", date: "2021.07" },
  { name: "上海的夜晚", src: "/images/photos/yeshanghai.jpg", date: "2021.08" },
  { name: "我家可爱的猫", src: "/images/photos/mao.jpg", date: "2021.10" },
  { name: "我家可爱的猫", src: "/images/photos/mao2.jpg", date: "2021.10" },

  // 2020
  { name: "舟山 · 枸杞岛", src: "/images/photos/ongs.jpg", date: "2020.04" },
  { name: "舟山 · 无人村", src: "/images/photos/wurencun.jpg", date: "2020.04" },
  { name: "天空之城", src: "/images/photos/airplane.jpg", date: "2020.10" },
  { name: "宁波 · 象山", src: "/images/photos/xiebei.jpg", date: "2020.10" },
  { name: "好天气", src: "/images/photos/haotianqi.jpg", date: "2020.12" },

  // 2019
  { name: "千岛湖 · 烟雨江南", src: "/images/photos/qiandaohu.jpg", date: "2019.09" },
  { name: "放风筝", src: "/images/photos/fangfengzhen.jpg", date: "2019.10" },
  { name: "可爱的狗狗", src: "/images/photos/gougou.jpg", date: "2019.10" },
  { name: "凌空的傍晚", src: "/images/photos/linkong.jpg", date: "2019.10" },
  { name: "山", src: "/images/photos/shan.jpg", date: "2019.10" },
  { name: "凌空的夜", src: "/images/photos/lingkongye.jpg", date: "2019.12" },

  // 2018
  { name: "普吉岛出海", src: "/images/photos/chuhai.jpg", date: "2018.12" },
  { name: "普吉岛的海", src: "/images/photos/kanhai.jpg", date: "2018.12" },
  { name: "快艇浪花", src: "/images/photos/kuaiting.jpg", date: "2018.12" },
  { name: "淀山湖露营", src: "/images/photos/luyinggou.jpg", date: "2018.12" },
  { name: "普吉岛 · 日出", src: "/images/photos/pujidao.jpg", date: "2018.12" },
  { name: "普吉岛 · 海", src: "/images/photos/water.jpg", date: "2018.12" },

  // 2017
  { name: "南昌 · 摩天轮", src: "/images/photos/motianlun.jpg", date: "2017.09" },
  { name: "宜昌", src: "/images/photos/yichangshi.jpg", date: "2017.10" },
];
