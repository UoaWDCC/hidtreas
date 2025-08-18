import { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }
  return false
}

export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'editor' || user?.role === 'admin')
}

export const isEditorOrAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role === 'editor' || user?.role === 'admin')
}
