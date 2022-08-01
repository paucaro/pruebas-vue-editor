import { reactive } from "vue";

export const dataPg = reactive<PgPage[]>([]);

export const getComponents = () => {
  const illustrations = require.context(
    "@/components/pg-components",
    true,
    /^.*\.vue$/
  );
  return illustrations
    .keys()
    .map((file: string) => file.replace("./", "").replace(".vue", ""));
};

export const getListNewComponents = (): Array<NewComponent> => {
  let listNewComponents: Array<NewComponent> = [];
  getComponents().forEach((file) => {
    switch (file) {
      case "pg-container":
        listNewComponents.push({
          name: file,
          named: "CONTAINER",
          html: `<div style="height: calc(100% - 20px - 16px);margin: 10px;border: 8px dashed;"></div>`,
        });
        break;
      case "pg-text-html":
        listNewComponents.push({
          name: file,
          named: "TEXT",
          html: `<div style="height: calc(100% - 20px);margin: 10px;display: flex;flex-direction: column;gap: 10px;"><div style="border: 10px solid;width: 50%;"></div><div style="border: 10px solid;width: 70%;"></div><div style="border: 10px solid;"></div><div style="border: 10px solid;width: 50%;"></div><div style="border: 10px solid;width: 80%;"></div></div>`,
        });
        break;
      case "pg-image":
        listNewComponents.push({
          name: file,
          named: "IMAGE",
          html: `<div style="height: calc(100% - 20px - 20px);margin: 10px;border: 10px solid;border-radius: 10px;"><div style="border-radius: 50%;width: 16px;height: 16px;border: 10px solid;margin: 10px;"></div><div style="width: 0px;margin-left: auto;border-right: 60px solid transparent;border-left: 60px solid transparent;border-bottom: 66px solid black;"></div></div>`,
        });
        break;
      default:
        break;
    }
  });
  return listNewComponents;
};

export const getComponentPgName = (componentName: string) => {
  switch (componentName) {
      case 'CONTAINER':
          return 'PgContainer'
      case 'TEXT':
          return 'PgTextHtml'
      case 'IMAGE':
          return 'PgImage'
      default:
          return componentName;
  }
};

export class NewComponent {
  name: string = '';
  named: string = '';
  html: string = '';
}

export class PgPage {
  id: number = 0;
  componentName: string = '';
  children?: PgPage[] = [];
  props?: {
      [key: string]: any
  } = {}
}
