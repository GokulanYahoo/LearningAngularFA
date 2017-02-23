import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { routing } from './app.routing';
import { CommunicatorService } from './service/communication/communicator.service';
import { SListDetailsService } from './service/slistdetails.service';
// import { HttpCommunicationClient } from './service/communication/httpcommunicationclient.service';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ApiService } from './shared/api.service';
import { SListDetailsComponent } from './components/home/slistdetails.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
              AppComponent, HomeComponent,
    AboutComponent, ContactComponent, LoginComponent, SListDetailsComponent
    ],
    providers: [
        ApiService,
        CommunicatorService,
        SListDetailsService
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
