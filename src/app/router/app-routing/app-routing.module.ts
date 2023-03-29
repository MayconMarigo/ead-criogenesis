import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuardService } from 'src/app/guard/auth-admin-guard.service';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { MudancaPendenteGuardGuard } from 'src/app/mudanca-pendente-guard.guard';
import { AdminComponent } from 'src/app/view/page/admin/admin.component';
import { AlunoInformacaoComponent } from 'src/app/view/page/aluno-informacao/aluno-informacao.component';
import { CertificadoComponent } from 'src/app/view/page/aluno-informacao/certificado/certificado.component';
import { CursosComponent } from 'src/app/view/page/aluno-informacao/cursos/cursos.component';
import { DadosCadastraisComponent } from 'src/app/view/page/aluno-informacao/dados-cadastrais/dados-cadastrais.component';
import { DadosDepositoComponent } from 'src/app/view/page/aluno-informacao/dados-deposito/dados-deposito.component';
import { DocumentoStatusComponent } from 'src/app/view/page/aluno-informacao/documento/documento-status/documento-status.component';
import { DocumentoUploadComponent } from 'src/app/view/page/aluno-informacao/documento/documento-upload/documento-upload.component';
import { DocumentoComponent } from 'src/app/view/page/aluno-informacao/documento/documento.component';
import { AvaliacaoComponent } from 'src/app/view/page/avaliacao/avaliacao.component';
import { CursoAtivoDetalheComponent } from 'src/app/view/page/curso-ativo-detalhe/curso-ativo-detalhe.component';
import { CursoDetalheComponent } from 'src/app/view/page/curso-detalhe/curso-detalhe.component';
import { CursosAtivosComponent } from 'src/app/view/page/cursos-ativos/cursos-ativos.component';
import { DashboardComponent } from 'src/app/view/page/dashboard/dashboard.component';
import { DocumentosContratuaisComponent } from 'src/app/view/page/documentos-contratuais/documentos-contratuais.component';
import { DocumentosPendentesDetalheComponent } from 'src/app/view/page/documentos-pendentes-detalhe/documentos-pendentes-detalhe.component';
import { DocumentosPendentesComponent } from 'src/app/view/page/documentos-pendentes/documentos-pendentes.component';
import { EditarCursoComponent } from 'src/app/view/page/editar-curso/editar-curso.component';
import { GerenciarAdministradorComponent } from 'src/app/view/page/gerenciar-administrador/gerenciar-administrador.component';
import { GerenciarAlunoComponent } from 'src/app/view/page/gerenciar-aluno/gerenciar-aluno.component';
import { GerenciarCursoComponent } from 'src/app/view/page/gerenciar-curso/gerenciar-curso.component';
import { GerenciarProfessorComponent } from 'src/app/view/page/gerenciar-professor/gerenciar-professor.component';
import { GerenciarUsuariosComponent } from 'src/app/view/page/gerenciar-usuarios/gerenciar-usuarios.component';
import { InicioComponent } from 'src/app/view/page/inicio/inicio.component';
import { IntroducaoComponent } from 'src/app/view/page/introducao/introducao.component';
import { LoginAdminComponent } from 'src/app/view/page/login-admin/login-admin.component';
import { LoginAcessoComponent } from 'src/app/view/page/login/login-acesso/login-acesso.component';
import { LoginCadastroComponent } from 'src/app/view/page/login/login-cadastro/login-cadastro.component';
import { LoginComponent } from 'src/app/view/page/login/login.component';
import { MarketingControllerComponent } from 'src/app/view/page/marketing-controller/marketing-controller.component';
import { MarketingListComponent } from 'src/app/view/page/marketing-list/marketing-list.component';
import { MarketingComponent } from 'src/app/view/page/marketing/marketing.component';
import { ResetPasswordComponent } from 'src/app/view/page/reset-senha/reset-senha.component';
import { NovoCursoComponent } from 'src/app/view/page/novo-curso/novo-curso.component';
import { ReceberEmailUsuarioComponent } from 'src/app/view/page/receber-email-usuario/receber-email-usuario.component';
import { TodosUsuariosComponent } from 'src/app/view/page/todos-usuarios/todos-usuarios.component';
import { UsuarioPendentesComponent } from 'src/app/view/page/usuario-pendentes/usuario-pendentes.component';

const routes: Routes = [
  {
    path: 'aluno',
    component: AlunoInformacaoComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'cadastro',
        component: DadosCadastraisComponent,
      },
      {
        path: 'declaracao-participacao',
        component: CertificadoComponent,
      },
      {
        path: 'deposito',
        component: DadosDepositoComponent,
      },
      {
        path: 'documentos-contratuais',
        component: DocumentosContratuaisComponent,
      },
      {
        path: 'marketing',
        component: MarketingListComponent,
      },
      {
        path: 'meus-cursos',
        component: CursosComponent,
      },
      {
        path: 'documento',
        component: DocumentoComponent,
      },
      {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'curso/:id',
    component: CursoDetalheComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'curso/:courseId/avaliacao/:testId',
    component: AvaliacaoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'curso/:courseId/introducao/:testId',
    component: IntroducaoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: InicioComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginAcessoComponent,
      },
      {
        path: 'cadastro',
        component: LoginCadastroComponent,
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginAdminComponent,
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthAdminGuardService],
    children: [
      {
        path: 'gerenciar',
        component: GerenciarUsuariosComponent,
      },
      {
        path: 'gerenciar/alunos',
        component: GerenciarAlunoComponent,
      },
      {
        path: 'gerenciar/professores',
        component: GerenciarProfessorComponent,
      },
      {
        path: 'gerenciar/administradores',
        component: GerenciarAdministradorComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'usuarios',
        component: TodosUsuariosComponent,
      },
      {
        path: 'usuarios/email',
        component: ReceberEmailUsuarioComponent,
      },
      {
        path: 'pendente/usuario',
        component: UsuarioPendentesComponent,
      },
      {
        path: 'pendente/documento',
        component: DocumentosPendentesComponent,
      },
      {
        path: 'pendente/documento/:id',
        component: DocumentosPendentesDetalheComponent,
      },
      {
        path: 'gerenciar/curso',
        component: GerenciarCursoComponent,
      },
      {
        path: 'gerenciar/curso/novo',
        component: NovoCursoComponent,
      },
      {
        path: 'gerenciar/curso/todos',
        component: CursosAtivosComponent,
      },
      {
        path: 'gerenciar/curso/todos/:id',
        component: CursoAtivoDetalheComponent,
      },
      {
        path: 'gerenciar/curso/todos/:id/editar',
        component: EditarCursoComponent,
        canDeactivate: [MudancaPendenteGuardGuard],
      },
      {
        path: 'documentos-contratuais',
        component: DocumentosContratuaisComponent,
      },
      {
        path: 'marketing/set',
        component: MarketingComponent,
      },
      {
        path: 'marketing/set/:id',
        component: MarketingComponent,
      },
      {
        path: 'marketing',
        component: MarketingControllerComponent,
      },
      {
        path: 'marketing/listar',
        component: MarketingListComponent,
      },
      {
        path: 'reset-senha',
        component: ResetPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin/gerenciar/curso/todos/:courseId/editar/visualizar-avaliacao/:testId',
    component: AvaliacaoComponent,
    canActivate: [AuthAdminGuardService],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
