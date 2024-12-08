import { CnpjPipe } from './../pipe/cnpjPipe.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexComponent } from '../components/flex/flex.component';

@NgModule({
  declarations: [FlexComponent, CnpjPipe],
  imports: [CommonModule],
  exports: [FlexComponent, CnpjPipe],
})
export class ComponentModule {}
