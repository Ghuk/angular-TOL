import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes

import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';

const appRoutes: Routes = [
		{path: '', component: InicioComponent},
		{path: 'inicio', component: InicioComponent},
		{path: 'registro', component: RegistroComponent},
		{path: '**', component: RegistroComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);