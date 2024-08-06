
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import "./costomStyles.css"

type Props = {
  className: string
}

const FeedsWidget2: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        <div className="container">
          <div className="row no-gutters no-borders">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                Nom & prénom :

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  Socièté :
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                Direction/Site/Service :
                </div>
              </div>
            </div>
          </div>
          <div className="row no-gutters no-borders bold-text">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body marg" >
                    Noreply, Cimar (Casablanca) MAR
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body marg">
                  Ciments du Maroc S.A.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body marg">
                  DAF - Informatique
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { FeedsWidget2 }
