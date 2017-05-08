import { Component } from "@angular/core";

import { cube } from "./maths";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.pug",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {
    console.log(cube(5));
  }
}
