import { ExternalSignBankIdMobileSignUrlCreateModel, ExternalSignBankIdAppUrlCreateModel, ExternalSignCreateModel, ExternalSignSignUrls } from './models/externalsign';
import { MessageCreateModel, MessageResendModel, Message, MessageSendExternalModel } from './models/message';
import { AccountCreateModel, AccountApiKeys, AccountUpdateModel } from './models/account';
import { DocumentJobCreateModel, DocumentJob } from './models/documentjob';
import { DocumentFielGetTemporaryUrlModel } from './models/documentfile';
import { DocumentCreateModel, DocumentCancelModel, DocumentChangeDeadlineModel } from './models/document';
import { SignereWebClient } from "./signere_web_client";
import { Language } from './models/language';
import { ReceiverCreateModel } from './models/receiver';
import axios, { AxiosResponse } from 'axios';

export class SignereClient {

    private getAuthHttp(): SignereWebClient {
        return new SignereWebClient(
            this.test ? 'https://testapi.signere.no/api/' : 'https://api.signere.no/api/',
            this.apiId,
            this.primaryKey,
            this.secondaryKey,
            this.pingToken
        );
    }

    constructor(private apiId: string, private primaryKey: string, private secondaryKey: string, private test: string | boolean, private pingToken: string) {
        this.test = (test || test == 'true') ? true : false;
    }

    ApiKey_RenewPrimaryKey() {
        return this.getAuthHttp().post('ApiToken/RenewPrimaryKey?OldPrimaryKey=' + this.primaryKey).then(r => r.data);
    }

    ApiKey_RenewSecondaryKey() {
        return this.getAuthHttp().post('ApiToken/RenewSecondaryKey?OldSecondaryKey=' + this.secondaryKey).then(r => r.data);
    }

    ApiKey_InitiateRegeneratePrimaryKeyByOtp() {
        return this.getAuthHttp().put('ApiToken/OTP/RenewPrimaryKeyStep1').then(r => r.data);
    }

    ApiKey_CompleteRegeneratePrimaryKeyByOtp(otpCode: string) {
        return this.getAuthHttp().post('ApiToken/OTP/RenewPrimaryKeyStep2/Provider/' + this.apiId + '/' + otpCode).then(r => r.data);
    }

    Document_GetSignUrl(documentId: string, signeeRefId: string) {
        const url = 'Document/SignUrl?documentId=' + documentId + (signeeRefId ? '&signeeRefId=' + signeeRefId : '');
        return this.getAuthHttp().get(url).then(r => r.data);
    }

    Document_GetDocument(documentId: string): Promise<Document> {
        return this.getAuthHttp().get('Document/' + documentId).then(r => r.data);
    }

    Document_GetTempViewUrl(documentId: string) {
        return this.getAuthHttp().get('Document/SignedDocument/TemporaryViewerUrl/' + documentId).then(r => r.data);
    }

    Document_Create(document: DocumentCreateModel): Promise<Document> {
        return this.getAuthHttp().post('Document', document).then(r => r.data);
    }

    Document_Cancel(request: DocumentCancelModel): Promise<boolean> {
        return this.getAuthHttp().post('Document/CancelDocument', request).then(r => r.status == 200);
    }

    Document_ChangeDeadline(request: DocumentChangeDeadlineModel): Promise<boolean> {
        return this.getAuthHttp().put('Document/ChangeDeadline', request).then(r => r.status == 200);
    }

    DocumentConvert_Convert(file: File) {
        return axios.post('DocumentConvert', file, { responseType: "File" }).then(r => r.data);
    }

    DocumentFile_GetSdo(documentId: string) {
        return this.getAuthHttp().get('DocumentFile/Signed/' + documentId, { responseType: "File" }).then(r => r.data);
    }

    DocumentFile_GetUnsignedPdf(documentId: string) {
        return this.getAuthHttp().get('DocumentFile/Unsigned/' + documentId, { responseType: "File" }).then(r => r.data);
    }

    DocumentFile_GetSignedPdf(documentId: string) {
        return this.getAuthHttp().get('DocumentFile/SignedPDF/' + documentId, { responseType: "File" }).then(r => r.data);
    }

    DocumentFile_CreateTempUrl(request: DocumentFielGetTemporaryUrlModel) {
        return this.getAuthHttp().post('DocumentFile/TempUrl', request).then(r => r.data);
    }

    DocumentJob_GetJob(documentJobId: string): Promise<DocumentJob> {
        return this.getAuthHttp().get('DocumentJob/' + documentJobId).then(r => r.data);
    }

    DocumentJob_Create(documentJobCreateModel: DocumentJobCreateModel): Promise<string> {
        return this.getAuthHttp().post('DocumentJob', documentJobCreateModel).then(r => r.data.Id);
    }

    Account_Get(): Promise<Account> {
        return this.getAuthHttp().get('DocumentProvider/' + this.apiId).then(r => r.data);
    }

    Account_GetBankIdExpiration() {
        return this.getAuthHttp().get('DocumentProvider/CertificateExpires').then(r => r.data);
    }

    Account_GetPrepaidInformation() {
        return this.getAuthHttp().get('DocumentProvider/quota/prepaid?ProviderId=' + this.apiId).then(r => r.data);
    }

    Account_GetDemoInformation() {
        return this.getAuthHttp().get('DocumentProvider/quota/demo?ProviderId=' + this.apiId).then(r => r.data);
    }

    Account_Create(accountCreateModel: AccountCreateModel): Promise<AccountApiKeys> {
        return this.getAuthHttp().post('DocumentProvider', accountCreateModel).then(r => r.data);
    }

    Account_Update(accountUpdateModel: AccountUpdateModel): Promise<Account> {
        return this.getAuthHttp().put('DocumentProvider', accountUpdateModel).then(r => r.data);
    }

    Events_GetQueueKey() {
        return this.getAuthHttp().get('events/encryptionkey').then(r => r.data);
    }

    ExternalSign_GetUrls(documentId: string): Promise<ExternalSignSignUrls> {
        return this.getAuthHttp().get('externalsign/' + documentId).then(r => r.data);
    }

    ExternalSign_GetIframeUrl(documentId: string, domain: string, language: Language) {
        return this.getAuthHttp().get('externalsign/ViewerUrl/' + documentId + "/" + domain + "/" + language).then(r => r.data);
    }

    ExternalSign_GetMobileSignSessionStatus(signeeRefId: string) {
        return this.getAuthHttp().get('externalsign/BankIDMobileSign/Status/' + signeeRefId).then(r => r.data);
    }

    ExternalSign_Create(request: ExternalSignCreateModel): Promise<string> {
        return this.getAuthHttp().post('externalsign', request).then(r => r.data.DocumentId);
    }

    ExternalSign_CreateMobileAppLaunchUri(request: ExternalSignBankIdAppUrlCreateModel) {
        return this.getAuthHttp().put('externalsign/BankIDAppUrl', request).then(r => r.data);
    }

    ExternalSign_StartMobileSignSession(request: ExternalSignBankIdMobileSignUrlCreateModel) {
        return this.getAuthHttp().put('externalsign/BankIDMobileSign', request).then(r => r.data);
    }

    Form_GetForms() {
        return this.getAuthHttp().get('Form/GetForms').then(r => r.data);
    }

    Form_GetSignedForms(formId: string, fromDate: string, toDate: string) {
        var first = true;
        var url = 'Form/GetSignedForms';
        if (formId) {
            url += (first ? '?' : '&') + 'formId=' + formId;
            first = false;
        }
        if (fromDate) {
            url += (first ? '?' : '&') + 'fromDate=' + fromDate;
            first = false;
        }
        if (toDate) {
            url += (first ? '?' : '&') + 'toDate=' + toDate;
            first = false;
        }
        return this.getAuthHttp().get('Form/GetSignedForms').then(r => r.data);
    }

    Form_GetAttachment(formId: string, formSignatureId: string, attachmentRef: string) {
        const url = 'Form/GetFormAttachment?formId=' + formId + '&FormSignatureId=' + formSignatureId + '&AttatchmentReference=' + attachmentRef;
        return this.getAuthHttp().get(url).then(r => r.data);
    }

    Form_GetSignedFormByDocumentId(documentId: string) {
        return this.getAuthHttp().get('Form/GetSignedForm?documentid=' + documentId).then(r => r.data);
    }

    Form_GetSignedFormByFormSessionId(formId: string, formSessionId: string) {
        return this.getAuthHttp().get('Form/GetSignedFormByFormSessionId?formId=' + formId + '&formSessionId=' + formSessionId).then(r => r.data);
    }

    Form_Enable(formId: string) {
        return this.getAuthHttp().put('Form/EnableForm?formId=' + formId).then(r => r.data);
    }

    Form_Disable(formId: string) {
        return this.getAuthHttp().put('Form/DisableForm?formId=' + formId).then(r => r.data);
    }

    Invoice_List(year: string, month: string) {
        return this.getAuthHttp().get('Invoice/' + year + '/' + month).then(r => r.data);
    }

    License_Parse(dealerId: string) {
        return this.getAuthHttp().post('license/' + dealerId).then(r => r.data);
    }

    Message_GetById(messageId: string): Promise<Message> {
        return this.getAuthHttp().get('Message/' + messageId).then(r => r.data);
    }

    Message_GetByDocumentId(documentId: string): Promise<Message[]> {
        return this.getAuthHttp().get('Message/Document/' + documentId).then(r => r.data);
    }

    Message_SendToSignees(message: MessageCreateModel) {
        return this.getAuthHttp().post('Message', message).then(r => r.data);
    }

    Message_SendViewUrl(request: MessageSendExternalModel) {
        return this.getAuthHttp().post('Message/SendExternalMessage', request).then(r => r.data);
    }

    Message_ResendToSignee(request: MessageResendModel) {
        return this.getAuthHttp().put('Message/SendNewDocumentMessage', request).then(r => r.data);
    }

    Receiver_DeleteReceiver(receiverId: string) {
        return this.getAuthHttp().delete('Receiver/' + this.apiId + '/' + receiverId).then(r => r.data);
    }

    Receiver_DeleteAllReceivers() {
        return this.getAuthHttp().delete('Receiver/' + this.apiId).then(r => r.data);
    }

    Receiver_Get(receiverId: string) {
        return this.getAuthHttp().get('Receiver/' + receiverId + '?ProviderId=' + this.apiId).then(r => r.data);
    }

    Receiver_GetAllReceivers() {
        return this.getAuthHttp().get('Receiver?ProviderId=' + this.apiId).then(r => r.data);
    }

    Receiver_Create(receiver: ReceiverCreateModel) {
        return this.getAuthHttp().post('Receiver', receiver).then(r => r.data);
    }

    Receiver_CreateMultipleReceivers(receivers: ReceiverCreateModel[]) {
        return this.getAuthHttp().post('Receiver/CreateMultipleReceivers', receivers).then(r => r.data);
    }

    Statistics_Get(year?: string, month?: string, day?: string, status?: string) {
        var first = true;
        var url = 'Statistics';
        if (year) {
            url += (first ? '?' : '&') + 'Year=' + year;
            first = false;
        }
        if (month) {
            url += (first ? '?' : '&') + 'Month=' + month;
            first = false;
        }
        if (day) {
            url += (first ? '?' : '&') + 'Day=' + day;
            first = false;
        }
        if (status) {
            url += (first ? '?' : '&') + 'Status=' + status;
            first = false;
        }
        return this.getAuthHttp().get('Form/GetSignedForms').then(r => r.data);
    }

    Status_ServerTime() {
        return this.getAuthHttp().get('Status/ServerTime').then(r => r.data);
    }

    Status_Ping() {
        return this.getAuthHttp().ping('Status/Ping/thisisaping').then(r => r.data);
    }

}