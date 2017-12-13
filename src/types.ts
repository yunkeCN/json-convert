export const maybe = Type => input => input !== undefined ? Type(input) : input
export const pure = Type => input => input !== undefined ? Type(input) : Type()