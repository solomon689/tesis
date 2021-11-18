
export interface UserInfo {
    displayName: string;
    email: string;
    emailVerified?: boolean;
    phoneNumber?: string;
    refreshToken?: string; 
    uid: string;
}
