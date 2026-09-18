import React, { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Info, X } from 'lucide-react';

export default function CytoscapeViewer({ subgraph }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!subgraph || !subgraph.nodes || subgraph.nodes.length === 0) {
    return (
      <div className="graph-empty" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <p>Chưa có dữ liệu đồ thị.</p>
      </div>
    );
  }

  const elements = [];

  subgraph.nodes.forEach((n) => {
    elements.push({
      data: {
        id: n.id,
        label: n.name || n.id,
        nodeType: n.label,
        properties: n.properties || {},
      },
    });
  });

  if (subgraph.edges) {
    subgraph.edges.forEach((e) => {
      elements.push({
        data: {
          id: `e_${e.id || e.source + '_' + e.target}`,
          source: e.source,
          target: e.target,
          label: e.label,
          properties: e.properties || {},
        },
      });
    });
  }

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'color': '#16324f',
        'font-size': '11px',
        'font-weight': '600',
        'text-valign': 'bottom',
        'text-margin-y': '6px',
        'text-wrap': 'wrap',
        'text-max-width': '140px',
        'background-color': '#94a3b8',
        'width': '40px',
        'height': '40px',
        'border-width': '2px',
        'border-color': '#ffffff',
        'text-outline-color': '#ffffff',
        'text-outline-width': '2px',
        'shadow-blur': '8',
        'shadow-color': 'rgba(31,82,142,0.25)',
        'shadow-opacity': '0.4',
      },
    },
    {
      selector: 'node[nodeType = "Truong"]',
      style: { 'background-color': '#2f7ff5', 'border-color': '#bcd8fd', 'width': '46px', 'height': '46px', 'font-size': '12px', 'font-weight': '700' },
    },
    {
      selector: 'node[nodeType = "Nganh"]',
      style: { 'background-color': '#0f9d6e', 'border-color': '#b6e7d6' },
    },
    {
      selector: 'node[nodeType = "PhuongThuc"]',
      style: { 'background-color': '#e8a20c', 'border-color': '#f6e2b3' },
    },
    {
      selector: 'node[nodeType = "ToHop"]',
      style: { 'background-color': '#0ea5e9', 'border-color': '#bae6fd', 'shape': 'round-diamond' },
    },
    {
      selector: 'node[nodeType = "MonHoc"]',
      style: { 'background-color': '#64748b', 'border-color': '#cbd5e1', 'shape': 'round-rectangle' },
    },
    {
      selector: 'node[nodeType = "NgheNghiep"]',
      style: { 'background-color': '#8b5cf6', 'border-color': '#ddd1fb', 'width': '44px', 'height': '44px' },
    },
    {
      selector: 'edge',
      style: {
        'width': 1.6,
        'line-color': '#b9cde4',
        'target-arrow-color': '#7ba6d6',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '8px',
        'color': '#64798f',
        'text-rotation': 'autorotate',
        'text-background-color': '#ffffff',
        'text-background-opacity': 1,
        'text-background-padding': '2px',
        'text-background-shape': 'roundrectangle',
      },
    },
  ];

  const layout = { name: 'cose', animate: true, padding: 30 };

  return (
    <div className="cytoscape-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
        cy={(cy) => {
          cy.on('tap', 'node', (evt) => {
            setSelectedNode(evt.target.data());
          });
        }}
      />

      {selectedNode && (
        <div className="node-detail-modal">
          <div className="node-detail-header">
            <div className="node-detail-title">
              <Info size={15} />
              <span>
                <span className="pill">{selectedNode.nodeType}</span> {selectedNode.label}
              </span>
            </div>
            <button className="btn-icon" onClick={() => setSelectedNode(null)}>
              <X size={15} />
            </button>
          </div>
          {Object.keys(selectedNode.properties).length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Không có thuộc tính bổ sung.</p>
          ) : (
            <table className="props-table">
              <tbody>
                {Object.entries(selectedNode.properties).map(([key, val]) => (
                  <tr key={key}>
                    <td className="prop-key">{key}</td>
                    <td className="prop-val">{String(val)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
