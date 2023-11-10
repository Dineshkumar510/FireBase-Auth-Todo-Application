import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './auth/auth.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import {AngularFireModule} from '@angular/fire/compat';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './Components/profile/profile.component';
import {ProfileService} from './Components/profile/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {NgToastModule} from 'ng-angular-popup';
import { ToastserviceService } from '../app/toastservice.service';
import { MainProfileComponent } from './Components/main-profile/main-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PhoneformatPipe } from './pipes/phoneformat.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AuthComponent,
    RegisterComponent,
    NotfoundComponent,
    ProfileComponent,
    FilterPipe,
    SearchfilterPipe,
    MainProfileComponent,
    PhoneformatPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgToastModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [ProfileService, AuthGuard, ToastserviceService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
