import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import getPrismicClient from "../../services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post except",
    updatedAt: "10 de Abril",
  },
];

jest.mock("../../services/prismic");

describe("Posts Page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  //testando os dados que vem do getStaticProps
  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "my-new-post",
          data: {
            Title: [
              {
                type: "heading1",
                text: "My new post",
              },
            ],
            Content: [
              {
                type: "paragraph",
                text: "Post excerpt",
              },
            ],
          },
          last_publication_date: "08-04-2022",
        },
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Post excerpt",
              updatedAt: "04 de agosto de 2022",
            },
          ],
        },
      })
    );
  });
});
