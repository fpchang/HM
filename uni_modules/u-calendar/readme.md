# u-calendar

## 组件属性参数

|属性名|类型|默认值|必填|说明|
| -- | -- | -- | -- | -- |
|type|String|date|否|日历选择类型date默认为单选，<font color=#FF0000>可以填dateRange为范围选择</font>|
|startYear|[Number, String]|见说明|是|日历开始的年份，例如：2021，因为考虑到如果范围太大会导致性能问题所以默认选择范围，后期考虑做成虚拟滚动|
|endYear|[Number, String]|同上|是|日历结束的年份|
|height|String|1000rpx|否|日历的高度|
|tipArr|Array|[{tipName: '近24小时',tipTime: 24 * 60 * 60 * 1000},{tipName: '近7天',tipTime: 7 * 24 * 60 * 60 * 1000},{tipName: '近30天',tipTime: 30 * 24 * 60 * 60 * 1000 },{tipName: '近90天',tipTime: 90 * 24 * 60 * 60 * 1000}]|否|日历的快捷选项|
|pickerOptions|Object|{disabledDate(time) {return time > new Date().getTime()}|否|日历的禁用时间段，同饿了么ui类似|

## 事件
|事件名称|说明|回调参数|
| -- | -- | -- |
| change | 日历选择切换事件 | 单选回调参数为{day: 18,month: 1,result: "1996-01-18",week: "星期四",year: 1996},范围选择时为数组[{"day": 5,"month": 1,"result": "2016-01-05","week": "星期二","year": 2016},{"day": 21,"month": 1,"result": "2016-01-21","week": "星期四", "year": 2016}] |