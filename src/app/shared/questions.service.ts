import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {


  constructor(private http:HttpClient) { }

  getQuestions(){
    return this.http.get("http://localhost:3000/questions");
  };

  addProfileTest(name, LastName, MiddleName, CompanyName, currentExam, answer, True, False){
    let newProfileTest = {
      "name": name,
      "LastName": LastName,
      "MiddleName": MiddleName,
      "CompanyName": CompanyName,
      "currentExam": currentExam,
      "answers": answer,
      "TrueAnswer": True,
      "FalseAnswer": False,

    };
    return this.http.post("http://localhost:3000/result", newProfileTest)

  }












}
