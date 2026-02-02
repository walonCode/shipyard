import { describe, it, expect } from "bun:test"
import { loginSchema, signupSchema } from "../../src/validators/auth.validator"


describe("loginSchema test", () => {
  it("success test", () => {
    const {data, error, success } = loginSchema.safeParse({
      email: "test@exaple.com",
      password:"password"
    })
    
    expect(success).toBe(true)
    expect(error).toBeUndefined()
    expect(data).toBeDefined()
  })
  
  it("fail test", () => {
    const {data, error, success } = loginSchema.safeParse({
      email: "testexaple.com",
      password:"pas"
    })
    
    expect(success).toBe(false)
    expect(error).toBeDefined()
    expect(data).toBeUndefined()
  })
})

describe("signupSchema test", () => {
  it("success test", () => {
    const {data, error, success } = signupSchema.safeParse({
      email: "test@exaple.com",
      password: "password",
      username:"walon"
    })
    
    expect(success).toBe(true)
    expect(error).toBeUndefined()
    expect(data).toBeDefined()
  })
  
  it("fail test", () => {
    const {data, error, success } = signupSchema.safeParse({
      email: "testexaple.com",
      password: "pas",
      username:""
    })
    
    expect(success).toBe(false)
    expect(error).toBeDefined()
    expect(data).toBeUndefined()
  })
})