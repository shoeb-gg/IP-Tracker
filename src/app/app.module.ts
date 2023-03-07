import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchNavComponent } from './components/search-nav/search-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapInterfaceComponent } from './components/map-interface/map-interface.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [AppComponent, SearchNavComponent, MapInterfaceComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // StoreModule.forRoot(reducers),
        // StoreDevtoolsModule.instrument({
        //     maxAge: 25, // Retains last 25 states
        //     logOnly: environment.production, // Restrict extension to log-only mode
        //     autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        //     trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        //     traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        // }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
