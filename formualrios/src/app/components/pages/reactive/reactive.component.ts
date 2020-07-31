import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../../services/validadores.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  getNoValido(input: string) {

    if (input === 'password2'){
      const pass1 = this.form.get('password1').value;
      const pass2 = this.form.get('password2').value;

      return (pass1 === pass2 ) ? false : true;
    }
    return this.form.get(input).invalid && this.form.get(input).touched;
  }

  get getPasaTiempos(){
    return this.form.get('pasaTiempos') as FormArray;
  }

  crearFormulario(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noCardenas]],
      correo: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      usuario: ['', [Validators.required] , this.validadores.existeUsuario ],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      direccion: this.formBuilder.group({
        departamento: ['', [ Validators.required ]],
        ciudad: ['', [ Validators.required ]]
      }),
      pasaTiempos: this.formBuilder.array([])
    }, {
      validators: [this.validadores.passwordsIguales('password1', 'password2')]
    }
    );
  }

  cargarDataFormulario(){
    // this.form.setValue({
    this.form.reset({
      nombre: 'Yoe',
      apellido: null,
      correo: 'yac8807@gmail.com',
      password1: '123',
      password2: '123',
      direccion: {
        departamento: 'Bogotá',
        ciudad: 'Bogotá'
      }
    });
  }

  crearListeners(){

    // this.form.valueChanges.subscribe( valor => console.log(valor));

    // this.form.statusChanges.subscribe( status => console.log({status}) );

    this.form.get('apellido').valueChanges.subscribe(console.log);
  }

  agregarPasaTiempo(){
    this.getPasaTiempos.push(this.formBuilder.control(''));
  }

  borrarPasaTiempo(i: number){
    this.getPasaTiempos.removeAt(i);
  }

  guardar(){
    console.log(this.form);
    if ( this.form.invalid ){
      return Object.values( this.form.controls ).forEach(control => {
        control.markAllAsTouched();
      });
    }

    // this.form.reset();
  }

}
