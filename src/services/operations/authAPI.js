import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SIGNUP_API,
  LOGIN_API,
  RESEND_MAIL_API,
  CHANGEMAIL_API,
} = endpoints


export function signUp(
  {name,
  username,
  email,
  password},
  navigate
  ) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        username,
        email,
        password,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.additionalDetails?.image
        ? response.data.user.additionalDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`
      dispatch(setUser({ ...response.data.user.additionalDetails, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/knowyoubetter")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function changeMail(email, password,token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("PUT", CHANGEMAIL_API, {
        email,
        password,
      },
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setUser({ ...response.data.updatedDetails }))
      navigate("/verifyemail")
    } catch (error) {
      console.log("CHANGEMAIL_API API ERROR............", error)
      toast.error("Failed To change email")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function resendmail(token){
  return async () => {
    try {
      const response = await apiConnector(
        "GET",
        RESEND_MAIL_API,
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "RESEND_MAIL_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Mail Sent Successfully")
      } catch (error) {
      console.log("RESEND_MAIL_API API ERROR............", error)
      toast.error("Could Not Resend Mail")
    }
  }
}