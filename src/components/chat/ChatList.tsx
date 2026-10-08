import ChatListItem from './ChatListItem';

const ChatList = (): React.ReactElement => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ChatListItem />
    </nav>
  );
};

export default ChatList;