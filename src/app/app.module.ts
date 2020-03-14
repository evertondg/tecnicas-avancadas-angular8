import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { FilmesModule } from './filmes/filmes.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';

import { AlertaComponent } from './shared/components/alerta/alerta.component';
import { AppComponent } from './app.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { TopoComponent } from './shared/components/topo/topo.component';

@NgModule({
  declarations: [AppComponent, TopoComponent, RodapeComponent, AlertaComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FilmesModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
  ],
  entryComponents: [AlertaComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
