import { fn } from "storybook/test";

import { Button } from '@repo/ui/button';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

export default {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const Default = {
  args: {
    children: 'Button',
    className: 'btn btn-primary',
    appName: 'storybook',
  },
};
