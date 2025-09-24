export type RequestItem = {
  name: string;
  surname: string;
  citizenId: string;
  damage: string;
  maritalStatus: string;
  religion: string;
  age: number;
  died: string;
  houseRegistration: string;
  currentAddress: string;
  familyMembers: string;
  assistance: string;
  income: string;
  career: string;

  // ไฟล์ทุกตัวใช้ File[] (ไม่ต้อง nullable แล้ว default จะเป็น [])
  beforeAfter: File[];
  citizenCard: File[];
  houseRegistrationFile: File[];
  dailyReport: File[];
  deathCertificate: File[];
  deathRecord: File[];
  marriageCertificate: File[];
  fireCauseReport: File[];
  constructionCostFile: File[];
  constructionCost: string;
};

export type FormValues = {
  requests: RequestItem[];
  province: string;
  district: string;
  subdistrict: string;
  documentHelp1: string;
  documentHelp2: string;
  documentFileHelp: File[];
  documentAffectedProvince1: string;
  documentAffectedProvince2: string;
  documentAffectedProvincesFile: File[];
  documentAssistanceArea1: string;
  documentAssistanceArea2: string;
  documentAssistanceAreaFile: File[];
  date: string;
  casualty: string;
  totalPaid: string;
  criteria: string;
  meetingResolutions:string
};
