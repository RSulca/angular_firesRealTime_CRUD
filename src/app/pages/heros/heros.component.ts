import { Component, OnInit } from '@angular/core';
import { HerosService } from 'src/app/services/heros.service';
import { HeroModel } from 'src/app/models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  cargando = false;
  hero: object;
  heros: HeroModel[] = [];
  constructor(private _http: HerosService) {
    this.cargando = true;
    this.getHeros();
  }

  ngOnInit(): void {
  }

  getHeros() {
    this._http.readHeros().subscribe(res => {
      this.heros = res;
      this.cargando = false;
    })
  }

  deleteHero(id: string, i: number) {
    this._http.delete(id).subscribe(res => {
      Swal.fire({
        icon: 'error',
        title: 'Hero deleted',
      })
    })
    this.heros.splice(i, 1);
  }

}
