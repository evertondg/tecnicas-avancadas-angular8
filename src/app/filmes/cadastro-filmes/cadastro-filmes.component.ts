import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from '../../shared/components/campos/validar-campos.service';
import { FilmesService } from '../../core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from '../../shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  generos: Array<string>;
  id: number;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private filmesService: FilmesService,
    private router: Router
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
        this.criarFormulario(filme);
      });
    } else {
      const filme = this.criarFilmeEmBranco();
      this.criarFormulario(filme);
    }

    this.generos = [
      'Ação',
      'Aventura',
      'Romance',
      'Comédia',
      'Ficção Científica',
      'Drama',
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    console.log(this.cadastro);
    if (this.cadastro.invalid) {
      return console.log('Formulário não é válido');
    }

    const filme = this.cadastro.getRawValue() as Filme;

    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null,
    };
  }
  private criarFormulario(filme): void {
    this.cadastro = this.fb.group({
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(2)]],
      dtLancamento: [filme.dtLancamento, Validators.required],
      descricao: [filme.descricao],
      nota: [
        filme.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDb: [filme.urlIMDb, Validators.minLength(10)],
      genero: [filme.genero, Validators.required],
    });
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: 'Ir para a Listagem',
            btnCancelar: 'Cadastrar um novo Filme',
            possuiBtnFechar: true,
            btnColorCancelar: '#ff2673',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        });
      },
      err => {
        const config = {
          data: {
            titulo: 'Erro ao Salvar o registro',
            descricao: 'Não conseguimos salvar seu registro',
            btnSucesso: 'Ir para a Listagem',
            btnColorCancelar: 'warn',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(filme: Filme): void {
    this.filmesService.editar(filme).subscribe(
      () => {
        const config = {
          data: {
            descricao: 'Seu registro foi atualizado',
            btnSucesso: 'Ir para a Listagem',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/filmes');
        });
      },
      err => {
        const config = {
          data: {
            titulo: 'Erro ao Editar o registro',
            descricao: 'Não conseguimos salvar seu registro',
            btnSucesso: 'Ir para a Listagem',
            btnColorCancelar: 'warn',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
