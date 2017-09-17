export class SigneeRef {
    ExternalSigneeId: string;

    FirstName: string;
    LastName: string;
    Mobile: string;
    Email: string;
    OrgNo: string;
    CompanyName: string;
    SocialSecurityNumber: string;
    SignOrder: number; // The signee's order of signature (values should start from 1). If several signees are supposed to sign a document, the order number will determine when each signee receives a notification of the others' signature.

}