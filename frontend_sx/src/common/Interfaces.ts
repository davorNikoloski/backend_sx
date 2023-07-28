export type StatusTypes = "idle" | "pending" | "fulfilled" | "rejected"

export interface StatusInterface { 
    status: StatusTypes
    message: string
    session_id: string | null
    submitted: boolean 
}


export interface User {
    uid: number
    email: string
    sign_up_date: string
    reset_code: string
    first_name: string
    last_name: string
    phone_number: string
    profile_path: string
}

