interface Props {
  error: string | string[] | null;
}

const ErrorMessages = ({ error }: Props) => {
  return (
    error && (
      <div className="error-message">
        {Array.isArray(error) ? (
          <ul className="error-message-items">
            {error.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        ) : (
          <p>{error}</p>
        )}
      </div>
    )
  );
};

export default ErrorMessages;
