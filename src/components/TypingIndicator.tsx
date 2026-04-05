type TypingIndicatorProps = {
  name: string;
};

export function TypingIndicator({ name }: TypingIndicatorProps) {
  return (
    <div className='typing-indicator'>
      <div className='typing-dots'>
        <div className='typing-dot' />
        <div className='typing-dot' />
        <div className='typing-dot' />
      </div>
      <span className='typing-label'>{name.split(' ')[0]} is typing…</span>
    </div>
  );
}
