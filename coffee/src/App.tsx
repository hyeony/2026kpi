import { MemberManager } from './components/MemberManager'
import { MeetingSelector } from './components/MeetingSelector'
import { MeetingsPanel } from './components/MeetingsPanel'
import { OrderPanel } from './components/OrderPanel'
import { PreferencesPanel } from './components/PreferencesPanel'
import { SideNav } from './components/SideNav'
import { CoffeeIcon } from './components/Icons'
import { useCoffeeShuttle } from './hooks/useCoffeeShuttle'
import './App.css'

function App() {
  const {
    state,
    activeMeeting,
    meProfile,
    activeParticipants,
    setActiveView,
    createMeeting,
    selectMeeting,
    deleteMeeting,
    renameMeeting,
    addProfile,
    updateProfile,
    deleteProfile,
    updateMyPreferences,
    addMemberToMeeting,
    removeMemberFromMeeting,
    addGuestToMeeting,
    removeGuestFromMeeting,
    toggleMemberParticipation,
    toggleGuestParticipation,
    selectAllParticipation,
    clearParticipation,
  } = useCoffeeShuttle()

  return (
    <div className="app-shell">
      <SideNav active={state.activeView} onChange={setActiveView} />

      <div className="app-body">
        <header className="hero">
          <div className="hero__glow" aria-hidden />
          <div className="hero__content">
            <div className="hero__top">
              <div className="hero__brand">
                <span className="hero__logo">
                  <CoffeeIcon size={22} />
                </span>
                <div>
                  <h1>Coffee Runner</h1>
                  <p>{state.companyName} · 팀 커피 주문, 30초면 끝</p>
                </div>
              </div>
            </div>

            {state.activeView === 'order' && (
              <MeetingSelector
                meetings={state.meetings}
                activeMeetingId={state.activeMeetingId}
                onSelect={selectMeeting}
                onCreate={createMeeting}
                onDelete={deleteMeeting}
                onRename={renameMeeting}
              />
            )}
          </div>
        </header>

        <main className="main">
          {state.activeView === 'order' && (
            activeMeeting ? (
              <OrderPanel
                meetingName={activeMeeting.name}
                companyName={state.companyName}
                participants={activeParticipants}
                participantMemberIds={activeMeeting.participation.memberIds}
                participantGuestIds={activeMeeting.participation.guestIds}
                onToggleMember={(id) => toggleMemberParticipation(activeMeeting.id, id)}
                onToggleGuest={(id) => toggleGuestParticipation(activeMeeting.id, id)}
                onSelectAll={() => selectAllParticipation(activeMeeting.id)}
                onClearAll={() => clearParticipation(activeMeeting.id)}
              />
            ) : (
              <div className="welcome">
                <div className="welcome__visual" aria-hidden>
                  <span className="welcome__cup">☕</span>
                  <span className="welcome__steam">~</span>
                </div>
                <h2>모임을 선택해 주세요</h2>
                <p>프로젝트 팀이든 웰컴티든,<br />같이 시키는 그룹을 모임으로 만들어요.</p>
              </div>
            )
          )}

          {state.activeView === 'meetings' && (
            <MeetingsPanel
              companyName={state.companyName}
              meetings={state.meetings}
              profiles={state.profiles}
              activeMeetingId={state.activeMeetingId}
              onSelect={selectMeeting}
              onCreate={createMeeting}
              onDelete={deleteMeeting}
              onRename={renameMeeting}
              onAddMember={addMemberToMeeting}
              onRemoveMember={removeMemberFromMeeting}
              onAddGuest={addGuestToMeeting}
              onRemoveGuest={removeGuestFromMeeting}
            />
          )}

          {state.activeView === 'members' && (
            <MemberManager
              companyName={state.companyName}
              profiles={state.profiles}
              meId={state.meId}
              onAdd={addProfile}
              onUpdate={updateProfile}
              onDelete={deleteProfile}
            />
          )}

          {state.activeView === 'preferences' && meProfile && (
            <PreferencesPanel profile={meProfile} onSave={updateMyPreferences} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
