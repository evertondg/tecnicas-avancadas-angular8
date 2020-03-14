import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from '../../core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParams } from '../../shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss'],
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto =
    'https://www.trt21.jus.br/sites/default/files/default_images/sem_foto%20%281%29.png';
  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };

  filtrosListagem: FormGroup;
  filmes: Filme[] = [];
  generos: Array<string> = [];

  constructor(private filmesService: FilmesService, private f: FormBuilder) {}

  ngOnInit() {
    this.filtrosListagem = this.f.group({
      texto: [''],
      genero: [''],
    });

    this.filtrosListagem
      .get('texto')
      .valueChanges.pipe(debounceTime(400))

      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: 'genero', valor: val };
      this.resetarConsulta();
    });

    this.generos = [
      'Ação',
      'Aventura',
      'Romance',
      'Comédia',
      'Ficção Científica',
      'Drama',
    ];

    this.listarFilmes();
  }

  onScroll() {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
