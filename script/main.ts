import * as path from 'path';

import { cpDir } from './ls/cpDir';
import { clear } from './ls/rm';

const PackagePath = `/Users/zsy/Documents/zsy/job/components/packages/calendar`;
const src = path.resolve(__dirname, '../src/calendar');
const dist = path.resolve(PackagePath, 'src');
const exampleSrc = path.resolve(__dirname, '../src');
const exampleDist = path.resolve(PackagePath, 'example/src');

async function main() {
  await clear(dist);
  await cpDir(src, dist, undefined, (src_path, _) => {
    if (src_path.indexOf('.save.') !== -1) {
      return true;
    }
    return false;
  });

  console.log(`status:> sync calendar success!`);
  await clear(exampleDist);
  await cpDir(exampleSrc, exampleDist, undefined, (src_path, _) => {
    if (src_path.indexOf('/calendar/') !== -1) {
      return true;
    }
    return false;
  });
  console.log(`status:> sync example success!`);
}
main();
