import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/tasks/'; 

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders { const token = localStorage.getItem('token'); 
    return new HttpHeaders({ Authorization: `Bearer ${token}`, }); }
     getTasks() { const headers = this.getAuthHeaders();
       return this.http.get(`${this.baseUrl}`, { headers }); }

  createTask(task: any) { const headers = this.getAuthHeaders();
     return this.http.post(`${this.baseUrl}`, task, { headers }); 
    } 
    updateTask(id: string, task: any) { const headers = this.getAuthHeaders();
       return this.http.put(`${this.baseUrl}/${id}`, task, { headers }); }
        deleteTask(id: string) { const headers = this.getAuthHeaders();
           return this.http.delete(`${this.baseUrl}/${id}`, { headers }); }}
