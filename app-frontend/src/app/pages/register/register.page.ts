/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public formularioRegister: FormGroup;
  private emailPattern = /\S+@\S+\.\S+/;
  private phonePattern: string = '[0-9]{9}';

  constructor(
              private fl: FormBuilder,
              private authService: AuthService,
              private toolsService: ToolsService
  ) {

    this.formularioRegister = this.fl.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]      
    })
   }

  ngOnInit() {
  }

  public onRegister(): void {
    const newUser: User = this.cleanValuesFromInput();
    
    this.toolsService.presentLoading('Registrando cuenta...');
    setTimeout(() => {
      this.authService.signUp(newUser);
    }, 2000);
    
  }

  private cleanValuesFromInput(): User {
    const newUser: User = this.formularioRegister.value;

    newUser.name = newUser.name.toLowerCase();
    newUser.email = newUser.email.toLowerCase();
    newUser.lastname = newUser.lastname.toLowerCase();

    newUser.name = newUser.name.trim();
    newUser.email = newUser.email.trim();
    newUser.lastname = newUser.lastname.trim();
    newUser.password = newUser.password.trim();
    
    return newUser;
  }

}
