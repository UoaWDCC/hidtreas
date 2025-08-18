import { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user?.roles?.includes('admin')) {
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
  return Boolean(user?.roles?.includes('editor') || user?.roles?.includes('admin'))
}

export const isEditorOrAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('editor') || user?.roles?.includes('admin'))
}
