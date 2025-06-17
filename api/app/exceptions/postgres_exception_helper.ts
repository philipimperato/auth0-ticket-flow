import _ from 'lodash'

export function isUniqueConstraint(error: { code: string; message: string }): boolean {
  return error.code === '23505' && error.message.includes('_unique')
}

export function getFieldFromConstraint(constraint: string): string | null {
  const match = constraint.match(/^.*?_([a-zA-Z0-9]+)_unique$/)
  return match ? match[1] : null
}

export function getUniqueConstraintMessage(constraint: string): string {
  const field = getFieldFromConstraint(constraint)
  if (!field) return 'Value must be unique'

  return `${_.capitalize(field)} must be unique`
}
