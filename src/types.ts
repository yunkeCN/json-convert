const noEmpty = input => input !== undefined && input !== null
export const maybe = Type => input => noEmpty(input) ? Type(input) : input
export const pure = Type => input => noEmpty(input) ? Type(input) : Type()