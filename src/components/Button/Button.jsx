import { Button } from './Button.styled';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
};

export default LoadMoreBtn;
