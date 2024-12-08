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
  ContainerSaidaBody,
  CreateContainer,
  ValidatorTag,
} from 'src/app/interface/default.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-saida',
  templateUrl: './formulario-saida.component.html',
  styleUrls: ['./formulario-saida.component.scss'],
})
export class FormularioSaidaComponent implements OnInit {
  form: FormGroup;
  saidaEntradaForm!: FormGroup;
  loading: boolean = false;
  success: boolean = false;
  ngUnsubscribe = new Subject<void>();
  containerLocal: ContainerSaidaBody[] = [];
  body!: ContainerSaidaBody;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ContainersService,
    private location: Location
  ) {
    this.form = new FormGroup({
      tag: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.containerLocal = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== 'token' && key !== 'access_token') {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          if (this.isValidJSON(storedData)) {
            const parsedData = JSON.parse(storedData);
            this.containerLocal = [
              ...this.containerLocal,
              ...(Object.values(parsedData) as ContainerSaidaBody[]),
            ];
          }
        }
      }
    }
    console.log('Dados carregados:', this.containerLocal);
  }

  isValidJSON(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

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

  exit() {
    const body = this.buildBody();
    console.log('body liberado', body);
    const tag = {
      TAG: body.OS,
      DEPOT: body.DEPOT,
      CHAVE: body.CHAVE,
    };
    this.validateTag(tag);
    // this.service
    //   .exit(body)
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe({
    //     next: (data: any) => {
    //       const res = JSON.parse(data) as ApiResponse;
    //       this.success = res.SUCCESS;
    //       if (res.SUCCESS === true) {

    //         console.log('sucesso', res);
    //         // this.validateTag(tag);
    //       }
    //       console.log(res);
    //     },
    //     error: (erro: HttpErrorResponse) => {
    //       this._snackBar.open('Não foi possível verificar esse CNPJ', 'Erro', {
    //         duration: 2500,
    //       });
    //     },
    //   });
  }

  validateTag(body: ValidatorTag) {
    this.service
      .liberationTag(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          const res = JSON.parse(data) as ApiResponse;
          this.success = res.SUCCESS;
          if (res.SUCCESS === true) {
            this._snackBar.open('Container liberado com sucesso!', 'Fechar', {
              duration: 2500,
            });
            this.location.back();
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

  buildBody() {
    const data = moment().format('DD/MM/YYYY');
    const hora = moment().format('HH:mm');
    const dataFormatada = moment(`${data} ${hora}`, 'DD/MM/YYYY HH:mm').format(
      'DD/MM/YYYY HH:mm'
    );
    console.log('dataFormatada', dataFormatada);
    return {
      CHAVE: this.saidaEntradaForm.get('chave')?.value,
      TIPO: this.saidaEntradaForm.get('tipo')?.value,
      OS: this.saidaEntradaForm.get('os')?.value,
      ARMADOR: this.saidaEntradaForm.get('armador')?.value,
      DATA: dataFormatada,
      CONTAINER: this.saidaEntradaForm.get('container')?.value,
      DEPOT: this.saidaEntradaForm.get('depot')?.value,
      DEPOSITO: this.saidaEntradaForm.get('deposito')?.value,
      TERMINAL: this.saidaEntradaForm.get('terminal')?.value,
    };
  }

  buildPayloadForm(body: ContainerSaidaBody) {
    // const body = this.getLocalStorage(this.form.get('tag')?.value);
    const currentDate = moment().format('DD/MM/YYYY');
    const currentTime = moment().format('HH:mm');
    this.saidaEntradaForm = new FormGroup({
      chave: new FormControl(
        { value: body.CHAVE, disabled: true },
        Validators.required
      ),
      tipo: new FormControl(
        { value: body.TIPO, disabled: true },
        Validators.required
      ),
      os: new FormControl(
        { value: body.OS, disabled: true },
        Validators.required
      ),
      armador: new FormControl(
        { value: body.ARMADOR, disabled: true },
        Validators.required
      ),
      data: new FormControl(
        { value: currentDate, disabled: true },
        Validators.required
      ),

      hora: new FormControl(currentTime, Validators.required),
      container: new FormControl(
        { value: body.CONTAINER, disabled: true },
        Validators.required
      ),
      depot: new FormControl(
        { value: body.DEPOT, disabled: true },
        Validators.required
      ),
      deposito: new FormControl(
        { value: body.DEPOSITO, disabled: true },
        Validators.required
      ),
      terminal: new FormControl(
        { value: body.TERMINAL, disabled: true },
        Validators.required
      ),
    });
  }

  anyFieldEmpty(): boolean {
    const controls = this.saidaEntradaForm.controls;
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

  voltar() {
    this.location.back();
  }

  onSelectionChange(event: any): void {
    this.success = true;
    const body = this.containerLocal.find(
      (certo: ContainerSaidaBody) => certo.OS === event.value
    );
    console.log('Valor selecionado:', event.value);
    console.log('Valor body:', body);
    if (body) {
      this.body = body;
      this.buildPayloadForm(body);
    }
  }
}
