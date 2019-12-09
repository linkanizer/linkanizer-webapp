import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-magic-login-page',
  templateUrl: './magic-login-page.component.html',
  styleUrls: ['./magic-login-page.component.css']
})
export class MagicLoginPageComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const token = this.route.snapshot.root.paramMap.get('token');

    // TODO check if token is valid

    this.authService.login(token);
    this.router.navigate(['/dashboard']);
  }

}
