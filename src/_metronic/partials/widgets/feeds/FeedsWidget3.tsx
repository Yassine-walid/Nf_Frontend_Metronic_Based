import React, { FC, useState, ChangeEvent } from "react";
import { FormControl, FormControlProps } from "react-bootstrap";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { Dropdown2 } from "../../content/dropdown/Dropdown2";

import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  className: string;
};





const FeedsWidget3: FC<Props> = ({ className }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    createdAt: new Date().toISOString(),
    annee: new Date().getFullYear(),
    mois: new Date().getMonth() + 1,
    requesterId: 0,
    mailRespHierarchique: "",
    mailDirHierarchique: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://localhost:7151/api/NoteFrais', formData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
      });
      console.log('Data saved successfully:', response.data);

      const noteFraisId = response.data;
      
      navigate(`/modify-note-expenses/${noteFraisId}`);

      
    } catch (error) {
      console.error('Error saving data:', error);
      
    }
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body pb-0">
        <div className="container">
          <div className="row no-gutters no-borders">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p>Matricule</p>
                  <FormControl 
                  
                  type="text"
                  name="requesterId"
                  value={formData.requesterId}
                  onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p>Mois / Année</p>
                  <div className="row">
                    <div className="col-md-8">
                      <select
                        className="form-select"
                        name="mois"
                        value={formData.mois}
                        onChange={handleInputChange}
                      >
                        <option selected>Open this select menu</option>
                        <option value="01">Janvier</option>
                        <option value="02">Février</option>
                        <option value="03">Mars</option>
                        <option value="04">Avril</option>
                        <option value="05">Mai</option>
                        <option value="06">Juin</option>
                        <option value="07">Juillet</option>
                        <option value="08">Août</option>
                        <option value="09">Septembre</option>
                        <option value="10">Octobre</option>
                        <option value="11">Novembre</option>
                        <option value="12">Décembre</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                    <FormControl
                      type="number"
                      name="annee"
                      value={formData.annee}
                      onChange={handleInputChange}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cont">
          <div className="row">
            <div className="col-md-4">
              <p>Validateur 1</p>
              <select
                className="form-select"
                name="mailRespHierarchique"
                value={formData.mailRespHierarchique}
                onChange={handleInputChange}
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <p>Responsable hiérarchique</p>
              <select
                className="form-select"
                name="mailDirHierarchique"
                value={formData.mailDirHierarchique}
                onChange={handleInputChange}
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <p>Directeur</p>
              <select
               className="form-select"
               name="mailDirHierarchique"
               value={formData.mailDirHierarchique}
               onChange={handleInputChange}
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <span className="mx-5"></span>
          </div>
          <button type="button" className="btn btn-prv mb-3  " onClick={handleSubmit}>Valider</button>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { FeedsWidget3 };
