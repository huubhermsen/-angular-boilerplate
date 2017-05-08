import { NgModule } from "@angular/core";

import { LazyComponent } from "./lazy.component";
import { LazyRoutingModule } from "./lazy.routing";

@NgModule({
  imports: [
    LazyRoutingModule
  ],
  declarations: [
    LazyComponent
  ]
})
export class LazyModule {}
