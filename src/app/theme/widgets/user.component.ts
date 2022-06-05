import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService, User } from '@core/authentication';

@Component({
  selector: 'app-user',
  template: `
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <!-- <img class="matero-avatar" [src]="user.avatar" width="32" alt="avatar" /> -->
      <div *ngIf="user && user.user_metadata" class="matero-avatar">
        <small>
          {{user.user_metadata.username[0] +user.user_metadata.username[1] +user.user_metadata.username[2]}}
        </small>
      </div>
      <span *ngIf="user && user.user_metadata" class="matero-username" fxHide.lt-sm>{{ user.user_metadata.username }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {
  user!: any;

  constructor(private router: Router, private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap((user: any) => (this.user = user)),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
