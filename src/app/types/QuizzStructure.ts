export type QuizzStructure = {
  title:string,
  questions:{

    id:number,
    question:string,
    options:{
      id:number,
      name:string,
      alias: string
    }[]
  }[],
  results: {
    "T":string[],
    "B":string[],
    "M":string[],
    "G":string[]
  },
}
