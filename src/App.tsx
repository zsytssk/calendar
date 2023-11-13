import { Radio } from 'antd';
import React, { useMemo, useState } from 'react';

import DemoDay1 from './example/DemoDay1';
import DemoDay2 from './example/DemoDay2';
import DemoDay3 from './example/DemoDay3';
import DemoDay4 from './example/DemoDay4';
import DemoDay5 from './example/DemoDay5';
import DemoDay6 from './example/DemoDay6';
import DemoDay7 from './example/DemoDay7';
import DemoDay8 from './example/DemoDay8';
import DemoMonth1 from './example/DemoMonth1';
import DemoMonth2 from './example/DemoMonth2';
import DemoWeek1 from './example/DemoWeek1';
import DemoWeek2 from './example/DemoWeek2';
import DemoWeek3 from './example/DemoWeek3';

const demoMap = {
  日视图基本: DemoDay1,
  日视图多栏: DemoDay2,
  日视图跨天: DemoDay3,
  日视图Resize: DemoDay4,
  日视图新建: DemoDay5,
  日视图Resize2: DemoDay6,
  日视图Drag: DemoDay7,
  ['日视图DragResize']: DemoDay8,
  周视图: DemoWeek1,
  周视图跨天: DemoWeek2,
  周视图自定义header: DemoWeek3,
  月视图: DemoMonth1,
  月视图跨天: DemoMonth2,
};
const findDemoKey = (dom: () => JSX.Element) => {
  for (const [key, com] of Object.entries(demoMap)) {
    if (com === dom) {
      return key;
    }
  }
};
export default function App() {
  const [activeKey, setActiveKey] = useState(findDemoKey(DemoDay8));

  const Component = useMemo(() => {
    return demoMap[activeKey as keyof typeof demoMap];
  }, [activeKey]);
  return (
    <div>
      <Radio.Group
        value={activeKey}
        onChange={(e) => {
          setActiveKey(e.target.value);
        }}
      >
        {Object.entries(demoMap).map(([key, _]) => {
          return (
            <Radio.Button key={key} value={key}>
              {key}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <Component />
    </div>
  );
}
