import { getByText, render, screen } from "@testing-library/react";
import { Header } from ".";

//Utilizando o mock para criar uma imitação do useRouter para testar o componente
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

//Utilizando o mock para criar uma imitação do useRouter para testar o componente
jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
