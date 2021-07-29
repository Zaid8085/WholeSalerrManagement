import { SpiTableColumn } from '../spi-table-column.model';
import { SpiPaginator } from '../spi-paginator.model';

export class SpiTableSettings {
    public tableData = [];
    public tableColumns: SpiTableColumn[] = [];
    public tableId: string;
    public pagination = new SpiPaginator();
    public hasChildRow?: boolean = false;

    constructor(tableData: any[], tableColumns: SpiTableColumn[],
        tableId: string, hasChildRow?: boolean) {
        this.tableData = tableData;
        this.tableColumns = tableColumns;
        this.tableId = tableId;
        this.hasChildRow = hasChildRow;
    }
}