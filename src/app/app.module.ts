import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './services/event/event.service';
import { DayComponent } from './day/day.component';
import { DayEventComponent } from './day-event/day-event.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventListComponent } from './event-list/event-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EventModComponent } from './event-mod/event-mod.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    DayComponent,
    DayEventComponent,
    EventEditComponent,
    EventAddComponent,
    EventListComponent,
    NavbarComponent,
    FooterComponent,
    EventModComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
