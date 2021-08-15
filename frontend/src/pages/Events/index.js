import { useState, useMemo } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import api from "../../services/api";
import cameraIcon from "../../assets/camera.png";
import "./events.css";

export default function Events() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sport, setSport] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user");
    const eventData = new FormData();

    eventData.append("thumbnail", thumbnail);
    eventData.append("sport", sport);
    eventData.append("title", title);
    eventData.append("price", price);
    eventData.append("description", description);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/event", eventData, { headers: { user_id: userId } });
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);

        console.log("missing required fields");
      }
    } catch (error) {
      console.log(error.message);
    }

    return "";
  };

  return (
    <Container>
      <h2>Create your Event</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label>Upload Image: </Label>
          <Label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <Input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            <img
              src={cameraIcon}
              style={{ maxWidth: "50px" }}
              alt="upload icon"
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>Sport: </Label>
          <Input
            id="sport"
            placeholder="Sport name"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Title: </Label>
          <Input
            id="title"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description: </Label>
          <Input
            id="description"
            placeholder="Event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Price: </Label>
          <Input
            id="price"
            placeholder="Event price ￡0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Date: </Label>
          <Input
            id="date"
            type="date"
            placeholder="Event date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Create Event</Button>
      </Form>
      {isError ? (
        <Alert className="event-validation" color="danger">
          Missing required fields
        </Alert>
      ) : null}
    </Container>
  );
}
