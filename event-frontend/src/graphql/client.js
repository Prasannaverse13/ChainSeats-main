import { ApolloClient, InMemoryCache } from '@apollo/client';

export const current_chain_1 = 'e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65';
export const current_chain_2 = '1db1936dad0717597a7743a8353c9c0191c14c3a129b258e9743aec2b4f05d03';
export const application_id = 'e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65010000000000000001000000e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65030000000000000000000000';

export const createClient = (chain) => new ApolloClient({
    uri: `http://localhost:8080/chains/${chain}/applications/${application_id}`,
    cache: new InMemoryCache(),
});