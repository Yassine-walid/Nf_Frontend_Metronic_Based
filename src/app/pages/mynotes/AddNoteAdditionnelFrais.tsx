import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

interface AddNoteAdditionnelFraisProps {
  show: boolean;
  handleClose: () => void;
}

const AddNoteAdditionnelFrais: React.FC<AddNoteAdditionnelFraisProps> = ({
  show,
  handleClose,
}) => {
  const [montantIndemnite, setMontantIndemnite] = useState(828);
  const [typeFrais, setTypeFrais] = useState("");
  const [montantFrais, setMontantFrais] = useState("");
  const [date, setDate] = useState("8/12/2024");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [objet, setObjet] = useState("");
  const [commentaire, setCommentaire] = useState("");
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="modal-content d-flex justify-content-center align-items-center">
        <h1 style={{ margin: "10px" }}>Frais Additionnels</h1>
      </div>
      <Row>
        <Col style={{ margin: "20px" }}>
          <div className="modalDiv">
            <Row style={{ marginBottom: "10px", marginTop: "16px" }}>
              <Col xs={4}>
                <p>Type de frais :</p>
              </Col>
              <Col>
                <select className="form-select">
                  <option selected>Open this select menu</option>
                  <option value="01">
                    Frais de Transport (Avion, taxi,train,…)
                  </option>
                  <option value="02">Frais de logement</option>
                  <option value="03">Frais de restauration</option>
                  <option value="04">Frais de réception (invitation)</option>
                  <option value="05">
                    Frais de péage - Parking carburant VL
                  </option>
                  <option value="06">
                    Divers (Frais de timbres, légalisation, petite )
                  </option>
                </select>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Montant de frais </p>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Montant de frais "
                    aria-label="Montant de frais :"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Date </p>
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  placeholder="Start Date"
                  aria-label="Start Date"
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Bénéficiare </p>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Ajouter un Bénéficiare "
                    aria-label="Ajouter un Bénéficiare "
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Objet </p>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Ajouter Un Objet "
                    aria-label="Ajouter Un Objet "
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Commentaire </p>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ajouter Un Commentaire"
                    aria-label="Ajouter Un Commentaire"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <p>Piece Jointe </p>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="file"
                    aria-label="Sélectionner un fichier"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Button
                variant="success"
                style={{
                  width: "calc(100% - 40px)", // Subtract 40px from full width
                  marginTop: "10px",
                  padding: "12px",
                  marginLeft: "20px", // Add 20px margin on the left
                  marginRight: "20px", // Add 20px margin on the right
                }}
              >
                Ajouter
              </Button>
            </Row>
          </div>
        </Col>
        <Col style={{ margin: "20px" }}>
          <div className="modalDiv">
            <Row style={{ marginBottom: "10px", marginTop: "16px" }}>
              <Col
                style={{
                  backgroundColor: "green",
                  borderRadius: "9px",
                  margin: "10px",
                }}
              >
                <p style={{ color: "white", alignSelf: "center" }}>
                  Total A payer
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddNoteAdditionnelFrais;
