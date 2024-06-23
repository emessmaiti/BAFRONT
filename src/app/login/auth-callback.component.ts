import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Authenticating...</p>`
})
export class AuthCallbackComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        console.log('Token is valid in AuthCallbackComponent. Redirecting to dashboard...');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('No valid token found in AuthCallbackComponent. Redirecting to login...');
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error during token validation', error);
      this.router.navigate(['/login']);
    });
  }
}
