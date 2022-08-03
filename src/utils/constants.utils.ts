import { reactive, ref } from "vue";

export const ACTUAL_CONTAINER = ref("");
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

export const getItemFromActualContainer = (): [PgPage, PgPage[]] => {
  const listTemp = ACTUAL_CONTAINER.value.split(":");
  let idsLevel = [];

  for (let index = 1; index <= listTemp.length; index++) {
    idsLevel.push(listTemp.slice(0, index).join(":"));
  }

  let tempItem: PgPage = new PgPage();
  let tempChildren = dataPg;
  let tempArrayContainer = dataPg;

  if (ACTUAL_CONTAINER.value) {
    idsLevel.forEach((val: string) => {
      tempItem = tempChildren.find((i) => i.id == val)!;
      tempArrayContainer = tempChildren;
      tempChildren = tempItem.children?.length === 0 ? [] : tempItem.children!;
    });
  }
  return [tempItem, tempArrayContainer];
}

export const getPropsActual = ():  {
  [key: string]: any;
} => {
  const actualItem: [PgPage, PgPage[]] = getItemFromActualContainer();
  return actualItem[0].props? actualItem[0].props : {};
} 

export const searchIndexAndPushComp = (newElement: PgPage) => {
  const actualItem: [PgPage, PgPage[]] = getItemFromActualContainer();

  const idNewComp = !!ACTUAL_CONTAINER.value
    ? `${ACTUAL_CONTAINER.value}:`
    : "";
  const idDate = +new Date();
  newElement.id = `${idNewComp}${idDate}_${newElement.id}`;
  if (!!idNewComp) {
    actualItem[0].children?.push(newElement);
  } else {
    dataPg.push(newElement);
  }
};

export const searchIndexAndModifyPropsComp = (modify: {[key: string]: any}) => {
  const actualItem: [PgPage, PgPage[]] = getItemFromActualContainer();
  actualItem[0].props = modify;
};

export const searchIndexAndDeleteComp = () => {
  const actualItem: [PgPage, PgPage[]] = getItemFromActualContainer();
  actualItem[1].forEach( (item, index) => {
    if(item === actualItem[0]) actualItem[1].splice(index,1);
  });
}

export const getNewComponent = (nameFile: string): NewComponent => {
  switch (nameFile) {
    case "pg-container":
      return {
        name: nameFile,
        named: "CONTAINER",
        html: `<div style="height: calc(100% - 20px - 16px);margin: 10px;border: 8px dashed;"></div>`,
      };
    case "pg-text-html":
      return {
        name: nameFile,
        named: "TEXT",
        html: `<div style="height: calc(100% - 20px);margin: 10px;display: flex;flex-direction: column;gap: 10px;"><div style="border: 10px solid;width: 50%;"></div><div style="border: 10px solid;width: 70%;"></div><div style="border: 10px solid;"></div><div style="border: 10px solid;width: 50%;"></div><div style="border: 10px solid;width: 80%;"></div></div>`,
      };
    case "pg-image":
      return {
        name: nameFile,
        named: "IMAGE",
        html: `<div style="height: calc(100% - 20px - 20px);margin: 10px;border: 10px solid;border-radius: 10px;"><div style="border-radius: 50%;width: 16px;height: 16px;border: 10px solid;margin: 10px;"></div><div style="width: 0px;margin-left: auto;border-right: 60px solid transparent;border-left: 60px solid transparent;border-bottom: 66px solid black;"></div></div>`,
      };
    default:
      return new NewComponent();
  }
};

export const getListNewComponents = (): Array<NewComponent> => {
  let listNewComponents: Array<NewComponent> = [];
  getComponents().forEach((file) => {
    listNewComponents.push(getNewComponent(file));
  });
  return listNewComponents;
};

export const getComponentPgName = (componentName: string) => {
  switch (componentName) {
    case "CONTAINER":
      return "pg-container";
    case "TEXT":
      return "pg-text-html";
    case "IMAGE":
      return "pg-image";
    default:
      return componentName;
  }
};

export class NewComponent {
  name: string = "";
  named: string = "";
  html: string = "";
}

export class PgPage {
  id: string = "";
  componentName: string = "";
  children?: PgPage[] = [];
  props?: {
    [key: string]: any;
  } = {};
}
