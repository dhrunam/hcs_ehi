import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class MedicalTestProfileService {

  constructor(private http: HttpClient) { }

  get_medical_test_profiles(){
    return this.http.get<any>(`${URL}/masters/medical_test_profile`);
  }

  get_medical_test_profile(id:number){
    return this.http.get<any>(`${URL}/masters/medical_test_profile/${id}`);
  }

  add_medical_test_profile(data:FormData)
  {
    return this.http.post<any>(`${URL}/masters/medical_test_profile`,data);
  }

  update_medical_test_profile(data:FormData)
  {
    return this.http.put(`${URL}/masters/medical_test_profile/${data.get('id')}`,data);
  }

  partial_update_medical_test_profile(data:FormData)
  {
    return this.http.patch(`${URL}/masters/medical_test_profile/${data.get('id')}`,data);
  }

  delete_medical_test_profile(id:number){
    return this.http.delete(`${URL}/masters/medical_test_profile/${id}`);
  }
}
