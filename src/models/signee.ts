import { SigneeRef } from './signeeref';

export class Signee extends SigneeRef {
    Id: string;
    SigneeRefId: string;

    SignUrl: string; 

    SignedTime: Date;
    Signed: boolean;
    SignName: string;
    DateOfBirth: string;

    BankIdPid: string;
    BuypassId: string;

    CertificateIssuer: string;
}