import React, { useRef } from "react";
import axios from "axios";

export const getDayNameInFrench = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export interface RowData {
  id: number;
  fixe: number;
  kilometrage: number;
  tauxVariable: number;
  tauxFixe: number;
  totalePayerJournalier: number;
  designation: string;
  noteFraisId:number;
  date:string
}

