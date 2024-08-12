import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
const ModifyNoteExpenses: FC = () => {
  const { noteFraisId } = useParams();


  const getDayNameInFrench = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  type NoteDetail = {
    id: number;
    date: string;
    kilometrage: number;
    fixe: string;
    designation: string;
  };

  const [noteDetails, setNoteDetails] = useState<NoteDetail[]>([]);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7151/api/NoteFraisExpenses/search/${noteFraisId}`
        );
        setNoteDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    if (noteFraisId) {
      fetchNoteDetails();
    }
  }, [noteFraisId]);

  return (
    <>
      <Row>
        <Col>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Jour</th>
                  <th>Date</th>
                  <th>Fixe</th>
                  <th>KMs</th>
                  <th>Désignation</th>
                  <th>Remarque</th>
                </tr>
              </thead>
              <tbody>
                {(noteDetails || []).map((item) => (
                  <tr key={item.id}>
                    <td>{getDayNameInFrench(item.date)}</td>
                    <td>{getFormattedDate(item.date)}</td>
                    <td>{item.fixe}</td>
                    <td>{item.kilometrage}</td>
                    <td>{item.designation}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md="auto">Variable width content</Col>
      </Row>
    </>
  );
};

export { ModifyNoteExpenses };
