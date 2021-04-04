declare module 'react-anchor-without-hash' {
  import * as React from 'react';

  interface AnchorProps {
    name: string;
  }

  export default class Anchor extends React.Component<AnchorProps & any, any> {
    constructor(props: AnchorProps) {
      super(props);
    }
  }
}
