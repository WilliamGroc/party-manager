
import { Form, useRouteLoaderData } from "react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useWebSocket } from "~/utils/hook/websocket";
import { Message } from "proto/tchat/Message";
import { LoaderType } from "./events.$id";
import { css } from "styled-system/css";
import { format, parse, startOfDay, endOfDay, isWithinInterval } from "date-fns";

const dayStart = startOfDay(new Date());
const dayEnd = endOfDay(new Date());

function MessageRow({ message, isOwn }: { message: Message, isOwn?: boolean }) {
  const date = parse(message.createdAt!, 'yyyy-MM-dd HH:mm:ss XXXX', new Date());

  const isToday = isWithinInterval(date, { start: dayStart, end: dayEnd });

  const dateStr = format(date, isToday ? 'HH:mm' : 'dd/MM/yyyy HH:mm');

  return <div className={css({
    padding: 3,
    borderRadius: 5,
    width: 'fit-content',
    alignSelf: isOwn ? 'flex-end' : 'flex-start',
    backgroundColor: isOwn ? 'lightblue' : 'lightgreen',
    display: 'flex',
    flexDirection: 'column',
  })}>
    {!isOwn &&
      <div className={css({
        fontSize: 11,
        fontWeight: 'bold',
        alignSelf: isOwn ? 'flex-end' : 'flex-start',
      })}>
        {message.userName}
      </div>
    }
    <div>
      {message.content}
    </div>
    <div className={css({
      fontSize: 10,
      color: 'gray',
      alignSelf: isOwn ? 'flex-end' : 'flex-start',
    })
    }>
      {dateStr}
    </div>
  </div>
}

export default function () {
  const loaderData = useRouteLoaderData<LoaderType>("routes/events.$id");

  const [messages, setMessages] = useState<Message[]>(loaderData?.messages || []);

  const { socket, listen } = useWebSocket({
    url: "ws://localhost:5173",
    roomPrefix: 'event',
    roomId: String(loaderData?.event?.id)
  });

  useEffect(() => {
    listen('eventMessage', (message: Message) => {
      console.log('received message', message);
      setMessages(state => [...state, message]);
      scrollToBottom();
    });
  }, [socket])

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }

  const sendMessage = (form: FormEvent) => {
    form.preventDefault();
    const message = new FormData(form.target as HTMLFormElement).get('message') as string;
    socket?.emit('sendMessage', JSON.stringify({ content: message, partyId: loaderData?.event.id, userId: loaderData?.userId }), `event:${loaderData?.event.id}`);
    (form.target as HTMLFormElement).reset();
  }

  return <div>
    <div
      ref={messageListRef}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: 'calc(100vh - 350px)',
        overflow: 'auto'
      })}
    >
      {messages.map((message, index) => <MessageRow key={index} message={message} isOwn={message.userId === loaderData?.userId} />)}
    </div>
    <Form onSubmit={sendMessage}>
      <textarea name="message" rows={2} className={css({ w: '100%', border: '1px solid gray', borderRadius: 5, marginTop: 6, padding: 4 })} />
      <button type="submit">Send</button>
    </Form>
  </div >
}