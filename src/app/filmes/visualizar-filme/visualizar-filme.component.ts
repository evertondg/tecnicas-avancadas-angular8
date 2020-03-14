import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from '../../core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss'],
})
export class VisualizarFilmeComponent implements OnInit {
  readonly semFoto =
    'https://www.trt21.jus.br/sites/default/files/default_images/sem_foto%20%281%29.png';
  filme: Filme;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) {}

  ngOnInit(): void {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number) {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }
}
