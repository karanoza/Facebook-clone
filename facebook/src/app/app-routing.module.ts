import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { FacebookGuard } from "./guards/facebook.guard";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  {
    path: "",
    // loadChildren: () =>
    //   import("./components/home/home.module").then((m) => m.HomeModule),
    component: HomeComponent,
    canActivate: [FacebookGuard],
  },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
