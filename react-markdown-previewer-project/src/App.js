import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import React, { Component, PureComponent } from 'react';
// import ReactDOM from 'react-dom';

const hljs = window.hljs;

// Window Title Bar Component

function WindowTitleBar(props) {
  const { maxStatus, onClick } = props;

  return (
    <div className="window-box">
      <button type="button" className="window-button" onClick={onClick}>
        {maxStatus === false && <i className="icon-resize-full icon-large" />}
        {maxStatus === true && <i className="icon-resize-small icon-large" />}
      </button>
    </div>
  );
}

// InputCode Component
class InputCode extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onInputChange } = this.props;
    onInputChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return (
      <textarea
        className="editor"
        id="editor"
        value={value}
        onChange={this.handleChange}
        spellCheck="false"
      />
    );
  }
}

// Link renderer edit
function LinkRenderer(props) {
  const { children, href } = props;
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

// For <code> Markup rendering
class CodeBlock extends PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  setRef(el) {
    this.codeEl = el;
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    const { language, value } = this.props;
    return (
      <pre>
        <code ref={this.setRef} className={`language-${language}`}>
          {value}
        </code>
      </pre>
    );
  }
}

CodeBlock.defaultProps = {
  language: ''
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

// MarkDownOutput Component

function MarkDownOutput(props) {
  const { display } = props;
  return (
    <ReactMarkdown
      className="markdown-output"
      source={display}
      skipHtml={false}
      escapeHtml={false}
      renderers={{ code: CodeBlock, link: LinkRenderer }}
    />
  );
}

const defaultInput =
  "\n# Markdown Previewer\n## Programmed by Niccolo Lampa\n### Created Using React\n ![react logo](https://video-react.js.org/assets/logo.png)\n \nImplements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n\nLet's demonstrate:\n\n**Code:**\n```javascript\nvar s = 'Sample javascript syntax highlighting';\nalert(s);\n```\n```python\ns = 'Sample python syntax highlighting'\nprint(s)\n``` \n```\nNo language indicated, so no syntax highlighting.\nBut let's throw in a <b>tag</b>.\n```\n**Blockquotes:**\n>This is a blockquote \n\n**List Items**\n * Macintosh\n * Linux \n * Windows\n\n** Tables: ** \n\n| Front-end Libraries  | Available|\n| --------- | ------- |\n| React   | ✔ |\n| Angular | ✔ |\n| Vue     | ✔ |";

// MainDisplay Component
class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultInput,
      maximized: { editor: false, preview: false }
    };
    this.handleChangeTextInput = this.handleChangeTextInput.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  // will change the input state and preview if any change in the text-area is detected
  handleChangeTextInput(newInput) {
    this.setState({ input: newInput });
  }

  // will change the button and make the corresponding screen maximized / normal in size
  handleWindowClick(window) {
    const { maximized } = this.state;
    const max = maximized;
    max[window] = !max[window];
    this.setState({ maximized: max });
  }

  // create a render window so that every title window is unique
  renderTitleWindow(window) {
    const { maximized } = this.state;
    return (
      <WindowTitleBar
        onClick={() => this.handleWindowClick(window)}
        maxStatus={maximized[window]}
      />
    );
  }

  render() {
    const { input, maximized } = this.state;
    return (
      <div className="main">
        <h1 className="heading blinking">
          WELCOME TO MARKDOWN PREVIEWER (REACT)
        </h1>
        <div className="container">
          <div className={`input-area max-${maximized.editor}`}>
            {this.renderTitleWindow('editor')}
            <InputCode
              value={input}
              onInputChange={this.handleChangeTextInput}
            />
          </div>

          <div className={`preview-area max-${maximized.preview}`} id="preview">
            {this.renderTitleWindow('preview')}
            <MarkDownOutput display={input} />
          </div>
        </div>
      </div>
    );
  }
}

// // Exports MainDisplay
export default MainDisplay;
