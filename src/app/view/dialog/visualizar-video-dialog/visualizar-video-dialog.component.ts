import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMediaElement } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'visualizar-video-dialog',
  templateUrl: './visualizar-video-dialog.component.html',
  styleUrls: ['./visualizar-video-dialog.component.css']
})
export class VisualizarVideoDialogComponent implements OnInit {
  videoSrc: string = '';
  error:boolean = false;

  constructor(private dialogRef:MatDialogRef<VisualizarVideoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.videoSrc = this.data.src;
  }

  fecharDialog(){
    this.dialogRef.close();
  }
  onVideoError(e:any){
  }
}
