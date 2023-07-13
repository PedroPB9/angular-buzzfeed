import { Component, OnInit } from '@angular/core';
import { QuizzStructure } from 'src/app/types/QuizzStructure'
import { QuizzService } from '../../services/quizz.service'
import { QuestionType } from '../../types/QuestionType'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizz: QuizzStructure
  finished:boolean = false
  questionSelected:QuestionType

  answers:string[] = []
  answerSelected:string[]

  questionIndex:number = 0
  questionIndexMax:number=0
  constructor(private quiz_service: QuizzService) {
    this.answerSelected = []
    this.questionSelected = {
      id: 0,
      options: [],
      question: ''
    }
    this.quizz = {
      title: '',
      questions: [],
      results: {
          "T":[],
          "B":[],
          "M":[],
          "G":[],
      },

    }
  }

  ngOnInit(): void {

    this.quiz_service.getData().subscribe(
      {
        next: (res) => {
          this.quizz = {
            title: res.title,
            questions: res.questions,
            results: res.results
          }

          this.questionSelected = this.quizz.questions[this.questionIndex]
          this.questionIndexMax = this.quizz.questions.length
          console.log(this.quizz)
        }
      }
    )
  }

  playerChoice(answer: string) {
    this.answers.push(answer)
    this.nexStep()
  }

  async nexStep(){
    this.questionIndex+=1
    if(this.questionIndex < this.questionIndexMax) {
      this.questionSelected = this.quizz.questions[this.questionIndex]
    } else {
      const finalAns:string = await this.resultCounter(this.answers)
      this.finished = true
      this.answerSelected = this.quizz.results[finalAns as keyof typeof this.quizz.results]
    }

  }

  async resultCounter(answers:string[]) {
    const result = this.answers.reduce((previous, current, i, arr)=> {
      if(
        arr.filter(item=>item == previous) > arr.filter(item=>item == current)
      ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }


}
