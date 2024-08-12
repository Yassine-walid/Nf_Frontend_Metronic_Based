export type NoteFraisModel = {
    noteFraisId: number;
    title: string;
    status: string;
    createdAt: Date;
    annee: number;  // Changed from Int32Array to number
    mois: number;   // Changed from Int32Array to number
    totalKm: number;   // Changed from Int32Array to number
    nbrJours: number;   // Changed from Int32Array to number
    totalaPayer: number;   // Changed from Int32Array to number
    modified: Date;
    modifiedBy: string;
    mailRespHierarchique: string;
    mailDirHierarchique: string;
    requesterId: number;   // Changed from Int32Array to number
};