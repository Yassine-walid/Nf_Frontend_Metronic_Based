import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FaCheck, FaEye } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import NoteDetails from "./NoteDetails";
import { NoteFraisModel } from "../../models/noteFrais"; // Adjust the import path as needed

const MesNotesFrais: FC = () => {
    const [search, setSearch] = useState<string>('');
    const [notes, setNotes] = useState<NoteFraisModel[]>([]);
    const [selectedNote, setSelectedNote] = useState<NoteFraisModel | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');

  

  const formatDate = (date: string): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US');
  };


  useEffect(() => {
    const fetchData = async () => {
      setNotes([]);
      try {
        let url = 'https://localhost:7151/api/NoteFrais/search?';

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

        console.log(url)

        // Remove the trailing '&' or '?' if no parameters are added
        url = url.slice(0, -1);

        console.log(url)

        const response = await axios.get<NoteFraisModel[]>(url);
        console.log(response.data);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [search, startDate, endDate, status]);

  const handleShowDetails = (note: NoteFraisModel) => {
    setSelectedNote(note);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const clearFields = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    setStatus('');
  };

  return (
    <div className="container">
      <h1>NOTE DE REMBOURSEMENT DE FRAIS</h1>
      <Card style={{ width: "100%", marginBottom: "30px" }}>
        <Card.Body>
          <Row>
            <Col xs={3}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Recherche"
                aria-label="Recherche"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col xs={3}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
                placeholder="Start Date"
                aria-label="Start Date"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col xs={3}>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
                placeholder="End Date"
                aria-label="End Date"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col xs={2}>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">Status</option>
                <option value="En'attent">En'attent</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </Col>
            <Col xs={1}>
            <Button
                variant="link"
                style={{ 
                  padding: '8px', 
                  width:'60px',
                  color: 'inherit', 
                  textDecoration: 'none', 
                  border: '3px solid green',
                  borderRadius: '5px' 
                }}
                onClick={clearFields}
              >
                <i className="fas fa-times"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note, index) => (
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
                {
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
                }
              </Card.Body>
            </Card>
          </Col>
        ))}
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

export { MesNotesFrais };
