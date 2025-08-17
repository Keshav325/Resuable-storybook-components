import type { Preview } from "@storybook/react";

// ✅ Import TailwindCSS styles (from your React app)
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered", // centers your component for nicer preview
  },
};

export default preview;
