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
      'graph [rankdir=TB, newrank=true, bgcolor="#fbf9f4", compound=true, nodesep=0.55, ranksep=1.1, pad=0.25, fontname="Georgia", fontsize=18, fontcolor="#0f5f5a", splines=polyline];',
      'node [shape=box, style="rounded,filled", color="#67635b", fillcolor="#f2efe7", fontname="Georgia", fontcolor="#1d1c1a", margin="0.16,0.14", penwidth=1.2];',
      'edge [color="#0f5f5a", fontcolor="#0f5f5a", fontname="Georgia", fontsize=14, arrowsize=0.7, penwidth=1.2];',
    ];
    graph.groups.forEach((group, index) => {
      dot.push(`subgraph cluster_${index} { ${slug === 'debrief' && index === 0 ? '' : 'rank=same;'} label=${quote(group.title)}; labelloc=t; labeljust=l; style="rounded,dashed"; color="#cbc4b6"; margin=20;`);
      dot.push(`anchor_${index} [label="",shape=point,width=0,height=0,style=invis];`);
      for (const node of group.nodes) {
        const shape = {database:'cylinder',object:'cylinder',files:'folder',frontend:'tab',external:'box',service:'box',process:'box'}[node.kind];
        const kind = node.kind === 'object' ? 'OBJECT STORAGE' : node.kind.toUpperCase();
        const label = `<<FONT POINT-SIZE="11" COLOR="#67635b">${kind}</FONT><BR/><B><FONT POINT-SIZE="19">${wrap(node.title)}</FONT></B><BR/><FONT POINT-SIZE="14" COLOR="#0f5f5a">${wrap(node.technology)}</FONT><BR/><FONT POINT-SIZE="15">${wrap(node.detail)}</FONT>>`;
        dot.push(`${quote(node.id)} [label=${label}, shape=${shape}, style=${quote(node.kind === 'external' ? 'rounded,dashed,filled' : 'rounded,filled')}, fillcolor=${quote(node.kind==='frontend'?'#e2efec':'#f2efe7')}];`);
      }
      if (slug === 'debrief' && index === 0) dot.push('{ rank=same; anchor_0; web; } { rank=same; auth; turnstile; } web -> auth [style=invis,weight=100];');
      dot.push('}');
      if (slug === 'debrief' && index === 3) dot.push('{ rank=same; anchor_2; anchor_3; }');
      else if (index) dot.push(`anchor_${index-1} -> anchor_${index} [style=invis,weight=100,minlen=2];`);
    });
    if (slug === 'debrief') dot.push('auth -> anchor_1 [style=invis,weight=100,minlen=2];');
    for (const edge of graph.edges) {
      const label = edge.label.length > 22 ? edge.label.replace(/(.{10,22})\s/g, '$1\n') : edge.label;
      dot.push(`${quote(edge.from)} -> ${quote(edge.to)} [label=${quote(label)}, style=${edge.control?'dashed':'solid'}${edge.control?', constraint=false':''}${edge.bidirectional?', dir=both':''}];`);
    }
    dot.push('}');
    const svg = viz.renderString(dot.join('\n'), {format:'svg',engine:'dot'});
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
