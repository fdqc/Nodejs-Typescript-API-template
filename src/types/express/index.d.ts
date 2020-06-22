declare namespace Express {
    interface User {
        _id: string;
        permissions: string[];
    }
}