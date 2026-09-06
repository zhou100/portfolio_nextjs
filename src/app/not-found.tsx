import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="eyebrow">404</p>
        <h1 className="pagehead__title">That page does not exist.</h1>
        <p className="lede">
          The work index is the best place to start.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn btn--primary" href="/work">
            Go to all work
          </Link>
        </p>
      </div>
    </section>
  );
}
