import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContainerComponent } from './formulario-container.component';

describe('FormularioContainerComponent', () => {
  let component: FormularioContainerComponent;
  let fixture: ComponentFixture<FormularioContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
