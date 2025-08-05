import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 95vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0 0 0;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
`;

const ModeSelector = styled.div`
  padding: 1rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModeSelectorTitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ModeButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModeButton = styled(motion.button)`
  position: relative;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, ${props.color});
    color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  ` : `
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    &:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const ModeEmoji = styled.span`
  font-size: 1.2rem;
`;

const ModeInfo = styled.div`
  text-align: left;
`;

const ModeLabel = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
`;

const ModeDesc = styled.div`
  font-size: 0.7rem;
  opacity: 0.8;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: #ffd700;
  border-radius: 50%;
  animation: ${bounce} 2s infinite;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  margin: 1rem;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const MessageBubble = styled(motion.div)`
  max-width: 70%;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  ${props => props.sender === 'user' ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-bottom-right-radius: 8px;
  ` : `
    align-self: flex-start;
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
    border-bottom-left-radius: 8px;
  `}
`;

const LoadingBubble = styled(motion.div)`
  align-self: flex-start;
  max-width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  border-bottom-left-radius: 8px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
`;

const LoadingDot = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const InputArea = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  max-height: 120px;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  font-family: inherit;
  font-size: 0.95rem;
  resize: none;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CharCounter = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 0.7rem;
  color: #999;
`;

const SendButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  margin: 0 1.5rem 1rem;
  padding: 1rem;
  background: rgba(245, 87, 108, 0.1);
  border: 1px solid rgba(245, 87, 108, 0.3);
  border-radius: 10px;
  color: #f5576c;
  font-size: 0.9rem;
  text-align: center;
`;

const App = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hey! I'm DormBuddy 👋 Your AI college sidekick. Pick a vibe and let's chat!",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("roomie");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const modes = [
    { 
      id: "professor", 
      label: "Professor", 
      emoji: "🧑‍🏫", 
      description: "Smart & helpful",
      color: "#4facfe, #00f2fe"
    },
    { 
      id: "therapist", 
      label: "Therapist Bro", 
      emoji: "🧘", 
      description: "Chill & supportive",
      color: "#43e97b, #38f9d7"
    },
    { 
      id: "roomie", 
      label: "Chill Roomie", 
      emoji: "😎", 
      description: "Fun & casual",
      color: "#f093fb, #f5576c"
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: currentInput,
        personality: personality,
      });

      const reply = res.data.reply;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Oops! Something went wrong. Try again? 🤔");
      setMessages((prev) => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Try again in a sec! 😅", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContainer>
          <Header>
            <Logo>
              <LogoIcon>🏠</LogoIcon>
              <div>
                <Title>DormBuddy</Title>
                <Subtitle>Your AI college sidekick ✨</Subtitle>
                <Description>Choose your vibe and let's chat!</Description>
              </div>
            </Logo>
          </Header>
          
          <ModeSelector>
            <ModeSelectorTitle>Pick your DormBuddy's personality:</ModeSelectorTitle>
            <ModeButtons>
              {modes.map(mode => (
                <ModeButton
                  key={mode.id}
                  active={personality === mode.id}
                  color={mode.color}
                  onClick={() => setPersonality(mode.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ModeEmoji>{mode.emoji}</ModeEmoji>
                  <ModeInfo>
                    <ModeLabel>{mode.label}</ModeLabel>
                    <ModeDesc>{mode.description}</ModeDesc>
                  </ModeInfo>
                  {personality === mode.id && <ActiveIndicator />}
                </ModeButton>
              ))}
            </ModeButtons>
          </ModeSelector>
          
          <ChatContainer>
            <MessagesArea>
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    sender={msg.sender}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.text}
                  </MessageBubble>
                ))}
                
                {isLoading && (
                  <LoadingBubble
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LoadingDots>
                      <LoadingDot delay={0} />
                      <LoadingDot delay={0.1} />
                      <LoadingDot delay={0.2} />
                    </LoadingDots>
                    <span>DormBuddy is typing...</span>
                  </LoadingBubble>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </MessagesArea>

            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </ErrorMessage>
            )}

            <InputArea>
              <InputWrapper>
                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send)"
                  disabled={isLoading}
                  maxLength={500}
                />
                <CharCounter>{input.length}/500</CharCounter>
              </InputWrapper>
              <SendButton
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ➤
              </SendButton>
            </InputArea>
          </ChatContainer>
        </MainContainer>
      </AppContainer>
    </>
  );
};

export default App;