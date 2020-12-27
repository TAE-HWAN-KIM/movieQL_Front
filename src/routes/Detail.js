import React from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { gql } from '@apollo/client';

const GET_MOVIE_DETAIL = gql`
    query getMovieaaaa($id : Int!){
        movie(id:$id){
            id
            title
            language
            rating
            medium_cover_image
            description_intro
            isLiked @client
        }
        suggestions(id:$id){
            id
            medium_cover_image
        }
    }`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  border: 10px solid transparent;
  &:focus,&:hover {
    border: 10px solid;
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE_DETAIL, {
    variables: { id: parseInt(id) }
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}
        </Title>
            {!loading && data?.movie? (<>
                <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
            </>) : ''}        
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};