import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const GET_USER = (id) => gql`
    {
        user(id: "${id}") {
            id
            name
            blogs {
                title
                category {
                    name
                }
            }
        }
    }
`

console.log(GET_USER("2"))

export default () => {
  return (
    <Query query={GET_USER("2")} ssr={true}>
      {props => {
        if (props.loading) {
          return "Loading...";
        }
        if (props.error) {
          console.log(props.error)
          return `error occurred: ${props.error}`
        }

        return (
          <div>
            <h1>Hello, {props.data.user.name} - id: {props.data.user.id}</h1>
            <ul>
              {props.data.user.blogs.map(b => (
                <li>{b.title}</li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
