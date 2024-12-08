import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioContainerComponent } from './components/formulario-container/formulario-container.component';
import { FormularioSaidaComponent } from './components/formulario-saida/formulario-saida.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: FormularioContainerComponent },
  { path: 'saida', component: FormularioSaidaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
