interface SubLevel {
    description: string;
    value: string;
}

export interface PermissionI {
    description: string;
    value: string;
    sub_levels?: SubLevel[];
}
