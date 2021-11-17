import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public formularioResetPassword: FormGroup;
  private emailPattern = /\S+@\S+\.\S+/;

  userEmail = new FormControl('');
  constructor(
    private auth: AuthService,
    private router: Router,
    private fl: FormBuilder,
    private toolsService: ToolsService
  ) {
    this.formularioResetPassword = this.fl.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]    
    })
   }

  ngOnInit() {
  }


  async onReset(){
    const { email } = this.formularioResetPassword.value;
    await this.auth.resetPassword(email).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
