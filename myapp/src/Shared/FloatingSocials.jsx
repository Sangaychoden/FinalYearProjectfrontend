import styled from "styled-components";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <Wrapper>
      <a
        href="https://wa.me/97517755898" // your WhatsApp number with country code
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn whatsapp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://facebook.com/thim.dorji" // your Facebook page
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn facebook"
      >
        <FaFacebookF />
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 5.5rem; /* adjust so it doesn't overlap GoToTop */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;

  .social-btn {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .whatsapp {
    background-color: #25d366;
  }

  .whatsapp:hover {
    transform: scale(1.1);
  }

  .facebook {
    background-color: #3b5998;
  }

  .facebook:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    right: 1rem;
    bottom: 5.5rem;
  }


  @media (max-width: 480px) {
    .top-btn {
      right: 0.5rem;
      bottom: 5.5rem;
    }
  }
`;
export default FloatingSocials;