import { MemberManager } from './components/MemberManager'
import { MyPage } from './components/MyPage'
import { OrgOrderBuilder } from './components/OrgOrderBuilder'
import { SideNav } from './components/SideNav'
import { Avatar } from './components/Avatar'
import { CoffeeIcon } from './components/Icons'
import { useCoffeeShuttle } from './hooks/useCoffeeShuttle'
import './App.css'

function App() {
  const {
    state,
    meProfile,
    orderSelection,
    setActiveView,
    toggleOrderMember,
    selectDepartment,
    clearDepartment,
    clearOrderSelection,
    addGuest,
    removeGuest,
    addProfile,
    updateProfile,
    deleteProfile,
    updateMyPreferences,
  } = useCoffeeShuttle()

  return (
    <div className="app-shell">
      <SideNav active={state.activeView} onChange={setActiveView} />

      <div className="app-body">
        <header className="hero">
          <div className="hero__content">
            <div className="hero__top">
              <div className="hero__brand">
                <span className="hero__logo">
                  <CoffeeIcon size={22} />
                </span>
                <div>
                  <h1>Coffee Shuttle</h1>
                  <p>{state.companyName}</p>
                </div>
              </div>

              {meProfile && (
                <button
                  type="button"
                  className={`user-chip${state.activeView === 'mypage' ? ' is-active' : ''}`}
                  onClick={() => setActiveView('mypage')}
                >
                  <Avatar name={meProfile.name} size="sm" />
                  <span>{meProfile.name}</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className={`main${state.activeView === 'home' ? ' main--home' : ''}`}>
          {state.activeView === 'home' && (
            <OrgOrderBuilder
              companyName={state.companyName}
              profiles={state.profiles}
              meId={state.meId}
              selectedMemberIds={orderSelection.memberIds}
              guests={orderSelection.guests}
              onToggleMember={toggleOrderMember}
              onSelectDepartment={selectDepartment}
              onClearDepartment={clearDepartment}
              onClearAll={clearOrderSelection}
              onAddGuest={addGuest}
              onRemoveGuest={removeGuest}
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

          {state.activeView === 'mypage' && meProfile && (
            <MyPage
              profile={meProfile}
              companyName={state.companyName}
              onSave={updateMyPreferences}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
