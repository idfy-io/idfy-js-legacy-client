export class ReceiverCreateModel {
    Category?: string;
    CompanyName?: string;
    Email?: string;
    ExternalId?: string;
    FirstName: string;
    LastName: string;
    Mobile?: string;
    OrgNo?: string;
    SocSecHash?: string;
}

export class Receiver extends ReceiverCreateModel {
    Id: string;
}