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
  Modal,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import NoteDetails from "./NoteDetails";
import { NoteFraisModel } from "../../models/NoteFrais";
import "./modal.css";
 
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
  const [editNote, setEditNote] = useState<NoteFraisModel | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<NoteFraisModel | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);
 
  const formatDate = (date: Date): string => {
    if (!date) return "";
    return date.toISOString().substring(0, 10);
  };
 
  const fetchData = async () => {
    try {
      let url = `https://localhost:7151/api/NoteFrais/search?pageNumber=${pageNumber}&pageSize=${pageSize}`;
 
      if (search) {
        url += `&requesterIdPrefix=${search}`;
      }
      if (startDate) {
        url += `&startDate=${formatDate(startDate)}`;
      }
      if (endDate) {
        url += `&endDate=${formatDate(endDate)}`;
      }
      if (status) {
        url += `&statusValue=${status}`;
      }
 
      const response = await axios.get<ApiResponse>(url);
 
      if (response.data && Array.isArray(response.data.items)) {
        const notesWithDates = response.data.items.map(note => ({
          ...note,
          createdAt: new Date(note.createdAt),
          modified: new Date(note.modified),
        }));
 
        setNotes(notesWithDates);
        setTotalCount(response.data.totalCount);
        setPageNumber(response.data.pageNumber);
        setPageSize(response.data.pageSize);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("API response is not in the expected format:", response.data);
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
 
  useEffect(() => {
    fetchData();
  }, [search, startDate, endDate, status, pageNumber, pageSize]);
 
  const handleShowDetails = (note: NoteFraisModel) => {
    setSelectedNote(note);
    setShowDetails(true);
  };
 
  const handleCloseDetails = () => setShowDetails(false);
 
  const handleEdit = (note: NoteFraisModel) => {
    if (note.status === "En'attent") {
      setEditNote(note);
      setShowEditModal(true);
    }
  };
 
  const handleCloseEdit = () => setShowEditModal(false);
 
  const handleDeleteRequest = (note: NoteFraisModel) => {
    if (note.status === "En'attent") {
      setNoteToDelete(note);
      setShowDeleteConfirm(true);
    }
  };
 
  const handleDeleteConfirm = async () => {
    if (noteToDelete) {
      try {
        await axios.delete(`https://localhost:7151/api/NoteFrais/${noteToDelete.noteFraisId}`);
        setNotes(notes.filter((n) => n.noteFraisId !== noteToDelete.noteFraisId));
        setShowDeleteConfirm(false);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };
 
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  };
 
  const handleSaveEdit = async () => {
    if (editNote) {
      try {
        await axios.put(`https://localhost:7151/api/NoteFrais/${editNote.noteFraisId}`, editNote);
        setNotes(notes.map((n) => (n.noteFraisId === editNote.noteFraisId ? editNote : n)));
        handleCloseEdit();
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
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
                aria-label="End Date"
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
                      Mois/Année: {note.mois}/{note.annee}
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
                    {note.totalaPayer.toString()} DH
                  </Badge>
                  <div className="d-flex justify-content-around align-items-center">
                    <Button
                      variant="outline-success"
                      onClick={() => handleShowDetails(note)}
                      style={{height:"40px",width:"100px"}}
                    >
                      <FaEye />  
                    </Button>
                    {note.status === "En'attent" && (
                      <>
                        <Button
                          variant="outline-warning"
                          onClick={() => handleEdit(note)}
                          style={{height:"40px",width:"100px"}}
                        >
                          <FaEdit />  
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteRequest(note)}
                          style={{height:"40px",width:"100px"}}
                        >
                          <FaTrash />  
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Text>
                  Aucune note ne correspond à votre recherche.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <Row className="mt-4">
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.First onClick={() => setPageNumber(1)} />
            <Pagination.Prev
              onClick={() =>
                setPageNumber((prev) => Math.max(1, prev - 1))
              }
            />
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Pagination.Item
                  key={page}
                  active={page === pageNumber}
                  onClick={() => setPageNumber(page)}
                >
                  {page}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() =>
                setPageNumber((prev) => Math.min(totalPages, prev + 1))
              }
            />
            <Pagination.Last onClick={() => setPageNumber(totalPages)} />
          </Pagination>
        </Col>
      </Row>
     
      {selectedNote && (
        <NoteDetails
          note={selectedNote}
          show={showDetails}
          onClose={handleCloseDetails}
        />
      )}
   
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editNote && (
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMois">
                <Form.Label>Mois</Form.Label>
                <Form.Control
                  type="number"
                  value={editNote.mois}
                  onChange={(e) =>
                    setEditNote({ ...editNote, mois: parseInt(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAnnee">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  type="number"
                  value={editNote.annee}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      annee: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTotalKm">
                <Form.Label>Total KM</Form.Label>
                <Form.Control
                  type="number"
                  value={editNote.totalKm}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      totalKm: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNbrJours">
                <Form.Label>Nombre de Jours</Form.Label>
                <Form.Control
                  type="number"
                  value={editNote.nbrJours}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      nbrJours: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTotalaPayer">
                <Form.Label>Total à Payer</Form.Label>
                <Form.Control
                  type="number"
                  value={editNote.totalaPayer}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      totalaPayer: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formModifiedBy">
                <Form.Label>Modifié par</Form.Label>
                <Form.Control
                  type="text"
                  value={editNote.modifiedBy}
                  onChange={(e) =>
                    setEditNote({ ...editNote, modifiedBy: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMailRespHierarchique">
                <Form.Label>Email Responsable Hiérarchique</Form.Label>
                <Form.Control
                  type="email"
                  value={editNote.mailRespHierarchique}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      mailRespHierarchique: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMailDirHierarchique">
                <Form.Label>Email Direction Hiérarchique</Form.Label>
                <Form.Control
                  type="email"
                  value={editNote.mailDirHierarchique}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      mailDirHierarchique: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirm} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette note ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
 
export default MesNotesFrais;
 
 