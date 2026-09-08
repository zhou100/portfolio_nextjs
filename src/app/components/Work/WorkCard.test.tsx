import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getWorkBySlug } from '@/lib/work';
import WorkCard from './WorkCard';

describe('WorkCard', () => {
  it('shows the decision-relevant summary and a case link', () => {
    const item = getWorkBySlug('narrative-intelligence');
    if (!item) throw new Error('Narrative case fixture is missing.');

    render(<WorkCard item={item} />);

    expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
    expect(screen.getByText(item.contribution)).toBeInTheDocument();
    expect(screen.getByText(item.roleLabel)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /read the case/i })[0]).toHaveAttribute(
      'href',
      `/work/${item.slug}`,
    );
  });
});
