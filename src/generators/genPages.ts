import fs from 'fs';


export default function genPages(pages: any[], projectPath: string) {
  fs.mkdir(`./${projectPath}/`, { recursive: true }, (error) => {
    if (error) throw error;
    pages.map(({ name, file, extension }) => {
      const path = `./${projectPath}/${name}${extension}`;
      fs.writeFile(path, file, (error) => {
        if (error) throw error;
      });
    });
  });
}