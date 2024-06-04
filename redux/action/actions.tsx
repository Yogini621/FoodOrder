export const Addition = 'Addition'
export const Subtraction  = 'Subtraction'
export const Multiplication = 'Multiplication'
export const Division = 'Division'

export interface AdditionAction {
 type : typeof Addition

}
export interface MultiplicationAction{
    type : typeof Multiplication
}

export interface SubtractionAction{
    type : typeof Subtraction
}

export interface DivisionAction{
    type : typeof Division
}

export type CalculatorActionTypes = 
| AdditionAction 
| MultiplicationAction
| SubtractionAction
| DivisionAction


export interface CalculatorState{
     currentValue : number;
     previous : number;
     result : number;
}