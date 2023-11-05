import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit, OnDestroy {

  personData:any;
  personId:any;
  ownId:any;
  personDetails:any[] = [];

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.ownId = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
