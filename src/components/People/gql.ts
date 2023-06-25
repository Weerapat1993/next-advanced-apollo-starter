import { gql } from '@apollo/client';

export const PEOPLE_LIST = gql`
  query getPeoples($page: number!) {
    getPeoples(page: $page) @rest(type: "People", path: "people?page={args.page}") {
      count
      next
      previous
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
