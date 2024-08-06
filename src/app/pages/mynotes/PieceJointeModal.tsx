import React, { useState, useEffect } from "react";
import { Modal, Carousel, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import "./modal.css"

interface PieceJointeModalProps {
  show: boolean;
  onHide: () => void;
  fraisId: number;
}

const PieceJointeModal: React.FC<PieceJointeModalProps> = ({
  show,
  onHide,
  fraisId,
}) => {
  const [piecesJointes, setPiecesJointes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      setError(null);
      axios
        .get<any[]>(
          `https://localhost:7151/api/PieceJointe/frais-additionnel/${fraisId}`
        )
        .then((response) => {
          console.log(response.data);
          setPiecesJointes(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching pieces jointes:", err);
          setError("Failed to load attachments. Please try again.");
          setIsLoading(false);
        });
    }
  }, [show, fraisId]);

  const isPDF = (url: string) => {
    return url.toLowerCase().endsWith(".pdf");
  };

  const openPDFInNewTab = (url: string) => {
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pièces Jointes</Modal.Title>
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
        ) : piecesJointes.length > 0 ? (
          <Carousel controls indicators className="custom-carousel">
            {piecesJointes.map((piece) => (
              <Carousel.Item key={piece.id}>
                {isPDF(piece.pieceJointeUrl) ? (
                  <div
                    className="text-center d-flex align-items-center justify-content-center"
                    style={{ height: "500px" }}
                  >
                    <div>
                      <p>PDF Document</p>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(piece.pieceJointeUrl, "_blank");
                        }}
                      >
                        Open PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center" style={{ height: "500px" }}>
                    <img
                      className="img-fluid h-100"
                      src={piece.pieceJointeUrl}
                      alt={`Piece jointe ${piece.id}`}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>No attachments found.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PieceJointeModal;
