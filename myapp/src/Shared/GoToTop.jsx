import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setIsVisible(scrollTop > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToTop}>
          <FaArrowUp className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .top-btn {
    font-size: 1.2rem;
    width: 3rem;
    height: 3rem;
    color: #006600;
    background-color: transparent;
    border: 3px dotted #006600;
    border-radius: 50%;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &--icon {
      animation: float 1.2s ease-in-out infinite alternate-reverse;
    }

    &:hover {
      color: #fff;
      background-color: #006600;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(-0.5rem);
    }
    100% {
      transform: translateY(0.8rem);
    }
  }

  @media (max-width: 768px) {
    .top-btn {
      right: 1rem;
    }
  }

  @media (max-width: 480px) {
    .top-btn {
      right: 1rem;
      bottom: 1.5rem;
    }
  }
`;

export default GoToTop;
