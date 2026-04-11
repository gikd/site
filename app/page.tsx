"use client";

import { useEffect, useRef } from "react";

const channels = [
  {
    index: "01",
    title: "YouTube",
    description: "대표 채널 링크와 최근 콘텐츠를 가장 강조해서 연결.",
    href: "https://youtube.com",
    cta: "채널 열기",
  },
  {
    index: "02",
    title: "Instagram",
    description: "비주얼 톤과 일상적인 브랜딩 무드를 자연스럽게 확장.",
    href: "https://instagram.com",
    cta: "프로필 보기",
  },
  {
    index: "03",
    title: "Archive",
    description: "프로젝트, 링크, 정리 글을 별도 페이지와 유연하게 연결.",
    href: "https://notion.so",
    cta: "아카이브 보기",
  },
];

const focusItems = [
  "대표 영상이나 플레이리스트를 상단에 고정",
  "채널별 성격을 짧고 강하게 분리해서 소개",
  "마우스 움직임에 반응하는 비주얼로 첫인상 강화",
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
        const rotateY = ((offsetX / rect.width) - 0.5) * 10;
        const rotateX = ((offsetY / rect.height) - 0.5) * -10;

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
      { threshold: 0.2 }
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
          MY BRAND
        </a>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#channels">Channels</a>
          <a href="#focus">Focus</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">PERSONAL INTRO SITE</p>
          <div className="hero__content">
            <div className="hero__copy">
              <p className="hero__intro">Creator, storyteller, builder</p>
              <h1>
                나는 콘텐츠와 아이디어를 <span>매력적인 흐름</span>으로 연결하는
                사람.
              </h1>
              <p className="hero__body">
                YouTube 채널, 개인 브랜딩, 진행 중인 프로젝트까지 한 화면 안에서
                감각적으로 보여주는 소개 페이지예요. 첫인상은 강하게, 정보는
                선명하게, 분위기는 세련되게.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#channels">
                  채널 보기
                </a>
                <a className="button button--secondary" href="#about">
                  소개 읽기
                </a>
              </div>
            </div>

            <aside className="hero__card tilt-card">
              <p className="card-label">CURRENT SNAPSHOT</p>
              <h2>지금 만드는 것들</h2>
              <ul className="stat-list">
                <li>
                  <span>Primary</span>
                  <strong>YouTube 콘텐츠</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>개인 브랜드 확장</strong>
                </li>
                <li>
                  <span>Style</span>
                  <strong>트렌디, 선명, 인터랙티브</strong>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>짧은 소개보다, 인상 깊은 소개.</h2>
          </div>
          <div className="about-grid">
            <article className="panel panel--large reveal">
              <p>
                나는 단순히 정보를 전달하는 사람이 아니라, 사람들의 시선을
                머물게 하고 기억에 남게 만드는 흐름을 설계합니다. 콘텐츠를 만들
                때도, 채널을 운영할 때도, 결국 중요한 건 분위기와 메시지가 함께
                살아 있는지예요.
              </p>
            </article>
            <article className="panel reveal">
              <p className="panel-label">VOICE</p>
              <h3>깔끔하지만 차갑지 않게</h3>
              <p>세련된 비주얼 위에 사람 냄새 나는 문장과 리듬을 얹습니다.</p>
            </article>
            <article className="panel reveal">
              <p className="panel-label">APPROACH</p>
              <h3>트렌디하지만 복제 같지 않게</h3>
              <p>보는 순간 이 사람 감각 있다는 인상이 남도록 설계합니다.</p>
            </article>
          </div>
        </section>

        <section className="section" id="channels">
          <div className="section-heading">
            <p className="eyebrow">CHANNELS</p>
            <h2>내가 움직이고 있는 채널들.</h2>
          </div>
          <div className="channels-grid">
            {channels.map((channel) => (
              <a
                key={channel.title}
                className="channel-card tilt-card reveal"
                href={channel.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="channel-card__index">{channel.index}</span>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                <span className="channel-card__cta">{channel.cta}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section focus" id="focus">
          <div className="section-heading">
            <p className="eyebrow">FOCUS</p>
            <h2>지금 가장 힘을 주고 있는 방향.</h2>
          </div>
          <div className="focus-layout">
            <article className="focus-feature panel reveal">
              <p className="panel-label">NOW BUILDING</p>
              <h3>콘텐츠, 채널, 그리고 나 자체의 브랜드</h3>
              <p>
                이 페이지는 단순 링크 모음이 아니라, 내가 어떤 감각으로 움직이는지
                보여주는 디지털 명함이에요. 그래서 구조보다 무드, 정보보다 인상이
                먼저 오도록 만들었습니다.
              </p>
            </article>
            <div className="focus-list">
              {focusItems.map((item, index) => (
                <article className="mini-panel reveal" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel reveal">
            <p className="eyebrow">CONTACT</p>
            <h2>재미있는 제안, 협업, 연결을 기다립니다.</h2>
            <p>
              여기에는 이메일, 대표 링크, 문의 버튼, 혹은 간단한 캘린더 연결을
              넣으면 돼요.
            </p>
            <a className="button button--primary" href="mailto:hello@example.com">
              이메일 연결
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
