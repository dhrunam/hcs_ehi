export interface MedicalTestProfile{
    id:number;
    name:string;
}

export interface MedicalTest {
    id:number;
    profile: number;
    name: string;
    normal_min_value:number;
    normal_max_value: number;
    unit: string;
    is_deleted:boolean;
    related_profile?: MedicalTestProfile;
}



