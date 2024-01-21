import React from "react";
import { SomethingWentWrong } from "../SomethingWentWrong/";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.updateState=this.updateState.bind(this);
  }

  updateState(hasError){
      this.setState({hasError});
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <SomethingWentWrong />;
    }

    return this.props.children;
  }
}