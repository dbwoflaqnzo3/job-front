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

export class StudentPaymentRecordModel {
    constructor({
        payDate,
        title,
        method,
        amount,
        billingDate,
        amountInfo,
        manager,
        manageAcademy,
    }) {
        this.payDate = payDate,
        this.title = title,
        this.method = method,
        this.amount = amount,
        this.billingDate = billingDate,
        this.amountInfo = typeof amountInfo === "object" && amountInfo !== null ? amountInfo : {};
        this.manager = manager;
        this.manageAcademy = manageAcademy;
    }

    static fieldMappings = {
        payDate: "결제일자",
        title: "결제항목",
        method: "결제수단",
        amount: "금액",
        billingDate: "청구일자",
        amountInfo: "세부금액",
        manager: "담당 선생님",
        manageAcademy: "담당 학원",
    };

    static states = {
        payDate: FieldState.VISIBLE,
        title: FieldState.VISIBLE,
        method: FieldState.VISIBLE,
        amount: FieldState.VISIBLE,
        billingDate: FieldState.DISABLED,
        amountInfo: FieldState.DISABLED,
        manager: FieldState.DISABLED,
        manageAcademy: FieldState.DISABLED,
    };
}

export class StudentPaymentModel {
    constructor({
        billingDate,
        title,
        amount,
        manager,
        manageAcademy,
    }) {
        this.billingDate = billingDate,
        this.title = title,
        this.amount = amount,
        this.manager = manager;
        this.manageAcademy = manageAcademy;
    }

    static fieldMappings = {
        billingDate: "청구일자",
        title: "결제항목",
        amount: "금액",
        manager: "담당 선생님",
        manageAcademy: "담당 학원",
    };

    static states = {
        billingDate: FieldState.VISIBLE,
        title: FieldState.VISIBLE,
        amount: FieldState.VISIBLE,
        manager: FieldState.HIDDEN,
        manageAcademy: FieldState.HIDDEN,
    };
}