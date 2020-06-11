import Head from 'next/head';
import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { Post } from '../../entities/post.entity';
import { Date } from '../../components/date';

interface Props {
  postData: Post;
}

export default function PostDetailPage({ postData }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1>{postData.title}</h1>
      <Date>{postData.date}</Date>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml! }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postData = await getPostData(params!.id!.toString());
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
