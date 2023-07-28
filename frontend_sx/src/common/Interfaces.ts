export type StatusTypes = "idle" | "pending" | "fulfilled" | "rejected"

export interface StatusInterface { 
    status: StatusTypes
    message: string
    session_id: string | null
    submitted: boolean 
}


export interface User {
    id: number
    type_id: number
    email: string
    sign_up_date: string
    reset_code: string
    first_name: string
    last_name: string
    phone_number: string
    profile_path: string
    cover_path: string
    bio: string
}

export interface UserType {
    id: number
    name: string
}


export interface EventTypes {
    id: number
    name: string
}

export interface EventImages {
    id: number
    event_id: number
    image_path: string
}

export interface EventParticipants {
    id: number
    event_id: number
    user_id: number
    status_id: number
    confirmed: number
}

export interface EventTrail {
    id: number
    location_id: number
    event_id: number
    distance_from_last: number
}

export interface Event {
    id: number
    type_id: number
    organizer_id: number
    name: string
    description: string
    banner_photo: string
    date_end: string
    date_start: string
    participation_limit: number
}