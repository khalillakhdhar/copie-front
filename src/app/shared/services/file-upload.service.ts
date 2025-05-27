import { HttpClient , HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'http://31.97.36.146:8080/api/files';

  constructor(private http: HttpClient) { }
  uploadImage(file: File, entityType: string, oldPath?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (oldPath) {
      formData.append('oldPath', oldPath);
    }

    return this.http.post(`${this.apiUrl}/upload/${entityType}`, formData);
  }

  deleteFile(filePath: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?filePath=${encodeURIComponent(filePath)}`);
  }
}