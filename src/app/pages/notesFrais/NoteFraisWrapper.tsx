import { FC ,useEffect,useState} from 'react'
import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  FeedsWidget6,
  FeedsWidget2,
  FeedsWidget3,
} from '../../../_metronic/partials/widgets'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { date } from 'yup'



const chatBreadCrumbs: PageLink = 
  {
    title: 'Accueil',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  } 

  const accBreadCrumbs: PageLink = 
  {
    title: 'Mes Notes de Frais',
    path: '/notefrais',
    isSeparator: false,
    isActive: false,
  } 
 



const NoteFraisWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[chatBreadCrumbs,accBreadCrumbs]}>NOTE DE REMBOURSEMENT DE FRAIS</PageTitle>
      <FeedsWidget2  className=''/>
      <span className='mx-5'></span>
      <FeedsWidget3  className=''/>
      <button type="button" className="btn btn-prv">Valider</button>
    </>
  )
}

export { NoteFraisWrapper }
