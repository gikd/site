"use client";

import { useEffect, useRef } from "react";

const signals = [
  {
    label: "Viewpoint",
    value: "관점이 분명한 해석",
  },
  {
    label: "Topics",
    value: "AI, 플랫폼 변화, 시장 감각",
  },
  {
    label: "Tone",
    value: "선명하지만 과장되지 않게",
  },
];

const channelCards = [
  {
    index: "01",
    title: "YouTube",
    heading: "묘수의관점",
    description:
      "채널의 중심. 흐름을 읽고, 변화의 맥락을 해석하고, 복잡한 이슈를 관점 있는 이야기로 풀어냅니다.",
    href: "https://www.youtube.com/@묘수의관점",
    cta: "채널 보기",
  },
  {
    index: "02",
    title: "Keywords",
    heading: "AI · Platform · Market",
    description:
      "공개 검색 신호를 기준으로 보면 AI, 유튜브 정책 변화, 시장/투자 맥락이 반복적으로 보입니다. 이 축을 중심으로 페이지 카피를 설계했습니다.",
    href: "https://www.youtube.com/@묘수의관점",
    cta: "콘텐츠 톤 보기",
  },
  {
    index: "03",
    title: "Brand",
    heading: "Sharp, Quiet, Precise",
    description:
      "자극적인 과장 대신 선명한 해석으로 남는 채널. 그래서 사이트도 검정과 흰색 중심의 에디토리얼 톤으로 재구성했습니다.",
    href: "https://github.com/gikd/site",
    cta: "사이트 구조 보기",
  },
];

const manifesto = [
  "빠르게 변하는 흐름 속에서도 중요한 건 결국 무엇을 보느냐보다, 어떻게 읽느냐라는 점.",
  "묘수의관점은 AI, 플랫폼, 시장, 그리고 콘텐츠 환경의 변화에서 의미 있는 결을 포착해내는 채널로 보였습니다.",
  "그래서 이 페이지도 단순 소개가 아니라, 시선과 태도 자체를 보여주는 한 장의 에디토리얼로 설계했습니다.",
];

const themes = [
  "AI가 바꾸는 창작과 플랫폼의 규칙",
  "유튜브 생태계와 정책 변화의 파장",
  "시장과 트렌드를 읽는 개인의 감각",
];

export default function Page() {
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const handlePointerMove = (event: PointerEvent) => {
      if (!cursorGlowRef.current) return;
      cursorGlowRef.current.style.left = `${event.clientX}px`;
      cursorGlowRef.current.style.top = `${event.clientY}px`;
    };

    const cleanupTilt = cards.map((card) => {
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const rotateY = ((offsetX / rect.width) - 0.5) * 7;
        const rotateX = ((offsetY / rect.height) - 0.5) * -7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };

      const onLeave = () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      cleanupTilt.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient__glow ambient__glow--one" />
        <div className="ambient__glow ambient__glow--two" />
        <div className="ambient__cursor" ref={cursorGlowRef} />
      </div>

      <header className="site-header">
        <a className="brand" href="#top">
          MYSU VIEW
        </a>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#channel">Channel</a>
          <a href="#themes">Themes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__meta">
            <p className="eyebrow">EDITORIAL INTRO PAGE</p>
            <p className="hero__stamp">01 / OBSERVE THE SHIFT</p>
          </div>

          <div className="hero__grid">
            <div className="hero__main">
              <p className="hero__intro">YouTube Channel / Personal Lens / Modern Editorial Site</p>
              <h1>
                <span>묘수의관점</span>
                변화의 표면보다
                <br />
                그 안의 맥락을 본다.
              </h1>
            </div>

            <div className="hero__side reveal">
              <div className="hero-note tilt-card">
                <p className="panel-label">INFERRED POSITIONING</p>
                <p>
                  공개 검색 결과를 기준으로 보면 이 채널은 AI, 유튜브 정책 변화,
                  시장 감각을 해석하는 축이 강해 보여요. 그래서 소개 페이지도
                  정보를 나열하기보다 시선과 태도를 먼저 보여주도록 설계했습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="hero__footer">
            <p className="hero__body">
              검정과 흰색 사이의 강한 대비, 얇은 라인, 큰 타이포, 마우스 반응형
              조명 효과로 채널의 인상을 더 선명하게 다듬은 버전입니다.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="https://www.youtube.com/@묘수의관점" target="_blank" rel="noreferrer">
                채널 바로가기
              </a>
              <a className="button button--secondary" href="#about">
                소개 읽기
              </a>
            </div>
          </div>
        </section>

        <section className="section section--split" id="about">
          <div className="section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>채널을 소개하는 대신, 채널의 태도를 보여주기.</h2>
          </div>

          <div className="editorial-layout">
            <article className="quote-panel reveal">
              <p className="quote-panel__text">
                “복잡한 변화를 단순하게 만드는 힘은 정보량이 아니라 관점의
                선명함에서 나온다.”
              </p>
            </article>

            <div className="manifesto">
              {manifesto.map((item) => (
                <article className="manifesto__item reveal" key={item}>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="channel">
          <div className="section-heading">
            <p className="eyebrow">CHANNEL</p>
            <h2>지금 이 페이지가 담고 있는 채널의 결.</h2>
          </div>

          <div className="signal-board reveal">
            {signals.map((signal) => (
              <div className="signal-board__item" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

          <div className="channels-grid">
            {channelCards.map((card) => (
              <a
                key={card.heading}
                className="channel-card tilt-card reveal"
                href={card.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="channel-card__index">{card.index}</span>
                <p className="channel-card__eyebrow">{card.title}</p>
                <h3>{card.heading}</h3>
                <p>{card.description}</p>
                <span className="channel-card__cta">{card.cta}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section section--inverse" id="themes">
          <div className="section-heading section-heading--inverse">
            <p className="eyebrow">THEMES</p>
            <h2>이 채널이 더 강하게 보이도록 잡은 핵심 키워드.</h2>
          </div>

          <div className="themes-grid">
            {themes.map((theme, index) => (
              <article className="theme-card reveal" key={theme}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{theme}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel reveal">
            <p className="eyebrow">CONTACT</p>
            <h2>콘텐츠 협업, 제안, 연결이 필요하다면.</h2>
            <p>
              다음 단계에서는 여기에 실제 메일, SNS, 대표 영상, 채널 소개 한 줄을
              넣으면 완성도가 더 올라갑니다.
            </p>
            <a className="button button--primary" href="https://www.youtube.com/@묘수의관점" target="_blank" rel="noreferrer">
              유튜브로 이동
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
