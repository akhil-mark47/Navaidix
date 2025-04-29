import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineViewGrid, HiOutlineDocument, HiOutlineClipboardList, HiOutlineChat, HiOutlineOfficeBuilding, HiOutlinePaperAirplane } from 'react-icons/hi';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([
    {
      id: 1,
      contact: 'Sarah Wilson',
      position: 'HR Manager',
      company: 'TechCorp',
      avatar: null,
      lastMessage: "Hi there! We've reviewed your application and would like to schedule an interview. Let me know what times work for you next week.",
      timestamp: '2025-04-28T10:30:00',
      unread: true
    },
    {
      id: 2,
      contact: 'Michael Johnson',
      position: 'Technical Recruiter',
      company: 'InnovateCo',
      avatar: null,
      lastMessage: "Thanks for your interest in the Product Manager role. I have a few follow-up questions about your experience with agile methodologies.",
      timestamp: '2025-04-25T15:45:00',
      unread: false
    },
    {
      id: 3,
      contact: 'Jessica Lee',
      position: 'Senior Designer',
      company: 'DesignHub',
      avatar: null,
      lastMessage: "I took a look at your portfolio - very impressive work! Would you be available for a quick design challenge as part of our interview process?",
      timestamp: '2025-04-22T09:15:00',
      unread: false
    }
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  
  // Mock conversation messages for the selected conversation
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: 'them',
        text: "Hi there! Thanks for applying to the Senior Frontend Developer position at TechCorp.",
        timestamp: '2025-04-26T09:30:00'
      },
      {
        id: 2,
        sender: 'them',
        text: "We've reviewed your application and would like to schedule an interview. Let me know what times work for you next week.",
        timestamp: '2025-04-28T10:30:00'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'them',
        text: "Hello! I'm Michael from InnovateCo. Thanks for applying to the Product Manager role.",
        timestamp: '2025-04-24T11:15:00'
      },
      {
        id: 2,
        sender: 'me',
        text: "Hi Michael, thanks for reaching out. I'm very interested in the position.",
        timestamp: '2025-04-24T13:20:00'
      },
      {
        id: 3,
        sender: 'them',
        text: "Thanks for your interest in the Product Manager role. I have a few follow-up questions about your experience with agile methodologies.",
        timestamp: '2025-04-25T15:45:00'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'them',
        text: "Hello! I'm Jessica from DesignHub. I came across your application for the UX Designer role.",
        timestamp: '2025-04-20T14:10:00'
      },
      {
        id: 2,
        sender: 'me',
        text: "Hi Jessica! Thank you for considering my application. I'm really excited about the opportunity.",
        timestamp: '2025-04-21T09:05:00'
      },
      {
        id: 3,
        sender: 'them',
        text: "I took a look at your portfolio - very impressive work! Would you be available for a quick design challenge as part of our interview process?",
        timestamp: '2025-04-22T09:15:00'
      }
    ]
  });

  const handleConversationSelect = (convoId) => {
    setSelectedConversation(convoId);
    
    // Mark as read when selected
    setConversations(conversations.map(convo => 
      convo.id === convoId ? {...convo, unread: false} : convo
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage = {
      id: messages[selectedConversation].length + 1,
      sender: 'me',
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    setMessages({
      ...messages,
      [selectedConversation]: [...messages[selectedConversation], newMessage]
    });

    // Update last message in conversation list
    setConversations(conversations.map(convo => 
      convo.id === selectedConversation 
        ? {...convo, lastMessage: messageInput, timestamp: new Date().toISOString()} 
        : convo
    ));

    setMessageInput('');
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatConversationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return formatMessageTime(timestamp);
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary to-primary-light text-white">
                <h2 className="font-semibold">Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineViewGrid className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/applications" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineDocument className="h-5 w-5" />
                      <span>Applications</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/saved-jobs" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineClipboardList className="h-5 w-5" />
                      <span>Saved Jobs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/messages" className="flex items-center gap-2 px-4 py-2 rounded-md bg-pale text-primary">
                      <HiOutlineChat className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex h-[calc(80vh-10rem)]">
                {/* Conversations list */}
                <div className="w-full md:w-1/3 border-r border-slate-200">
                  <div className="p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold">Messages</h2>
                  </div>
                  
                  <div className="overflow-y-auto h-[calc(80vh-10rem-4rem)]">
                    {conversations.length > 0 ? (
                      <ul className="divide-y divide-slate-200">
                        {conversations.map(convo => (
                          <li key={convo.id}>
                            <button 
                              className={`w-full text-left p-4 hover:bg-slate-50 ${selectedConversation === convo.id ? 'bg-pale' : ''}`}
                              onClick={() => handleConversationSelect(convo.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary-light text-white rounded-full h-10 w-10 flex items-center justify-center">
                                    {convo.avatar || convo.contact.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-medium ${convo.unread ? 'text-primary font-semibold' : ''}`}>
                                        {convo.contact}
                                      </span>
                                      {convo.unread && (
                                        <span className="h-2 w-2 bg-primary rounded-full"></span>
                                      )}
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                      <HiOutlineOfficeBuilding className="h-3 w-3" />
                                      <span>{convo.position} at {convo.company}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-slate-500">
                                  {formatConversationTime(convo.timestamp)}
                                </span>
                              </div>
                              <div className={`mt-1 text-sm truncate ${convo.unread ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                                {convo.lastMessage}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <div className="bg-slate-100 rounded-full p-3 mb-3">
                          <HiOutlineChat className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-sm">No messages yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conversation */}
                <div className="hidden md:flex flex-col w-2/3">
                  {selectedConversation ? (
                    <>
                      {/* Conversation header */}
                      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary-light text-white rounded-full h-10 w-10 flex items-center justify-center">
                            {conversations.find(c => c.id === selectedConversation)?.contact.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {conversations.find(c => c.id === selectedConversation)?.contact}
                            </h3>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <HiOutlineOfficeBuilding className="h-3 w-3" />
                              <span>
                                {conversations.find(c => c.id === selectedConversation)?.position} at {conversations.find(c => c.id === selectedConversation)?.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages[selectedConversation]?.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[75%] p-3 rounded-lg ${
                                message.sender === 'me' 
                                  ? 'bg-primary text-white rounded-br-none' 
                                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
                              }`}
                            >
                              <div className="text-sm">{message.text}</div>
                              <div 
                                className={`text-xs mt-1 text-right ${
                                  message.sender === 'me' ? 'text-primary-pale' : 'text-slate-500'
                                }`}
                              >
                                {formatMessageTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message input */}
                      <div className="p-4 border-t border-slate-200">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <button 
                            type="submit" 
                            className="bg-primary text-white rounded-full p-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            disabled={!messageInput.trim()}
                          >
                            <HiOutlinePaperAirplane className="h-5 w-5 transform rotate-90" />
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <div className="bg-slate-100 rounded-full p-6 mb-4">
                        <HiOutlineChat className="h-12 w-12 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Your Messages</h3>
                      <p className="text-slate-500 mb-6">
                        Select a conversation to view messages
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile view - show this when a conversation is selected */}
                {selectedConversation && (
                  <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center">
                      <button 
                        className="mr-4"
                        onClick={() => setSelectedConversation(null)}
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary-light text-white rounded-full h-10 w-10 flex items-center justify-center">
                          {conversations.find(c => c.id === selectedConversation)?.contact.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {conversations.find(c => c.id === selectedConversation)?.contact}
                          </h3>
                          <div className="text-xs text-slate-500">
                            {conversations.find(c => c.id === selectedConversation)?.company}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages[selectedConversation]?.map(message => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] p-3 rounded-lg ${
                              message.sender === 'me' 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-slate-100 text-slate-800 rounded-bl-none'
                            }`}
                          >
                            <div className="text-sm">{message.text}</div>
                            <div 
                              className={`text-xs mt-1 text-right ${
                                message.sender === 'me' ? 'text-primary-pale' : 'text-slate-500'
                              }`}
                            >
                              {formatMessageTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message input */}
                    <div className="p-4 border-t border-slate-200">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button 
                          type="submit" 
                          className="bg-primary text-white rounded-full p-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          disabled={!messageInput.trim()}
                        >
                          <HiOutlinePaperAirplane className="h-5 w-5 transform rotate-90" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;