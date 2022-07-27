export const getComponentName = (componentName: string) => {
    switch (componentName) {
        case 'div':
            return 'PeContainer'
        case 'text':
            return 'PeTextWidget'
        case 'img':
            return 'PeImageWidget'
        default:
            return componentName;
    }
  };