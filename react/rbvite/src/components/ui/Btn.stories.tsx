import type { Meta, StoryObj } from '@storybook/react-vite';
import Btn from './Btn';

const meta: Meta = {
    title: 'ui/Btn',
    component: Btn,
    tags: ['autodocs']
}

type Story = StoryObj<typeof meta>;

export const PrimaryBtn: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Btn',
        onClick: () => alert('primary!'),
        type: 'submit'
    }
}

export const destructiveBtn: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive Btn',
        onClick: () => alert('destructive!'),
        type: 'submit'
    }
}


//여러군데에서 사용되는 것들은 (Atom 컴포넌트 같이) storybook 올려야 함.

export default meta;