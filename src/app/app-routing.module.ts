import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: 'day/:date',
    component: DayComponent,
  },
  {
    path: 'event/edit/:id',
    component: EventEditComponent,
  },
  {
    path: 'event/add',
    component: EventAddComponent,
  },
  {
    path: 'events',
    component: EventListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
