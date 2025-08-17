import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "../components/DataTable";

type User = { id: number; name: string; age: number };

const sampleData: User[] = [
  { id: 1, name: "Keshav", age: 20 },
  { id: 2, name: "Ankit", age: 22 },
  { id: 3, name: "Rahul", age: 19 },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
