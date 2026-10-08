import SidebarHeader from './SidebarHeader';
import ChatList from './ChatList';
import CreateChatForm from '../forms/CreateChatForm';

const Sidebar = (): React.ReactElement => {
  return (
    <aside className="flex flex-col w-full h-full bg-white md:border-r border-slate-200">
      <SidebarHeader />
      <CreateChatForm />
      <ChatList />
    </aside>
  );
};

export default Sidebar;