import { SpiColumnType } from './spi-table/spi-column-type.model';

export class SpiTableColumn {
    display: string;
    bind: string;
    type: any;
    disableSort: boolean = false;

    constructor(display: string, bind: string, type = SpiColumnType.String, disableSort?: boolean) {
        this.display = display;
        this.bind = bind;
        this.disableSort = disableSort;
        this.type = type;
    }
}