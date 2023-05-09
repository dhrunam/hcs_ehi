import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalTestService {

  constructor(private http: HttpClient) { }

  get_medical_test_profiles(){
    return this.http.get<any>(`${URL}/masters/medical_test_profile/list`);
  }

  get_medical_tests()
  {
    return this.http.get<any>(`${URL}/masters/medical_test`);
  }

  get_medical_test(id:number)
  {
    return this.http.get<any>(`${URL}/masters/medical_test/${id}`);
  }

  add_medical_test(data:FormData){
    return this.http.post(`${URL}/masters/medical_test`,data)
  }

  update_medical_test(data:FormData){
    return this.http.put(`${URL}/masters/medical_test/${data.get('id')}`,data)
  }

  partial_update_medical_test(data:FormData){
    return this.http.patch(`${URL}/masters/medical_test/${data.get('id')}`,data)
  }
  
  delete_medical_test(id:number){
    return this.http.delete(`${URL}/masters/medical_test/${id}`)
  }

}
