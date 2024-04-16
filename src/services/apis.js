const BASE_URL= "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESEND_MAIL_API:BASE_URL + "/auth/resendmail",
  CHANGEMAIL_API:BASE_URL + "/auth/changemail"
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDIsplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
}