import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Nuqs } from "./Nuqs";
import mockRouter from "next-router-mock";


const meta = {
  title: "Nuqs",
  component: Nuqs,
  beforeEach: () => {
    mockRouter.setCurrentUrl("/home");
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("link"))
    await expect(mockRouter).toMatchObject({ pathname: '/sample' });


    await userEvent.type(canvas.getByRole("textbox"), "John Doe");

    await userEvent.click(canvas.getByRole("button"));

    await expect(canvas.getByText("Hello, John Doe!")).toBeInTheDocument();

    // 発火してくれない
    await expect(mockRouter).toMatchObject({ pathname: '/home', query: { nane: 'dark' } });
  },
} as Meta<typeof Nuqs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
