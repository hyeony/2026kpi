import { useMemo, useState } from 'react'
import { MemberManager } from './components/MemberManager'
import { OrderPanel } from './components/OrderPanel'
import { ProjectSelector } from './components/ProjectSelector'
import { TabBar } from './components/TabBar'
import { CoffeeIcon } from './components/Icons'
import { useCoffeeShuttle } from './hooks/useCoffeeShuttle'
import { aggregateDrinks, buildOrderItems } from './utils/order'
import type { TabId } from './types'
import './App.css'

function App() {
  const [tab, setTab] = useState<TabId>('members')
  const {
    state,
    activeProject,
    createProject,
    selectProject,
    deleteProject,
    renameProject,
    addMember,
    updateMember,
    deleteMember,
    toggleParticipation,
    selectAllParticipation,
    clearParticipation,
  } = useCoffeeShuttle()

  const participantCount = activeProject?.participation.memberIds.length ?? 0
  const memberCount = activeProject?.members.length ?? 0

  const totalDrinks = useMemo(() => {
    if (!activeProject) return 0
    const items = buildOrderItems(
      activeProject.members,
      activeProject.participation.memberIds,
    )
    return aggregateDrinks(items).reduce((s, d) => s + d.count, 0)
  }, [activeProject])

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__glow" aria-hidden />
        <div className="hero__content">
          <div className="hero__top">
            <div className="hero__brand">
              <span className="hero__logo">
                <CoffeeIcon size={22} />
              </span>
              <div>
                <h1>Coffee Shuttle</h1>
                <p>팀 커피 주문, 30초면 끝</p>
              </div>
            </div>
          </div>

          <ProjectSelector
            projects={state.projects}
            activeProjectId={state.activeProjectId}
            onSelect={selectProject}
            onCreate={createProject}
            onDelete={deleteProject}
            onRename={renameProject}
          />

          {activeProject && (
            <div className="hero__stats">
              <div className="stat-pill">
                <span className="stat-pill__value">{memberCount}</span>
                <span className="stat-pill__label">멤버</span>
              </div>
              <div className="stat-pill">
                <span className="stat-pill__value">{participantCount}</span>
                <span className="stat-pill__label">참여</span>
              </div>
              <div className="stat-pill stat-pill--accent">
                <span className="stat-pill__value">{totalDrinks}</span>
                <span className="stat-pill__label">잔</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="main">
        {!activeProject ? (
          <div className="welcome">
            <div className="welcome__visual" aria-hidden>
              <span className="welcome__cup">☕</span>
              <span className="welcome__steam">~</span>
            </div>
            <h2>커피 셔틀을 시작해요</h2>
            <p>프로젝트를 만들고 팀원의 선호 음료를 등록하면<br />매일 주문 문구를 자동으로 만들어 드려요.</p>
            <ul className="welcome__steps">
              <li><span>1</span> 프로젝트 생성</li>
              <li><span>2</span> 멤버 &amp; 음료 등록</li>
              <li><span>3</span> 참여 체크 후 복사</li>
            </ul>
          </div>
        ) : tab === 'members' ? (
          <MemberManager
            members={activeProject.members}
            onAdd={(name, drinks) => addMember(activeProject.id, name, drinks)}
            onUpdate={(id, name, drinks) => updateMember(activeProject.id, id, name, drinks)}
            onDelete={(id) => deleteMember(activeProject.id, id)}
          />
        ) : (
          <OrderPanel
            projectName={activeProject.name}
            members={activeProject.members}
            participantIds={activeProject.participation.memberIds}
            onToggle={(id) => toggleParticipation(activeProject.id, id)}
            onSelectAll={() => selectAllParticipation(activeProject.id)}
            onClearAll={() => clearParticipation(activeProject.id)}
          />
        )}
      </main>

      {activeProject && (
        <TabBar
          active={tab}
          onChange={setTab}
          memberCount={memberCount}
          participantCount={participantCount}
        />
      )}
    </div>
  )
}

export default App
