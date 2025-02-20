import { FieldState } from "@/app/components/ui/Table";

export class Sample {
  constructor({
    name,
    sex,
    age,
  }) {
    this.name = name;
    this.sex = sex;
    this.age = age;
  }

  static fieldMappings = {
    name: "이름",
    sex: "성별",
    age: "나이",
  };

  static states = {
    name: FieldState.VISIBLE,
    sex: FieldState.HIDDEN,
    age: FieldState.DISABLED,
  }
}

export class TeacherPaymentModel {
  constructor({
    title,
    billingDate,
    date,
    method,
    amount,
    manager,
  }) {
    this.title = title;
    this.billingDate = billingDate;
    this.date = date;
    this.method = method;
    this.amount = amount;
    this.manager = manager;
  }

  static fieldMappings = {
    date: "결제일자",
    title: "결제내용",
    method: "결제수단",
    amount: "금액",
    billingDate: "청구일자",
    manager: "담당",
  };

  static states = {
    date: FieldState.VISIBLE,
    title: FieldState.VISIBLE,
    method: FieldState.VISIBLE,
    amount: FieldState.VISIBLE,
    billingDate: FieldState.HIDDEN,
    manager: FieldState.HIDDEN,
  };
}

export class StudentPaymentModel {
  constructor({
    title,
    billingDate,
    date,
    method,
    amount,
    amountInfo,
    manager,
    studentName,
  }) {
    this.studentName = studentName;
    this.title = title;
    this.billingDate = billingDate;
    this.date = date;
    this.method = method;
    this.amount = amount;
    this.amountInfo = typeof amountInfo === "object" && amountInfo !== null ? amountInfo : {};
    this.manager = manager;
  }

  static fieldMappings = {
    studentName: "학생이름",
    title: "결제항목",
    billingDate: "청구일자",
    date: "결제일자",
    method: "결제수단",
    amount: "금액",
    amountInfo: "세부금액",
    manager: "담당",
  };

  static states = {
    studentName: FieldState.VISIBLE,
    title: FieldState.VISIBLE,
    billingDate: FieldState.HIDDEN,
    date: FieldState.VISIBLE,
    method: FieldState.HIDDEN,
    amount: FieldState.VISIBLE,
    amountInfo: FieldState.HIDDEN,
    manager: FieldState.HIDDEN,
  };
}