import React from 'react';
import { formatMessage } from 'umi-plugin-locale';

export default class UmiReactTitle extends React.Component {
  componentDidMount() {
    document.title = this.getTitle();
  }
  getTitle() {
    const separator = '' || ' - ';
    const title = this.props.route._title.split(separator).map(item => {
      return formatMessage({
        id: item.trim(),
        defaultMessage: item.trim(),
      });
    })
    return title.join(separator);
  }
  componentWillUnmount() {
    if (
      document.title === this.getTitle()
    ) {
      document.title = this.props.route._title
    }
  }
  render() {
    return this.props.children;
  }
}
