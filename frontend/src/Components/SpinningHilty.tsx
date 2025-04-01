import { useNavigate } from 'react-router-dom';
import '../App.css';

function SpinningHilty() {
  const navigate = useNavigate();
  return (
    <img
      src="/images/spinninghilty.jpg"
      className="img-fluid rounded-circle logo-spin"
      style={{
        width: "150px",
      }}
      alt="Spinning Hilty"
      onClick={() => navigate('/adminbooks')}/>
  );
}

export default SpinningHilty;