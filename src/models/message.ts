import { Language } from "./language";

export class MessageCreateModel {
    DocumentID: string;
    EmailMessage: string;
    EmailTopic?: string;
    Language?: Language;
    RecipientEmailAddress: string;
    RecipientMobileNumber?: string;
    SenderSignature: string;
    SigneeRef: string;
}

export class MessageSendExternalModel {
    DocumentID: string;
    Email: string;
    EmailMessage: string;
    EmailTopic: string;
    Expires?: Date;
    MobileNumber: string;
    SenderSignature: string;
}

export class MessageResendModel {
    DocumentID: string;
    RecipientEmailAddress?: string;
    ReplaceEmail?: string;
    SigneeRef: string;
}

export class Message extends MessageCreateModel {
    Id: string;
    SMSText: string;
    Status: string;
}