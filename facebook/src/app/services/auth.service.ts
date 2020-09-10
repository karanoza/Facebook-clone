import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from "rxjs";
import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userData: Observable<firebase.User>;

  private currentUser: UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this._userData = afAuth.authState;

    this._userData.subscribe((user) => {
      if (user) {
        this.afs
          .collection<UserData>("users")
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe((currentUser) => {
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
      }
    });
  }

  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }

  // Sign Up New User
  SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar = "https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png"
  ): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          this.afs
            .collection("users")
            .doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar,
            })
            .then((value) => {
              this.afs
                .collection<UserData>("users")
                .doc<UserData>(res.user.uid)
                .valueChanges()
                .subscribe((user) => {
                  console.log(user);
                  if (user) {
                    // this.currentUser = user;
                    this.currentUser$.next(user);
                  }
                });
            });
        }
      })
      .catch((err) => console.log(`Something went wrong ${err.message}`));
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  // Sign In method
  SignIn(email: string, password: string): void {
    console.log(email, password);

    this.afAuth
      .signInWithEmailAndPassword(email, password) //all methods from angular fire & it's Communicating with fire backend
      .then((res) => {
        console.log(res);
        this._userData = this.afAuth.authState;

        this.afs
          .collection<UserData>("users")
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            // @ts-ignore
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
          });
      })
      .catch((err) => console.log(err.message));
  }

  // Logout method
  Logout(): void {
    this.afAuth.signOut().then((res) => {
      console.log(res);
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl("/login").then();
    });
  }

  // search user
  searchUserInDatabase(user_id: string): Observable<UserData> {
    return this.afs
      .collection<UserData>("users")
      .doc<UserData>(user_id)
      .valueChanges();
  }
}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}
