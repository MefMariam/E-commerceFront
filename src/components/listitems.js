import { Button, ListGroup } from "react-bootstrap";

function ListItems({ data, ondelete, onupdate }) {
  return (
    <ListGroup>
      {data.map((item) => (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div>{item.name}</div>
          <div>
            <Button
              className="btn btn-danger"
              onClick={() => {
                ondelete(item._id);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                onupdate(item);
              }}
            >
              modifier
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default ListItems;
