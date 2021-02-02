export interface EmailValidator{
  isValid: (email: string, shouldThrow?: boolean) => boolean
}
