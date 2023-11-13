import React from 'react';

import { TagList } from '../data';
import styles from './index.module.less';

export function HeadRender() {
  return (
    <div className={styles.headRender}>
      {TagList.map((item) => {
        return (
          <div className="item" key={item.id}>
            <div className="band">
              <div className="tag">{item.id}</div>
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
