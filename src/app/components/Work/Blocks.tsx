import { Fragment } from 'react';
import type { Block } from '@/lib/work';

/** **bold**, *italic*, and `code` inside a paragraph. Everything else is text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function BlockView({ block, rich }: { block: Block; rich: boolean }) {
  switch (block.type) {
    case 'p':
      return (
        <div className="block">
          <p>{rich ? <RichText text={block.text} /> : block.text}</p>
        </div>
      );

    case 'h':
      return (
        <div className="block">
          <h3 className="block__h">{block.text}</h3>
        </div>
      );

    case 'list':
      return (
        <div className="block block--list">
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'deflist':
      return (
        <div className="block">
          <dl className="deflist">
            {block.items.map((item) => (
              <div className="deflist__row" key={item.term}>
                <dt className="deflist__term">{item.term}</dt>
                <dd className="deflist__detail">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case 'table':
      return (
        <div className="block">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  {block.head.map((cell) => (
                    <th key={cell} scope="col">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, index) =>
                      index === 0 ? (
                        <th key={cell} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={cell}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="tablecaption">{block.caption}</p>}
        </div>
      );

    case 'note':
      return (
        <div className="block">
          <p className="note">{block.text}</p>
        </div>
      );

    case 'template':
      return (
        <div className="block">
          <div className="template">
            {block.lines.map((line) => (
              <div className="template__row" key={line.label}>
                <p className="template__label">{line.label}</p>
                <p className="template__text">{line.text}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function Blocks({ blocks, rich = false }: { blocks: Block[]; rich?: boolean }) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView block={block} rich={rich} key={index} />
      ))}
    </>
  );
}
