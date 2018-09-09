import React from 'react';

class Wrapper extends React.Component {
  state = {} // ugh

  setRef = (ref) => this.setState({ ref })

  render() {
    const { ref } = this.state;
    const WrapperComponent = this.props.svg ? 'g' : 'font';

    return (
      <WrapperComponent ref={this.setRef}>
        {ref && this.props.children(ref)}
      </WrapperComponent>
    )
  }
}

export default function Em({ children, render, svg }) {
  return (
    <Wrapper svg={svg}>
      {(ref) => {
        const fontSize = parseFloat(getComputedStyle(ref).fontSize);
        return (render || children)(fontSize);
      }}
    </Wrapper>
  );
}
