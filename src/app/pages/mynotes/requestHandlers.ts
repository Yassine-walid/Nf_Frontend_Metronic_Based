import axios from 'axios';

interface NoteExpense {
  id: number;
  fixe: number;
  kilometrage: number;
  tauxVariable: number;
  tauxFixe: number;
  totalePayerJournalier: number;
  designation: string;
  noteFraisId: number;
  date:string
}


export interface NoteFraisDto {
  NoteFraisId: number;
  Title?: string;
  Status?: string;
  CreatedAt: Date;
  Annee: number;
  Mois: number;
  TotalKm: number;
  NbrJours: number;
  TotalaPayer: number;
  Modified: Date;
  ModifiedBy?: string;
  MailRespHierarchique?: string;
  MailDirHierarchique?: string;
  RequesterId: number;
}

// Function to update note expenses
export const updateNoteExpenses = async (noteExpenses: NoteExpense[]): Promise<NoteExpense[]> => {
  
  try {
    console.log(noteExpenses)
    const response = await axios.put<NoteExpense[]>('https://localhost:7151/api/NoteFraisExpenses/update', noteExpenses, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(noteExpenses)
      return response.data;
      
    } else {
      throw new Error('Failed to update note expenses');
    }
  } catch (error) {
    console.log(noteExpenses)
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data as string);
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response received from server');
      } else {
        console.error('Error message:', error.message);
        throw error;
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};



export const updateNoteFrais = async (
  id: number,
  updatedData: { TotalKm: number; NbrJours: number; TotalaPayer: number }
): Promise<NoteFraisDto> => {
  try {
    const response = await axios.put<NoteFraisDto>(`https://localhost:7151/api/NoteFrais/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating NoteFrais:", error);
    throw error;
  }
};