- @opt

  - useCalcPosFn 能不能用 useDaySize...

- @ques 如何优化性能

  - 所有的时间能不能用 unix 来处理，这样更有效率
  - test:>onPanelChange 改变时 test:>dateFullCellRender 执行两遍
  - CalendarDay curPos 中更好的计算
  - 周视图 getInDayDataList ｜ calcPos ｜ innerProps?.dataRender 无必要的计算
  - 优化 zusland 性能
  - 有没有可能会内存泄漏

- @ques 任务拖拽控制位置

- @ques curTimeLine 两种颜色的处理

```ts
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
```

- 切换类型 scrollIntoView -> 将 curLine 显示在屏幕中间
  - scrollTo 做成 hook？
- 可以拖动任务

- @ques 日视图 点击 拖动创建

## end

- calBodyRef.current?.scrollTo 能不能做成 hook
