import { fn, userEvent, within } from "storybook/test";
import { Button } from '@repo/ui/index';
import type { StoryObj } from '@storybook/react-vite';

export const ActionsData = {
  onClick: fn(),
};
const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  title: 'components/Button',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    width: {
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 335 },
      },
      control: { type: 'select' },
      options: ['auto', '100%', '335', '480'],
      mapping: {
        auto: 'auto',
        '100%': '100%',
        '335': 335,
        '480': 480,
      },
    },
  },
  args: {
    ...ActionsData,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const BtnDefault: Story = {
  args: {
    children: 'Button',
  },
};
export const BtnHoverAndPress: Story = {
  args: {
    children: 'Button Hover And Press',
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.hover(button);
    await userEvent.click(button);
  }
};
export const WidthNumber: Story = {
  args: {
    children: 'Width(420px)',
    width: 420,
  },
};
