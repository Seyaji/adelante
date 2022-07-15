import fs from 'fs';
import { useTs } from '../utils.js';

export default function utilGen(utils: any, projectPath: string, useTypescript: boolean) {
  fs.mkdir(`./${projectPath}/utils`, { recursive: true }, (error) => {
    if (error) throw error;
    fs.writeFile(`./${projectPath}/utils/utils${useTs(useTypescript, ".ts", ".js")}`, utils, (error) => {
      if (error) throw error;
    });
  });
}