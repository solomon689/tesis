export interface User {
    id?: string;
    name: string;
    lastname?: string;
    email: string;
    password?: string;
    phone?: string;
    isActive: boolean;
    googleSign?: boolean;
    contacts?: Contact[];
}

export interface Contact {
    id?: string;
    phone: string;
    name: string;
    lastname: string;
}
