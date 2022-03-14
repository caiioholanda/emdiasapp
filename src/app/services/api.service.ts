import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: String = 'http://localhost/api/';

  constructor(private http: HttpClient) { }

  createData() {

  }


    doLogin(value){

      // return this.http.post(`${this.api}login`);
            
       // return new Promise<any>((resolve, reject) => {
       //   firebase.auth().signInWithEmailAndPassword(value.email, value.password)
       //   .then(
       //     res => resolve(res),
       //     err => reject(err))
       // })
      }


  readData() {
    return this.http.get(`${this.api}clientes/listar`);
  }

  updateData() {

  }

  deleteData(){


  }

}
