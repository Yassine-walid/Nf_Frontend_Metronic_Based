import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Table } from "react-bootstrap";
import { FaCalendarAlt, FaPaperclip, FaTimes } from "react-icons/fa";
import { NoteFraisModel } from "../../models/NoteFrais";
import { FraisAdditionnels } from "../../models/FraisAdditionnels";
import axios from "axios";
import PieceJointeModal from "./PieceJointeModal";
import NoteFraisDetailsModal from "./NoteFraisDetailsModal";

interface NoteDetailsProps {
  note: NoteFraisModel;
  show: boolean;
  onClose: () => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note, show, onClose }) => {
    const [fraisAdditionnels, setFraisAdditionnels] = useState<FraisAdditionnels[] | null>(null);
    const [showPieceJointeModal, setShowPieceJointeModal] = useState(false);
  const [selectedFraisId, setSelectedFraisId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNoteFraisId, setSelectedNoteFraisId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      setError(null);
      setFraisAdditionnels([]);
      axios
        .get<FraisAdditionnels[]>(
          `https://localhost:7151/api/FraisAdditionnels/noteFrais/${note.noteFraisId}`
        )
        .then((response) => {
          setFraisAdditionnels(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [show, note.noteFraisId]);

  const handleRowClick = (fraisId: number) => {
    console.log(fraisId)
    setSelectedFraisId(fraisId);
    setShowPieceJointeModal(true);
  };

  const handleShowDetails = (noteFraisId: number) => {
    setSelectedNoteFraisId(noteFraisId);
    setShowDetailsModal(true);
  };


  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Cimar Noreply / DAF - Informatique</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <div>
            Statut: <span className="text-warning">{note.status}</span>
          </div>
          <div>
            <Button variant="link">Revoir</Button>
          </div>
        </div>

        <div className="border p-3 mb-3">
          <div className="row">
            <div className="col-md-8">
              <strong>Mois/Année:</strong> {note.mois.toString()}/
              {note.annee.toString()}
            </div>
            <div className="col-md-4">
              <strong>Objet:</strong> Indemnité Kilométrique
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <strong>Total Km:</strong> {note.totalKm.toString()} KM
            </div>
            <div className="col-md-6">
              <strong>Indemnité Kilométrique:</strong>{" "}
              <span className="text-primary">
                {note.totalaPayer.toString()} DHs
              </span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : fraisAdditionnels ? (
          <Table bordered hover>
          <tbody>
            {fraisAdditionnels.map((frais) => (
              <tr key={frais.id} onClick={() => handleRowClick(frais.id)} style={{ cursor: 'pointer' }}>
                <td>{frais.type}</td>
                <td className="text-end">{frais.montant} DHs</td>
              </tr>
            ))}
          </tbody>
        </Table>
        ) : (
          <p>No additional expenses found.</p>
        )}

        <div className="d-flex justify-content-between border p-3 mb-3">
         
          <div>
            
            <Button variant="link" onClick={() => handleShowDetails(note.noteFraisId)}>
            <FaCalendarAlt /> Calendrier :
              Cliquez pour visualiser l'ensemble du mois
            </Button>
          </div>
        </div>

        <div className="text-center bg-light p-3">
          <strong>Total à payer : </strong>
          <span
            className="bg-success text-white p-2 d-inline-block"
            style={{ width: "150px" }}
          >
            {note.totalaPayer.toString()} DHs
          </span>
        </div>
      </Modal.Body>

      <PieceJointeModal
        show={showPieceJointeModal}
        onHide={() => setShowPieceJointeModal(false)}
        fraisId={selectedFraisId!}
      />

<NoteFraisDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        noteFraisId={selectedNoteFraisId!}
      />

      
    </Modal>

    
  );
};

export default NoteDetails;
