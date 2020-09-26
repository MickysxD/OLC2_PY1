import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaComponent } from './pagina/pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
