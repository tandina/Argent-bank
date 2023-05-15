import { Link } from 'react-router-dom';

export default function Error() {
    return (
      <>
      <div className="hero">
          <h1>page inéxistante</h1>

        <Link to="/"><h1>Retour à l'accueil</h1></Link>
        </div>
  
      </>
    )
  }
  