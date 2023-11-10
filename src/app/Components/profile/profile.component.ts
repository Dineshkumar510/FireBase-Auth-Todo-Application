import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { ToastserviceService } from '../../toastservice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('scrollTrigger') scrollTrigger: ElementRef;

  items: any[] = [];
  itemsPerPage = 10;
  data: any[] = [];
  LikeBtn:any;
  assignedValue:any;
  config: any;
  mainData:any;
  searchTerm:any;
  searchCriteria: any = {
    gender: '',
    nat: ''
  };
  userId:any;
  resultData: any[] = [];
  filteredStatus:any;
  loading: boolean = false;


  constructor(
    private ProfileService: ProfileService,
    private http: HttpClient,
    private toast: ToastserviceService,
    private router: Router,
    private route: ActivatedRoute
  )
  {
    this.config = {
      currentPage: 1,
      itemsPerPage: 8
    };

    this.route.queryParamMap
    .pipe(
      map((params: any) => params.get('page'))
    )
    .subscribe((page: any) => (this.config.currentPage = page))
  }

  ngOnInit(): void {
    this.loadMoreResults();
  }

  loadMoreResults() {
    this.loading = true;
    this.ProfileService.getMoreResults({ results: 100 }).subscribe(
      (data: any) => {
        console.log(data);
      //this.resultData = data.results;
      this.assignedValue = data;
    });
    this.loading = true;
  }

  storeData(data:any){
    localStorage.setItem('TotalDetails', JSON.stringify(data));
    let Details:any = localStorage.getItem('TotalDetails');
    this.mainData = JSON.parse(Details);
   if(this.mainData){
    this.userId = this.mainData.login?.uuid;
   }
  }

   CopyText(){
    var copyText = document.getElementById("myInput") as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
   }

   shareBtn(){
    this.toast.openInfo();
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`profile/PersonDetails/${this.userId}`], { queryParams: { jwt: '123'}}));
      window.open(url, '_blank');
   }

   PostLikeBtn(event:any){
    if(event){
      this.LikeBtn = event;
      console.log(this.LikeBtn);
    }
   }

   pageChange(newPage: number){
    this.router.navigate([""], { queryParams: { page: newPage } });
  }

}
