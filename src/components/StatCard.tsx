import React from 'react';
import styled from 'styled-components';

type StatCardProps = {
  title: string;
  value: number;
  suffix?: string;
  percent: number;
  trendDirection: "up" | "down";
  color: string;
  icon: React.ReactNode; // Add the icon prop
};

const StatCard: React.FC<StatCardProps> = ({ title, value, suffix, percent, trendDirection, color, icon }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="title">
          <span>
            {icon}
          </span>
          <p className="title-text">{title}</p>
          <p className="percent" style={{ color: trendDirection === "up" ? "#0a7c36" : "#dc2626" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height={20} width={20} style={{ transform: trendDirection === "down" ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
            </svg>
            {percent}%
          </p>
        </div>
        <div className="data">
          <p>{value.toLocaleString()}{suffix || ""}</p>
          <div className="range">
            <div className="fill" style={{ width: `${percent}%`, background: color }} />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    padding: 1.5rem;
    background: linear-gradient(180deg, #ffffff, #f9f9f9);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    max-width: 340px;
    border-radius: 28px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", Arial, sans-serif;
    transform: translateY(20px);
    opacity: 0;
    animation: cardFadeUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    transition:
      transform 0.45s ease,
      box-shadow 0.45s ease;
  }

  .title {
    display: flex;
    align-items: center;
  }

  .title span {
    position: relative;
    padding: 0.6rem;
    background: linear-gradient(135deg, #34d399, #10b981);
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(16, 185, 129, 0.35);
    animation: pulse 2.4s ease-in-out infinite;
  }

  .title span svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    height: 1rem;
  }

  .title-text {
    margin-left: 0.75rem;
    color: #1c1c1e;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .percent {
    margin-left: 0.5rem;
    color: #0a7c36;
    font-weight: 600;
    display: flex;
    font-size: 15px;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .data p {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: #111827;
    font-size: 2.4rem;
    line-height: 2.7rem;
    font-weight: 700;
    text-align: left;
    letter-spacing: -0.03em;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards 0.3s;
  }

  .data .range {
    position: relative;
    background-color: #e5e5ea;
    width: 100%;
    height: 0.55rem;
    border-radius: 9999px;
    overflow: hidden;
  }

  .data .range .fill {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #34d399, #10b981);
    width: 0%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
    animation:
      fillBar 1.6s ease forwards 0.5s,
      pulseFill 4s ease-in-out infinite 2.2s;
  }

  /* ✨ Animations */
  @keyframes cardFadeUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fillBar {
    from {
      width: 0%;
    }
    to {
      width: 76%;
    }
  }

  @keyframes pulseFill {
    0%,
    100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.2);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 3px 8px rgba(16, 185, 129, 0.35);
    }
    50% {
      transform: scale(1.08);
      box-shadow: 0 6px 14px rgba(16, 185, 129, 0.45);
    }
  }`;

export default StatCard;
