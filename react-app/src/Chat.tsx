import React from 'react';
import './Chat.css';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment'
import { thisTypeAnnotation } from '@babel/types';
import { async } from 'q';

interface Message {
    picURL: string;
    fromName: string;
    timestamp: number;
    text: string;
}

interface Props { 
}
interface State {
    messages: Message[];
}

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => (
    <div data-testid="MessageBubble" className="MessageBubble">
        <img data-testid="userPic" className="UserPic" alt="Cat pic" src={message.picURL}></img>
        <span data-testid="timeStamp" className="TimeStamp">{moment(message.timestamp).format('hh:mm a')}</span>
        <span data-testid="message" className="Message">{message.text}</span>
    </div>
)

class Chat extends React.Component<Props, State> {
    constructor(props: React.Props<Props>) {
        super(props as any);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        const that = this;
        const fetcher = () => {
            that.fetchNewMessages().then(() => { }).catch(() => { });
            setTimeout(fetcher, 1000);
        }
        fetcher();
    }

    async fetchNewMessages() {
        const data = await
            fetch('http://localhost:3001/messages', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        const messages = await data.json();
        let messageArray = this.state.messages.concat(messages);
        this.setState({ messages: messageArray });
    }
    
  render() {
    const { messages } = this.state;
    return (
      <div className="App">
            <ScrollToBottom className="ChatStream">
                {messages.map((message: Message, index: number) =>
                    <MessageBubble key={index} message={message} />)}
        </ScrollToBottom>
      </div>
    );
  }
}

export default Chat;
