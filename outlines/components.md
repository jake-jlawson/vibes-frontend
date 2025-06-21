# REACT COMPONENTS
This file contains a description of each of the react components that should be built to form part of the front end.


## "ChatWindow" Page
- "ChatRoomHeader" - The main header component of the site, positioned at the top and spanning the full-width of the window. On the left side it will contain the name of our application. The rest of the header will not be populated with anything but will leave space for future things if we need to put them there.

- "ExpansiblePanel" - this is a toggleable panel that will display different content along the left side of the UI. Our UI will contain multiple of these panels. Each panel has a header which also acts as a button to toggle on and off the content below. Below the header is a content area where different content can be displayed. This content area is what appears disappears on toggle.

- "ChatStream" - the chat stream is a component containing and displaying all messages from a current chat. It is a typical chat stream that would be found in apps like messenger, whatsapp, etc. The component will store the current chat history and be responsible for rendering each message in the chat. 

- "Message" - a message is the UI element for displaying a message. It is a vector image of a chat bubble with text inside. The text displays the contents of the message. Depending on if the message is from the character or the user, it will be oriented either left and be coloured grey (character) or right and be coloured blue (user). 

- "ChatBox" - The chatbox is a component below the chat stream, which allows the user to type in their chats and hit enter to send. It also has a microphone icon to the left that can be pressed to provide voice-to-text input. It should initially be 1 line tall but should expand with longer messages. The icon and the box to the left should not expand, only the part containing the text. 

- "Character" - The character is a component containing the 3D avatar. Depending on which character is selected, the character will change, although it will always stay in the same position relative to the screen.


## "Dashboard" Page
No components yet, coming soon. Ignore this for now. 