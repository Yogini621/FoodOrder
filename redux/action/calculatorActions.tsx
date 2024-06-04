import { Addition, Division, Multiplication, Subtraction } from "./actions";

export const addition = () => ({
    type : typeof Addition
})

export const multiplication = () => ({
    type : typeof Multiplication
})

export const subtraction = () => ({
    type : typeof Subtraction
})

export const division = () => ({
    type : typeof Division
})