import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { Subscription, map } from 'rxjs';
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit, OnDestroy {

  ownId:any;
  particularRecord:any;
  mainData:any;
  data: any;
  naviData: any;

  private routeSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
  ) {}

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.ownId = params['id'];
    });
    this.getLocalData();
  }

  getLocalData(){
    let userDetails:any = localStorage.getItem('TotalDetails');
    this.particularRecord = JSON.parse(userDetails);
    if(this.particularRecord){
      this.particularRecord.login.uuid == this.ownId;
      this.mainData = this.particularRecord;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
