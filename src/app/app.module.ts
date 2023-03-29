import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './router/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlunoInformacaoComponent } from './view/page/aluno-informacao/aluno-informacao.component';
import { DocumentoComponent } from './view/page/aluno-informacao/documento/documento.component';
import { DadosDepositoComponent } from './view/page/aluno-informacao/dados-deposito/dados-deposito.component';
import { CursosComponent } from './view/page/aluno-informacao/cursos/cursos.component';
import { CertificadoComponent } from './view/page/aluno-informacao/certificado/certificado.component';
import { DadosCadastraisComponent } from './view/page/aluno-informacao/dados-cadastrais/dados-cadastrais.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { DoisCharactersPipe } from './filter/dois-characters.pipe';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { InputFormTextComponent } from './component/form/input-form-text/input-form-text.component';
import { InputFormSelectComponent } from './component/form/input-form-select/input-form-select.component';
import { InputFormCheckboxComponent } from './component/form/input-form-checkbox/input-form-checkbox.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DocumentoStatusComponent } from './view/page/aluno-informacao/documento/documento-status/documento-status.component';
import { DocumentoUploadComponent } from './view/page/aluno-informacao/documento/documento-upload/documento-upload.component';
import { LoginComponent } from './view/page/login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { LoginAcessoComponent } from './view/page/login/login-acesso/login-acesso.component';
import { LoginCadastroComponent } from './view/page/login/login-cadastro/login-cadastro.component';
import { InicioComponent } from './view/page/inicio/inicio.component';
import { CursoDetalheComponent } from './view/page/curso-detalhe/curso-detalhe.component';
import { AvaliacaoComponent } from './view/page/avaliacao/avaliacao.component';
import { AdminComponent } from './view/page/admin/admin.component';
import { GerenciarUsuariosComponent } from './view/page/gerenciar-usuarios/gerenciar-usuarios.component';
import { DashboardComponent } from './view/page/dashboard/dashboard.component';
import { UsuarioPendentesComponent } from './view/page/usuario-pendentes/usuario-pendentes.component';
import { DocumentosPendentesComponent } from './view/page/documentos-pendentes/documentos-pendentes.component';
import { GerenciarCursoComponent } from './view/page/gerenciar-curso/gerenciar-curso.component';
import { MarketingComponent } from './view/page/marketing/marketing.component';
import { GerenciarAlunoComponent } from './view/page/gerenciar-aluno/gerenciar-aluno.component';
import { GerenciarProfessorComponent } from './view/page/gerenciar-professor/gerenciar-professor.component';
import { GerenciarAdministradorComponent } from './view/page/gerenciar-administrador/gerenciar-administrador.component';
import { DocumentosPendentesDetalheComponent } from './view/page/documentos-pendentes-detalhe/documentos-pendentes-detalhe.component';
import { JustificativaDialogComponent } from './view/dialog/justificativa-dialog/justificativa-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NovoCursoComponent } from './view/page/novo-curso/novo-curso.component';
import { CursosAtivosComponent } from './view/page/cursos-ativos/cursos-ativos.component';
import { CursoAtivoDetalheComponent } from './view/page/curso-ativo-detalhe/curso-ativo-detalhe.component';
import { NovoAvaliacaoDialogComponent } from './view/dialog/novo-avaliacao-dialog/novo-avaliacao-dialog.component';
import { InputFormRadioComponent } from './component/input-form-radio/input-form-radio.component';
import { VisualizarVideoDialogComponent } from './view/dialog/visualizar-video-dialog/visualizar-video-dialog.component';
import { VisualizarPdfDialogComponent } from './view/dialog/visualizar-pdf-dialog/visualizar-pdf-dialog.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { GenericoDialogComponent } from './view/dialog/generico-dialog/generico-dialog.component';
import { IntroducaoComponent } from './view/page/introducao/introducao.component';
import { AvaliacaoRespostaDialogComponent } from './view/dialog/avaliacao-resposta-dialog/avaliacao-resposta-dialog.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoginAdminComponent } from './view/page/login-admin/login-admin.component';
import { TodosUsuariosComponent } from './view/page/todos-usuarios/todos-usuarios.component';
import { EditarCursoComponent } from './view/page/editar-curso/editar-curso.component';
import { VisualizarImagemDialogComponent } from './view/dialog/visualizar-imagem-dialog/visualizar-imagem-dialog.component';
import { AuthAdminGuardService } from './guard/auth-admin-guard.service';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { RecuperarSenhaDialogComponent } from './view/dialog/recuperar-senha-dialog/recuperar-senha-dialog.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MarketingListComponent } from './view/page/marketing-list/marketing-list.component';
import { MarketingControllerComponent } from './view/page/marketing-controller/marketing-controller.component';
import { MudancaPendenteGuardGuard } from './mudanca-pendente-guard.guard';
import { PontuacaoComponent } from './component/pontuacao/pontuacao.component';
import { NgChartsModule } from 'ng2-charts';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DocumentosContratuaisComponent } from './view/page/documentos-contratuais/documentos-contratuais.component';
import { DocumentosContratuaisDialogComponent } from './view/dialog/documentos-contratuais-dialog/documentos-contratuais-dialog.component';
import { ReceberEmailUsuarioComponent } from './view/page/receber-email-usuario/receber-email-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunoInformacaoComponent,
    DocumentoComponent,
    DadosDepositoComponent,
    CursosComponent,
    CertificadoComponent,
    DadosCadastraisComponent,
    HeaderComponent,
    FooterComponent,
    DoisCharactersPipe,
    InputTextComponent,
    InputFormTextComponent,
    InputFormSelectComponent,
    InputFormCheckboxComponent,
    DocumentoStatusComponent,
    DocumentoUploadComponent,
    LoginComponent,
    LoginCadastroComponent,
    LoginAcessoComponent,
    InicioComponent,
    CursoDetalheComponent,
    AvaliacaoComponent,
    AdminComponent,
    GerenciarUsuariosComponent,
    DashboardComponent,
    UsuarioPendentesComponent,
    DocumentosPendentesComponent,
    GerenciarCursoComponent,
    MarketingComponent,
    GerenciarAlunoComponent,
    GerenciarProfessorComponent,
    GerenciarAdministradorComponent,
    DocumentosPendentesDetalheComponent,
    JustificativaDialogComponent,
    NovoCursoComponent,
    CursosAtivosComponent,
    CursoAtivoDetalheComponent,
    NovoAvaliacaoDialogComponent,
    InputFormRadioComponent,
    VisualizarVideoDialogComponent,
    VisualizarPdfDialogComponent,
    GenericoDialogComponent,
    IntroducaoComponent,
    AvaliacaoRespostaDialogComponent,
    LoginAdminComponent,
    TodosUsuariosComponent,
    EditarCursoComponent,
    VisualizarImagemDialogComponent,
    RecuperarSenhaDialogComponent,
    MarketingListComponent,
    MarketingControllerComponent,
    PontuacaoComponent,
    DocumentosContratuaisComponent,
    DocumentosContratuaisDialogComponent,
    ReceberEmailUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatRadioModule,
    NgxExtendedPdfViewerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatProgressSpinnerModule,
    IvyCarouselModule,
    CommonModule,
    BrowserAnimationsModule,
    ClipboardModule,
    NgChartsModule,
    DragDropModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [[AuthGuardService, AuthAdminGuardService, MudancaPendenteGuardGuard], {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
