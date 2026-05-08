
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    talk(){
        console.log(`Hi, my name is ${this.name}`)
    }
}
class Student extends Person{
    constructor(name,age,marks){
        super(name,age);  // it inherits values from parent class person
        this.marks=marks;
    }
}
class Teacher extends Person{
    constructor(name,age,subject){
        super(name,age);  // it inherits values from parent class person
        this.subject=subject;
    }
}

