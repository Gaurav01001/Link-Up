import React from 'react'
import Sidebar from '../../components/quests/Sidebar'
import { Navbar } from '../../components/layout/Navbar'
import QuestDetail from './QuestDetail'
const QuestFeed = () => {
  return (<>
  <div>
    <Navbar />
    </div>
    <div className="flex">
        <Sidebar/>

        <main className="flex-1">
            <QuestDetail/>
            <QuestDetail/>
            <QuestDetail/>
            <QuestDetail/>
        </main>
    </div></>
  )
}

export default QuestFeed