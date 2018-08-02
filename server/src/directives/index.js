import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import ConstraintDirective from 'graphql-constraint-directive'

class LowerCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
      field.resolve = async function (...args) {
        const result = await resolve.apply(this, args)
        if (typeof result === 'string') {
          return result.toLowerCase()
        }
        return result
      }
  }
}

const directives = {
  lowerCase: LowerCaseDirective,
  constraint: ConstraintDirective,
}

export default directives
