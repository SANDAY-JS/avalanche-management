import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "ribeiraopreto::stepzen.net+1000::16805598c5addd1c4653c0d29107a9174f27f34ae055a244dd43865b78c80c0f",
    headers: {
        Authorization: `APIKey ${"https://ribeiraopreto.stepzen.net/api/wanton-emu/__graphql"}`
    },
    cache: new InMemoryCache(),
});

export default client;