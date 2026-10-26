/* Rebuild committed SVGs: npm run diagrams. No network or model calls. */
const fs = require('node:fs');
const path = require('node:path');
const { instance } = require('@viz-js/viz');
const data = require('../src/content/architecture.json');
const quote = JSON.stringify;
const html = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function wrap(text, width = 29) {
  const lines = [''];
  for (const word of text.split(' ')) {
    if (lines[lines.length - 1].length + word.length > width) lines.push('');
    lines[lines.length - 1] += (lines[lines.length - 1] ? ' ' : '') + word;
  }
  return lines.map(html).join('<BR/>');
}
async function main() {
  const viz = await instance();
  for (const [slug, graph] of Object.entries(data)) {
    const nodes = graph.groups.flatMap(group => group.nodes);
    const ids = new Set(nodes.map(node => node.id));
    if (ids.size !== nodes.length) throw new Error(`${slug}: duplicate node ID`);
    for (const edge of graph.edges) {
      if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error(`${slug}: missing edge endpoint`);
    }
    const dot = [
      'digraph architecture {',
      'graph [rankdir=TB, newrank=true, bgcolor="#fbf9f4", compound=true, nodesep=0.55, ranksep=1.1, pad=0.25, fontname="Georgia", fontsize=18, fontcolor="#514d46", splines=polyline];',
      'node [shape=box, style="rounded,filled", color="#67635b", fillcolor="#f2efe7", fontname="Georgia", fontcolor="#1d1c1a", margin="0.16,0.14", penwidth=1.2];',
      'edge [color="#777168", fontcolor="#514d46", fontname="Georgia", fontsize=14, arrowsize=0.7, penwidth=1.2];',
    ];
    graph.groups.forEach((group, index) => {
      dot.push(`subgraph cluster_${index} { ${(slug === 'debrief' && index === 0) || (slug === 'narrative-atlas' && index === 3) ? '' : 'rank=same;'} label=${quote(group.title)}; labelloc=t; labeljust=l; style="rounded,dashed"; color="#cbc4b6"; margin=20;`);
      dot.push(`anchor_${index} [label="",shape=point,width=0,height=0,style=invis];`);
      for (const node of group.nodes) {
        // Separate the component shape from the quieter technology annotation.
        const detail = node.detail ? `<BR/><BR/><FONT POINT-SIZE="15" COLOR="#514d46">${wrap(node.detail)}</FONT>` : '';
        const label = `<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0" CELLPADDING="0"><TR><TD PORT="body" BORDER="1" COLOR="#777168" BGCOLOR="#f2efe7" CELLPADDING="16"><B><FONT POINT-SIZE="22" COLOR="#24221e">${wrap(node.title, 26)}</FONT></B>${detail}</TD></TR><TR><TD CELLPADDING="10"><FONT POINT-SIZE="17" COLOR="#625e57">${wrap(node.technology, 30)}</FONT></TD></TR></TABLE>>`;
        dot.push(`${quote(node.id)} [label=${label}, shape=plain, style="", margin=0];`);
      }
      if (slug === 'debrief' && index === 0) dot.push('{ rank=same; anchor_0; web; } { rank=same; auth; turnstile; } web -> auth [style=invis,weight=100];');
      dot.push('}');
      if (slug === 'debrief' && index === 3) dot.push('{ rank=same; anchor_2; anchor_3; }');
      else if (index) dot.push(`anchor_${index-1} -> anchor_${index} [style=invis,weight=100,minlen=2];`);
    });
    if (slug === 'debrief') dot.push('auth -> anchor_1 [style=invis,weight=100,minlen=2];');
    for (const edge of graph.edges) {
      const label = edge.label.length > 22 ? edge.label.replace(/(.{10,22})\s/g, '$1\n') : edge.label;
      dot.push(`${quote(edge.from)} -> ${quote(edge.to)} [label=${quote(label)}, style=${edge.control?'dashed':'solid'}${slug === 'churchmap' && [edge.from, edge.to].sort().join() === 'api,web' ? ', minlen=3' : ''}${edge.control?', constraint=false':''}${edge.bidirectional?', dir=both':''}];`);
    }
    dot.push('}');
    let svg = viz.renderString(dot.join('\n'), {format:'svg',engine:'dot'});
    // Retain storage silhouettes without adding another text label or color.
    svg = svg.replace(/<g id="node\d+" class="node">[\s\S]*?<\/g>/g, (group) => {
      const id = group.match(/<title>([^<]+)<\/title>/)?.[1];
      const node = nodes.find((item) => item.id === id);
      if (!node || !['database', 'object'].includes(node.kind)) return group;
      return group.replace(/<polygon fill="#f2efe7" stroke="none" points="[^"]+"\/>\s*<polygon fill="none" stroke="#777168" points="([^"]+)"\/>/, (_, points) => {
        const coords = points.trim().split(' ').map((point) => point.split(',').map(Number));
        const x = Math.min(...coords.map(p => p[0])), right = Math.max(...coords.map(p => p[0]));
        const y = Math.min(...coords.map(p => p[1])), bottom = Math.max(...coords.map(p => p[1]));
        const mid = (x + right) / 2, radius = (right - x) / 2;
        return `<path fill="#f2efe7" stroke="#777168" d="M ${x},${y+7} A ${radius},7 0 0 1 ${right},${y+7} L ${right},${bottom-7} A ${radius},7 0 0 1 ${x},${bottom-7} Z"/><ellipse cx="${mid}" cy="${y+7}" rx="${radius}" ry="7" fill="none" stroke="#777168"/>`;
      });
    });
    const destination = path.join(__dirname, '..', 'public', 'work', slug, 'architecture.svg');
    if (process.argv.includes('--check')) {
      if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8').replace(/\r\n/g, '\n') !== svg.replace(/\r\n/g, '\n')) {
        throw new Error(`${slug}: SVG is stale; run npm run diagrams`);
      }
    } else fs.writeFileSync(destination, svg);
    console.log(`${slug}: ${nodes.length} components, ${graph.edges.length} connections`);
  }
}
main().catch(error => { console.error(error); process.exitCode=1; });
