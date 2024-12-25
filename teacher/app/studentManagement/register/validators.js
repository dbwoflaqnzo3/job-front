// validators.js

export const validateName = (name) => {
    if (!name) {
        return "이름을 입력해주세요.";
    }
    return '';
};

export const validateBirthDate = (birthDate) => {
    if (!birthDate) {
        return "생일을 입력해주세요.";
    }
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    if (age < 6) {
        return "나이가 너무 적습니다. 6세 이상이어야 합니다.";
    }
    return '';
};

export const validateSex = (sex) => {
    if (!sex) {
        return "성별을 선택해주세요.";
    }
    return '';
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneNumber) {
        return "전화번호를 입력해주세요.";
    }
    if (!phoneRegex.test(phoneNumber)) {
        return "전화번호는 10자리 또는 11자리 숫자여야 합니다.";
    }
    return '';
};

export const validateParentPhoneNumber = (parentPhoneNumber) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!parentPhoneNumber) {
        return "부모 전화번호를 입력해주세요.";
    }
    if (!phoneRegex.test(parentPhoneNumber)) {
        return "부모 전화번호는 10자리 또는 11자리 숫자여야 합니다.";
    }
    return '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        return "이메일을 입력해주세요.";
    }
    if (!emailRegex.test(email)) {
        return "올바른 이메일 형식이 아닙니다.";
    }
    return '';
};

export const validateParentEmail = (parentEmail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!parentEmail) {
        return "부모 이메일을 입력해주세요.";
    }
    if (!emailRegex.test(parentEmail)) {
        return "부모 이메일은 유효한 이메일 형식이어야 합니다.";
    }
    return '';
};

export const validateUserId = (userId) => {
    if (!userId) {
        return "아이디를 입력해주세요.";
    }
    if (userId.length < 5) {
        return "아이디는 최소 5자 이상이어야 합니다.";
    }
    return '';
};

export const validatePassword = (password) => {
    if (!password) {
        return "비밀번호를 입력해주세요.";
    }
    if (password.length < 8) {
        return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    return '';
};

export const validatePasswordCheck = (passwordCheck, password) => {
    if(passwordCheck != password) return "입력하신 비밀번호와 다릅니다. 다시 입력해주세요."
    return ""
}

export const validateGrade = (grade) => {
    if (grade && (grade < 1 || grade > 12)) {
        return "학년은 1부터 12까지의 숫자여야 합니다.";
    }
    return '';
};

export const validateLevel = (level) => {
    if (!level) {
        return "레벨을 선택해주세요.";
    }
    return '';
};
