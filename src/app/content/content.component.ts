import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsService } from '../shared/questions.service'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  form: FormGroup;
  test: FormGroup;

  questions:any = [];
  num;
  currentExam=[];
  answer = [];
  yes = 0;
  no = 0;
  minLength = 6;
  testLength = 6;
  LastName;
  name;
  MiddleName;



  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    // this.questions = this.questionsService.questions;
    this.questionsService.getQuestions().subscribe((data)=>{
      this.questions = data;
    });

    this.form = new FormGroup({
      user: new FormGroup({
        name: new FormControl("", [Validators.required]),
        LastName: new FormControl("", [Validators.required]),
        MiddleName: new FormControl("", [Validators.required]),
        CompanyName: new FormControl("", [Validators.required]),
      }),

     });

    this.test = new FormGroup({
      0: new FormControl(),
      1: new FormControl(),
      2: new FormControl(),
      3: new FormControl(),
      4: new FormControl(),
      5: new FormControl()
    })



  };

  randomNum(min, max){
    return this.num = Math.floor( Math.random()*(max-min)+min )
  };


  setExam(){
      this.form.get('user.name').disable();
      this.form.get('user.LastName').disable();
      this.form.get('user.MiddleName').disable();
      this.form.get('user.CompanyName').disable();
    this.randomNum(0, 3);
    this.inArray(this.num);
    return this.currentExam;
  };


  inArray(num){
    for (let i=0; i<this.testLength; i++ ){
    this.currentExam.push(this.questions[this.num][i])
    };
    this.questions.splice(this.num, 1)
  };


  check() {
  this.test.get('0').disable();
  this.test.get('1').disable();
  this.test.get('2').disable();
  this.test.get('3').disable();
  this.test.get('4').disable();
  this.test.get('5').disable();
  this.LastName = this.form.get('user.LastName').value;
  this.name = this.form.get('user.name').value;
  this.MiddleName = this.form.get('user.MiddleName').value;
    for (let i = 0; i <= 5; i++) {
      if (this.test.get([i]).value == this.currentExam[i].correctAnswer) {
        this.yes++;
        this.answer.push("Ճիշտ պատասխան: ");
      }
      else {
        this.no++;
          this.answer.push("Սխալ պատասխան: - " + this.currentExam[i].correctAnswer);
      }
    };
    this.sendResult();
    this.toPrint();
  };


  second1=0;
  second2=0;
  minute1=0;
  minute2=3;
  hour1=0;
  hour2=0;
  x;


  timer() {
    this.second1=9;
    this.second2=5;
    this.minute1=9;
    this.minute2=2;
    this.hour1=0;
    this.hour2=0;
    this.x=setInterval( ()=>{
      this.second1--;
      if (this.second1==-1) {
        this.second1=9;
        this.second2--
      };
      if (this.second2==-1) {
        this.second2=5;
        this.minute1--
      };
      if (this.minute1==-1) {
        this.minute1=9;
        this.minute2--
      };
      if (this.minute2==-1) {
        this.minute2=5;
        this.hour1--
      };
      if (this.hour1==-1) {
        this.hour1=9;
        this.hour2--
      };
      if (this.hour2==-1) {
        this.hour2=0;
        this.hour1--
      };
      if(this.second1==0 && this.second2==0 && this.minute1==0 && this.minute2==0){
        this.stop();
        this.check();
      }
    }, 1000);
  };


stop(){
  clearInterval(this.x)
};


toPrint(){
  setTimeout(print, 10);
};

sendResult(){
  this.questionsService.addProfileTest(this.form.get('user.name').value, this.form.get('user.LastName').value,
    this.form.get('user.MiddleName').value, this.form.get('user.CompanyName').value, this.currentExam,
    this.answer, this.yes, this.no).subscribe((result)=>{

  })
}

















}
