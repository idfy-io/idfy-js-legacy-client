import { AddonService } from './addonservice';
import { Language } from './language';
import { MetaData } from './metadata';
import { SigneeRef } from './signeeref';

export class DocumentCancelModel {
    CanceledDate: Date;
    DocumentID: string;
    Explanation?: string;
    Signature: string;
}

export class DocumentChangeDeadlineModel {
    DocumentID: string;
    NewDeadline: Date;
    NotifyEmail?: boolean;
    NotifySMS?: boolean;
    ProviderID: string; // AccountId
}

export class DocumentCreateModel {
    AddonServices?: AddonService[];
    ConvertToPDFA2b?: boolean;
    CreatedByApplication?: string;
    CreatePADES?: boolean;
    Description: string;
    DoNotNotifySigneeRefs?: boolean;
    ExternalDocumentId?: string;
    FileContent: string; // The file content of the document. It should be encoded as a base64 string (UTF-8)
    FileMD5CheckSum: string; 
    FileName: string; // The file name of the document (with file extension). Following formats are supported: pdf, doc, docx, txt, rtf, odt and ott.
    GetSSN?: boolean;
    Language: Language;
    MessageEmail?: string;
    MessageSms?: string;
    MetaData?: MetaData[];
    NotifySenderWhenCanceledEmail?: boolean;
    NotifySenderWhenCanceledSMS?: boolean;
    NotifySenderWhenSignedEmail?: boolean;
    NotifySenderWhenSignedSMS?: boolean;
    NotifySigneerefBeforeSignDeadlineEmail?: boolean;
    NotifySigneerefBeforeSignDeadlineSMS?: boolean;
    NotifySigneerefsWhenSignedEmail?: boolean;
    NotifySigneerefsWhenSignedSMS?: boolean;
    Private?: boolean;
    PushNotificationUrl?: string;
    ReceiptMessageEmail?: string;
    ReceiptTopicEmail?: string;
    RedirectFinishUrl?: string;
    SenderEmail?: string;
    SenderMobile?: string;
    ShowOnSigneesPersonalSite?: boolean;
    SignDeadline?: Date;
    SigneeRefs: SigneeRef[];
    SignJobId: string;
    Title: string;
    TopicEmail?: string;
    XlstFileContent?: string;
}