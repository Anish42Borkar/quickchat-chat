type AvatarProps = {
  name: string;
  color: string;
  size?: number;
  radius?: number;
  status: string;
};

export function Avatar({
  name,
  color,
  size = 42,
  radius = 14,
  status,
}: AvatarProps) {
  return (
    <div className='avatar-wrap'>
      <div
        className='avatar'
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: color,
          fontSize: size * 0.38,
        }}
      >
        {name}
      </div>
      {status && <span className={`status-dot ${status}`} />}
    </div>
  );
}
