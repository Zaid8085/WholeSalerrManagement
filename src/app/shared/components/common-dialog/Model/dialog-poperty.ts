import { DropdownConfig } from '../configs';

export class DialogProperty {
    message: elementsConfig;
    buttonsprimary: elementsConfig;
    buttonssecondary?: elementsConfig;
    inputConfig?: inputConfig[];
    responsiveTable?: ResponsiveTable;
    showError?: elementsConfig;
    showComponent?: elementsConfig;
    constructor(message: elementsConfig,
        buttonsprimary: elementsConfig, buttonsSecondary?: elementsConfig, inputConfig?: inputConfig[],
        responsiveTable?: ResponsiveTable, showError?: elementsConfig, showComponent?: elementsConfig) {
        this.message = message;
        this.buttonsprimary = buttonsprimary;
        this.buttonssecondary = buttonsSecondary;
        this.buttonsprimary = buttonsprimary;
        this.buttonssecondary = buttonsSecondary;
        this.inputConfig = inputConfig;
        this.responsiveTable = responsiveTable;
        this.showError = showError;
        this.showComponent = showComponent;
    }
}

export class elementsConfig {
    showElement: boolean;
    text: any;
    loader?: boolean;
    constructor(showElement: boolean, text: any, loader?: boolean) {
        this.showElement = showElement;
        this.text = text;
        this.loader = loader;
    }
}

export class inputConfig {
    inputType: InputType;
    showInput: boolean;
    inputText: string;
    disabledInput?: boolean;
    required?: boolean;
    placeholder?: string;
    label?: string;
    maxLength?: number;
    dropdownConfig?: DropdownConfig;
    constructor(
        inputType: InputType,
        showInput: boolean,
        inputText: string,
        disabledInput?: boolean,
        required?: boolean,
        placeholder?: string,
        label?: string,
        maxLength?: number,
        dropdownConfig?: DropdownConfig) {
        this.inputType = inputType
        this.showInput = showInput
        this.inputText = inputText;
        this.disabledInput = disabledInput;
        this.required = required;
        this.placeholder = placeholder;
        this.label = label;
        this.maxLength = maxLength;
        this.dropdownConfig = dropdownConfig
    }
}

export class ResponsiveTable {
    tableData: any[];
    tableColumns: any[];
    tableSettings: any;
    tableId: any;
    constructor(tableData: any[],
        tableColumns: any[],
        tableSettings: any,
        tableId: any) {
        this.tableData = tableData
        this.tableColumns = tableColumns
        this.tableSettings = tableSettings
        this.tableId = tableId
    }
}
export enum InputType {
    Input,
    Textarea,
    Dropdown,
    Checkbox,
    ReadOnly,
    Radio
}

// let ClassInputTypes = [InputType.Input, InputType.Textarea, InputType.Dropdown, InputType.Checkbox];
// export { ClassInputTypes }