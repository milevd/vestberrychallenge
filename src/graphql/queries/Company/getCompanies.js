import gql from 'graphql-tag'

export const GET_COMPANIES = gql`
  query GET_COMPANIES {
    companies {
      id
      name
      stage
      sector
      investmentSize
    }
  }`