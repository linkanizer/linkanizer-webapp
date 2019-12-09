import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { MagicLoginPageComponent } from './magic-login-page/magic-login-page.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorService } from './services/error.interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListsMasterComponent } from './dashboard-page/lists-master/lists-master.component';
import { ListsDetailComponent } from './dashboard-page/lists-detail/lists-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexPageComponent,
    DashboardPageComponent,
    AboutPageComponent,
    MagicLoginPageComponent,
    ListsMasterComponent,
    ListsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
