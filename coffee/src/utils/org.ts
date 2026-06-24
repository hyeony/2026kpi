import type { DepartmentGroup, Profile } from '../types'

const DEPT_ORDER = [
  'Strategy',
  'Development',
  'Interaction',
  'UX',
  'Visual',
  'PMO Group',
  'C level',
]

export function groupProfilesByDepartment(profiles: Profile[]): DepartmentGroup[] {
  const map = new Map<string, Profile[]>()

  for (const profile of profiles) {
    const list = map.get(profile.department) ?? []
    list.push(profile)
    map.set(profile.department, list)
  }

  const known = DEPT_ORDER.filter((d) => map.has(d)).map((department) => ({
    department,
    members: map.get(department)!.sort((a, b) => a.name.localeCompare(b.name, 'ko')),
  }))

  const rest = [...map.keys()]
    .filter((d) => !DEPT_ORDER.includes(d))
    .sort()
    .map((department) => ({
      department,
      members: map.get(department)!.sort((a, b) => a.name.localeCompare(b.name, 'ko')),
    }))

  return [...known, ...rest]
}
