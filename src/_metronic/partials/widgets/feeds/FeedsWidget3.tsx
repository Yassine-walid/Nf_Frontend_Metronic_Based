
import { FC } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown2 } from '../../content/dropdown/Dropdown2'
import { FormControl } from 'react-bootstrap'

type Props = {
  className: string
}

const FeedsWidget3: FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        <div className="container">
          <div className="row no-gutters no-borders">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p>Matricule</p>
                  <FormControl datatype='email' />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <p>
                    Mois / Année</p>
                  <div className='row'>
                    <div className='col-md-8'>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className='col-md-2'>
                      <FormControl datatype='email' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cont">
        <div className='row'>
          <div className='col-md-4' >
            <p>Validateur 1</p>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className='col-md-4'>
            <p>Responsable hiérarchique</p>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className='col-md-4'>
            <p>Directeur</p>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <span className='mx-5'></span>
        </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { FeedsWidget3 }
