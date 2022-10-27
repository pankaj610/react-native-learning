import React from 'react';
import { Button, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const addPost = (post) => {
	return axios.post('https://my-json-server.typicode.com/typicode/demo/posts', post);
};

const fetchPosts = () => {
	return axios.get('https://my-json-server.typicode.com/typicode/demo/posts');
};

function MutationQuery() {
	const { data, refetch, isFetching, isLoading } = useQuery('posts', fetchPosts);
	const queryClient = useQueryClient();
	const { mutate, isError, error } = useMutation(addPost, {
		onSuccess: (createdPostData) => {
			// queryClient.invalidateQueries('posts'); // not recommended as updated object comes in response
			console.log({ data: createdPostData.data });
			queryClient.setQueriesData('posts', (oldPostsData) => {
				return {
					...oldPostsData,
					data: [...oldPostsData?.data, createdPostData?.data],
				};
			});
		},
		onError: () => {
			// queryClient.invalidateQueries('posts');
		},
	});
	console.log({ isFetching, isLoading }, new Date().toGMTString());

	return (
		<View>
			<Text>MutationQuery</Text>
			{data?.data?.map((el) => (
				<Text key={el.id}>{el.title}</Text>
			))}
			<Button
				title="Create Post"
				onPress={() => {
					const post = { title: 'First Post' };
					mutate(post);
				}}
			/>
		</View>
	);
}

export default MutationQuery;
