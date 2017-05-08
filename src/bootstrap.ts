import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/app.module";

if (process.env.ENV === "production") {
  enableProdMode();

  // Send message to reverse engineers
  console.log.apply(console, [
    "%c👌 %cHaha, made you look! Stop trying to reverse engineer our app.",
    "font-size: 48px; font-family: Helvetica, sans-serif; line-height: 1;",
    "font-size: 24px; font-family: Helvetica, sans-serif; line-height: 2;"
  ]);
}

platformBrowserDynamic().bootstrapModule(AppModule);
