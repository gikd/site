"use client";

import { useEffect, useRef } from "react";

const channels = [
  {
    index: "01",
    title: "묘수의관점",
    description: "메인 YouTube 채널. 관점이 살아 있는 이야기와 콘텐츠를 전면에.",
    href: "https://www.youtube.com/@%EB%AC%98%EC%88%98%EC%9D%98%EA%B4%80%EC%A0%90",
    cta: "YouTube 열기",
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
                <span>묘수의관점</span>으로 콘텐츠와 아이디어를 연결하는 사람.
              </h1>
              <p className="hero__body">
                메인 채널인 묘수의관점을 중심으로, 내가 어떤 시선으로 이야기하고
                어떤 흐름으로 콘텐츠를 만드는지 한 화면 안에 담아낸 소개
                페이지예요. 첫인상은 강하게, 정보는 선명하게, 분위기는 세련되게.
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
                  <strong>@묘수의관점</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>관점 있는 콘텐츠 브랜딩</strong>
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
                나는 단순히 정보를 전달하는 사람이 아니라, 하나의 관점을
                콘텐츠로 풀어내고 사람들의 시선을 머물게 만드는 흐름을 설계합니다.
                묘수의관점을 통해 메시지와 분위기가 함께 살아 있는 콘텐츠를
                만들고 있어요.
              </p>
            </article>
            <article className="panel reveal">
              <p className="panel-label">VOICE</p>
              <h3>깔끔하지만 차갑지 않게</h3>
              <p>선명한 관점 위에 사람 냄새 나는 문장과 리듬을 얹습니다.</p>
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
                이 페이지는 단순 링크 모음이 아니라, 묘수의관점이라는 채널을
                중심으로 내가 어떤 감각과 시선으로 움직이는지 보여주는 디지털
                명함이에요. 그래서 구조보다 무드, 정보보다 인상이 먼저 오도록
                만들었습니다.
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
