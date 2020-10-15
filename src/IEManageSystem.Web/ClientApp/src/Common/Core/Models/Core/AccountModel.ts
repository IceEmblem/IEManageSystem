import SafetyProblemModel from "./SafetyProblemModel";

export default interface AccountModel{
    userName:string,
    password:string,
    safetyProblem:SafetyProblemModel,
}