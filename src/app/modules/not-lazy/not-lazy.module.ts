import { NgModule } from "@angular/core";

import { NotLazyComponent } from "./not-lazy.component";
import { NotLazyRoutingModule } from "./not-lazy.routing";

@NgModule({
  imports: [
    NotLazyRoutingModule
  ],
  declarations: [
    NotLazyComponent
  ]
})
export class NotLazyModule {}
