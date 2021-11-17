import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ToolsService } from '../../services/tools.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profileForm: FormGroup;
  public showForm: boolean = false;
  private emailPattern = /\S+@\S+\.\S+/;
  private phonePattern: string = '[0-9]{9}';
  private namePattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              private toolsService: ToolsService,
              private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  public onUpdate(): void {
    const updatedUser: User = this.profileForm.value; 
    this.toolsService.presentLoading('Actualizando datos...');

    setTimeout( () => {
      this.storageService.getItemFromStorage<string>('uid').then(uid => {
        this.userService.updateUserData(updatedUser, uid);
      })
    }, 2000);

  }

  private getUserData() {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      this.userService.getUserByUid(uid).subscribe(data => {
        this.showForm = true;
        this.initForm(data); // Se inicializa el formulario dado que en este caso no es necesario guardar la data del usuario en una variable.
      });
    });
  }

  private initForm(user: User): void {
    this.profileForm = this.fb.group({
      name: [user.name, [Validators.required, Validators.pattern(this.namePattern)]],
      lastname: [user.lastname, [Validators.required, Validators.pattern(this.namePattern)]],
      email: [user.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [user.phone, [Validators.required, Validators.pattern(this.phonePattern)]],
    });
  }

}
