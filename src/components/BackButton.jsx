import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return <Button type="back" onclick={(e)=> {e.preventDefault();
    navigate(-1);
  }
  }> BACK </Button>
}

export default BackButton;