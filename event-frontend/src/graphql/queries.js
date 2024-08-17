import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query {
    newEvents {
      entries {
        key {
          index
        }
        value {
          timestamp,
          name,
          place,
          description,
          participants,
          imageUrl
        }
      }
    }
  }
`;

export const MY_EVENTS = gql`
  query {
    myEvents {
      entries {
        timestamp,
        name
        place
        description
        participants
        imageUrl
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation Event($time: String!, $name: String!, $place: String!, $description: String!, $participants: Int!, $imageUrl: String!) {
    event(
      time: $time,
      name: $name,
      place: $place,
      description: $description,
      participants: $participants,
      imageUrl: $imageUrl
    )
  }
`;

export const SUBSCRIBE_EVENT = gql`
  mutation SubscribeEvent($chainId: ID!) {
    subscribeEvent(chainId: $chainId)
  }
`;

export const UNSUBSCRIBE_EVENT = gql`
  mutation UnsubscribeEvent($chainId: ID!) {
    unsubscribeEvent(chainId: $chainId)
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($key: ID!) {
    deleteEvent(key: $key)
  }
`;
