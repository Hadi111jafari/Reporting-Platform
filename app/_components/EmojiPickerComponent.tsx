import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import React, { useState } from "react";

const EmojiPickerComponent = ({
  children,
  setEmojiIcon,
}: {
  children: React.ReactNode;
  setEmojiIcon: (emojiIcon: string) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpened(prev => !prev)}>{children}</div>
      {isOpened && (
        <div className="absolute z-10">
          <EmojiPicker
            emojiStyle={EmojiStyle.TWITTER}
            onEmojiClick={(event) => {
              setEmojiIcon(event.emoji);
              setIsOpened(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
