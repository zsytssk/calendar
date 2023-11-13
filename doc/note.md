## 2023-01-11 10:13:23

- 优化（feature_zsy_calendar_resize）

  - 创建时调整大小
  - 添加注释...
  - 跨天调整位置
  - ***
  - @ques 如何确定一小时是 显示多高
  - 自定义大小 -> re-resizable
  - 拖拽 ->

- @bug 拖拽容易触发外面的创建

## 2023-01-28 14:47:11

- @ques 【周视图+日视图中】我如何能知道 24 小时对应的 height

  - useDayHeight useDayWidth -> 用来给外面计算改变大小对应的改变时间
  - useCalcSizeToTime

- @ques 月份不太好处理

- @ques 哪些日程是可以编辑的

  - 非过去的日程
  - 也不可以把日程的时间改成当前之前

- @ques 编辑日程的接口 -> 更新的接口...

### end

- @ques 拖拽的时候 如何只能控制 大小只能改变一个 15 分钟

## 2023-01-03 10:52:39

## 2022-12-29 14:31:28

- @ques 月视图 OnSelect

- @ques 点击选中创建 拖动 改变大小

  - 拖拽完成后，触发 create 事件

- @ques 日视图 多个合并在一起 位置不对

- @ques 月视图创建用什么接口

## todo

- okr
- 清理不需要的依赖
- 检查语法错误
- resize 拖拽 大小有些问题
- ***
- 将 example 放到 component 中
- 清理 calPos 参数
- 月视图跨天
- 时间重叠隐藏时间

## 2022-12-22 10:04:26

### end

- @ques 月视图 item hover 样式
- 月视图跨天

  - 要检查对周日的影响
  - 日视图要不要用的 layoutRect? 也许根本用不上

- layoutRect 改名
- @ques 点击创建 + 拖动控制范围如何处理

  - https://htmldom.dev/make-a-resizable-element/

- @ques 同日当中有多个任务如何处理

  - 10

```
dayWidth = data.overlayNum * itemWidth + overlayWidth
itemWidth = (dayWidth - overlayWidth) / data.overlayNum
```

- calcPos 做成 hook

- 所有 calendar 内部的路径是这个的都换掉

- @todo 特殊样式都放在 example 中
- @todo useWeekList 获取周的数据列表

  - CalendarWeek/index.tsx

- @ques CrossDayBox calPos 可以做成公共组件
- @ques 也许可以做成 dataList 一个公共的接口

  - 跨天的渲染，不跨天的渲染 （日视图中的 tag 比较难搞）
  - dataRender
  - crossDayBox

- @ques useShowData(data, date, type)

  - 取得需要渲染的数据

- @ques 跨天超过两天怎么办
- dateList > 1 天的 直接使用这个作为接口...
- @ques layoutRect 测试

## other

- 企业微信排期

## 2022-12-13 13:55:18

- calcClickPercent 计算的有问题

- @ques 在当前日中渲染数据

  - customBodyRender

- @ques 一行多个任务 可以看他之前有多少个，用这个来设置他的宽度

- @ques 切换视图时的数据

- @ques 每个视图下的节点都不一样

  - 感觉不统一

- @todo

  - 需要各种不同情况的 demo 页面 才能更好的开发
    - 时间发生改变数据的渲染
  - 在当前月中渲染数据
  - 日视图的标签分割如何处理
    - 日视图的顶部怎么处理
  - 日视图跨天如何处理
  - ***
  - 接口 -> https://fullcalendar.io/docs#main ｜ https://codepen.io/pen?editors=0010
  - 在所有的视图中 显示当前时间
  - 日视图接口
  - 选中当前月
  - 周视图 日视图 的样式
  - 选择当前月
  - 月份切换

- @ques 各个视图的选择中的 如何处理

  - @ques 日周 是半个小时
  - 月是整个

- @ques curTimeLine 能不能做成组件

- @ques calBody 滚动条 不占空间？

- @ques 优化 day curTimeLine

- @ques 如何在 npm 包中测试

- @ques 如何跨天？

### end

- calcClickPercent 计算的有问题
- @ques 能不能左右分隔
- 在明天给 wutonghui 一个可以用的版本

- @ques 月份的样式怎么处理

- @ques 月视图中的每一块 怎么写

- 先把能做的做了，难题慢慢想
- @ques css `inset: 441px 0% -525px;` 是干嘛的

## other

- feature_xjd_cdp_1208 打开用户详情 的订单 tab

- 抽奖发布 样式 url 的配置

## 排期

- @todo

  - 日历头部的处理 1
  - 月日历
    - 日历的基本样式 1·
    - 1 item 的样式 + dropdown 的样式
    - 完成 进行中 未开始 样式 1
  - 周日历
    - 日历的基本样式 1
    - item 的样式 1
    - 完成 进行中 未开始 样式 1
  - 日日历
    - 日历的基本样式 1
  - 难点
    - 接口设计 1
    - 跨日的处理 1 - feishu
    - 日内的拖动设置时间 - feishu

- 难点

  - 接口设计 1
  - 跨日的处理 1 - feishu
  - 日内的拖动 1 - feishu

- @todo
  - 和 wutonghui 沟通哪些我来做

## 2022-12-12 15:04:45

- @ques [周日历] 中的 多列

- @ques [周日历] 如何删除直播任务

- @ques [周日历] 超过 17 小时的往下滚动吗

- @todo 顺序 -> 月周日

- @ques `日历-日` 中的 12:18 是干嘛的

- @ques 日周月 的接口 会不会要不同的处理

- @ques 自己先写一个 demo 页面

- @ques 点击今天会是什么效果

- @ques 跨天的样式 是什么

  - 不好做

- 当前日的展开 能不能用 dropdown

- @ques 当前选中的样式 可能换一个方式吗？

- @ques 日周月 如何切换

- @ques 最顶上是什么 最左边 是干嘛的

- @ques tonghui 在哪个分支

- @ques 规划 实际 日历 调整 -> 这是什么，需要在 ui 中如何展示

- @ques 同一日 有多列 是什么时候出现的

- @ques 日历顶上那个是什么 @设计

  - 能不能换一个方式显示
  - 如果我选择了多个怎么办
