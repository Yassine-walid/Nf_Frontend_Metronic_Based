import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Pagination,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import NoteDetails from "./NoteDetails";
import "./modal.css";

export type NoteFraisModel = {
  noteFraisId: number;
  title: string;
  status: string;
  createdAt: Date;
  annee: Int32Array;
  mois: Int32Array;
  totalKm: Int32Array;
  nbrJours: Int32Array;
  totalaPayer: Int32Array;
  modified: Date;
  modifiedBy: string;
  mailRespHierarchique: string;
  mailDirHierarchique: string;
  requesterId: Int32Array;
};

interface ApiResponse {
  items: NoteFraisModel[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

const MesNotesFrais: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [notes, setNotes] = useState<NoteFraisModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteFraisModel | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const formatDate = (date: Date): string => {
    if (!date) return "";
    return date.toISOString().substring(0, 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://localhost:7151/api/NoteFrais/search?";

        if (search) {
          url += `requesterIdPrefix=${search}&`;
        }
        if (startDate) {
          url += `startDate=${formatDate(startDate)}&`;
        }
        if (endDate) {
          url += `endDate=${formatDate(endDate)}&`;
        }
        if (status) {
          url += `statusValue=${status}&`;
        }

        url += `pageNumber=${pageNumber}&pageSize=${pageSize}`;

        const response = await axios.get<ApiResponse>(url);

        console.log(url);

        if (response.data && Array.isArray(response.data.items)) {
          setNotes(response.data.items);
          setTotalCount(response.data.totalCount);
          setPageNumber(response.data.pageNumber);
          setPageSize(response.data.pageSize);
          setTotalPages(response.data.totalPages);
        } else {
          console.error(
            "API response is not in the expected format:",
            response.data
          );
          setNotes([]);
          setTotalCount(0);
          setPageNumber(1);
          setPageSize(10);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotes([]);
        setTotalCount(0);
        setPageNumber(1);
        setPageSize(10);
        setTotalPages(1);
      }
    };
 
    fetchData();
  }, [search, startDate, endDate, status, pageNumber, pageSize]);

  const handleShowDetails = (note: NoteFraisModel) => {
    setSelectedNote(note);
    setShowDetails(true);
  };
 
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
 
  const clearFields = () => {
    setSearch("");
    setStartDate(null);
    setEndDate(null);
    setStatus("");
    setPageNumber(1);
  };
 
  return (
    <div className="container">
      <h1>NOTE DE REMBOURSEMENT DE FRAIS</h1>
      <Card style={{ width: "100%", marginBottom: "30px" }}>
        <Card.Body>
          <Row>
            <Col xs={3}>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Recherche"
                aria-label="Recherche"
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                type="date"
                value={startDate ? startDate.toISOString().substring(0, 10) : ""}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                placeholder="Start Date"
                aria-label="Start Date"
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                type="date"
                value={endDate ? endDate.toISOString().substring(0, 10) : ""}
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                placeholder="End Date"
                aria-Label="End Date"
              />
            </Col>
            <Col xs={2}>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Status select"
              >
                <option value="">Status</option>
                <option value="En'attent">En'attent</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Col>
            <Col xs={1}>
              <Button
                variant="outline-success"
                onClick={clearFields}
                style={{ padding: "8px", width: "60px" }}
              >
                <i className="fas fa-times"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Col key={index}>
              <Card className="" style={{ maxWidth: "380px", margin: "auto" }}>
                <Card.Text
                  style={{ fontWeight: "bold" }}
                  className="bg-white text-center border rounded-top p-3 border-success"
                >
                  Matricule: {note.requesterId.toString()}
                </Card.Text>
                <Card.Body className="text-center">
                  <Card.Title className="text-lg">{note.title}</Card.Title>
                  <Card.Text>Indemnité Kilométrique</Card.Text>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <CiCalendar className="text-success me-2" size={20} />
                    <span>
                      Mois/Année: {note.mois.toString()}/{note.annee.toString()}
                    </span>
                  </div>
                  <Badge
                    bg="success"
                    className="p-2 mb-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "120px",
                      fontSize: "1.1em",
                      margin: "0 auto",
                    }}
                  >
                    {note.totalaPayer.toString()} DHs
                  </Badge>
                  <div
                    className="text-success"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleShowDetails(note)}
                  >
                    <FaEye className="me-1" />
                    Validée
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Aucune note disponible</p>
          </Col>
        )}
      </Row>
      <Row className="mt-3">
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              disabled={pageNumber === 1}
              className="pagination-prev"
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === pageNumber}
                onClick={() => setPageNumber(index + 1)}
                className={`pagination-item ${
                  index + 1 === pageNumber ? "active" : ""
                }`}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setPageNumber((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={pageNumber === totalPages}
              className="pagination-next"
            />
          </Pagination>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>
          Affichage de {notes.length} sur  {totalCount} résultats totaux
          </p>
        </Col>
      </Row>
      {selectedNote && (
        <NoteDetails
          note={selectedNote}
          show={showDetails}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export { MesNotesFrais }
