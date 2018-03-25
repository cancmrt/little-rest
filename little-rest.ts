import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the LittleRest provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LittleRest {

  restAddress = "http://localhost:8000/";
  token = "";
  constructor(public http: Http) {
    console.log('Hello LittleRest Provider');
  }
  doGet:any = function (url:any, login = false) {
    return  this.http.get(this.restAddress+url,{
      headers: this.getHeader(login)
    });
  };
  doPost:any = function(url:any,data:any, login = false) {
    return this.http.post(this.restAddress+url, JSON.stringify(data),{
      headers:this.getHeader(login)
    });
  }
  doPut:any = function (url:any,data:any, login = false){
    return this.http.put(this.restAddress+url, JSON.stringify(data),{
      headers:this.getHeader(login)
    });
  }
  doDelete:any = function(url:any, login = false){
    return this.http.delete(this.restAddress+url,{
      headers:this.getHeader(login)
    });
  }
  setToken:any = function(token:any,day=90){
    Cookie.set('token', token,day);
    this.token = token;
  }
  initToken:any = function(){
    this.token = Cookie.get('token');
  }
  /*checkToken(callback){
    let mythis = this;
    this.initToken(function(response){
      if(response == true)
      {
        mythis.http.get(mythis.restAddress+"checkauth",{
          headers: mythis.getHeader()
        }).subscribe(
          (result)=>{
            var body = JSON.parse(result["_body"]);
            if(body["status"] == "success")
            {
              callback(true);
            }
            else{
              callback(false);
            }
          },
          (error)=>{
            callback(false);
          }
        );
      }
      else
      {
        callback(false);
      }
    })
    
  }*/
  forgetToken:any = function(){
    Cookie.delete('token');
    this.token = "";
  }
  getHeader:any = function(login = false) {
    var header = new Headers();
    //header.append('Access-Control-Allow-Origin','*' );
    header.append('Content-Type','application/json');
    if(login === true){
      header.append("Authorization","Bearer "+this.token);
    }
    return header;
  }
  setRestAddress:any = function(address:any){
    this.restAddress = address;
  }
  /*doAuth(username,password){
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    
    var authHeaderOption = new Headers();
    //authHeaderOption.append('Access-Control-Allow-Origin','*' );
    authHeaderOption.append('Content-Type', 'application/x-www-form-urlencoded');
    
  
    return this.http.post(this.restAddress+"authenticate/auth", body.toString(),{
      headers :authHeaderOption
    });
  }*/
}

export * from "./little-rest";
