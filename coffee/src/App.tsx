import { useMemo, useState } from 'react';
import { MemberList } from './components/MemberList';
import { OrderPanel } from './components/OrderPanel';
import { ParticipationPanel } from './components/ParticipationPanel';
import { ProjectSelector } from './components/ProjectSelector';
import { useCoffeeShuttle } from './hooks/useCoffeeShuttle';
import {
  aggregateDrinks,
  buildOrderItems,
  getParticipatingMembers,
} from './lib/order';
import type { Tab } from './types';
import './App.css';

function App() {
  const [tab, setTab] = useState<Tab>('members');
  const shuttle = useCoffeeShuttle();

  const orderItems = useMemo(() => {
    if (!shuttle.activeProject) return [];
    const members = getParticipatingMembers(
      shuttle.activeProject,
      shuttle.todayParticipation,
    );
    return buildOrderItems(members);
  }, [shuttle.activeProject, shuttle.todayParticipation]);

  const aggregated = useMemo(() => aggregateDrinks(orderItems), [orderItems]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            ☕
          </span>
          <div>
            <h1>Coffee Shuttle</h1>
            <p>팀 커피 주문을 쉽게</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ProjectSelector
          projects={shuttle.data.projects}
          activeProjectId={shuttle.data.activeProjectId}
          onSelect={shuttle.setActiveProject}
          onAdd={shuttle.addProject}
          onDelete={shuttle.deleteProject}
          onRename={shuttle.updateProjectName}
        />

        {!shuttle.activeProject ? (
          <section className="card welcome-card">
            <p>프로젝트를 선택하거나 새로 만들어 시작하세요.</p>
          </section>
        ) : (
          <>
            <nav className="tab-nav" aria-label="주요 메뉴">
              <button
                type="button"
                className={`tab-btn ${tab === 'members' ? 'active' : ''}`}
                onClick={() => setTab('members')}
              >
                멤버 관리
              </button>
              <button
                type="button"
                className={`tab-btn ${tab === 'order' ? 'active' : ''}`}
                onClick={() => setTab('order')}
              >
                오늘 주문
                {shuttle.todayParticipation.length > 0 && (
                  <span className="tab-badge">{shuttle.todayParticipation.length}</span>
                )}
              </button>
            </nav>

            {tab === 'members' ? (
              <MemberList
                members={shuttle.activeProject.members}
                onAdd={shuttle.addMember}
                onUpdate={shuttle.updateMember}
                onDelete={shuttle.deleteMember}
              />
            ) : (
              <>
                <ParticipationPanel
                  members={shuttle.activeProject.members}
                  participatingIds={shuttle.todayParticipation}
                  todayDate={shuttle.todayDate}
                  onToggle={shuttle.toggleParticipation}
                  onSelectAll={shuttle.selectAllParticipation}
                  onClear={shuttle.clearParticipation}
                />
                <OrderPanel
                  projectName={shuttle.activeProject.name}
                  todayDate={shuttle.todayDate}
                  orderItems={orderItems}
                  aggregated={aggregated}
                />
              </>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <span>데이터는 브라우저에 저장됩니다</span>
      </footer>
    </div>
  );
}

export default App;
