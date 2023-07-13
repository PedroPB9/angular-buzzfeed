export type QuestionType = {
  id:number,
  options: {
    id:number,
    name:string,
    alias: string
  }[]
  question: string
}
