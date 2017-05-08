import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import "./default.scss";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

import { NotLazyModule } from "@app/modules";

@NgModule({
    imports: [
      BrowserModule,
      AppRoutingModule,
      NotLazyModule
    ],
    declarations: [
      AppComponent
    ],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule {}
