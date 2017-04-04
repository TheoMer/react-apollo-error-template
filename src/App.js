import React from 'react';
import { gql, graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';

const App = React.createClass({

  incrementPostLikesQuery(idVal, updateVal) {
    this.props.client.mutate({
      query: gql`
        mutation updatenames ($id: ID!, $name: String) {
          updatePeople (id: $id, name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        "id": idVal,
        "name": updateVal
       },
    });
  },

  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}
              </li>
            ))}
          </ul>
        )}
        <div>
          <button onClick={this.incrementPostLikesQuery.bind(null, 1, "Tiny Tim")}>Update Names</button>
        </div>
      </main>
    );
  }
})

App.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
}
const AppWithApollo = withApollo(App);

export default graphql(
  gql`{
    people {
      id
      name
    }
  }`,
)(AppWithApollo)
