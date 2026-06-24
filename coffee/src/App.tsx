import { useState } from 'react'
import { MemberManager } from './components/MemberManager'
import { HomeView } from './components/HomeView'
import { ProfileDrawer } from './components/ProfileDrawer'
import { SideNav } from './components/SideNav'
import { Avatar } from './components/Avatar'
import { CoffeeIcon } from './components/Icons'
import { useCoffeeShuttle } from './hooks/useCoffeeShuttle'
import type { Profile } from './types'
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
    applyOrderSelection,
    addGuest,
    removeGuest,
    saveProfilePreferences,
  } = useCoffeeShuttle()

  const [drawerProfileId, setDrawerProfileId] = useState<string | null>(null)
  const drawerProfile =
    state.profiles.find((p) => p.id === drawerProfileId) ?? null

  const openDrawer = (profile: Profile) => setDrawerProfileId(profile.id)
  const closeDrawer = () => setDrawerProfileId(null)

  return (
    <div className="app-shell">
      <SideNav active={state.activeView} onChange={setActiveView} />

      <div className="app-body">
        <header className="hero hero--compact">
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
                  className={`user-chip${drawerProfileId === meProfile.id ? ' is-active' : ''}`}
                  onClick={() => openDrawer(meProfile)}
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
            <HomeView
              companyName={state.companyName}
              profiles={state.profiles}
              meId={state.meId}
              selectedMemberIds={orderSelection.memberIds}
              guests={orderSelection.guests}
              onApplySelection={applyOrderSelection}
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
            />
          )}
        </main>
      </div>

      <ProfileDrawer
        profile={drawerProfile}
        onClose={closeDrawer}
        onSave={(id, data) => {
          saveProfilePreferences(id, data)
          closeDrawer()
        }}
      />
    </div>
  )
}

export default App
