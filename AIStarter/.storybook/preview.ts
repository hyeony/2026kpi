import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
