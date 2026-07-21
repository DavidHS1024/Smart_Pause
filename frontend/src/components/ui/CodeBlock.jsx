import React from 'react';

const CodeBlock = ({ code, language = 'json', title }) => {
  // Simplistic JSON syntax highlighting
  const highlightCode = (str) => {
    if (language !== 'json') return str;
    
    return str.split('\n').map((line, i) => {
      // Find key: "key":
      let highlightedLine = line.replace(/"([^"]+)":/g, '<span class="token-key">"$1"</span>:');
      // Find string value: "value"
      highlightedLine = highlightedLine.replace(/: "([^"]+)"/g, ': <span class="token-string">"$1"</span>');
      // Find number value: 123
      highlightedLine = highlightedLine.replace(/: (\d+)/g, ': <span class="token-number">$1</span>');
      
      return (
        <React.Fragment key={i}>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
          {'\n'}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="code-block">
      {title && (
        <div className="code-block__header">
          {title} <span style={{ float: 'right', opacity: 0.5 }}>{language}</span>
        </div>
      )}
      <div className="code-block__content">
        <pre>
          <code>
            {highlightCode(code)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
