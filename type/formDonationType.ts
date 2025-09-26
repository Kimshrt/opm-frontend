export type formDonationFormValues = {
    project: string;
    fullname: string;
    phoneNumber: string;
    email: string;
    donations: { item: string; quantity: number; price: number }[];
    files: File[];
}