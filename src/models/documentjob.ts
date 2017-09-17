export class DocumentJobCreateModel {
    Contact_Email: string;
    Contact_Phone: string;
    Contact_Name?: string;
    Contact_Mobile?: string;
    Contact_Url?: string;
}

export class DocumentJob extends DocumentJobCreateModel {
    Id: string;
    ProviderId: string;
}