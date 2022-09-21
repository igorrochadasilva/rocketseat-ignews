import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/stripe");

describe("Home Page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Home product={{ priceId: "fake-price-id", amount: "R$ 10,00" }} />);

    expect(screen.getByText("for R$ 10,00 month")).toBeInTheDocument();
  });

  //testando os dados que vem do getStaticProps
  it("Loads initial data", async () => {
    const retriveStripePricesMocked = jest.mocked(stripe.prices.retrieve);

    retriveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
