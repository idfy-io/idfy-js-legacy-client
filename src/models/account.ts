export class AccountCreateModel {
    AllowedIPs?: string; // Comma seperated list
    BillingAddress1: string;
    BillingAddress2?: string;
    BillingCity: string;
    BillingCountry?: string;
    BillingPlan: "Small" | "Medium" | "Large";
    BillingPostalCode: string;
    BillingState?: string;
    CompanyEmail: string;
    CompanyPhone: string;
    CompanyUrl?: string;
    DealerId: string;
    DealerReference?: string;
    EmailSenderAddress?: string;
    LegalContactEmail: string;
    LegalContactMobile?: string;
    LegalContactName: string;
    LegalContactPhone: string;
    MvaNumber: string;
    Name: string;
    OrderBankIDCertificateToMe?: string;
    ProviderLogo_filecontent?: string;
    ProviderLogo_filename?: string;
    SMSSender?: string;
}

export class AccountUpdateModel extends AccountCreateModel {
    ProviderId: string;
}

export class Account extends AccountUpdateModel {
    LastLogin: string;
    FailedLoginCount: number;
    HaveOwnBankIdCertificate: boolean;
    PrePaid: boolean;
    DemoProvider: boolean; 
}

export class AccountApiKeys {
    ProviderId: string;
    PrimaryApiKey: string;
    SecondaryApiKey: string;
}