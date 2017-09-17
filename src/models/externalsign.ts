import { ExternalSigneeRef } from './externalsigneeref';
import { AddonService } from './addonservice';
import { IdentityProvider } from './identityprovider';
import { Language } from './language';

export class ExternalSignCreateModel {
    AddonServices: AddonService[];
    ConvertToPDFA2b: boolean;
    CreatedByApplication: string;
    CreatePADES: boolean;
    Description: string;
    DocumentType: "PDF"|"XML"|"TEXT";
    Domain: string;
    ExternalDocumentId: string;
    FileContent: string;
    Filename: string;
    FileXSLTContent: string;
    GetSocialSecurityNumber: boolean;
    HideDetailsPage: boolean;
    IdentityProvider: IdentityProvider;
    Language: Language;
    Private: boolean;
    PushNotificationUrl: string;
    ReturnUrlError: string;
    ReturnUrlSuccess: string;
    ReturnUrlUserAbort: string;
    Title: string;
    SigneeRefs: ExternalSigneeRef[];
    UrlExpiresMinutes: number;
    UseIframe: boolean;
    UseWebMessaging: boolean;
}

export class CreatedSigneeRef {
    SigneeRefId: string;
    OriginatorUniqueRef: string;
    SignUrl: string;
}

export class ExternalSignSignUrls {
    Signed: boolean;
    CreatedSigneeRefs: CreatedSigneeRef[];
}

export class ExternalSignBankIdAppUrlCreateModel {
    DocumentId: string;
    SigneeRefId: string;
    UserAgent: string;
}

export class ExternalSignBankIdMobileSignUrlCreateModel {
    DocumentId: string;
    SigneeRefId: string;
    DateOfBirth: string;
    Mobile: string;
    ReceiptSMS?: boolean;
}
