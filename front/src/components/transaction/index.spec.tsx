import { Post } from ".";
import dubai3 from "src/assets/jpg/dubai-3.jpg";
import { render } from "@testing-library/react";
import woman from "src/assets/jpg/woman.jpg";

describe("src/components/post/index.tsx", () => {
  test("Render Post component", () => {
    const post = {
      _id: "id",
      user: {
        _id: "id",
        picture: woman,
        username: "Nicole Hamilton",
      },
      photo: dubai3,
      likes: 12,
      comments: [
        {
          username: "Nicole Hamilton",
          content: "Hello World! 🙂",
          createdAt: new Date(),
        },
        {
          username: "Adam Kenny",
          content: "How are you? 🥳",
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    };

    const renderedPost = render(<Post post={post} />);
    expect(renderedPost.container).toMatchSnapshot();
  });
});
