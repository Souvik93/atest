import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { MyNewServiceService } from './my-new-service.service';
import { GaugeModule } from 'ng2-gauge';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    BodyComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GaugeModule
   //  AgmCoreModule.forRoot({
   //   apiKey: 'AIzaSyCaAUvKje41x1vN_mQN6dFzO1zB2kiTskI'
   // })
  ],
  providers: [MyNewServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
