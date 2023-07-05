export interface IFormField {
    valueclass?: any;
    lblclass: any;
    label: string;
    fieldName: string;
    fieldType: string;
    inputType: string;
    fieldValue?: any;
    placeholder?: string;
    format?: string;
    editable: boolean;
    visible: boolean;
    values: any;
    class: string;
    message: any;
    validations: any;
    data: string;
    subtype: string;
    icon: any
    isDisabled: boolean
    btnLabel: any;
    row: number;
    icons: any;
    transient: any;
    limit:number;
    maxlength:any;
    minlength:any;


}

export interface IDropdown {
    name: string;
    code: string;
}

export interface IUser {
    userName: string;
}

export enum FormControlTypes {
    TEXT = "text",
    PASSWORD = "password",
    STATICTEXT = "staticText",
    SELECT = "select",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    DATE = "date",
    DATERANGE = "dateRange",
    TEXTAREA = "textarea",
    ANCHOR = "anchor",
    CONFIRMPASSWORD = "confirmPassword",
    CAPTCHA = "captcha",
    BUTTON = "button",
    MONTH = "month",
    IMAGEUPLOAD = "imageUpload",
    FILESUPLOAD = "filesUpload",
    ICON = "icon",
    DEPENDENTDROPDOWN = "dependentdropdown",
    DIVIDER = "divider",
    MULTISELECT = "multiselect"
}