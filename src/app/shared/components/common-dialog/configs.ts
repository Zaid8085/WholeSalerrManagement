
import { Observable } from 'rxjs';

export class DropdownConfig {
    constructor(
        // if possible, set options equal to a static array (have the data loaded already)
        // if you need the options loaded depending on the specific row data, then use the function option
        public options: any[] | ((rowData, row: any) => Observable<any[]> | any[]),
        public displayBind: string,
        public valueBind: string
    ) {

    }
}

export class UpdateInfo {
    constructor(
        public columnDefinition,
        public existingValue,
        public newValue
    ) { }
}

// export class FormInputConfig {
//     constructor(
//         public required = true,
//         public onValueUpdate?: (rowData?: any, row?: any, updateInfo?: UpdateInfo) => Observable<any> | void
//     ) {}
// }