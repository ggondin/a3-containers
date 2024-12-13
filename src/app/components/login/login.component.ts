import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  users: { user: string; password: string }[] = [];
  loginError: string = '';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.http
      .get<{ user: string; password: string }[]>('assets/users.json')
      .subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this._snackBar.open('Erro ao carregar usuários:', 'Fechar', {
            duration: 3000,
          });
        }
      );
  }

  login() {
    const { user, password } = this.form.value;

    // Verifica se o usuário existe e a senha está correta
    const foundUser = this.users.find(
      (u) => u.user === user && u.password === password
    );

    if (foundUser) {
      this._snackBar.open('Login bem-sucedido!', '', {
        duration: 3000,
      });
      this.router.navigate(['navigation']);
      this.loginError = ''; // Limpa a mensagem de erro
      // Redirecionar ou realizar outra ação após o login
    } else {
      this._snackBar.open('Credenciais inválidas', '', {
        duration: 3000,
      });
      this.loginError = 'Usuário ou senha inválidos!';
    }
  }
}
