import type { PathStep } from '@/lib/portfolio';
import './CareerPath.css';

interface Props {
  intro: string;
  steps: PathStep[];
}

/**
 * Horizontal career timeline for the dark hero. A dot per step on one rule; the
 * current step is filled and labelled in text as well, so color never carries it alone.
 */
export default function CareerPath({ intro, steps }: Props) {
  return (
    <section className="path" aria-labelledby="path-label">
      <div className="path__head">
        <h2 className="path__label" id="path-label">
          Path
        </h2>
        <p className="path__intro">{intro}</p>
      </div>

      <ol className="path__list">
        {steps.map((step) => (
          <li
            className={`path__step${step.current ? ' path__step--current' : ''}`}
            key={step.org}
            aria-current={step.current ? 'step' : undefined}
          >
            <span className="path__dot" aria-hidden="true" />
            <h3 className="path__org">{step.org}</h3>
            <p className="path__role">
              {step.role}
              {step.current && <span className="path__now"> · Now</span>}
            </p>
            {step.detail && <p className="path__detail">{step.detail}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
