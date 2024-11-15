import {SidebarMenuMain} from './SidebarMenuMain'
import "../sidebar.css"

const SidebarMenu = () => {
  return (
    <div className='app-sidebar-menu overflow-hidden flex-column-fluid bg-colorx'>
      <div
        id='kt_app_sidebar_menu_wrapper '
        className='app-sidebar-wrapper hover-scroll-overlay-y my-5  '
        data-kt-scroll='true'
        data-kt-scroll-activate='true'
        data-kt-scroll-height='auto'
        data-kt-scroll-dependencies='#kt_app_sidebar_logo, #kt_app_sidebar_footer'
        data-kt-scroll-wrappers='#kt_app_sidebar_menu'
        data-kt-scroll-offset='5px'
        data-kt-scroll-save-state='true'
      >
        <div
          className='menu menu-column menu-rounded menu-sub-indention px-3 bgmrg'
          id='#kt_app_sidebar_menu'
          data-kt-menu='true'
          data-kt-menu-expand='false'
        >
          <SidebarMenuMain />
        </div>
      </div>
    </div>
  )
}

export {SidebarMenu}
