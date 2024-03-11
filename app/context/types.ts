export interface Doctor {
    id: number;
    drImage: string;
    drName: string;
    drQual: string;
    clinics: Clinic[];
  }
  
  export interface Clinic {
    id: number;
    clinicName: string;
    clinicAddress: string;
    clinicFees: string;
    clinicTimings: string;
  }
  
  export interface Appointment {
    doctorId: number;
    clinicId: number;
  }

  export interface Token{
    token: string;
  }
  
  export interface Patient{
    id:string,
    name:string
  }

  export interface User{
    //id:string,
    name:string
    pass:string
    token:string
  }