import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  private minPasswordLength: number = 8;
  private emailPattern = /\S+@\S+\.\S+/;

  constructor(
              private fb: FormBuilder,
              private auth: AuthService,
              private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public onLogin(): void {
    const {email, password} = this.loginForm.value;

    this.toolsService.presentLoading('Verificando datos...', 2000);
    setTimeout(() => {
      this.auth.signIn(email, password);
      this.loginForm.reset();
    }, 2000);

  }

  public loginGoogle(): void {
    this.auth.googleAuth();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]]
    });
  }

}