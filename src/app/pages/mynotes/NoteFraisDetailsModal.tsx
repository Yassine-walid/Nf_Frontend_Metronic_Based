import React, { useState, useEffect } from "react";
import { Modal, Table, Spinner, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

interface NoteFraisDetailsModalProps {
  show: boolean;
  onHide: () => void;
  noteFraisId: number;
}

interface ExpenseDetail {
  id: number;
  noteFraisId: number;
  date: string;
  kilometrage: number;
  tauxVariable: number;
  tauxFixe: number;
  fixe: number;
  designation: string;
}

interface ExpenseSummary {
  montantIndemnites: number;
  totalKilometrage: number;
  nombreDeJours: number;
}

const NoteFraisDetailsModal: React.FC<NoteFraisDetailsModalProps> = ({
  show,
  onHide,
  noteFraisId,
}) => {
  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetail[]>([]);
  const [noteFrais, setNoteFrais] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      setError(null);
      axios
        .get(
          `https://localhost:7151/api/NoteFraisExpenses/search/${noteFraisId}`
        )
        .then((response) => {
          setExpenseDetails(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching expense details:", err);
          setError("Failed to load expense details. Please try again.");
          setIsLoading(false);
        });
    }
  }, [show, noteFraisId]);

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      setError(null);
      axios
        .get(`https://localhost:7151/api/NoteFrais/${noteFraisId}`)
        .then((response) => {
          setNoteFrais(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching expense details:", err);
          setError("Failed to load expense details. Please try again.");
          setIsLoading(false);
        });
    }
  }, [show, noteFraisId]);

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

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Détails des frais</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Jour</th>
                    <th>Date</th>
                    <th>Fixe</th>
                    <th>KMs</th>
                    <th>Désignation</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseDetails.map((item) => (
                    <tr key={item.id}>
                      <td>{getDayNameInFrench(item.date)}</td>

                      <td>{getFormattedDate(item.date)}</td>
                      <td>{item.kilometrage}</td>

                      <td>{item.fixe}</td>
                      <td>{item.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}

        <Modal.Footer>
          <Row style={{ width: "100%" }}>
            <Col xs={6} style={{ fontWeight: "bold" }}>
              Nombre de jours :
            </Col>
            <Col xs={6}>{noteFrais.nbrJours}</Col>
          </Row>
          <hr style={{ width: '100%', margin: '10px 0' }} />
          <Row style={{ width: "100%" }}>
            <Col xs={6} style={{ fontWeight: "bold" }}>
              Total Kilometrage :
            </Col>
            <Col xs={6}>{noteFrais.totalKm}</Col>
          </Row>
          <hr style={{ width: '100%', margin: '10px 0' }} />
          <Row style={{ width: "100%" }}>
            <Col xs={6} style={{ fontWeight: "bold" }}>
              MONTANT INDEMNITES :
            </Col>
            <Col xs={6}>{noteFrais.totalaPayer}</Col>
          </Row>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default NoteFraisDetailsModal;
