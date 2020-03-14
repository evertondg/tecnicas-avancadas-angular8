import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FilmesService } from '../../core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss'],
})
export class VisualizarFilmeComponent implements OnInit {
  readonly semFoto =
    'https://www.trt21.jus.br/sites/default/files/default_images/sem_foto%20%281%29.png';
  filme: Filme;
  id: number;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza?',
        descricao:
          'Caso você tenha certeza que deseja excluir clique no botão OK',
        corBtnSucesso: 'warn',
        corBtnCancelar: 'primary',
        possuiBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(() => {
          this.router.navigateByUrl('/filmes');
        });
      }
    });
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  private visualizar() {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }
}
