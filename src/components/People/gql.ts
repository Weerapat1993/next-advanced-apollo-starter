import { gql } from '@apollo/client';

export const PEOPLE_LIST = gql`
  query peoples {
    peoples @rest(type: "People", path: "people") {
      count
      results
    }
  }
`;

export const PEOPLE_BY_ID = gql`
  query getPeopleById($id: string!) {
    getPeopleById(id: $id) @rest(type: "PeopleById", path: "people/{args.id}") {
      name
      gender
      height
      mass
      created
      edited
    }
  }
`
