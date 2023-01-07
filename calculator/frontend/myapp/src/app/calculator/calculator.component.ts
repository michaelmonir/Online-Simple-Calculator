import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void
  {
  }
  UpperString: String = "";
  LowerString:string = "0";
  op1:NumRepresentation = new NumRepresentation();
  op2:NumRepresentation = new NumRepresentation();
  startoperator:string = "start";
  operator:string = this.startoperator;
  myState:state = state.DuringNumber;

  Debug()
  {
    let num:NumRepresentation = new NumRepresentation();
  }

  PressOperator(operator:string) // first thing to change operator
  {
    if (this.myState == state.AfterOperator)
    {
      this.operator = operator;
      this.ModifyScreansAfterOperator();
      return;
    }
    else if (this.myState == state.AfterEqual)
    {

      //this.op1.SetNum(this.op2.GetString());
      this.myState = state.AfterOperator;
      this.operator = operator;
      this.ModifyScreansAfterOperator();
      return;
    }
    this.myState = state.AfterOperator;
    let prevoperator = this.operator;
    this.operator = operator;
    this.Compute(this.op1, this.op2, prevoperator);
  }
  PressEqual()
  {
    this.myState = state.AfterEqual;
    if (this.operator == this.startoperator)
    {
      return;
    }
    this.Compute(this.op1, this.op2, this.operator);
  }
  Compute(num1:NumRepresentation, num2:NumRepresentation, operator:string)
  {
    if (operator == this.startoperator)
    {
      this.after(["0", operator, "0", this.op2.GetString()]);
      return;
    }
    if (operator == "+")
    {
      this.add(num1.GetString(), num2.GetString());
    }
    else if (operator == "-")
    {
      this.sub(num1.GetString(), num2.GetString());
    }
    else if (operator == "/")
    {
      this.divide(num1.GetString(), num2.GetString());
    }
    else if (operator == "x")
    {
      this.multiply(num1.GetString(), num2.GetString());
    }
  }

  after(operation:string[])
  {
    if (this.CheckError(operation[3]))
    {
      this.HandleError();
      return;
    }
    this.op1.SetNum(operation[3]);
    this.op2.SetNum("0");

    if (this.myState == state.AfterOperator)
      this.ModifyScreansAfterOperator();
    else if (this.myState == state.AfterEqual)
      this.ModifyScreenAfterEqual(operation);
  }
  add(num1:string, num2:string)
  {
    this.http.AddRequest(num1, num2).subscribe(res=>{ this.after([num1, "+", num2, res]); });
  }
  sub(num1:string, num2:string)
  {
    this.http.SubtractRequest(num1, num2).subscribe(res=>{ this.after([num1, "-", num2, res]); });
  }
  multiply(num1:string, num2:string)
  {
    this.http.MultiplyRequest(num1, num2).subscribe(res=>{ this.after([num1, "x", num2, res]); });
  }
  divide(num1:string, num2:string)
  {
    this.http.DivideRequest(num1, num2).subscribe(res=>{ this.after([num1, "/", num2, res]); });
  }
  clear()
  {
    this.RestartOperation();
    this.UpperString = "";
    this.LowerString = "0";
  }
  RestartOperation()
  {
    this.myState = state.DuringNumber;
    this.op1 = new NumRepresentation();
    this.op2 = new NumRepresentation();
    this.operator = this.startoperator;
  }

  OneSideOperator(type:string)
  {
    let num:string = this.op2.GetString();
    this.http.OneSideOperatorRequest(type, num).subscribe(res=>
      {
        if (this.CheckError(res))
        {
          this.HandleError();
          return;
        }
        this.op2.SetNum(res);
        this.ModifyScreenAfterNumber();
      }
    );
  }

  PressNumber(added:number)
  {
    if (this.myState == state.AfterEqual)
    {
      this.clear();
    }
    this.op2.AddDigit(added);
    this.myState = state.DuringNumber
    this.ModifyScreenAfterNumber();
  }
  PressPoint()
  {
    if (this.myState == state.AfterEqual)
    {
      this.clear();
    }
    this.op2.AddPoint();
    this.myState = state.DuringNumber
    this.ModifyScreenAfterNumber();
  }
  back()
  {
    if (this.myState != state.DuringNumber) return;
    this.op2.DeleteLastDigit();
    this.ModifyScreenAfterNumber();
  }
  ChangeSign()
  {
    if(this.myState != state.DuringNumber) return;
    this.op2.ChangeSign();
    this.ModifyScreenAfterNumber();
  }

  ModifyUpper(arr:string[])
  {
    if (arr[1] == this.startoperator)
    {
      this.UpperString = arr[3];
      return;
    }
    let s:string = "";
    if (arr.length != 0 && arr[1] != this.startoperator)
    {
      for (let i = 0; i < arr.length; i++)
      {
        s += arr[i] + " ";

        if (i == 2)
          s += " = "
      }
    }
    this.UpperString = s;
  }
  ModifyLower(s:string)
  {
    this.LowerString = s;
  }
  ModifyScreansAfterOperator()
  {
    this.ModifyLower(this.op1.GetString());
    this.ModifyUpper([this.op1.GetString(), this.operator]);
  }
  ModifyScreenAfterEqual(operation:string[])
  {
    this.ModifyLower(operation[3]);
    this.ModifyUpper(operation);
  }
  ModifyScreenAfterNumber()
  {
    this.ModifyLower(this.op2.GetString());
    this.ModifyUpper([this.op1.GetString(), this.operator]);
  }

  CheckError(str:string):boolean
  {
    if(str == "Infinity")
      return true;
    return false;
  }
  HandleError()
  {
    this.clear();
    this.LowerString = "E";
  }
}

enum state
{
  AfterOperator,
  DuringNumber,
  AfterEqual
}

class NumRepresentation
{
  str:string = "0";
  ispositive = true;
  haspoint = false;
  static maxlen = 16;
  GetString() : string
  {
    let s:string = this.str;
    if (this.GetNum() < 0)
      s = "-" + s;
    return s;
  }
  GetNum(): number
  {
    let num:number = 0;
    let s = this.str;
    let afterpoint = false;
    let indexafter = 1;
    for (let i = 0; i < s.length; i++)
    {
      if (s[i] == '.')
      {
        afterpoint = true;
        continue;
      }
      if (afterpoint)
      {
        num += parseFloat(s[i]) * Math.pow(10, -indexafter);
        indexafter++;
      }
      else
      {
        num *= 10;
        num += parseFloat(s[i]);
      }
    }
    if (this.ispositive == false) num *= -1;
    // alert(num);
    return num;
  }
  SetNum(newnum:string)
  {
    if (newnum[0] == '-')
    {
      this.ispositive = false;
      newnum = newnum.substring(1);
    }
    else
      this.ispositive = true;
    this.haspoint = false;

    for (let i = 0; i < newnum.length; i++)
    {
      if (newnum[i] == ".")
        this.haspoint = true;
    }
    this.str = newnum;
    this.CheckAndModifyStringErros();
  }
  ChangeSign()
  {
    this.ispositive = !this.ispositive;
    this.CheckAndModifyStringErros();
  }
  AddPoint()
  {
    if(this.haspoint) return;
    this.str += ".";
    this.haspoint = true;
  }
  AddDigit(c:number)
  {
    if (this.CheckValidLength() == false) return;
    this.str+=c.toString();
    this.CheckAndModifyStringErros();
  }
  DeleteLastDigit()
  {
    let s = this.str;
    if (s[s.length - 1] == '.')
      this.haspoint = false;
    s = s.slice(0, -1);
    this.str = s;
    this.CheckAndModifyStringErros();
  }
  CheckAndModifyStringErros()
  {
    this.CheckAndModifyEmptyString();
    this.ParseZeroes();
  }
  CheckAndModifyEmptyString() // also modifies string with no whole number(first digit is .)
  {
    if (this.str == "")
      this.str = "0";
    if (this.str[0] == '.')
      this.str = "0" + this.str;
    if (this.GetNum() == 0)
      this.ispositive = true;
  }
  ParseZeroes()
  {
    let s = this.str;
    while (s.length > 0 && s[0] == '0')
    {
      s = s.substring(1);
    }
    this.str = s;
    this.CheckAndModifyEmptyString();
  }
  CheckValidLength()
  {
    if (this.str.length >= NumRepresentation.maxlen)
      return false;
    return true;
  }
}
