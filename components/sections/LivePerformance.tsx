import Image from "next/image";
import { PerformanceScreen } from "@/components/music/PerformanceScreen";
import { ArrowIcon } from "@/components/ui/Icons";
import { livePerformance } from "@/lib/data/performance";
import "@/app/live-performance.css";

export function LivePerformance() {
  return (
    <section id="live-performance" className="live-performance" aria-labelledby="live-title">
      <div className="container-page live-heading">
        <div>
          <p className="eyebrow">THE LIVE SIDE / DETROIT</p>
          <h2 id="live-title">In the pocket.<br /><em>On the stage.</em></h2>
        </div>
        <div className="live-intro">
          <p className="live-artist">Payroll Giovanni</p>
          <p>Live with Bylugphonics.</p>
          <span className="live-credit">Fee The Producer <span>on drums</span></span>
        </div>
      </div>

      <PerformanceScreen />

      <div className="container-page">
        <div className="performance-source-row">
          <p id="performance-context">{livePerformance.series}<br /><span>Performance excerpt · Original live audio · TV-MA</span></p>
          <div>
            <a href={livePerformance.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link">Watch the full episode on Tubi <ArrowIcon /></a>
            <a href={livePerformance.bandUrl} target="_blank" rel="noopener noreferrer" className="text-link">Meet Bylugphonics <ArrowIcon /></a>
          </div>
        </div>

        <div className="drum-story">
          <div className="drum-story-heading">
            <p className="eyebrow">BEHIND THE KIT</p>
            <h3>The feel starts <em>here.</em></h3>
            <p>Fee The Producer on drums with Bylugphonics for Detroit artist Payroll Giovanni’s <em>Center Circle</em> performance.</p>
          </div>
          <figure className="drummer-photo">
            <div className="performance-photo-window">
              <Image src="/images/live/behind-the-kit.png" alt="A drummer performing behind the kit at the live session" fill sizes="(max-width: 760px) 90vw, 43vw" />
            </div>
            <figcaption>THE LIVE SESSION <span>From the performance archive</span></figcaption>
          </figure>
          <figure className="drum-kit-photo">
            <div className="performance-photo-window">
              <Image src="/images/live/bylugphonics-kit.png" alt="The Bylugphonics drum kit with the band's name on the bass drum" fill sizes="(max-width: 760px) 60vw, 23vw" />
            </div>
            <figcaption>THE BYLUGPHONICS KIT</figcaption>
          </figure>
        </div>

        <details className="band-archive">
          <summary>With the band <span aria-hidden="true">+</span></summary>
          <div className="band-photo-grid">
            <figure>
              <div className="performance-photo-window">
                <Image src="/images/live/bylugphonics-backstage.png" alt="Five people in Bylugphonics clothing posing together in front of a Clever Curation backdrop" fill sizes="(max-width: 760px) 90vw, 45vw" />
              </div>
              <figcaption>BACKSTAGE / BYLUGPHONICS</figcaption>
            </figure>
            <figure>
              <div className="performance-photo-window">
                <Image src="/images/live/bylugphonics-band.png" alt="Four people in Bylugphonics clothing at the event photo backdrop" fill sizes="(max-width: 760px) 90vw, 45vw" />
              </div>
              <figcaption>FROM THE BAND ARCHIVE</figcaption>
            </figure>
          </div>
        </details>
      </div>
    </section>
  );
}
