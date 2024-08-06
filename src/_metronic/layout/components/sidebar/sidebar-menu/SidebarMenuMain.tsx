import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem to='/' icon='bookmark-2' title='Nouvelle Note' fontIcon=''  />
      <SidebarMenuItem to='/mes-notes-frais' icon='bookmark-2' title='Mes notes de frais' fontIcon='bi-layers' />
      <SidebarMenuItem to='/builder' icon='bookmark-2' title='Notes à traiter' fontIcon='bi-layers' />
    </>
  )
}

export {SidebarMenuMain}
