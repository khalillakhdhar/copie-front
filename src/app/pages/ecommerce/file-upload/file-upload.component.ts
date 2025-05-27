import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFile?: File;
  imageUrl?: string;

  constructor(private uploadService: FileUploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (this.selectedFile) {
      this.uploadService.uploadImage(this.selectedFile, 'products').subscribe({
        next: (res: any) => {
          if (res.success && res.filePath) {
            this.imageUrl = `http://localhost:8080/api/files/${res.filePath}`;
          }
        },
        error: (err) => console.error('Upload error', err)
      });
    }
  }
}