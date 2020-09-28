import React  from 'react'
import { render, fireEvent, wait} from '@testing-library/react';
import SearchBar from './index.js'

import { useLazyQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

it("SearchBar renders correctly", () => {
    const {queryByTestId} = render(<SearchBar />)
    expect(queryByTestId("search-bar")).toBeTruthy()
})

it("SearchBar button is active if input is not empty and is not loading", () => {
    const {queryByTestId} = render(<SearchBar />)
    const searchInput = queryByTestId("search-input")
    fireEvent.change(searchInput, {target: {value: "pika"}})

    expect(queryByTestId("search-btn")).toHaveClass('btn-active')
})

it("SearchBar button is inactive if input is empty and is not loading", () => {
    const {queryByTestId} = render(<SearchBar />)
    const searchInput = queryByTestId("search-input")
    fireEvent.change(searchInput, {target: {value: ""}})

    expect(queryByTestId("search-btn")).toHaveClass('btn-inactive')
})

describe('SearchBar useLazyQuery Hook', () => {
    
  
    it('Search Bar should hold query execution until manually triggered (useLazyQuery)', async () => {
        const GET_POKEMONS = gql`
            query PokemonsQuery($search: String!) {
                pokemons(search: "pika") {
                    name
                    pictureURL
                }
            }
        `;
    
        const POKEMONS_RESULT_DATA = {
        pokemons: [
            {
            name: 'pikachu-cosplay',
            pictureURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10085.png',
            }
        ]
        };
    
        const POKEMONS_MOCKS = [
        {
            request: {
            query: GET_POKEMONS
            },
            result: { data: POKEMONS_RESULT_DATA }
        }
        ];
        let renderCount = 0;
        const Component = () => {
            const [execute, { loading, data }] = useLazyQuery(GET_POKEMONS);
            switch (renderCount) {
            case 0:
                expect(loading).toEqual(false);
                setTimeout(() => {
                execute();
                });
                break;
            case 1:
                expect(loading).toEqual(true);
                break;
            case 2:
                expect(loading).toEqual(false);
                expect(data).toEqual(POKEMONS_RESULT_DATA);
                break;
            default: // Do nothing
            }
            renderCount += 1;
            return null;
        };
  
        render(
            <MockedProvider mocks={POKEMONS_MOCKS}>
            <Component />
            </MockedProvider>
        );
    
        await wait(() => {
            expect(renderCount).toBe(3);
        });
    })

    it('SearchBar should use variables defined in hook options (if any), when running the lazy execution function', async () => {
        const GET_POKEMONS = gql`
            query PokemonsQuery($search: String!) {
                pokemons(search: $search) @client {
                    name
                    pictureURL
                }
            }
        `;
    
        const POKEMONS_RESULT_DATA = [
            {
                name: 'pikachu-cosplay',
                pictureURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10085.png',
            },
            {
                name: 'charjabug',
                pictureURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/737.png'
            }
        ]

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            resolvers: {
                Query: {
                    pokemons(_root, { search }) {
                        return POKEMONS_RESULT_DATA.filter(pokemon => pokemon.name.includes(search));
                    }
                }
            }
            })

        let renderCount = 0;
        const Component = () => {
            const [execute, { loading, data }] = useLazyQuery(GET_POKEMONS, {
                variables: { search: "pika" }
            });
            switch (renderCount) {
            case 0:
                expect(loading).toBeFalsy();
                setTimeout(() => {
                    execute();
                });
                break;
            case 1:
                expect(loading).toBeTruthy();
                break;
            case 2:
                expect(loading).toEqual(false);
                expect(data.pokemons).toEqual([POKEMONS_RESULT_DATA[0]]);
                break;
            default: // Do nothing
            }
            renderCount += 1;
            return null;
        };

        render(
            <ApolloProvider client={client}>
            <Component />
            </ApolloProvider>
        );
    
        await wait(() => {
            expect(renderCount).toBe(3);
        });
    });
})