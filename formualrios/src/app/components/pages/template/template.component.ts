import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Yoe',
    apellido: 'Cardenas',
    correo: 'yac8807@gmail.com'
  };

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises => {
      console.log(paises);
    });
  }

  guardar(form: NgForm){
    console.log(form);

    if ( form.invalid ){
      Object.values( form.controls ).forEach(control => {
        control.markAllAsTouched();
      });
    }

    console.log(form.value);
  }

}
