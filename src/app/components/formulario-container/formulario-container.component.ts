import { ContainerResponse } from './../../interface/default.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContainersService } from '../../services/containers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ApiResponse,
  CreateContainer,
} from 'src/app/interface/default.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-container',
  templateUrl: './formulario-container.component.html',
  styleUrls: ['./formulario-container.component.scss'],
})
export class FormularioContainerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cadastroEntradaForm!: FormGroup;
  loading: boolean = false;
  success: boolean = false;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ContainersService,
    private location: Location
  ) {
    this.form = new FormGroup({
      cnpj: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get cnpjControl() {
    return this.form.get('cnpj');
  }

  applyCnpjMask(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    event.target.value = value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      '$1.$2.$3/$4-$5'
    );
  }

  clearCnpj() {
    this.form.get('cnpj')?.setValue('');
  }

  cnpjValidator(control: AbstractControl): { [key: string]: any } | null {
    const cnpj = control.value?.replace(/\D/g, '');
    if (!cnpj) {
      return null;
    }

    if (cnpj.length !== 14) {
      return { invalidCnpj: true };
    }

    return null;
  }

  enviar() {
    const cnpj = this.cnpjControl?.value.replace(/\D/g, ''); // Limpa o CNPJ para garantir que seja apenas números

    // Chama o método 'access' que vai para a API configurada em '/url'
    this.service
      .access(cnpj)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          const res = JSON.parse(data) as ApiResponse;
          this.success = res.SUCCESS;
          if (res.SUCCESS === true) {
            this.cadastroForm(res.OBJECT.CHAVE);
          }
          console.log(res); // Exibe a resposta para debug
        },
        error: (erro: HttpErrorResponse) => {
          this._snackBar.open('Não foi possível verificar esse CNPJ', 'Erro', {
            duration: 2500,
          });
        },
      });
  }

  cadastroForm(chave: string) {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm');
    this.cadastroEntradaForm = new FormGroup({
      chave: new FormControl(chave, Validators.required),
      tipo: new FormControl('', Validators.required),
      os: new FormControl('', Validators.required),
      armador: new FormControl('', Validators.required),
      data: new FormControl(
        { value: currentDate, disabled: true },
        Validators.required
      ),
      hora: new FormControl(currentTime, Validators.required),
      container: new FormControl('', Validators.required),
      cntrType: new FormControl('', Validators.required),
      depot: new FormControl(
        { value: this.form.get('cnpj')?.value, disabled: true },
        Validators.required
      ),
      deposito: new FormControl('', Validators.required),
      terminal: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
    });
    // {
    //   "CHAVE": "7bbcd96875a71853b7c58ed7fd1b45a5",
    //   "TIPO" : "4",
    //   "OS" : "1119900",
    //   "ARMADOR" : "MSK",
    //   "DATA": "30/10/2020 15:33",
    //   "CONTAINER" : "ZIMU1313760",
    //   "CNTR_TYPE" : "20DRY",
    //   "DEPOT": "04335535000255",
    //   "DEPOSITO" : "BRADO US/T. CAMBE",
    //   "TERMINAL" : "S",
    //   "TAG" : "123456978987987987a9848q94984984wq98e498we4r",
    // }
  }

  anyFieldEmpty(): boolean {
    const controls = this.cadastroEntradaForm.controls;
    for (const control in controls) {
      if (
        controls[control].hasValidator(Validators.required) &&
        !controls[control].value
      ) {
        return true;
      }
    }
    return false;
  }

  buildBody() {
    const data = this.cadastroEntradaForm.get('data')?.value;
    const hora = this.cadastroEntradaForm.get('hora')?.value;
    const dataFormatada = moment(`${data} ${hora}`, 'YYYY-MM-DD HH:mm').format(
      'DD/MM/YYYY HH:mm'
    );
    return {
      CHAVE: this.cadastroEntradaForm.get('chave')?.value,
      TIPO: this.cadastroEntradaForm.get('tipo')?.value,
      OS: this.cadastroEntradaForm.get('os')?.value,
      ARMADOR: this.cadastroEntradaForm.get('armador')?.value,
      DATA: dataFormatada,
      CONTAINER: this.cadastroEntradaForm.get('container')?.value,
      CNTR_TYPE: this.cadastroEntradaForm.get('cntrType')?.value,
      DEPOT: this.cadastroEntradaForm.get('depot')?.value,
      DEPOSITO: this.cadastroEntradaForm.get('deposito')?.value,
      TERMINAL: this.cadastroEntradaForm.get('terminal')?.value,
      TAG: this.cadastroEntradaForm.get('tag')?.value,
    };
  }

  create() {
    console.log(this.buildBody()); // Verificando os dados do corpo
    // Chama o método 'create' que vai para a API configurada em '/url2'
    this.service
      .create(this.buildBody())
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          const res = JSON.parse(data) as CreateContainer;
          console.log(res);
          if (res.SUCCESS) {
            this.setLocalStorage(this.buildBody());
            this._snackBar.open('Container cadastrado com sucesso!', 'Fechar', {
              duration: 2500,
            });
            this.location.back();
          }
          // Aqui você pode manipular a resposta, se necessário
        },
        error: (erro: HttpErrorResponse) => {
          this._snackBar.open('Não foi possível criar o registro', 'Erro', {
            duration: 2500,
          });
        },
      });
  }

  voltar() {
    this.location.back();
  }

  setLocalStorage(body: ContainerResponse) {
    const nome = body.ARMADOR;

    // Recupera o objeto existente no localStorage, se existir
    const existingData = localStorage.getItem(nome);
    const existingObj = existingData ? JSON.parse(existingData) : {};

    // Cria o novo objeto a ser adicionado
    const newObj = {
      CHAVE: body.CHAVE,
      TIPO: '14',
      OS: body.TAG,
      ARMADOR: body.ARMADOR,
      DATA: body.DATA,
      CONTAINER: body.CONTAINER,
      DEPOT: body.DEPOT,
      DEPOSITO: body.DEPOSITO,
      TERMINAL: body.TERMINAL,
    };

    // Mescla o objeto existente com o novo (se for uma lista, pode concatenar)
    const updatedObj = {
      ...existingObj, // Mantém os dados existentes
      [body.CHAVE]: newObj, // Adiciona o novo objeto como uma propriedade com a chave `CHAVE`
    };

    // Salva o objeto atualizado no localStorage
    localStorage.setItem(nome, JSON.stringify(updatedObj));
  }
}

// {
//   CHAVE": "97106f1896dc3629df75de2c9a9fbf97",
//   "TIPO": 4,
//   "OS": "1119900",
//   "ARMADOR": "MSK",
//   "DATA": "05/12/2024 20:24",
//   "CONTAINER": "ZIMU1313760",
//   "CNTR_TYPE": "20DRY",
//   "DEPOT": "04335535000255",
//   "DEPOSITO": "BRADO US/T. CAMBE",
//   "TERMINAL": "S",
//   "TAG": "123456978987987987a9848q94984984wq98e498we4r"
// }
