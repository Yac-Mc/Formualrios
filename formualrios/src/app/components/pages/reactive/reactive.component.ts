import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  getNoValido(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }

  crearFormulario(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
    });
  }

  guardar(){
    console.log(this.form);
    if ( this.form.invalid ){
      return Object.values( this.form.controls ).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

}
