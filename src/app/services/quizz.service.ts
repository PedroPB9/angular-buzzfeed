import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizzStructure } from 'src/app/types/QuizzStructure'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  dt:QuizzStructure|any
  url:string = '/assets/data/quizz_questions.json'

  constructor(private json:HttpClient) {

  }

  getData(): Observable<QuizzStructure> {
    this.dt = this.json.get<QuizzStructure>(this.url);
    return this.dt;
  }
}
