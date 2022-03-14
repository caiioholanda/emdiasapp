import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  validations_form: FormGroup;
  errorMessage: string = '';
  public result: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Informe o e-mail.' },
     { type: 'pattern', message: 'Por favor, informe um e-mail válido.' }
   ],
   'senha': [
     { type: 'required', message: 'Senha obrigatória.' },
     { type: 'minlength', message: 'Informe sua senha que contém no mínimo 5 caracteres.' }
   ]
 };



  constructor(
  	private formBuilder: FormBuilder,
    private router: Router
  ) {

  	this.validations_form = this.formBuilder.group({
    	 email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        senha: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
  	});

   }

  ngOnInit() {
  
  }

  formLogin(this.validations_form.value) {

    // this.result = this.apiService.doLogin(this.validations_form.value);
    // console.log(this.result);


  }




}
