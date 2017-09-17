export declare type DocumentFileType = "SDO"|"PDF"|"SIGNED_PDF"|"MOBILE_SDO"|"XML";

export class DocumentFielGetTemporaryUrlModel {
    DocumentFileType: DocumentFileType;
    DocumentID: string;
    Expires: Date;
}