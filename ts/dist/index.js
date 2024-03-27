"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const str = "Hello, World";
console.log(str);
function greetUser(name) {
    console.log(`Hello, ${name}`);
}
greetUser("Spectre");
function sum(a, b) {
    return a + b;
}
console.log(sum(5, 10));
function isLegal(age) {
    return age > 18;
}
console.log(isLegal(18));
function delayCall(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((res) => setTimeout(res, 100));
        const returnStatus = callback();
        console.log(returnStatus);
    });
}
delayCall(() => {
    console.log("Delay call");
    return 0;
});
