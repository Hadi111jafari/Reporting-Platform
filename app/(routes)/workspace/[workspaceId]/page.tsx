import React from 'react'
import SideNavComponent from '../_components/SideNav'

const WorkspacePage = ({params}: {params: {workspaceId: string}}) => {
  return (
    <div>
      <SideNavComponent params={params}/>
    </div>
  )
}

export default WorkspacePage
