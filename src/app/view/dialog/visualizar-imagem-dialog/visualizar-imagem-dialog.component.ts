import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'visualizar-imagem-dialog',
  templateUrl: './visualizar-imagem-dialog.component.html',
  styleUrls: ['./visualizar-imagem-dialog.component.css']
})
export class VisualizarImagemDialogComponent implements OnInit {
  imgSrc:string = '';
  imgError:boolean = false;
  timer:number = 10;
  timerSet = setInterval(()=>{
    this.timer--;
    if(this.timer == 0){
      this.dialogRef.close(this.imgError);
    }
  }, 1000)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef:MatDialogRef<VisualizarImagemDialogComponent>) { }

  ngOnInit(): void {
    this.imgSrc = this.data.src;
  }

  iniciarTimer(){
    this.timerSet;
  }

}
