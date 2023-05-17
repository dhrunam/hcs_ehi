import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class HealthRecordService{

  constructor(private http:HttpClient) { }
}
