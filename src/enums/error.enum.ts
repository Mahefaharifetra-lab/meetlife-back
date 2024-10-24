export enum API_SEARCH_ERROR {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  NULL = "NULL",
}

export enum API_REGISTER_ERROR {
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE",
  PSEUDO_ALREADY_IN_USE = "PSEUDO_ALREADY_IN_USE",
  WRONG_VERIFICATION_CODE = "WRONG_VERIFICATION_CODE",
  NULL = "NULL",
}
export enum API_AUTH_ERROR {
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  NULL = 'NULL',
}

