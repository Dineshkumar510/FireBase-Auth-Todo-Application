import { Injectable, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService implements OnInit {

  constructor(private toast: NgToastService) {}

  ngOnInit(){
  }

  openWarning(){
    this.toast.warning({
      detail: '',
      summary: '',
      duration: 2000,
      position:"topRight",
      sticky:true,
    })
  };

  openSuccess(){
    this.toast.success(
      {
      detail:"SUCCESS",
      summary:'Profile Url Copied',
      sticky:true,
      position: 'topRight'
    }
  );
};

  openError(errorMsg: any){
    this.toast.error({
      detail: errorMsg,
      summary: 'Something Went wrong',
      duration: 2000,
      position:"topRight",
      sticky:true,
    })
  };

  openInfo(){
    this.toast.info(
      {
      detail:"Copied to clipboard",
      summary:'Profile url copied to clipboard',
      sticky:true,
      position: 'topRight'
    }
  );
  };


}
