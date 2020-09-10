import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  subs: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {}
  login(form: NgForm): void {
    const { email, password } = form.value;

    if (!form.valid) {
      return;
    }
    this.authService.SignIn(email, password);
    form.resetForm();
  }

  openRegister(): void {
    console.log();
  }
}
