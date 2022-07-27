export class Page {
    id: number = 0;
    componentName: string = '';
    drag?: boolean = false;
    children?: Page[] = [];
    props?: {
        [key: string]: any
    } = {}
}