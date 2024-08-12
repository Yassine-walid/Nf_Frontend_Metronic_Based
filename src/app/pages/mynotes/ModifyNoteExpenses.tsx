import axios from "axios";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDayNameInFrench, getFormattedDate, RowData } from "./helpers";
import { NoteFraisDto, updateNoteExpenses, updateNoteFrais } from "./requestHandlers";
import AddNoteAdditionnelFrais from "./AddNoteAdditionnelFrais";
import { parse } from "path";
import { number } from "yup";

const ModifyNoteExpenses: FC = () => {
  const { noteFraisId } = useParams();

  const [noteId, setNoteId] = useState();
   
  const [noteFrais, setNoteFrais] = useState<NoteFraisDto | null>(null);

  const [showModalAddNotesAdditionnel, setShowModalAddNotesAdditionnel] =
    useState(false);

  const handleOpen = () => setShowModalAddNotesAdditionnel(true);
  const handleClose = () => setShowModalAddNotesAdditionnel(false);

  type NoteDetail = {
    id: number;
    date: string;
    kilometrage: number;
    fixe: number;
    designation: string;
    tauxFixe: number;
    tauxVariable: number;
    totalePayerJournalier: number;
    noteFraisId: number;
  };

  const [noteDetails, setNoteDetails] = useState<NoteDetail[]>([]);
   
  const [selectedRow, setSelectedRow] = useState<NoteDetail>({
    id: 0,
    date: "",
    kilometrage: 0,
    fixe: 0,
    designation: "",
    tauxFixe: 0,
    tauxVariable: 0,
    totalePayerJournalier: 0,
    noteFraisId: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [totalToPay, setTotalToPay] = useState(0);
  const [nbrJours, setNbrJours] = useState(0);
  const [totalKilometrage, setTotalKilometrage] = useState(0);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7151/api/NoteFraisExpenses/search/${noteFraisId}`
        );
        const updatedData = response.data.map((item: NoteDetail) => ({
          ...item,
          totalePayerJournalier:
            item.fixe * item.tauxFixe + item.kilometrage * item.tauxVariable,
        }));
        setNoteDetails(updatedData);
        calculateTotalToPay(updatedData);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    if (noteFraisId) {
      fetchNoteDetails();
    }
  }, [noteFraisId]);

  const handleRowClick = (row: NoteDetail) => {
    setSelectedRow(row);
    setIsEditMode(false);
  };

  const handleInputChange = (field: keyof NoteDetail, value: any) => {
    const updatedRow = { ...selectedRow, [field]: value };

    // Recalculate totalePayerJournalier
    if (updatedRow.fixe !== 0) {
      updatedRow.totalePayerJournalier =
        updatedRow.fixe * updatedRow.tauxFixe +
        updatedRow.kilometrage * updatedRow.tauxVariable;
    } else {
      updatedRow.totalePayerJournalier = 0;
    }

    // Update the selected row with the new values
    setSelectedRow(updatedRow);

    // Recalculate totals
    const updatedNoteDetails = noteDetails.map((item) =>
      item.id === selectedRow.id ? updatedRow : item
    );

    setNoteDetails(updatedNoteDetails);
    calculateTotalToPay(updatedNoteDetails);
  };

  const handleSubmit = async () => {
    try {
      const updatedRow = {
        ...selectedRow,
        totalePayerJournalier:
          selectedRow.fixe * selectedRow.tauxFixe +
          selectedRow.kilometrage * selectedRow.tauxVariable,
      };

      // Update the note details
      const updatedNoteDetails = noteDetails.map((item) =>
        item.id === selectedRow.id ? updatedRow : item
      );

      setNoteDetails(updatedNoteDetails);
      calculateTotalToPay(updatedNoteDetails);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating note details:", error);
    }
  };

  const calculateTotalToPay = (data: NoteDetail[]) => {
    // Calculate total before update
    const totalBefore = noteDetails.reduce(
      (acc, item) => (item.fixe !== 0 ? acc + item.totalePayerJournalier : acc),
      0
    );

    // Calculate total after update
    const totalAfter = data.reduce(
      (acc, item) => (item.fixe !== 0 ? acc + item.totalePayerJournalier : acc),
      0
    );

    // Calculate total days
    const totalJrs = data.reduce(
      (acc, item) =>
        item.fixe !== 0 ? acc + parseInt(item.fixe.toString()) : acc,
      0
    );

    // Calculate total kilometrage
    const totalKilometrageT = data.reduce(
      (acc, item) => (item.fixe !== 0 ? acc + item.kilometrage : acc),
      0
    );

    // Calculate the difference
    const difference = totalAfter - totalBefore;

    // Update totals
    setTotalToPay(totalAfter);
    setNbrJours(totalJrs);
    setTotalKilometrage(totalKilometrageT);
  };

  const tableRef = useRef<HTMLTableElement>(null);

  const handleExport = async () => {
    if (!tableRef.current) {
      console.error("Table reference is undefined.");
      return;
    }

    const rows = tableRef.current.querySelectorAll("tbody tr");
    const dataToExport: RowData[] = [];

    

    rows.forEach((row) => {

      
      const cells = row.querySelectorAll("td");

      const dateParts = cells[2].innerText.split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; 

      const rowData: RowData = {
        id: parseInt(cells[0].innerText), 
        fixe: parseInt(cells[3].innerText),
        kilometrage: parseInt(cells[4].innerText),
        tauxVariable: parseInt(cells[6].innerText),
        tauxFixe: parseInt(cells[7].innerText),
        totalePayerJournalier: parseInt(cells[8].innerText),
        designation: cells[5].innerText,
        noteFraisId: parseInt(cells[9].innerText),
        date:formattedDate 
      };
      dataToExport.push(rowData);
       
    });

    const jsonData = JSON.stringify(dataToExport, null, 2);

    console.log(jsonData);
    console.log(totalToPay);
    console.log(totalKilometrage);
    console.log(nbrJours);

    updateNoteExpenses(dataToExport);

    try {
      const updatedData = {
        TotalKm: totalKilometrage,
        NbrJours: nbrJours,
        TotalaPayer: totalToPay
      };

      const updatedNoteFrais = await updateNoteFrais(Number(noteFraisId), updatedData);
      setNoteFrais(updatedNoteFrais);
      console.log("NoteFrais updated successfully:", updatedNoteFrais);
    } catch (error) {
      console.error("Failed to update NoteFrais:", error);
    }
  };

  

  return (
    <Row className="g-4">
      <Col xs={8}>
        <div
          style={{ maxHeight: "500px", maxWidth: "100%", overflowY: "auto" }}
        >
          <div className="sticky-header">
            <h4 style={{ color: "white" }}>
              Total à payer: {totalToPay.toFixed(2)} Dhs
            </h4>
            <h4 style={{ color: "white" }}>Nombre de Jours: {nbrJours}</h4>
            <h4 style={{ color: "white" }}>
              Total Kilometrage: {totalKilometrage.toFixed(2)} Km
            </h4>
          </div>
          <Table striped bordered hover ref={tableRef}>
            <thead>
              <tr>
                <th hidden>Id</th>
                <th>Jour</th>
                <th>Date</th>
                <th>Fixe</th>
                <th>KMs</th>
                <th>Désignation</th>
                <th>Taux Fixe</th>
                <th>Taux Variable</th>
                <th>Totale A payer</th>
                <th hidden>IdNote</th>
              </tr>
            </thead>
            <tbody>
              {noteDetails.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <td hidden>{item.id}</td>
                  <td>{getDayNameInFrench(item.date)}</td>
                  <td>{getFormattedDate(item.date)}</td>
                  <td>{item.fixe}</td>
                  <td>{item.kilometrage}</td>
                  <td>{item.designation}</td>
                  <td>{item.tauxFixe}</td>
                  <td>{item.tauxVariable}</td>
                  <td>{item.totalePayerJournalier}</td>
                  <td hidden>{item.noteFraisId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
      <Col xs={4}>
        <Form>
          <Form.Group controlId="id" hidden>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={selectedRow.id} disabled />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={getFormattedDate(selectedRow.date)}
              disabled={true}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="kilometrage">
            <Form.Label>KMs</Form.Label>
            <Form.Control
              type="number"
              value={selectedRow.kilometrage}
              disabled={!isEditMode}
              onChange={(e) =>
                handleInputChange("kilometrage", parseInt(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="fixe">
            <Form.Label>Fixe</Form.Label>
            <Form.Control
              type="text"
              value={selectedRow.fixe}
              disabled={!isEditMode}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "1" || value === "0") {
                  handleInputChange("fixe", parseInt(value));
                } else {
                  // Optionally, provide feedback to the user
                  console.log("Only 1 or 0 is allowed.");
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="designation">
            <Form.Label>Désignation</Form.Label>
            <Form.Control
              type="text"
              value={selectedRow.designation}
              disabled={!isEditMode}
              onChange={(e) => handleInputChange("designation", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="tauxFixe">
            <Form.Label>Taux Fixe</Form.Label>
            <Form.Control
              type="number"
              value={selectedRow.tauxFixe}
              disabled={!isEditMode}
              onChange={(e) =>
                handleInputChange("tauxFixe", parseFloat(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="tauxVariable">
            <Form.Label>Taux Variable</Form.Label>
            <Form.Control
              type="number"
              value={selectedRow.tauxVariable}
              disabled={!isEditMode}
              onChange={(e) =>
                handleInputChange("tauxVariable", parseFloat(e.target.value))
              }
            />
          </Form.Group>
          <Row>
            <Col>
              {isEditMode && (
                <Button
                  variant="success"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={handleSubmit}
                >
                  Modify
                </Button>
              )}
              {!isEditMode && (
                <Button
                  variant="warning"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </Col>
            <Col>
              <Button
                variant="success"
                style={{ width: "100%", marginTop: "10px" }}
                onClick={() => handleExport()}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row>
           <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth:"100%"}}>
           <Button style={{backgroundColor:"green", marginTop:"10px" , maxWidth:"90%"  }} onClick={handleOpen}>
              Ajout Du Frais Additionnels
            </Button>
           </div>
            <AddNoteAdditionnelFrais show={showModalAddNotesAdditionnel} handleClose={handleClose} />
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export { ModifyNoteExpenses };
