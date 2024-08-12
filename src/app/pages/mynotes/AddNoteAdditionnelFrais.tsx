import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

interface AddNoteAdditionnelFraisProps {
  show: boolean;
  handleClose: () => void;
}

const AddNoteAdditionnelFrais: React.FC<AddNoteAdditionnelFraisProps> = ({ show, handleClose }) => {
  return (
    <Modal   show={show} onHide={handleClose}>
      <Row>
        <Col style={{margin:"20px"}}>
            <p>Frais Additionnels</p>
            
            <select
                        className="form-select"
                         
                         
                      >
                        <option selected>Open this select menu</option>
                        <option value="01">Frais de Transport (Avion, taxi,train,…)</option>
                        <option value="02">Frais de logement</option>
                        <option value="03">Frais de restauration</option>
                        <option value="04">Frais de réception (invitation)</option>
                        <option value="05">Frais de péage - Parking carburant VL</option>
                        <option value="06">Divers (Frais de timbres, légalisation, petite )</option>
                      </select>
        </Col>
        <Col>test</Col>
      </Row>
    </Modal>
  );
};

export default AddNoteAdditionnelFrais;