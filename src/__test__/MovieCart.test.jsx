import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import MovieCart from "../pages/MovieCart";
import { getCart } from "../utils";

describe("Movie Cart", () => {
  test("renders movie cart", () => {
    render(
      <BrowserRouter>
        <MovieCart />
      </BrowserRouter>
    );
  });

  test("Add Movie Cart Data", () => {
    const cartMock = {
      3: {
        episode_id: 3,
        title: "The Phantom Menace",
        price: 20,
      },
    };
    localStorage.setItem("movieCart", JSON.stringify(cartMock));
    expect(getCart()).toStrictEqual(cartMock);
  });

  test("Delete Selected Movie Data on Cart", () => {
    const deleteId = 2;
    const cartMock = {
      3: {
        episode_id: 3,
        title: "The Phantom Menace",
        price: 20,
      },
      2: {
        episode_id: 2,
        title: "Return of the Jedi",
        price: 20,
      },
    };

    let updateData = { ...cartMock };
    delete updateData[deleteId.toString()];
    updateData = JSON.stringify(updateData);
    localStorage.setItem("movieCart", updateData);

    expect(Object.keys(getCart())).toHaveLength(1);
  });
});
