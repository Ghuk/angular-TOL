import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule }    from '@angular/http';

//Services
import { TolService} from './services/tol.service';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuth} from 'angularfire2/auth'

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [appRoutingProviders, TolService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
