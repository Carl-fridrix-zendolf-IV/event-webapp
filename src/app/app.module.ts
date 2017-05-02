import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main';
import { AboutComponent } from './components/about/about';
import { ConferenceComponent } from './components/conference/conference';
import { ContactsComponent } from './components/contacts/contacts';
import { ExcursionComponent } from './components/excursion/excursion';
import { HotelComponent } from './components/hotel/hotel';
import { MediaComponent } from './components/media/media';
import { PlacesComponent } from './components/places/places';
import { QuestionsComponent } from './components/questions/questions';
import { ScheduleComponent } from './components/schedule/schedule';

import { InitUser, GetSpeakers, InitChat, PutMessage, GetMessages, RegistrateUser } from './services/http';

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'about', component: AboutComponent },
    { path: 'conference', component: ConferenceComponent },
    { path: 'contacts', component: ContactsComponent},
    { path: 'excursion', component: ExcursionComponent },
    { path: 'hotel', component: HotelComponent },
    { path: 'media/:id', component: MediaComponent },
    { path: 'places', component: PlacesComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'schedule/:id', component: ScheduleComponent },
    // { path: 'media/:id', component: MediaComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AboutComponent,
        ConferenceComponent,
        ContactsComponent,
        ExcursionComponent,
        HotelComponent,
        MediaComponent,
        PlacesComponent,
        QuestionsComponent,
        ScheduleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    providers: [
        InitUser,
        GetSpeakers,
        InitChat,
        PutMessage,
        GetMessages,
        RegistrateUser
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
