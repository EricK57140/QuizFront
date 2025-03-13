import { Component } from '@angular/core';
interface somevalue {
  name: string;
  id: number;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  age: number = 25;
  car!: { brand: string; year: number };
  isAdult: boolean = this.age >= 18;
  ngOnInit() {
    this.car = { brand: 'toyota', year: 1998 };
    console.log(this.car);
    let someObj: somevalue = {
      name: 'random',
      id: 123,
    };
    console.log(someObj);

    this.age = this.age + 5;
    console.log(this.isAdult);
    console.log(this.age);
  }
}
