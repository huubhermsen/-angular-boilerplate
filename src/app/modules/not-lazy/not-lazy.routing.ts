import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotLazyComponent } from "./not-lazy.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: NotLazyComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotLazyRoutingModule {}
