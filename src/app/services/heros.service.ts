import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay }  from 'rxjs/operators';
import { HeroModel } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  private URL = 'https://login-app-3dd81.firebaseio.com';
  // https://login-app-3dd81.firebaseio.com/heros/-M6MoAXAT836pLMU7kx4

  constructor( private http:HttpClient ) { }

  create( hero:HeroModel ){
    return this.http.post(`${this.URL}/heros.json`,hero).pipe(
      map( (res:any) => {
        hero.id = res.name;
        return hero;
      } )
    )
  }

  update( hero:HeroModel ){
    const heroTemp = {
      ...hero
    }
    delete heroTemp.id;
    return this.http.put(`${this.URL}/heros/${hero.id}.json`,heroTemp);
  }

  readHero(id:string){
    return this.http.get(`${this.URL}/heros/${id}.json`).pipe(
      map( (res:HeroModel) => {
        const heroTemp = res;
        heroTemp.id = id;
        return heroTemp;
      } )
    )
  }

  readHeros(){
    return this.http.get(`${this.URL}/heros.json`).pipe(
      map( res => this.getArray(res)),delay(1300)
    );
  }

  private getArray( heroObj:object ){
    if(heroObj === null) { return [] }
    const heros:HeroModel[] = [];
    Object.keys( heroObj ).forEach( key => {
      const hero:HeroModel = heroObj[key];
      hero.id = key;
      heros.push(hero);
    } )
    return heros;
  }

  delete(id:string){
    return this.http.delete(`${this.URL}/heros/${id}.json`);
  }

}
