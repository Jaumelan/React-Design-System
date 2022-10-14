import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from 'msw';
import { Signin } from "./Signin";

export default {
  title: "Pages/Signin",
  component: Signin,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/signin', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Login realizado com sucesso!'
          }))
        })
      ]
    }
  }
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByPlaceholderText("Digite seu e-mail"),
      "jaime@email.com"
    );
    userEvent.type(canvas.getByPlaceholderText("******"), "123456");

    userEvent.click(canvas.getByRole("button"));

    await waitFor(() =>
      expect(canvas.getByText("Login Realizado")).toBeInTheDocument()
    );
  },
};
