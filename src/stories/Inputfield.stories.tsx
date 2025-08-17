import type { Meta, StoryObj } from "@storybook/react";
import InputField from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered", // Centers the component in preview
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email",
    variant: "outlined",
    size: "md",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Invalid email",
    invalid: true,
    variant: "outlined",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "Disabled input",
    disabled: true,
    variant: "outlined",
    size: "md",
  },
};

export const Loading: Story = {
  args: {
    label: "Email",
    placeholder: "Loading...",
    loading: true,
    variant: "outlined",
    size: "md",
  },
};

// 🎨 Variant examples
export const Filled: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This field uses the filled variant",
    variant: "filled",
  },
};

export const Ghost: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    helperText: "This field uses the ghost variant",
    variant: "ghost",
  },
};

// 📏 Size examples
export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Type...",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Type...",
    size: "lg",
  },
};
