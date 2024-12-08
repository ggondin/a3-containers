import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSaidaComponent } from './formulario-saida.component';

describe('FormularioSaidaComponent', () => {
  let component: FormularioSaidaComponent;
  let fixture: ComponentFixture<FormularioSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioSaidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
