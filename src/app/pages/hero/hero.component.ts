import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HerosService } from 'src/app/services/heros.service';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  forma: FormGroup;
  hero = new HeroModel();
  ID = '';

  constructor(private _http: HerosService, private route: ActivatedRoute) {

    this.forma = new FormGroup({
      'id': new FormControl({ value: "", disabled: "true" }),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'power': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'state': new FormControl('')
    })

    this.ID = this.route.snapshot.paramMap.get('id');
    if (this.ID === 'nuevo') {
      this.forma.setValue(this.hero);
    } else {
      this._http.readHero(this.ID).subscribe(res => {
        this.forma.setValue(res);
        this.hero.state = res.state;
      });
    }
  }

  ngOnInit(): void {
  }

  save() {
    Swal.fire({
      icon: 'info',
      title: 'Wait please'
    });
    Swal.showLoading();
    if (this.forma.valid) {
      this.forma.get('state').setValue(this.hero.state);
      this.hero = this.forma.value;
      this._http.create(this.hero).subscribe(res => {
        res
      });
      Swal.fire({
        icon: 'success',
        title: 'Registered'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Try again',
        text: 'Complete all the fields.'
      })
    }
    this.forma.setValue( new HeroModel );
    this.forma.get('id').setValue('');
  }

  updateHero(idForm: string) {
    Swal.fire({
      icon: 'info',
      title: 'Wait please'
    });
    Swal.showLoading();
    this.forma.get('state').setValue(this.hero.state);
    this.hero = this.forma.value;
    this.hero.id = idForm;
    this._http.update(this.hero).subscribe(res => res);
    Swal.fire({
      icon: 'success',
      title: 'Success update'
    })
  }
} 
