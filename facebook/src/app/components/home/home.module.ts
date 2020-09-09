import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";

import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, FormsModule, MatBadgeModule],
})
export class HomeModule {}
