import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { describe, it } from 'node:test';

// Mocking Stripe API call
jest.mock('@/lib/stripe', () => ({
  stripe: {
    products: {
      list: jest.fn().mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Sample Product',
            images: ['https://via.placeholder.com/450'],
          },
        ],
      }),
    },
  },
}));

// Ensure you have a valid describe block with an actual test
describe('Home Page', () => {
  it('renders the Home page and loads Carousel', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    // Check if product data is rendered
    const productName = screen.getByText('Sample Product');
    const productImage = screen.getByAltText('Hero Image');
    expect(productName).toBeInTheDocument();
    expect(productImage).toHaveAttribute(
      'src',
      'https://via.placeholder.com/450'
    );
  });
});
