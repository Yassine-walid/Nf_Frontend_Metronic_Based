export type NoteFraisModel = {
    noteFraisId: number,
    title: string,
    status: string,
    createdAt: Date,
    annee: Int32Array,
    mois: Int32Array,
    totalKm: Int32Array,
    nbrJours: Int32Array,
    totalaPayer: Int32Array,
    modified: Date,
    modifiedBy: string,
    mailRespHierarchique: string,
    mailDirHierarchique: string,
    requesterId: Int32Array
}